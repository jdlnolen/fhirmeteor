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
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var JSON = Package.json.JSON;
var _ = Package.underscore._;
var LocalCollection = Package.minimongo.LocalCollection;
var Log = Package.logging.Log;
var DDP = Package.livedata.DDP;
var Deps = Package.deps.Deps;
var check = Package.check.check;
var Match = Package.check.Match;

/* Package-scope variables */
var LocalCollectionDriver;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/mongo-livedata/local_collection_driver.js                                        //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
LocalCollectionDriver = function () {                                                        // 1
  var self = this;                                                                           // 2
  self.noConnCollections = {};                                                               // 3
};                                                                                           // 4
                                                                                             // 5
var ensureCollection = function (name, collections) {                                        // 6
  if (!(name in collections))                                                                // 7
    collections[name] = new LocalCollection(name);                                           // 8
  return collections[name];                                                                  // 9
};                                                                                           // 10
                                                                                             // 11
_.extend(LocalCollectionDriver.prototype, {                                                  // 12
  open: function (name, conn) {                                                              // 13
    var self = this;                                                                         // 14
    if (!name)                                                                               // 15
      return new LocalCollection;                                                            // 16
    if (! conn) {                                                                            // 17
      return ensureCollection(name, self.noConnCollections);                                 // 18
    }                                                                                        // 19
    if (! conn._mongo_livedata_collections)                                                  // 20
      conn._mongo_livedata_collections = {};                                                 // 21
    // XXX is there a way to keep track of a connection's collections without                // 22
    // dangling it off the connection object?                                                // 23
    return ensureCollection(name, conn._mongo_livedata_collections);                         // 24
  }                                                                                          // 25
});                                                                                          // 26
                                                                                             // 27
// singleton                                                                                 // 28
LocalCollectionDriver = new LocalCollectionDriver;                                           // 29
                                                                                             // 30
///////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/mongo-livedata/collection.js                                                     //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
// options.connection, if given, is a LivedataClient or LivedataServer                       // 1
// XXX presently there is no way to destroy/clean up a Collection                            // 2
                                                                                             // 3
