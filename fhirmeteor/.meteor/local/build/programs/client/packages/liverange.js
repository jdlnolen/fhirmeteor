//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var LiveRange;

(function () {

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/liverange/liverange.js                                               //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
// Stand back, I'm going to try SCIENCE.                                         // 1
                                                                                 // 2
// Possible optimization: get rid of _startIndex/_endIndex and just search       // 3
// the list. Not clear which strategy will be faster.                            // 4
                                                                                 // 5
// Possible extension: could allow zero-length ranges is some cases,             // 6
// by encoding both 'enter' and 'leave' type events in the same list             // 7
                                                                                 // 8
var canSetTextProps = (function () {                                             // 9
  // IE8 and earlier don't support expando attributes on text nodes,             // 10
  // but fortunately they are allowed on comments.                               // 11
  var testElem = document.createTextNode("");                                    // 12
  var exception;                                                                 // 13
  try {                                                                          // 14
    testElem.test = 123;                                                         // 15
  } catch (exception) { }                                                        // 16
  if (testElem.test !== 123)                                                     // 17
    return false;                                                                // 18
                                                                                 // 19
  // IE9 and 10 have a weird issue with multiple text nodes next to              // 20
  // each other losing their expando attributes. Use the same                    // 21
  // workaround as IE8. Not sure how to test this as a feature, so use           // 22
  // browser detection instead.                                                  // 23
  // See https://github.com/meteor/meteor/issues/458                             // 24
  if (document.documentMode)                                                     // 25
    return false;                                                                // 26
                                                                                 // 27
  return true;                                                                   // 28
})();                                                                            // 29
                                                                                 // 30
var wrapEndpoints = function (start, end) {                                      // 31
  if (canSetTextProps) {                                                         // 32
    return [start, end];                                                         // 33
  } else {                                                                       // 34
    // IE8 workaround: insert some empty comments.                               // 35
    // Comments whose text is "IE" are stripped out                              // 36
    // in cross-browser testing.                                                 // 37
    if (start.nodeType === 3 /* text node */) {                                  // 38
      var placeholder = document.createComment("IE");                            // 39
      start.parentNode.insertBefore(placeholder, start);                         // 40
      start = placeholder;                                                       // 41
    }                                                                            // 42
    if (end.nodeType === 3 /* text node */) {                                    // 43
      var placeholder = document.createComment("IE");                            // 44
      end.parentNode.insertBefore(placeholder, end.nextSibling);                 // 45
      end = placeholder;                                                         // 46
    }                                                                            // 47
    return [start, end];                                                         // 48
  }                                                                              // 49
};                                                                               // 50
                                                                                 // 51
                                                                                 // 52
// This is a constructor (invoke it as 'new LiveRange').                         // 53
//                                                                               // 54
// Create a range, tagged 'tag', that includes start, end, and all               // 55
// the nodes between them, and the children of all of those nodes,               // 56
// but includes no other nodes. If there are other ranges tagged                 // 57
// 'tag' that contain this exact set of nodes, then: if inner is                 // 58
// false (the default), the new range will be outside all of them                // 59
// (will contain all of them), or if inner is true, then it will be              // 60
// inside all of them (be contained by all of them.) If there are no             // 61
// other ranges tagged 'tag' that contain this exact set of nodes,               // 62
// then 'inner' is ignored because the nesting of the new range with             // 63
// respect to other ranges is uniquely determined. (Nesting of                   // 64
// ranges with different tags is undefined.)                                     // 65
//                                                                               // 66
// To track the range as it's relocated, some of the DOM nodes that              // 67
// are part of the range will have an expando attribute set on                   // 68
// them. The name of the expando attribute will be the value of                  // 69
// 'tag', so pick something that won't collide.                                  // 70
//                                                                               // 71
// Instead of start and end, you can pass a document or                          // 72
// documentfragment for start and leave end undefined. Or you can                // 73
// pass a node for start and leave end undefined, in which case end              // 74
// === start. If start and end are distinct nodes, they must be                  // 75
// siblings.                                                                     // 76
//                                                                               // 77
// You can set any attributes you like on the returned LiveRange                 // 78
// object, with two exceptions. First, attribute names that start                // 79
// with '_' are reserved. Second, the attribute 'tag' contains the               // 80
// tag name of this range and mustn't be changed.                                // 81
//                                                                               // 82
// It would be possible to add a fast path through this function                 // 83
// when caller can promise that there is no range that starts on                 // 84
// start that does not end by end, and vice versa. eg: when start                // 85
// and end are the first and last child of their parent respectively             // 86
// or when caller is building up the range tree from the inside                  // 87
// out. Let's wait for the profiler to tell us to add this.                      // 88
//                                                                               // 89
// XXX Should eventually support LiveRanges where start === end                  // 90
// and start.parentNode is null.                                                 // 91
LiveRange = function (tag, start, end, inner) {                                  // 92
  if (start.nodeType === 11 /* DocumentFragment */) {                            // 93
    end = start.lastChild;                                                       // 94
    start = start.firstChild;                                                    // 95
  } else {                                                                       // 96
    if (! start.parentNode)                                                      // 97
      throw new Error("LiveRange start and end must have a parent");             // 98
  }                                                                              // 99
  end = end || start;                                                            // 100
                                                                                 // 101
  this.tag = tag; // must be set before calling _ensureTag                       // 102
                                                                                 // 103
  var endpoints = wrapEndpoints(start, end);                                     // 104
  start = this._ensureTag(endpoints[0]);                                         // 105
  end = this._ensureTag(endpoints[1]);                                           // 106
                                                                                 // 107
  // Decide at what indices in start[tag][0] and end[tag][1] we                  // 108
  // should insert the new range.                                                // 109
  //                                                                             // 110
  // The start[tag][0] array lists the other ranges that start at                // 111
  // `start`, and we must choose an insertion index that puts us                 // 112
  // inside the ones that end at later siblings, and outside the ones            // 113
  // that end at earlier siblings.  The ones that end at the same                // 114
  // sibling (i.e. share both our start and end) we must be inside               // 115
  // or outside of depending on `inner`.  The array lists ranges                 // 116
  // from the outside in.                                                        // 117
  //                                                                             // 118
  // The same logic applies to end[tag][1], which lists the other ranges         // 119
  // that happen to end at `end` from in the inside out.                         // 120
  //                                                                             // 121
  // Liveranges technically start just before, and end just after, their         // 122
  // start and end nodes to which the liverange data is attached.                // 123
                                                                                 // 124
  var startIndex = findPosition(start[tag][0], true, end, start, inner);         // 125
  var endIndex = findPosition(end[tag][1], false, start, end, inner);            // 126
                                                                                 // 127
  // this._start is the node N such that we begin before N, but not              // 128
  // before the node before N in the preorder traversal of the                   // 129
  // document (if there is such a node.) this._start[this.tag][0]                // 130
  // will be the list of all LiveRanges for which this._start is N,              // 131
  // including us, sorted in the order that the ranges start. and                // 132
  // finally, this._startIndex is the value such that                            // 133
  // this._start[this.tag][0][this._startIndex] === this.                        // 134
  //                                                                             // 135
  // Similarly for this._end, except it's the node N such that we end            // 136
  // after N, but not after the node after N in the postorder                    // 137
  // traversal; and the data is stored in this._end[this.tag][1], and            // 138
  // it's sorted in the order that the ranges end.                               // 139
                                                                                 // 140
  // Set this._start, this._end, this._startIndex, this._endIndex                // 141
  this._insertEntries(start, 0, startIndex, [this]);                             // 142
  this._insertEntries(end, 1, endIndex, [this]);                                 // 143
};                                                                               // 144
                                                                                 // 145
var findPosition = function(ranges, findEndNotStart, edge, otherEdge, inner) {   // 146
  var index;                                                                     // 147
  // For purpose of finding where we belong in start[tag][0],                    // 148
  // walk the array and determine where we start to see ranges                   // 149
  // end at `end` (==edge) or earlier.  For the purpose of finding               // 150
  // where we belong in end[tag][1], walk the array and determine                // 151
  // where we start to see ranges start at `start` (==edge) or                   // 152
  // earlier.  In both cases, we slide a sibling pointer backwards               // 153
  // looking for `edge`, though the details are slightly different.              // 154
  //                                                                             // 155
  // Use `inner` to take first or last candidate index for insertion.            // 156
  // Candidate indices are:  Right before a range whose edge is `edge`           // 157
  // (i.e., a range with same start and end as we are creating),                 // 158
  // or the index where ranges start to have edges earlier than `edge`           // 159
  // (treating the end of the list as such an index).  We detect the             // 160
  // latter case when `n` hits `edge` without hitting the edge of the            // 161
  // current range; that is, it is about to move past `edge`.  This is           // 162
  // always an appropriate time to stop.                                         // 163
  //                                                                             // 164
  // Joint traversal of the array and DOM should be fast.  The most              // 165
  // expensive thing to happen would be a single walk from lastChild             // 166
  // to end looking for range ends, or from end to start looking for             // 167
  // range starts.                                                               // 168
  //                                                                             // 169
  // invariant: n >= edge ("n is after, or is, edge")                            // 170
  var initialN = (findEndNotStart ? edge.parentNode.lastChild : otherEdge);      // 171
  var takeFirst = (findEndNotStart ? ! inner : inner);                           // 172
  for(var i=0, n=initialN; i<=ranges.length; i++) {                              // 173
    var r = ranges[i];                                                           // 174
    var curEdge = r && (findEndNotStart ? r._end : r._start);                    // 175
    while (n !== curEdge && n !== edge) {                                        // 176
      n = n.previousSibling;                                                     // 177
    }                                                                            // 178
    if (curEdge === edge) {                                                      // 179
      index = i;                                                                 // 180
      if (takeFirst) break;                                                      // 181
    } else if (n === edge) {                                                     // 182
      index = i;                                                                 // 183
      break;                                                                     // 184
    }                                                                            // 185
  }                                                                              // 186
  return index;                                                                  // 187
};                                                                               // 188
                                                                                 // 189
LiveRange.prototype._ensureTag = function (node) {                               // 190
  if (!(this.tag in node))                                                       // 191
    node[this.tag] = [[], []];                                                   // 192
  return node;                                                                   // 193
};                                                                               // 194
                                                                                 // 195
var canDeleteExpandos = (function() {                                            // 196
  // IE7 can't remove expando attributes from DOM nodes with                     // 197
  // delete. Instead you must remove them with node.removeAttribute.             // 198
  var node = document.createElement("DIV");                                      // 199
  var exception;                                                                 // 200
  var result = false;                                                            // 201
  try {                                                                          // 202
    node.test = 12;                                                              // 203
    delete node.test;                                                            // 204
    result = true;                                                               // 205
  } catch (exception) { }                                                        // 206
  return result;                                                                 // 207
})();                                                                            // 208
                                                                                 // 209
LiveRange._cleanNode = function (tag, node, force) {                             // 210
  var data = node[tag];                                                          // 211
  if (data && (!(data[0].length + data[1].length) || force)) {                   // 212
    if (canDeleteExpandos)                                                       // 213
      delete node[tag];                                                          // 214
    else                                                                         // 215
      node.removeAttribute(tag);                                                 // 216
  }                                                                              // 217
};                                                                               // 218
                                                                                 // 219
// Delete a LiveRange. This is analogous to removing a DOM node from             // 220
// its parent -- it will no longer appear when traversing the tree               // 221
// with visit().                                                                 // 222
//                                                                               // 223
// On modern browsers there is no requirement to delete LiveRanges on            // 224
// defunct nodes. They will be garbage collected just like any other             // 225
// object. However, on old versions of IE, you probably do need to               // 226
// manually remove all ranges because IE can't GC reference cycles               // 227
// through the DOM.                                                              // 228
//                                                                               // 229
// Pass true for `recursive` to also destroy all descendent ranges.              // 230
LiveRange.prototype.destroy = function (recursive) {                             // 231
  var self = this;                                                               // 232
                                                                                 // 233
  if (recursive) {                                                               // 234
    // recursive case: destroy all descendent ranges too                         // 235
    // (more efficient than actually recursing)                                  // 236
                                                                                 // 237
    this.visit(function(isStart, range) {                                        // 238
      if (isStart) {                                                             // 239
        range._start = null;                                                     // 240
        range._end = null;                                                       // 241
      }                                                                          // 242
    }, function(isStart, node) {                                                 // 243
      if (! isStart) {                                                           // 244
        // when leaving a node, force-clean its children                         // 245
        for(var n = node.firstChild; n; n = n.nextSibling) {                     // 246
          LiveRange._cleanNode(self.tag, n, true);                               // 247
        }                                                                        // 248
      }                                                                          // 249
    });                                                                          // 250
                                                                                 // 251
    this._removeEntries(this._start, 0, this._startIndex);                       // 252
    this._removeEntries(this._end, 1, 0, this._endIndex + 1);                    // 253
                                                                                 // 254
    if (this._start !== this._end) {                                             // 255
      // force-clean the top-level nodes in this, besides _start and _end        // 256
      for(var n = this._start.nextSibling;                                       // 257
          n !== this._end;                                                       // 258
          n = n.nextSibling) {                                                   // 259
        LiveRange._cleanNode(self.tag, n, true);                                 // 260
      }                                                                          // 261
                                                                                 // 262
      // clean ends on this._start and starts on this._end                       // 263
      if (this._start[self.tag])                                                 // 264
        this._removeEntries(this._start, 1);                                     // 265
      if (this._end[self.tag])                                                   // 266
        this._removeEntries(this._end, 0);                                       // 267
    }                                                                            // 268
                                                                                 // 269
    this._start = this._end = null;                                              // 270
                                                                                 // 271
  } else {                                                                       // 272
    this._removeEntries(this._start, 0, this._startIndex, this._startIndex + 1); // 273
    this._removeEntries(this._end, 1, this._endIndex, this._endIndex + 1);       // 274
    this._start = this._end = null;                                              // 275
  }                                                                              // 276
};                                                                               // 277
                                                                                 // 278
// Return the first node in the range (in preorder traversal)                    // 279
LiveRange.prototype.firstNode = function () {                                    // 280
  return this._start;                                                            // 281
};                                                                               // 282
                                                                                 // 283
// Return the last node in the range (in postorder traversal)                    // 284
LiveRange.prototype.lastNode = function () {                                     // 285
  return this._end;                                                              // 286
};                                                                               // 287
                                                                                 // 288
// Return the node that immediately contains this LiveRange, that is,            // 289
// the parentNode of firstNode and lastNode.                                     // 290
LiveRange.prototype.containerNode = function() {                                 // 291
  return this._start.parentNode;                                                 // 292
};                                                                               // 293
                                                                                 // 294
// Walk through the current contents of a LiveRange, enumerating                 // 295
// either the contained ranges (with the same tag as this range),                // 296
// the contained elements, or both.                                              // 297
//                                                                               // 298
// visitRange(isStart, range) is invoked for each range                          // 299
// start-point or end-point that we encounter as we walk the range               // 300
// stored in 'this' (not counting the endpoints of 'this' itself.)               // 301
// visitNode(isStart, node) is similar but for nodes.  Both                      // 302
// functions are optional.                                                       // 303
//                                                                               // 304
// If you return false (i.e. a value === false) from visitRange                  // 305
// or visitNode when isStart is true, the children of that range                 // 306
// or node are skipped, and the next callback will be the same                   // 307
// range or node with isStart false.                                             // 308
//                                                                               // 309
// If you create or destroy ranges with this tag from a visitation               // 310
// function, results are undefined!                                              // 311
LiveRange.prototype.visit = function(visitRange, visitNode) {                    // 312
  visitRange = visitRange || function() {};                                      // 313
  visitNode = visitNode || function() {};                                        // 314
                                                                                 // 315
  var tag = this.tag;                                                            // 316
                                                                                 // 317
  var recurse = function(start, end, startRangeSkip) {                           // 318
    var startIndex = startRangeSkip || 0;                                        // 319
    var after = end.nextSibling;                                                 // 320
    for(var n = start; n && n !== after; n = n.nextSibling) {                    // 321
      var startData = n[tag] && n[tag][0];                                       // 322
      if (startData && startIndex < startData.length) {                          // 323
        // immediate child range that starts with n                              // 324
        var range = startData[startIndex];                                       // 325
        // be robust if visitRange mutates _start or _end;                       // 326
        // useful in destroy(true)                                               // 327
        var rangeStart = range._start;                                           // 328
        var rangeEnd = range._end;                                               // 329
        if (visitRange(true, range) !== false)                                   // 330
          recurse(rangeStart, rangeEnd, startIndex+1);                           // 331
        visitRange(false, range);                                                // 332
        n = rangeEnd;                                                            // 333
      }                                                                          // 334
      else {                                                                     // 335
        // bare node                                                             // 336
        if (visitNode(true, n) !== false && n.firstChild)                        // 337
          recurse(n.firstChild, n.lastChild);                                    // 338
        visitNode(false, n);                                                     // 339
      }                                                                          // 340
      startIndex = 0;                                                            // 341
    }                                                                            // 342
  };                                                                             // 343
                                                                                 // 344
  recurse(this._start, this._end, this._startIndex + 1);                         // 345
};                                                                               // 346
                                                                                 // 347
// startEnd === 0 for starts, 1 for ends                                         // 348
LiveRange.prototype._removeEntries =                                             // 349
  function(node, startEnd, i, j)                                                 // 350
{                                                                                // 351
  var entries = node[this.tag][startEnd];                                        // 352
  i = i || 0;                                                                    // 353
  j = (j || j === 0) ? j : entries.length;                                       // 354
  var removed = entries.splice(i, j-i);                                          // 355
  // fix up remaining ranges (not removed ones)                                  // 356
  for(var a = i; a < entries.length; a++) {                                      // 357
    if (startEnd) entries[a]._endIndex = a;                                      // 358
    else entries[a]._startIndex = a;                                             // 359
  }                                                                              // 360
                                                                                 // 361
  // potentially remove empty liverange data                                     // 362
  if (! entries.length) {                                                        // 363
    LiveRange._cleanNode(this.tag, node);                                        // 364
  }                                                                              // 365
                                                                                 // 366
  return removed;                                                                // 367
};                                                                               // 368
                                                                                 // 369
LiveRange.prototype._insertEntries =                                             // 370
  function(node, startEnd, i, newRanges)                                         // 371
{                                                                                // 372
  // insert the new ranges and "adopt" them by setting node pointers             // 373
  var entries = node[this.tag][startEnd];                                        // 374
  Array.prototype.splice.apply(entries, [i, 0].concat(newRanges));               // 375
  for(var a=i; a < entries.length; a++) {                                        // 376
    if (startEnd) {                                                              // 377
      entries[a]._end = node;                                                    // 378
      entries[a]._endIndex = a;                                                  // 379
    } else {                                                                     // 380
      entries[a]._start = node;                                                  // 381
      entries[a]._startIndex = a;                                                // 382
    }                                                                            // 383
  }                                                                              // 384
};                                                                               // 385
                                                                                 // 386
// Replace the contents of this range with the provided                          // 387
// DocumentFragment. Returns the previous contents as a                          // 388
// DocumentFragment.                                                             // 389
//                                                                               // 390
// "The right thing happens" with child LiveRanges:                              // 391
// - If there were child LiveRanges inside us, they will end up in               // 392
//   the returned DocumentFragment.                                              // 393
// - If the input DocumentFragment has LiveRanges, they will become              // 394
//   our children.                                                               // 395
//                                                                               // 396
// It is illegal for newFrag to be empty.                                        // 397
LiveRange.prototype.replaceContents = function (newFrag) {                       // 398
  if (! newFrag.firstChild)                                                      // 399
    throw new Error("replaceContents requires non-empty fragment");              // 400
                                                                                 // 401
  return this.operate(function(oldStart, oldEnd) {                               // 402
    // Insert new fragment                                                       // 403
    oldStart.parentNode.insertBefore(newFrag, oldStart);                         // 404
                                                                                 // 405
    // Pull out departing fragment                                               // 406
    // Possible optimization: use W3C Ranges on browsers that support them       // 407
    var retFrag = oldStart.ownerDocument.createDocumentFragment();               // 408
    var walk = oldStart;                                                         // 409
    while (true) {                                                               // 410
      var next = walk.nextSibling;                                               // 411
      retFrag.appendChild(walk);                                                 // 412
      if (walk === oldEnd)                                                       // 413
        break;                                                                   // 414
      walk = next;                                                               // 415
      if (!walk)                                                                 // 416
        throw new Error("LiveRanges must begin and end on siblings in order");   // 417
    }                                                                            // 418
                                                                                 // 419
    return retFrag;                                                              // 420
  });                                                                            // 421
};                                                                               // 422
                                                                                 // 423
                                                                                 // 424
// Perform a user-specified DOM mutation on the contents of this range.          // 425
//                                                                               // 426
// `func` is called with two parameters, `oldStart` and `oldEnd`, equal          // 427
// to the original firstNode() and lastNode() of this range.  `func` is allowed  // 428
// to perform arbitrary operations on the sequence of nodes from `oldStart`      // 429
// to `oldEnd` and on child ranges of this range.  `func` may NOT call methods   // 430
// on this range itself or otherwise rely on the existence of this range and     // 431
// enclosing ranges.  `func` must leave at least one node to become the new      // 432
// contents of this range.                                                       // 433
//                                                                               // 434
// The return value of `func` is returned.                                       // 435
//                                                                               // 436
// This method is a generalization of replaceContents that works by              // 437
// temporarily removing this LiveRange from the DOM and restoring it after       // 438
// `func` has been called.                                                       // 439
LiveRange.prototype.operate = function (func) {                                  // 440
  // boundary nodes of departing fragment                                        // 441
  var oldStart = this._start;                                                    // 442
  var oldEnd = this._end;                                                        // 443
                                                                                 // 444
  // pull off outer liverange data                                               // 445
  var outerStarts =                                                              // 446
        this._removeEntries(oldStart, 0, 0, this._startIndex + 1);               // 447
  var outerEnds =                                                                // 448
        this._removeEntries(oldEnd, 1, this._endIndex);                          // 449
                                                                                 // 450
  var containerNode = oldStart.parentNode;                                       // 451
  var beforeNode = oldStart.previousSibling;                                     // 452
  var afterNode = oldEnd.nextSibling;                                            // 453
                                                                                 // 454
  var ret = null;                                                                // 455
                                                                                 // 456
  // perform user-specifiedDOM manipulation                                      // 457
  ret = func(oldStart, oldEnd);                                                  // 458
                                                                                 // 459
  // see what we've got...                                                       // 460
                                                                                 // 461
  var newStart =                                                                 // 462
        beforeNode ? beforeNode.nextSibling : containerNode.firstChild;          // 463
  var newEnd =                                                                   // 464
        afterNode ? afterNode.previousSibling : containerNode.lastChild;         // 465
                                                                                 // 466
  if (! newStart || newStart === afterNode) {                                    // 467
    throw new Error("Ranges must contain at least one element");                 // 468
  }                                                                              // 469
                                                                                 // 470
  // wrap endpoints if necessary                                                 // 471
  var newEndpoints = wrapEndpoints(newStart, newEnd);                            // 472
  newStart = this._ensureTag(newEndpoints[0]);                                   // 473
  newEnd = this._ensureTag(newEndpoints[1]);                                     // 474
                                                                                 // 475
  // put the outer liveranges back                                               // 476
                                                                                 // 477
  this._insertEntries(newStart, 0, 0, outerStarts);                              // 478
  this._insertEntries(newEnd, 1, newEnd[this.tag][1].length, outerEnds);         // 479
                                                                                 // 480
  return ret;                                                                    // 481
};                                                                               // 482
                                                                                 // 483
// Move all liverange data represented in the DOM from sourceNode to             // 484
// targetNode.  targetNode must be capable of receiving liverange tags           // 485
// (for example, a node that has been the first or last node of a liverange      // 486
// before; not a text node in IE).                                               // 487
//                                                                               // 488
// This is a low-level operation suitable for moving liveranges en masse         // 489
// from one DOM tree to another, where transplantTag is called on every          // 490
// pair of nodes such that targetNode takes the place of sourceNode.             // 491
LiveRange.transplantTag = function(tag, targetNode, sourceNode) {                // 492
                                                                                 // 493
  if (! sourceNode[tag])                                                         // 494
    return;                                                                      // 495
                                                                                 // 496
  // copy data pointer                                                           // 497
  targetNode[tag] = sourceNode[tag];                                             // 498
  sourceNode[tag] = null;                                                        // 499
                                                                                 // 500
  var starts = targetNode[tag][0];                                               // 501
  var ends = targetNode[tag][1];                                                 // 502
                                                                                 // 503
  // fix _start and _end pointers                                                // 504
  for(var i=0;i<starts.length;i++)                                               // 505
    starts[i]._start = targetNode;                                               // 506
  for(var i=0;i<ends.length;i++)                                                 // 507
    ends[i]._end = targetNode;                                                   // 508
};                                                                               // 509
                                                                                 // 510
// Takes two sibling nodes tgtStart and tgtEnd with no LiveRange data on them    // 511
// and a LiveRange srcRange in a separate DOM tree.  Transplants srcRange        // 512
// to span from tgtStart to tgtEnd, and also copies info about enclosing ranges  // 513
// starting on srcRange._start or ending on srcRange._end.  tgtStart and tgtEnd  // 514
// must be capable of receiving liverange tags (for example, nodes that have     // 515
// held liverange data in the past; not text nodes in IE).                       // 516
//                                                                               // 517
// This is a low-level operation suitable for moving liveranges en masse         // 518
// from one DOM tree to another.                                                 // 519
LiveRange.transplantRange = function(tgtStart, tgtEnd, srcRange) {               // 520
  srcRange._ensureTag(tgtStart);                                                 // 521
  if (tgtEnd !== tgtStart)                                                       // 522
    srcRange._ensureTag(tgtEnd);                                                 // 523
                                                                                 // 524
  srcRange._insertEntries(                                                       // 525
    tgtStart, 0, 0,                                                              // 526
    srcRange._start[srcRange.tag][0].slice(0, srcRange._startIndex + 1));        // 527
  srcRange._insertEntries(                                                       // 528
    tgtEnd, 1, 0,                                                                // 529
    srcRange._end[srcRange.tag][1].slice(srcRange._endIndex));                   // 530
};                                                                               // 531
                                                                                 // 532
// Inserts a DocumentFragment immediately before this range.                     // 533
// The new nodes are outside this range but inside all                           // 534
// enclosing ranges.                                                             // 535
LiveRange.prototype.insertBefore = function(frag) {                              // 536
  var fragStart = frag.firstChild;                                               // 537
                                                                                 // 538
  if (! fragStart) // empty frag                                                 // 539
    return;                                                                      // 540
                                                                                 // 541
  // insert into DOM                                                             // 542
  this._start.parentNode.insertBefore(frag, this._start);                        // 543
                                                                                 // 544
  // move starts of ranges that begin on this._start, but are                    // 545
  // outside this, to beginning of fragStart                                     // 546
  this._ensureTag(fragStart);                                                    // 547
  this._insertEntries(fragStart, 0, 0,                                           // 548
                       this._removeEntries(this._start, 0, 0,                    // 549
                                            this._startIndex));                  // 550
};                                                                               // 551
                                                                                 // 552
// Inserts a DocumentFragment immediately after this range.                      // 553
// The new nodes are outside this range but inside all                           // 554
// enclosing ranges.                                                             // 555
LiveRange.prototype.insertAfter = function(frag) {                               // 556
  var fragEnd = frag.lastChild;                                                  // 557
                                                                                 // 558
  if (! fragEnd) // empty frag                                                   // 559
    return;                                                                      // 560
                                                                                 // 561
  // insert into DOM                                                             // 562
  this._end.parentNode.insertBefore(frag, this._end.nextSibling);                // 563
                                                                                 // 564
  // move ends of ranges that end on this._end, but are                          // 565
  // outside this, to end of fragEnd                                             // 566
  this._ensureTag(fragEnd);                                                      // 567
  this._insertEntries(fragEnd, 1, fragEnd[this.tag][1].length,                   // 568
                       this._removeEntries(this._end, 1,                         // 569
                                            this._endIndex + 1));                // 570
};                                                                               // 571
                                                                                 // 572
// Extracts this range and its contents from the DOM and                         // 573
// puts it into a DocumentFragment, which is returned.                           // 574
// All nodes and ranges outside this range are properly                          // 575
// preserved.                                                                    // 576
//                                                                               // 577
// Because liveranges must contain at least one node,                            // 578
// it is illegal to perform `extract` if the immediately                         // 579
// enclosing range would become empty.  If this precondition                     // 580
// is violated, no action is taken and null is returned.                         // 581
LiveRange.prototype.extract = function() {                                       // 582
  if (this._startIndex > 0 &&                                                    // 583
      this._start[this.tag][0][this._startIndex - 1]._end === this._end) {       // 584
    // immediately enclosing range wraps same nodes, so can't extract because    // 585
    // it would empty it.                                                        // 586
    return null;                                                                 // 587
  }                                                                              // 588
                                                                                 // 589
  var before = this._start.previousSibling;                                      // 590
  var after = this._end.nextSibling;                                             // 591
  var parent = this._start.parentNode;                                           // 592
                                                                                 // 593
  if (this._startIndex > 0) {                                                    // 594
    // must be a later node where outer ranges that start here end;              // 595
    // move their starts to after                                                // 596
    this._ensureTag(after);                                                      // 597
    this._insertEntries(after, 0, 0,                                             // 598
                         this._removeEntries(this._start, 0, 0,                  // 599
                                              this._startIndex));                // 600
  }                                                                              // 601
                                                                                 // 602
  if (this._endIndex < this._end[this.tag][1].length - 1) {                      // 603
    // must be an earlier node where outer ranges that end here                  // 604
    // start; move their ends to before                                          // 605
    this._ensureTag(before);                                                     // 606
    this._insertEntries(before, 1, before[this.tag][1].length,                   // 607
                         this._removeEntries(this._end, 1,                       // 608
                                              this._endIndex + 1));              // 609
  }                                                                              // 610
                                                                                 // 611
  var result = document.createDocumentFragment();                                // 612
                                                                                 // 613
  for(var n;                                                                     // 614
      n = before ? before.nextSibling : parent.firstChild,                       // 615
      n && n !== after;)                                                         // 616
    result.appendChild(n);                                                       // 617
                                                                                 // 618
  return result;                                                                 // 619
};                                                                               // 620
                                                                                 // 621
// Find the immediately enclosing parent range of this range, or                 // 622
// null if this range has no enclosing ranges.                                   // 623
//                                                                               // 624
// If `withSameContainer` is true, we stop looking when we reach                 // 625
// this range's container node (the parent of its endpoints) and                 // 626
// only return liveranges whose first and last nodes are siblings                // 627
// of this one's.                                                                // 628
LiveRange.prototype.findParent = function(withSameContainer) {                   // 629
  var result = enclosingRangeSearch(this.tag, this._end, this._endIndex);        // 630
  if (result)                                                                    // 631
    return result;                                                               // 632
                                                                                 // 633
  if (withSameContainer)                                                         // 634
    return null;                                                                 // 635
                                                                                 // 636
  return LiveRange.findRange(this.tag, this.containerNode());                    // 637
};                                                                               // 638
                                                                                 // 639
// Find the nearest enclosing range containing `node`, if any.                   // 640
LiveRange.findRange = function(tag, node) {                                      // 641
  var result = enclosingRangeSearch(tag, node);                                  // 642
  if (result)                                                                    // 643
    return result;                                                               // 644
                                                                                 // 645
  if (! node.parentNode)                                                         // 646
    return null;                                                                 // 647
                                                                                 // 648
  return LiveRange.findRange(tag, node.parentNode);                              // 649
};                                                                               // 650
                                                                                 // 651
var enclosingRangeSearch = function(tag, end, endIndex) {                        // 652
  // Search for an enclosing range, at the same level,                           // 653
  // starting at node `end` or after the range whose                             // 654
  // position in the end array of `end` is `endIndex`.                           // 655
  // The search works by scanning forwards for range ends                        // 656
  // while skipping over ranges whose starts we encounter.                       // 657
                                                                                 // 658
  if (typeof endIndex === "undefined")                                           // 659
    endIndex = -1;                                                               // 660
                                                                                 // 661
  if (end[tag] && endIndex + 1 < end[tag][1].length) {                           // 662
    // immediately enclosing range ends at same node as this one                 // 663
    return end[tag][1][endIndex + 1];                                            // 664
  }                                                                              // 665
                                                                                 // 666
  var node = end.nextSibling;                                                    // 667
  while (node) {                                                                 // 668
    var endIndex = 0;                                                            // 669
    var startData = node[tag] && node[tag][0];                                   // 670
    if (startData && startData.length) {                                         // 671
      // skip over sibling of this range                                         // 672
      var r = startData[0];                                                      // 673
      node = r._end;                                                             // 674
      endIndex = r._endIndex + 1;                                                // 675
    }                                                                            // 676
    if (node[tag] && endIndex < node[tag][1].length)                             // 677
      return node[tag][1][endIndex];                                             // 678
    node = node.nextSibling;                                                     // 679
  }                                                                              // 680
                                                                                 // 681
  return null;                                                                   // 682
};                                                                               // 683
                                                                                 // 684
///////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.liverange = {
  LiveRange: LiveRange
};

})();

//# sourceMappingURL=b3097d72d458e645fd4f0021c8ff5189abe8d98a.map