Meteor.Collection = function (name, options) {                                               // 4
  var self = this;                                                                           // 5
  if (! (self instanceof Meteor.Collection))                                                 // 6
    throw new Error('use "new" to construct a Meteor.Collection');                           // 7
  if (options && options.methods) {                                                          // 8
    // Backwards compatibility hack with original signature (which passed                    // 9
    // "connection" directly instead of in options. (Connections must have a "methods"       // 10
    // method.)                                                                              // 11
    // XXX remove before 1.0                                                                 // 12
    options = {connection: options};                                                         // 13
  }                                                                                          // 14
  // Backwards compatibility: "connection" used to be called "manager".                      // 15
  if (options && options.manager && !options.connection) {                                   // 16
    options.connection = options.manager;                                                    // 17
  }                                                                                          // 18
  options = _.extend({                                                                       // 19
    connection: undefined,                                                                   // 20
    idGeneration: 'STRING',                                                                  // 21
    transform: null,                                                                         // 22
    _driver: undefined,                                                                      // 23
    _preventAutopublish: false                                                               // 24
  }, options);                                                                               // 25
                                                                                             // 26
  switch (options.idGeneration) {                                                            // 27
  case 'MONGO':                                                                              // 28
    self._makeNewID = function () {                                                          // 29
      return new Meteor.Collection.ObjectID();                                               // 30
    };                                                                                       // 31
    break;                                                                                   // 32
  case 'STRING':                                                                             // 33
  default:                                                                                   // 34
    self._makeNewID = function () {                                                          // 35
      return Random.id();                                                                    // 36
    };                                                                                       // 37
    break;                                                                                   // 38
  }                                                                                          // 39
                                                                                             // 40
  if (options.transform)                                                                     // 41
    self._transform = Deps._makeNonreactive(options.transform);                              // 42
  else                                                                                       // 43
    self._transform = null;                                                                  // 44
                                                                                             // 45
  if (!name && (name !== null)) {                                                            // 46
    Meteor._debug("Warning: creating anonymous collection. It will not be " +                // 47
                  "saved or synchronized over the network. (Pass null for " +                // 48
                  "the collection name to turn off this warning.)");                         // 49
  }                                                                                          // 50
                                                                                             // 51
  if (! name || options.connection === null)                                                 // 52
    // note: nameless collections never have a connection                                    // 53
    self._connection = null;                                                                 // 54
  else if (options.connection)                                                               // 55
    self._connection = options.connection;                                                   // 56
  else if (Meteor.isClient)                                                                  // 57
    self._connection = Meteor.connection;                                                    // 58
  else                                                                                       // 59
    self._connection = Meteor.server;                                                        // 60
                                                                                             // 61
  if (!options._driver) {                                                                    // 62
    if (name && self._connection === Meteor.server &&                                        // 63
        typeof MongoInternals !== "undefined" &&                                             // 64
        MongoInternals.defaultRemoteCollectionDriver) {                                      // 65
      options._driver = MongoInternals.defaultRemoteCollectionDriver();                      // 66
    } else {                                                                                 // 67
      options._driver = LocalCollectionDriver;                                               // 68
    }                                                                                        // 69
  }                                                                                          // 70
                                                                                             // 71
  self._collection = options._driver.open(name, self._connection);                           // 72
  self._name = name;                                                                         // 73
                                                                                             // 74
  if (self._connection && self._connection.registerStore) {                                  // 75
    // OK, we're going to be a slave, replicating some remote                                // 76
    // database, except possibly with some temporary divergence while                        // 77
    // we have unacknowledged RPC's.                                                         // 78
    var ok = self._connection.registerStore(name, {                                          // 79
      // Called at the beginning of a batch of updates. batchSize is the number              // 80
      // of update calls to expect.                                                          // 81
      //                                                                                     // 82
      // XXX This interface is pretty janky. reset probably ought to go back to              // 83
      // being its own function, and callers shouldn't have to calculate                     // 84
      // batchSize. The optimization of not calling pause/remove should be                   // 85
      // delayed until later: the first call to update() should buffer its                   // 86
      // message, and then we can either directly apply it at endUpdate time if              // 87
      // it was the only update, or do pauseObservers/apply/apply at the next                // 88
      // update() if there's another one.                                                    // 89
      beginUpdate: function (batchSize, reset) {                                             // 90
        // pause observers so users don't see flicker when updating several                  // 91
        // objects at once (including the post-reconnect reset-and-reapply                   // 92
        // stage), and so that a re-sorting of a query can take advantage of the             // 93
        // full _diffQuery moved calculation instead of applying change one at a             // 94
        // time.                                                                             // 95
        if (batchSize > 1 || reset)                                                          // 96
          self._collection.pauseObservers();                                                 // 97
                                                                                             // 98
        if (reset)                                                                           // 99
          self._collection.remove({});                                                       // 100
      },                                                                                     // 101
                                                                                             // 102
      // Apply an update.                                                                    // 103
      // XXX better specify this interface (not in terms of a wire message)?                 // 104
      update: function (msg) {                                                               // 105
        var mongoId = LocalCollection._idParse(msg.id);                                      // 106
        var doc = self._collection.findOne(mongoId);                                         // 107
                                                                                             // 108
        // Is this a "replace the whole doc" message coming from the quiescence              // 109
        // of method writes to an object? (Note that 'undefined' is a valid                  // 110
        // value meaning "remove it".)                                                       // 111
        if (msg.msg === 'replace') {                                                         // 112
          var replace = msg.replace;                                                         // 113
          if (!replace) {                                                                    // 114
            if (doc)                                                                         // 115
              self._collection.remove(mongoId);                                              // 116
          } else if (!doc) {                                                                 // 117
            self._collection.insert(replace);                                                // 118
          } else {                                                                           // 119
            // XXX check that replace has no $ ops                                           // 120
            self._collection.update(mongoId, replace);                                       // 121
          }                                                                                  // 122
          return;                                                                            // 123
        } else if (msg.msg === 'added') {                                                    // 124
          if (doc) {                                                                         // 125
            throw new Error("Expected not to find a document already present for an add");   // 126
          }                                                                                  // 127
          self._collection.insert(_.extend({_id: mongoId}, msg.fields));                     // 128
        } else if (msg.msg === 'removed') {                                                  // 129
          if (!doc)                                                                          // 130
            throw new Error("Expected to find a document already present for removed");      // 131
          self._collection.remove(mongoId);                                                  // 132
        } else if (msg.msg === 'changed') {                                                  // 133
          if (!doc)                                                                          // 134
            throw new Error("Expected to find a document to change");                        // 135
          if (!_.isEmpty(msg.fields)) {                                                      // 136
            var modifier = {};                                                               // 137
            _.each(msg.fields, function (value, key) {                                       // 138
              if (value === undefined) {                                                     // 139
                if (!modifier.$unset)                                                        // 140
                  modifier.$unset = {};                                                      // 141
                modifier.$unset[key] = 1;                                                    // 142
              } else {                                                                       // 143
                if (!modifier.$set)                                                          // 144
                  modifier.$set = {};                                                        // 145
                modifier.$set[key] = value;                                                  // 146
              }                                                                              // 147
            });                                                                              // 148
            self._collection.update(mongoId, modifier);                                      // 149
          }                                                                                  // 150
        } else {                                                                             // 151
          throw new Error("I don't know how to deal with this message");                     // 152
        }                                                                                    // 153
                                                                                             // 154
      },                                                                                     // 155
                                                                                             // 156
      // Called at the end of a batch of updates.                                            // 157
      endUpdate: function () {                                                               // 158
        self._collection.resumeObservers();                                                  // 159
      },                                                                                     // 160
                                                                                             // 161
      // Called around method stub invocations to capture the original versions              // 162
      // of modified documents.                                                              // 163
      saveOriginals: function () {                                                           // 164
        self._collection.saveOriginals();                                                    // 165
      },                                                                                     // 166
      retrieveOriginals: function () {                                                       // 167
        return self._collection.retrieveOriginals();                                         // 168
      }                                                                                      // 169
    });                                                                                      // 170
                                                                                             // 171
    if (!ok)                                                                                 // 172
      throw new Error("There is already a collection named '" + name + "'");                 // 173
  }                                                                                          // 174
                                                                                             // 175
  self._defineMutationMethods();                                                             // 176
                                                                                             // 177
  // autopublish                                                                             // 178
  if (Package.autopublish && !options._preventAutopublish && self._connection                // 179
      && self._connection.publish) {                                                         // 180
    self._connection.publish(null, function () {                                             // 181
      return self.find();                                                                    // 182
    }, {is_auto: true});                                                                     // 183
  }                                                                                          // 184
};                                                                                           // 185
                                                                                             // 186
///                                                                                          // 187
/// Main collection API                                                                      // 188
///                                                                                          // 189
                                                                                             // 190
                                                                                             // 191
_.extend(Meteor.Collection.prototype, {                                                      // 192
                                                                                             // 193
  _getFindSelector: function (args) {                                                        // 194
    if (args.length == 0)                                                                    // 195
      return {};                                                                             // 196
    else                                                                                     // 197
      return args[0];                                                                        // 198
  },                                                                                         // 199
                                                                                             // 200
  _getFindOptions: function (args) {                                                         // 201
    var self = this;                                                                         // 202
    if (args.length < 2) {                                                                   // 203
      return { transform: self._transform };                                                 // 204
    } else {                                                                                 // 205
      return _.extend({                                                                      // 206
        transform: self._transform                                                           // 207
      }, args[1]);                                                                           // 208
    }                                                                                        // 209
  },                                                                                         // 210
                                                                                             // 211
  find: function (/* selector, options */) {                                                 // 212
    // Collection.find() (return all docs) behaves differently                               // 213
    // from Collection.find(undefined) (return 0 docs).  so be                               // 214
    // careful about the length of arguments.                                                // 215
    var self = this;                                                                         // 216
    var argArray = _.toArray(arguments);                                                     // 217
    return self._collection.find(self._getFindSelector(argArray),                            // 218
                                 self._getFindOptions(argArray));                            // 219
  },                                                                                         // 220
                                                                                             // 221
  findOne: function (/* selector, options */) {                                              // 222
    var self = this;                                                                         // 223
    var argArray = _.toArray(arguments);                                                     // 224
    return self._collection.findOne(self._getFindSelector(argArray),                         // 225
                                    self._getFindOptions(argArray));                         // 226
  }                                                                                          // 227
                                                                                             // 228
});                                                                                          // 229
                                                                                             // 230
Meteor.Collection._publishCursor = function (cursor, sub, collection) {                      // 231
  var observeHandle = cursor.observeChanges({                                                // 232
    added: function (id, fields) {                                                           // 233
      sub.added(collection, id, fields);                                                     // 234
    },                                                                                       // 235
    changed: function (id, fields) {                                                         // 236
      sub.changed(collection, id, fields);                                                   // 237
    },                                                                                       // 238
    removed: function (id) {                                                                 // 239
      sub.removed(collection, id);                                                           // 240
    }                                                                                        // 241
  });                                                                                        // 242
                                                                                             // 243
  // We don't call sub.ready() here: it gets called in livedata_server, after                // 244
  // possibly calling _publishCursor on multiple returned cursors.                           // 245
                                                                                             // 246
  // register stop callback (expects lambda w/ no args).                                     // 247
  sub.onStop(function () {observeHandle.stop();});                                           // 248
};                                                                                           // 249
                                                                                             // 250
// protect against dangerous selectors.  falsey and {_id: falsey} are both                   // 251
// likely programmer error, and not what you want, particularly for destructive              // 252
// operations.  JS regexps don't serialize over DDP but can be trivially                     // 253
// replaced by $regex.                                                                       // 254
Meteor.Collection._rewriteSelector = function (selector) {                                   // 255
  // shorthand -- scalars match _id                                                          // 256
  if (LocalCollection._selectorIsId(selector))                                               // 257
    selector = {_id: selector};                                                              // 258
                                                                                             // 259
  if (!selector || (('_id' in selector) && !selector._id))                                   // 260
    // can't match anything                                                                  // 261
    return {_id: Random.id()};                                                               // 262
                                                                                             // 263
  var ret = {};                                                                              // 264
  _.each(selector, function (value, key) {                                                   // 265
    // Mongo supports both {field: /foo/} and {field: {$regex: /foo/}}                       // 266
    if (value instanceof RegExp) {                                                           // 267
      ret[key] = convertRegexpToMongoSelector(value);                                        // 268
    } else if (value && value.$regex instanceof RegExp) {                                    // 269
      ret[key] = convertRegexpToMongoSelector(value.$regex);                                 // 270
      // if value is {$regex: /foo/, $options: ...} then $options                            // 271
      // override the ones set on $regex.                                                    // 272
      if (value.$options !== undefined)                                                      // 273
        ret[key].$options = value.$options;                                                  // 274
    }                                                                                        // 275
    else if (_.contains(['$or','$and','$nor'], key)) {                                       // 276
      // Translate lower levels of $and/$or/$nor                                             // 277
      ret[key] = _.map(value, function (v) {                                                 // 278
        return Meteor.Collection._rewriteSelector(v);                                        // 279
      });                                                                                    // 280
    }                                                                                        // 281
    else {                                                                                   // 282
      ret[key] = value;                                                                      // 283
    }                                                                                        // 284
  });                                                                                        // 285
  return ret;                                                                                // 286
};                                                                                           // 287
                                                                                             // 288
// convert a JS RegExp object to a Mongo {$regex: ..., $options: ...}                        // 289
// selector                                                                                  // 290
var convertRegexpToMongoSelector = function (regexp) {                                       // 291
  check(regexp, RegExp); // safety belt                                                      // 292
                                                                                             // 293
  var selector = {$regex: regexp.source};                                                    // 294
  var regexOptions = '';                                                                     // 295
  // JS RegExp objects support 'i', 'm', and 'g'. Mongo regex $options                       // 296
  // support 'i', 'm', 'x', and 's'. So we support 'i' and 'm' here.                         // 297
  if (regexp.ignoreCase)                                                                     // 298
    regexOptions += 'i';                                                                     // 299
  if (regexp.multiline)                                                                      // 300
    regexOptions += 'm';                                                                     // 301
  if (regexOptions)                                                                          // 302
    selector.$options = regexOptions;                                                        // 303
                                                                                             // 304
  return selector;                                                                           // 305
};                                                                                           // 306
                                                                                             // 307
var throwIfSelectorIsNotId = function (selector, methodName) {                               // 308
  if (!LocalCollection._selectorIsIdPerhapsAsObject(selector)) {                             // 309
    throw new Meteor.Error(                                                                  // 310
      403, "Not permitted. Untrusted code may only " + methodName +                          // 311
        " documents by ID.");                                                                // 312
  }                                                                                          // 313
};                                                                                           // 314
                                                                                             // 315
// 'insert' immediately returns the inserted document's new _id.  The                        // 316
// others return nothing.                                                                    // 317
//                                                                                           // 318
// Otherwise, the semantics are exactly like other methods: they take                        // 319
// a callback as an optional last argument; if no callback is                                // 320
// provided, they block until the operation is complete, and throw an                        // 321
// exception if it fails; if a callback is provided, then they don't                         // 322
// necessarily block, and they call the callback when they finish with                       // 323
// error and result arguments.  (The insert method provides the                              // 324
// document ID as its result; update and remove don't provide a result.)                     // 325
//                                                                                           // 326
// On the client, blocking is impossible, so if a callback                                   // 327
// isn't provided, they just return immediately and any error                                // 328
// information is lost.                                                                      // 329
//                                                                                           // 330
// There's one more tweak. On the client, if you don't provide a                             // 331
// callback, then if there is an error, a message will be logged with                        // 332
// Meteor._debug.                                                                            // 333
//                                                                                           // 334
// The intent (though this is actually determined by the underlying                          // 335
// drivers) is that the operations should be done synchronously, not                         // 336
// generating their result until the database has acknowledged                               // 337
// them. In the future maybe we should provide a flag to turn this                           // 338
// off.                                                                                      // 339
_.each(["insert", "update", "remove"], function (name) {                                     // 340
  Meteor.Collection.prototype[name] = function (/* arguments */) {                           // 341
    var self = this;                                                                         // 342
    var args = _.toArray(arguments);                                                         // 343
    var callback;                                                                            // 344
    var ret;                                                                                 // 345
                                                                                             // 346
    if (args.length && args[args.length - 1] instanceof Function)                            // 347
      callback = args.pop();                                                                 // 348
                                                                                             // 349
    if (Meteor.isClient && !callback) {                                                      // 350
      // Client can't block, so it can't report errors by exception,                         // 351
      // only by callback. If they forget the callback, give them a                          // 352
      // default one that logs the error, so they aren't totally                             // 353
      // baffled if their writes don't work because their database is                        // 354
      // down.                                                                               // 355
      callback = function (err) {                                                            // 356
        if (err)                                                                             // 357
          Meteor._debug(name + " failed: " + (err.reason || err.stack));                     // 358
      };                                                                                     // 359
    }                                                                                        // 360
                                                                                             // 361
    if (name === "insert") {                                                                 // 362
      if (!args.length)                                                                      // 363
        throw new Error("insert requires an argument");                                      // 364
      // shallow-copy the document and generate an ID                                        // 365
      args[0] = _.extend({}, args[0]);                                                       // 366
      if ('_id' in args[0]) {                                                                // 367
        ret = args[0]._id;                                                                   // 368
        if (!(typeof ret === 'string'                                                        // 369
              || ret instanceof Meteor.Collection.ObjectID))                                 // 370
          throw new Error("Meteor requires document _id fields to be strings or ObjectIDs"); // 371
      } else {                                                                               // 372
        ret = args[0]._id = self._makeNewID();                                               // 373
      }                                                                                      // 374
    } else {                                                                                 // 375
      args[0] = Meteor.Collection._rewriteSelector(args[0]);                                 // 376
    }                                                                                        // 377
                                                                                             // 378
    var wrappedCallback;                                                                     // 379
    if (callback) {                                                                          // 380
      wrappedCallback = function (error, result) {                                           // 381
        callback(error, !error && ret);                                                      // 382
      };                                                                                     // 383
    }                                                                                        // 384
                                                                                             // 385
    if (self._connection && self._connection !== Meteor.server) {                            // 386
      // just remote to another endpoint, propagate return value or                          // 387
      // exception.                                                                          // 388
                                                                                             // 389
      var enclosing = DDP._CurrentInvocation.get();                                          // 390
      var alreadyInSimulation = enclosing && enclosing.isSimulation;                         // 391
      if (!alreadyInSimulation && name !== "insert") {                                       // 392
        // If we're about to actually send an RPC, we should throw an error if               // 393
        // this is a non-ID selector, because the mutation methods only allow                // 394
        // single-ID selectors. (If we don't throw here, we'll see flicker.)                 // 395
        throwIfSelectorIsNotId(args[0], name);                                               // 396
      }                                                                                      // 397
                                                                                             // 398
      self._connection.apply(self._prefix + name, args, wrappedCallback);                    // 399
                                                                                             // 400
    } else {                                                                                 // 401
      // it's my collection.  descend into the collection object                             // 402
      // and propagate any exception.                                                        // 403
      args.push(wrappedCallback);                                                            // 404
      try {                                                                                  // 405
        self._collection[name].apply(self._collection, args);                                // 406
      } catch (e) {                                                                          // 407
        if (callback) {                                                                      // 408
          callback(e);                                                                       // 409
          return null;                                                                       // 410
        }                                                                                    // 411
        throw e;                                                                             // 412
      }                                                                                      // 413
    }                                                                                        // 414
                                                                                             // 415
    // both sync and async, unless we threw an exception, return ret                         // 416
    // (new document ID for insert, undefined otherwise).                                    // 417
    return ret;                                                                              // 418
  };                                                                                         // 419
});                                                                                          // 420
                                                                                             // 421
// We'll actually design an index API later. For now, we just pass through to                // 422
// Mongo's, but make it synchronous.                                                         // 423
Meteor.Collection.prototype._ensureIndex = function (index, options) {                       // 424
  var self = this;                                                                           // 425
  if (!self._collection._ensureIndex)                                                        // 426
    throw new Error("Can only call _ensureIndex on server collections");                     // 427
  self._collection._ensureIndex(index, options);                                             // 428
};                                                                                           // 429
Meteor.Collection.prototype._dropIndex = function (index) {                                  // 430
  var self = this;                                                                           // 431
  if (!self._collection._dropIndex)                                                          // 432
    throw new Error("Can only call _dropIndex on server collections");                       // 433
  self._collection._dropIndex(index);                                                        // 434
};                                                                                           // 435
Meteor.Collection.prototype._createCappedCollection = function (byteSize) {                  // 436
  var self = this;                                                                           // 437
  if (!self._collection._createCappedCollection)                                             // 438
    throw new Error("Can only call _createCappedCollection on server collections");          // 439
  self._collection._createCappedCollection(byteSize);                                        // 440
};                                                                                           // 441
                                                                                             // 442
Meteor.Collection.ObjectID = LocalCollection._ObjectID;                                      // 443
                                                                                             // 444
///                                                                                          // 445
/// Remote methods and access control.                                                       // 446
///                                                                                          // 447
                                                                                             // 448
// Restrict default mutators on collection. allow() and deny() take the                      // 449
// same options:                                                                             // 450
//                                                                                           // 451
// options.insert {Function(userId, doc)}                                                    // 452
//   return true to allow/deny adding this document                                          // 453
//                                                                                           // 454
// options.update {Function(userId, docs, fields, modifier)}                                 // 455
//   return true to allow/deny updating these documents.                                     // 456
//   `fields` is passed as an array of fields that are to be modified                        // 457
//                                                                                           // 458
// options.remove {Function(userId, docs)}                                                   // 459
//   return true to allow/deny removing these documents                                      // 460
//                                                                                           // 461
// options.fetch {Array}                                                                     // 462
//   Fields to fetch for these validators. If any call to allow or deny                      // 463
//   does not have this option then all fields are loaded.                                   // 464
//                                                                                           // 465
// allow and deny can be called multiple times. The validators are                           // 466
// evaluated as follows:                                                                     // 467
// - If neither deny() nor allow() has been called on the collection,                        // 468
//   then the request is allowed if and only if the "insecure" smart                         // 469
//   package is in use.                                                                      // 470
// - Otherwise, if any deny() function returns true, the request is denied.                  // 471
// - Otherwise, if any allow() function returns true, the request is allowed.                // 472
// - Otherwise, the request is denied.                                                       // 473
//                                                                                           // 474
// Meteor may call your deny() and allow() functions in any order, and may not               // 475
// call all of them if it is able to make a decision without calling them all                // 476
// (so don't include side effects).                                                          // 477
                                                                                             // 478
(function () {                                                                               // 479
  var addValidator = function(allowOrDeny, options) {                                        // 480
    // validate keys                                                                         // 481
    var VALID_KEYS = ['insert', 'update', 'remove', 'fetch', 'transform'];                   // 482
    _.each(_.keys(options), function (key) {                                                 // 483
      if (!_.contains(VALID_KEYS, key))                                                      // 484
        throw new Error(allowOrDeny + ": Invalid key: " + key);                              // 485
    });                                                                                      // 486
                                                                                             // 487
    var self = this;                                                                         // 488
    self._restricted = true;                                                                 // 489
                                                                                             // 490
    _.each(['insert', 'update', 'remove'], function (name) {                                 // 491
      if (options[name]) {                                                                   // 492
        if (!(options[name] instanceof Function)) {                                          // 493
          throw new Error(allowOrDeny + ": Value for `" + name + "` must be a function");    // 494
        }                                                                                    // 495
        if (self._transform)                                                                 // 496
          options[name].transform = self._transform;                                         // 497
        if (options.transform)                                                               // 498
          options[name].transform = Deps._makeNonreactive(options.transform);                // 499
        self._validators[name][allowOrDeny].push(options[name]);                             // 500
      }                                                                                      // 501
    });                                                                                      // 502
                                                                                             // 503
    // Only update the fetch fields if we're passed things that affect                       // 504
    // fetching. This way allow({}) and allow({insert: f}) don't result in                   // 505
    // setting fetchAllFields                                                                // 506
    if (options.update || options.remove || options.fetch) {                                 // 507
      if (options.fetch && !(options.fetch instanceof Array)) {                              // 508
        throw new Error(allowOrDeny + ": Value for `fetch` must be an array");               // 509
      }                                                                                      // 510
      self._updateFetch(options.fetch);                                                      // 511
    }                                                                                        // 512
  };                                                                                         // 513
                                                                                             // 514
  Meteor.Collection.prototype.allow = function(options) {                                    // 515
    addValidator.call(this, 'allow', options);                                               // 516
  };                                                                                         // 517
  Meteor.Collection.prototype.deny = function(options) {                                     // 518
    addValidator.call(this, 'deny', options);                                                // 519
  };                                                                                         // 520
})();                                                                                        // 521
                                                                                             // 522
                                                                                             // 523
Meteor.Collection.prototype._defineMutationMethods = function() {                            // 524
  var self = this;                                                                           // 525
                                                                                             // 526
  // set to true once we call any allow or deny methods. If true, use                        // 527
  // allow/deny semantics. If false, use insecure mode semantics.                            // 528
  self._restricted = false;                                                                  // 529
                                                                                             // 530
  // Insecure mode (default to allowing writes). Defaults to 'undefined' which               // 531
  // means insecure iff the insecure package is loaded. This property can be                 // 532
  // overriden by tests or packages wishing to change insecure mode behavior of              // 533
  // their collections.                                                                      // 534
  self._insecure = undefined;                                                                // 535
                                                                                             // 536
  self._validators = {                                                                       // 537
    insert: {allow: [], deny: []},                                                           // 538
    update: {allow: [], deny: []},                                                           // 539
    remove: {allow: [], deny: []},                                                           // 540
    fetch: [],                                                                               // 541
    fetchAllFields: false                                                                    // 542
  };                                                                                         // 543
                                                                                             // 544
  if (!self._name)                                                                           // 545
    return; // anonymous collection                                                          // 546
                                                                                             // 547
  // XXX Think about method namespacing. Maybe methods should be                             // 548
  // "Meteor:Mongo:insert/NAME"?                                                             // 549
  self._prefix = '/' + self._name + '/';                                                     // 550
                                                                                             // 551
  // mutation methods                                                                        // 552
  if (self._connection) {                                                                    // 553
    var m = {};                                                                              // 554
                                                                                             // 555
    _.each(['insert', 'update', 'remove'], function (method) {                               // 556
      m[self._prefix + method] = function (/* ... */) {                                      // 557
        // All the methods do their own validation, instead of using check().                // 558
        check(arguments, [Match.Any]);                                                       // 559
        try {                                                                                // 560
          if (this.isSimulation) {                                                           // 561
                                                                                             // 562
            // In a client simulation, you can do any mutation (even with a                  // 563
            // complex selector).                                                            // 564
            self._collection[method].apply(                                                  // 565
              self._collection, _.toArray(arguments));                                       // 566
            return;                                                                          // 567
          }                                                                                  // 568
                                                                                             // 569
          // This is the server receiving a method call from the client. We                  // 570
          // don't allow arbitrary selectors in mutations from the client: only              // 571
          // single-ID selectors.                                                            // 572
          if (method !== 'insert')                                                           // 573
            throwIfSelectorIsNotId(arguments[0], method);                                    // 574
                                                                                             // 575
          if (self._restricted) {                                                            // 576
            // short circuit if there is no way it will pass.                                // 577
            if (self._validators[method].allow.length === 0) {                               // 578
              throw new Meteor.Error(                                                        // 579
                403, "Access denied. No allow validators set on restricted " +               // 580
                  "collection for method '" + method + "'.");                                // 581
            }                                                                                // 582
                                                                                             // 583
            var validatedMethodName =                                                        // 584
                  '_validated' + method.charAt(0).toUpperCase() + method.slice(1);           // 585
            var argsWithUserId = [this.userId].concat(_.toArray(arguments));                 // 586
            self[validatedMethodName].apply(self, argsWithUserId);                           // 587
          } else if (self._isInsecure()) {                                                   // 588
            // In insecure mode, allow any mutation (with a simple selector).                // 589
            self._collection[method].apply(self._collection,                                 // 590
                                           _.toArray(arguments));                            // 591
          } else {                                                                           // 592
            // In secure mode, if we haven't called allow or deny, then nothing              // 593
            // is permitted.                                                                 // 594
            throw new Meteor.Error(403, "Access denied");                                    // 595
          }                                                                                  // 596
        } catch (e) {                                                                        // 597
          if (e.name === 'MongoError' || e.name === 'MinimongoError') {                      // 598
            throw new Meteor.Error(409, e.toString());                                       // 599
          } else {                                                                           // 600
            throw e;                                                                         // 601
          }                                                                                  // 602
        }                                                                                    // 603
      };                                                                                     // 604
    });                                                                                      // 605
    // Minimongo on the server gets no stubs; instead, by default                            // 606
    // it wait()s until its result is ready, yielding.                                       // 607
    // This matches the behavior of macromongo on the server better.                         // 608
    if (Meteor.isClient || self._connection === Meteor.server)                               // 609
      self._connection.methods(m);                                                           // 610
  }                                                                                          // 611
};                                                                                           // 612
                                                                                             // 613
                                                                                             // 614
Meteor.Collection.prototype._updateFetch = function (fields) {                               // 615
  var self = this;                                                                           // 616
                                                                                             // 617
  if (!self._validators.fetchAllFields) {                                                    // 618
    if (fields) {                                                                            // 619
      self._validators.fetch = _.union(self._validators.fetch, fields);                      // 620
    } else {                                                                                 // 621
      self._validators.fetchAllFields = true;                                                // 622
      // clear fetch just to make sure we don't accidentally read it                         // 623
      self._validators.fetch = null;                                                         // 624
    }                                                                                        // 625
  }                                                                                          // 626
};                                                                                           // 627
                                                                                             // 628
Meteor.Collection.prototype._isInsecure = function () {                                      // 629
  var self = this;                                                                           // 630
  if (self._insecure === undefined)                                                          // 631
    return !!Package.insecure;                                                               // 632
  return self._insecure;                                                                     // 633
};                                                                                           // 634
                                                                                             // 635
var docToValidate = function (validator, doc) {                                              // 636
  var ret = doc;                                                                             // 637
  if (validator.transform)                                                                   // 638
    ret = validator.transform(EJSON.clone(doc));                                             // 639
  return ret;                                                                                // 640
};                                                                                           // 641
                                                                                             // 642
Meteor.Collection.prototype._validatedInsert = function(userId, doc) {                       // 643
  var self = this;                                                                           // 644
                                                                                             // 645
  // call user validators.                                                                   // 646
  // Any deny returns true means denied.                                                     // 647
  if (_.any(self._validators.insert.deny, function(validator) {                              // 648
    return validator(userId, docToValidate(validator, doc));                                 // 649
  })) {                                                                                      // 650
    throw new Meteor.Error(403, "Access denied");                                            // 651
  }                                                                                          // 652
  // Any allow returns true means proceed. Throw error if they all fail.                     // 653
  if (_.all(self._validators.insert.allow, function(validator) {                             // 654
    return !validator(userId, docToValidate(validator, doc));                                // 655
  })) {                                                                                      // 656
    throw new Meteor.Error(403, "Access denied");                                            // 657
  }                                                                                          // 658
                                                                                             // 659
  self._collection.insert.call(self._collection, doc);                                       // 660
};                                                                                           // 661
                                                                                             // 662
var transformDoc = function (validator, doc) {                                               // 663
  if (validator.transform)                                                                   // 664
    return validator.transform(doc);                                                         // 665
  return doc;                                                                                // 666
};                                                                                           // 667
                                                                                             // 668
// Simulate a mongo `update` operation while validating that the access                      // 669
// control rules set by calls to `allow/deny` are satisfied. If all                          // 670
// pass, rewrite the mongo operation to use $in to set the list of                           // 671
// document ids to change ##ValidatedChange                                                  // 672
Meteor.Collection.prototype._validatedUpdate = function(                                     // 673
    userId, selector, mutator, options) {                                                    // 674
  var self = this;                                                                           // 675
                                                                                             // 676
  if (!LocalCollection._selectorIsIdPerhapsAsObject(selector))                               // 677
    throw new Error("validated update should be of a single ID");                            // 678
                                                                                             // 679
  // compute modified fields                                                                 // 680
  var fields = [];                                                                           // 681
  _.each(mutator, function (params, op) {                                                    // 682
    if (op.charAt(0) !== '$') {                                                              // 683
      throw new Meteor.Error(                                                                // 684
        403, "Access denied. In a restricted collection you can only update documents, not replace them. Use a Mongo update operator, such as '$set'.");
    } else if (!_.has(ALLOWED_UPDATE_OPERATIONS, op)) {                                      // 686
      throw new Meteor.Error(                                                                // 687
        403, "Access denied. Operator " + op + " not allowed in a restricted collection.");  // 688
    } else {                                                                                 // 689
      _.each(_.keys(params), function (field) {                                              // 690
        // treat dotted fields as if they are replacing their                                // 691
        // top-level part                                                                    // 692
        if (field.indexOf('.') !== -1)                                                       // 693
          field = field.substring(0, field.indexOf('.'));                                    // 694
                                                                                             // 695
        // record the field we are trying to change                                          // 696
        if (!_.contains(fields, field))                                                      // 697
          fields.push(field);                                                                // 698
      });                                                                                    // 699
    }                                                                                        // 700
  });                                                                                        // 701
                                                                                             // 702
  var findOptions = {transform: null};                                                       // 703
  if (!self._validators.fetchAllFields) {                                                    // 704
    findOptions.fields = {};                                                                 // 705
    _.each(self._validators.fetch, function(fieldName) {                                     // 706
      findOptions.fields[fieldName] = 1;                                                     // 707
    });                                                                                      // 708
  }                                                                                          // 709
                                                                                             // 710
  var doc = self._collection.findOne(selector, findOptions);                                 // 711
  if (!doc)  // none satisfied!                                                              // 712
    return;                                                                                  // 713
                                                                                             // 714
  var factoriedDoc;                                                                          // 715
                                                                                             // 716
  // call user validators.                                                                   // 717
  // Any deny returns true means denied.                                                     // 718
  if (_.any(self._validators.update.deny, function(validator) {                              // 719
    if (!factoriedDoc)                                                                       // 720
      factoriedDoc = transformDoc(validator, doc);                                           // 721
    return validator(userId,                                                                 // 722
                     factoriedDoc,                                                           // 723
                     fields,                                                                 // 724
                     mutator);                                                               // 725
  })) {                                                                                      // 726
    throw new Meteor.Error(403, "Access denied");                                            // 727
  }                                                                                          // 728
  // Any allow returns true means proceed. Throw error if they all fail.                     // 729
  if (_.all(self._validators.update.allow, function(validator) {                             // 730
    if (!factoriedDoc)                                                                       // 731
      factoriedDoc = transformDoc(validator, doc);                                           // 732
    return !validator(userId,                                                                // 733
                      factoriedDoc,                                                          // 734
                      fields,                                                                // 735
                      mutator);                                                              // 736
  })) {                                                                                      // 737
    throw new Meteor.Error(403, "Access denied");                                            // 738
  }                                                                                          // 739
                                                                                             // 740
  // Back when we supported arbitrary client-provided selectors, we actually                 // 741
  // rewrote the selector to include an _id clause before passing to Mongo to                // 742
  // avoid races, but since selector is guaranteed to already just be an ID, we              // 743
  // don't have to any more.                                                                 // 744
                                                                                             // 745
  self._collection.update.call(                                                              // 746
    self._collection, selector, mutator, options);                                           // 747
};                                                                                           // 748
                                                                                             // 749
// Only allow these operations in validated updates. Specifically                            // 750
// whitelist operations, rather than blacklist, so new complex                               // 751
// operations that are added aren't automatically allowed. A complex                         // 752
// operation is one that does more than just modify its target                               // 753
// field. For now this contains all update operations except '$rename'.                      // 754
// http://docs.mongodb.org/manual/reference/operators/#update                                // 755
var ALLOWED_UPDATE_OPERATIONS = {                                                            // 756
  $inc:1, $set:1, $unset:1, $addToSet:1, $pop:1, $pullAll:1, $pull:1,                        // 757
  $pushAll:1, $push:1, $bit:1                                                                // 758
};                                                                                           // 759
                                                                                             // 760
// Simulate a mongo `remove` operation while validating access control                       // 761
// rules. See #ValidatedChange                                                               // 762
Meteor.Collection.prototype._validatedRemove = function(userId, selector) {                  // 763
  var self = this;                                                                           // 764
                                                                                             // 765
  var findOptions = {transform: null};                                                       // 766
  if (!self._validators.fetchAllFields) {                                                    // 767
    findOptions.fields = {};                                                                 // 768
    _.each(self._validators.fetch, function(fieldName) {                                     // 769
      findOptions.fields[fieldName] = 1;                                                     // 770
    });                                                                                      // 771
  }                                                                                          // 772
                                                                                             // 773
  var doc = self._collection.findOne(selector, findOptions);                                 // 774
  if (!doc)                                                                                  // 775
    return;                                                                                  // 776
                                                                                             // 777
  // call user validators.                                                                   // 778
  // Any deny returns true means denied.                                                     // 779
  if (_.any(self._validators.remove.deny, function(validator) {                              // 780
    return validator(userId, transformDoc(validator, doc));                                  // 781
  })) {                                                                                      // 782
    throw new Meteor.Error(403, "Access denied");                                            // 783
  }                                                                                          // 784
  // Any allow returns true means proceed. Throw error if they all fail.                     // 785
  if (_.all(self._validators.remove.allow, function(validator) {                             // 786
    return !validator(userId, transformDoc(validator, doc));                                 // 787
  })) {                                                                                      // 788
    throw new Meteor.Error(403, "Access denied");                                            // 789
  }                                                                                          // 790
                                                                                             // 791
  // Back when we supported arbitrary client-provided selectors, we actually                 // 792
  // rewrote the selector to {_id: {$in: [ids that we found]}} before passing to             // 793
  // Mongo to avoid races, but since selector is guaranteed to already just be               // 794
  // an ID, we don't have to any more.                                                       // 795
                                                                                             // 796
  self._collection.remove.call(self._collection, selector);                                  // 797
};                                                                                           // 798
                                                                                             // 799
///////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mongo-livedata'] = {};

})();

//# sourceMappingURL=a3509c5f9f4ed6ded19eaac97c69c2a91d81df81.map
