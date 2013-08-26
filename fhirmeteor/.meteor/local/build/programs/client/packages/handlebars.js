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
var _ = Package.underscore._;
var Spark = Package.spark.Spark;

/* Package-scope variables */
var Handlebars;

(function () {

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/handlebars/evaluate-handlebars.js                                        //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
Handlebars = {};                                                                     // 1
                                                                                     // 2
// XXX we probably forgot to implement the #foo case where foo is not                // 3
// a helper (and similarly the ^foo case)                                            // 4
                                                                                     // 5
// XXX there is a ton of stuff that needs testing! like,                             // 6
// everything. including the '..' stuff.                                             // 7
                                                                                     // 8
Handlebars.json_ast_to_func = function (ast) {                                       // 9
  return function (data, options) {                                                  // 10
    return Handlebars.evaluate(ast, data, options);                                  // 11
  };                                                                                 // 12
};                                                                                   // 13
                                                                                     // 14
// block helpers take:                                                               // 15
// (N args), options (hash args, plus 'fn' and 'inverse')                            // 16
// and return text                                                                   // 17
//                                                                                   // 18
// normal helpers take:                                                              // 19
// (N args), options (hash args)                                                     // 20
//                                                                                   // 21
// partials take one argument, data                                                  // 22
                                                                                     // 23
// XXX handlebars' format for arguments is not the clearest, likely                  // 24
// for backwards compatibility to mustache. eg, options ===                          // 25
// options.fn. take the opportunity to clean this up. treat block                    // 26
// arguments (fn, inverse) as just another kind of argument, same as                 // 27
// what is passed in via named arguments.                                            // 28
Handlebars._default_helpers = {                                                      // 29
  'with': function (data, options) {                                                 // 30
    if (!data || (data instanceof Array && !data.length))                            // 31
      return options.inverse(this);                                                  // 32
    else                                                                             // 33
      return options.fn(data);                                                       // 34
  },                                                                                 // 35
  'each': function (data, options) {                                                 // 36
    var parentData = this;                                                           // 37
    if (data && data.length > 0)                                                     // 38
      return _.map(data, function(x, i) {                                            // 39
        // infer a branch key from the data                                          // 40
        var branch = ((x && x._id) || (typeof x === 'string' ? x : null) ||          // 41
                      Spark.UNIQUE_LABEL);                                           // 42
        return Spark.labelBranch(branch, function() {                                // 43
          return options.fn(x);                                                      // 44
        });                                                                          // 45
      }).join('');                                                                   // 46
    else                                                                             // 47
      return Spark.labelBranch(                                                      // 48
        'else',                                                                      // 49
        function () {                                                                // 50
          return options.inverse(parentData);                                        // 51
        });                                                                          // 52
  },                                                                                 // 53
  'if': function (data, options) {                                                   // 54
    if (!data || (data instanceof Array && !data.length))                            // 55
      return options.inverse(this);                                                  // 56
    else                                                                             // 57
      return options.fn(this);                                                       // 58
  },                                                                                 // 59
  'unless': function (data, options) {                                               // 60
    if (!data || (data instanceof Array && !data.length))                            // 61
      return options.fn(this);                                                       // 62
    else                                                                             // 63
      return options.inverse(this);                                                  // 64
  }                                                                                  // 65
};                                                                                   // 66
                                                                                     // 67
Handlebars.registerHelper = function (name, func) {                                  // 68
  if (name in Handlebars._default_helpers)                                           // 69
    throw new Error("There is already a helper '" + name + "'");                     // 70
  Handlebars._default_helpers[name] = func;                                          // 71
};                                                                                   // 72
                                                                                     // 73
// Utility to HTML-escape a string.                                                  // 74
Handlebars._escape = (function() {                                                   // 75
  var escape_map = {                                                                 // 76
    "<": "&lt;",                                                                     // 77
    ">": "&gt;",                                                                     // 78
    '"': "&quot;",                                                                   // 79
    "'": "&#x27;",                                                                   // 80
    "`": "&#x60;", /* IE allows backtick-delimited attributes?? */                   // 81
    "&": "&amp;"                                                                     // 82
  };                                                                                 // 83
  var escape_one = function(c) {                                                     // 84
    return escape_map[c];                                                            // 85
  };                                                                                 // 86
                                                                                     // 87
  return function (x) {                                                              // 88
    return x.replace(/[&<>"'`]/g, escape_one);                                       // 89
  };                                                                                 // 90
})();                                                                                // 91
                                                                                     // 92
// be able to recognize default "this", which is different in different environments // 93
Handlebars._defaultThis = (function() { return this; })();                           // 94
                                                                                     // 95
Handlebars.evaluate = function (ast, data, options) {                                // 96
  options = options || {};                                                           // 97
  var helpers = _.extend({}, Handlebars._default_helpers);                           // 98
  _.extend(helpers, options.helpers || {});                                          // 99
  var partials = options.partials || {};                                             // 100
                                                                                     // 101
  // re 'stack' arguments: top of stack is the current data to use for               // 102
  // the template. higher levels are the data referenced by                          // 103
  // identifiers with one or more '..' segments. we have to keep the                 // 104
  // stack pure-functional style, with a tree rather than an array,                  // 105
  // because we want to continue to allow block helpers provided by                  // 106
  // the user to capture their subtemplate rendering functions and                   // 107
  // call them later, after we've finished running (for eg findLive.)                // 108
  // maybe revisit later.                                                            // 109
                                                                                     // 110
  var eval_value = function (stack, id) {                                            // 111
    if (typeof(id) !== "object")                                                     // 112
      return id;                                                                     // 113
                                                                                     // 114
    // follow '..' in {{../../foo.bar}}                                              // 115
    for (var i = 0; i < id[0]; i++) {                                                // 116
      if (!stack.parent)                                                             // 117
        throw new Error("Too many '..' segments");                                   // 118
      else                                                                           // 119
        stack = stack.parent;                                                        // 120
    }                                                                                // 121
                                                                                     // 122
    if (id.length === 1)                                                             // 123
      // no name: {{this}}, {{..}}, {{../..}}                                        // 124
      return stack.data;                                                             // 125
                                                                                     // 126
    var scopedToContext = false;                                                     // 127
    if (id[1] === '') {                                                              // 128
      // an empty path segment is our AST's way of encoding                          // 129
      // the presence of 'this.' at the beginning of the path.                       // 130
      id = id.slice();                                                               // 131
      id.splice(1, 1); // remove the ''                                              // 132
      scopedToContext = true;                                                        // 133
    }                                                                                // 134
                                                                                     // 135
    // when calling functions (helpers/methods/getters), dataThis                    // 136
    // tracks what to use for `this`.  For helpers, it's the                         // 137
    // current data context.  For getters and methods on the data                    // 138
    // context object, and on the return value of a helper, it's                     // 139
    // the object where we got the getter or method.                                 // 140
    var dataThis = stack.data;                                                       // 141
                                                                                     // 142
    var data;                                                                        // 143
    if (id[0] === 0 && helpers.hasOwnProperty(id[1]) && ! scopedToContext) {         // 144
      // first path segment is a helper                                              // 145
      data = helpers[id[1]];                                                         // 146
    } else {                                                                         // 147
      if ((! data instanceof Object) &&                                              // 148
          (typeof (function() {})[id[1]] !== 'undefined') &&                         // 149
          ! scopedToContext) {                                                       // 150
        // Give a helpful error message if the user tried to name                    // 151
        // a helper 'name', 'length', or some other built-in property                // 152
        // of function objects.  Unfortunately, this case is very                    // 153
        // hard to detect, as Template.foo.name = ... will fail silently,            // 154
        // and {{name}} will be silently empty if the property doesn't               // 155
        // exist (per Handlebars rules).                                             // 156
        // However, if there is no data context at all, we jump in.                  // 157
        throw new Error("Can't call a helper '"+id[1]+"' because "+                  // 158
                        "it is a built-in function property in JavaScript");         // 159
      }                                                                              // 160
      // first path segment is property of data context                              // 161
      data = (stack.data && stack.data[id[1]]);                                      // 162
    }                                                                                // 163
                                                                                     // 164
    // handle dots, as in {{foo.bar}}                                                // 165
    for (var i = 2; i < id.length; i++) {                                            // 166
      // Call functions when taking the dot, to support                              // 167
      // for example currentUser.name.                                               // 168
      //                                                                             // 169
      // In the case of {{foo.bar}}, we end up returning one of:                     // 170
      // - helpers.foo.bar                                                           // 171
      // - helpers.foo().bar                                                         // 172
      // - stack.data.foo.bar                                                        // 173
      // - stack.data.foo().bar.                                                     // 174
      //                                                                             // 175
      // The caller does the final application with any                              // 176
      // arguments, as in {{foo.bar arg1 arg2}}, and passes                          // 177
      // the current data context in `this`.  Therefore,                             // 178
      // we use the current data context (`helperThis`)                              // 179
      // for all function calls.                                                     // 180
      if (typeof data === 'function') {                                              // 181
        data = data.call(dataThis);                                                  // 182
        dataThis = data;                                                             // 183
      }                                                                              // 184
      if (data === undefined || data === null) {                                     // 185
        // Handlebars fails silently and returns "" if                               // 186
        // we start to access properties that don't exist.                           // 187
        data = '';                                                                   // 188
        break;                                                                       // 189
      }                                                                              // 190
                                                                                     // 191
      data = data[id[i]];                                                            // 192
    }                                                                                // 193
                                                                                     // 194
    // ensure `this` is bound appropriately when the caller                          // 195
    // invokes `data` with any arguments.  For example,                              // 196
    // in {{foo.bar baz}}, the caller must supply `baz`,                             // 197
    // but we alone have `foo` (in `dataThis`).                                      // 198
    if (typeof data === 'function')                                                  // 199
      return _.bind(data, dataThis);                                                 // 200
                                                                                     // 201
    return data;                                                                     // 202
  };                                                                                 // 203
                                                                                     // 204
  // 'extra' will be clobbered, but not 'params'.                                    // 205
  // if (isNested), evaluate params.slice(1) as a nested                             // 206
  // helper invocation if there is at least one positional                           // 207
  // argument.  This is used for block helpers.                                      // 208
  var invoke = function (stack, params, extra, isNested) {                           // 209
    extra = extra || {};                                                             // 210
    params = params.slice(0);                                                        // 211
                                                                                     // 212
    // remove hash (dictionary of keyword arguments) from                            // 213
    // the end of params, if present.                                                // 214
    var last = params[params.length - 1];                                            // 215
    var hash = {};                                                                   // 216
    if (typeof(last) === "object" && !(last instanceof Array)) {                     // 217
      // evaluate hash values, which are found as invocations                        // 218
      // like [0, "foo"]                                                             // 219
      _.each(params.pop(), function(v,k) {                                           // 220
        var result = eval_value(stack, v);                                           // 221
        hash[k] = (typeof result === "function" ? result() : result);                // 222
      });                                                                            // 223
    }                                                                                // 224
                                                                                     // 225
    var apply = function (values, extra) {                                           // 226
      var args = values.slice(1);                                                    // 227
      for(var i=0; i<args.length; i++)                                               // 228
        if (typeof args[i] === "function")                                           // 229
          args[i] = args[i](); // `this` already bound by eval_value                 // 230
      if (extra)                                                                     // 231
        args.push(extra);                                                            // 232
      return values[0].apply(stack.data, args);                                      // 233
    };                                                                               // 234
                                                                                     // 235
    var values = new Array(params.length);                                           // 236
    for(var i=0; i<params.length; i++)                                               // 237
      values[i] = eval_value(stack, params[i]);                                      // 238
                                                                                     // 239
    if (typeof(values[0]) !== "function")                                            // 240
      return values[0];                                                              // 241
                                                                                     // 242
    if (isNested && values.length > 1) {                                             // 243
      // at least one positional argument; not no args                               // 244
      // or only hash args.                                                          // 245
      var oneArg = values[1];                                                        // 246
      if (typeof oneArg === "function")                                              // 247
        // invoke the positional arguments                                           // 248
        // (and hash arguments) as a nested helper invocation.                       // 249
        oneArg = apply(values.slice(1), {hash:hash});                                // 250
      values = [values[0], oneArg];                                                  // 251
      // keyword args don't go to the block helper, then.                            // 252
      extra.hash = {};                                                               // 253
    } else {                                                                         // 254
      extra.hash = hash;                                                             // 255
    }                                                                                // 256
                                                                                     // 257
    return apply(values, extra);                                                     // 258
  };                                                                                 // 259
                                                                                     // 260
  var template = function (stack, elts, basePCKey) {                                 // 261
    var buf = [];                                                                    // 262
                                                                                     // 263
    var toString = function (x) {                                                    // 264
      if (typeof x === "string") return x;                                           // 265
      // May want to revisit the following one day                                   // 266
      if (x === null) return "null";                                                 // 267
      if (x === undefined) return "";                                                // 268
      return x.toString();                                                           // 269
    };                                                                               // 270
                                                                                     // 271
    // wrap `fn` and `inverse` blocks in chunks having `data`, if the data           // 272
    // is different from the enclosing data, so that the data is available           // 273
    // at runtime for events.                                                        // 274
    var decorateBlockFn = function(fn, old_data) {                                   // 275
      return function(data) {                                                        // 276
        // don't create spurious annotations when data is same                       // 277
        // as before (or when transitioning between e.g. `window` and                // 278
        // `undefined`)                                                              // 279
        if ((data || Handlebars._defaultThis) ===                                    // 280
            (old_data || Handlebars._defaultThis))                                   // 281
          return fn(data);                                                           // 282
        else                                                                         // 283
          return Spark.setDataContext(data, fn(data));                               // 284
      };                                                                             // 285
    };                                                                               // 286
                                                                                     // 287
    // Handle the return value of a {{helper}}.                                      // 288
    // Takes a:                                                                      // 289
    //   string - escapes it                                                         // 290
    //   SafeString - returns the underlying string unescaped                        // 291
    //   other value - coerces to a string and escapes it                            // 292
    var maybeEscape = function(x) {                                                  // 293
      if (x instanceof Handlebars.SafeString)                                        // 294
        return x.toString();                                                         // 295
      return Handlebars._escape(toString(x));                                        // 296
    };                                                                               // 297
                                                                                     // 298
    var curIndex;                                                                    // 299
    // Construct a unique key for the current position                               // 300
    // in the AST.  Since template(...) is invoked recursively,                      // 301
    // the "PC" (program counter) key is hierarchical, consisting                    // 302
    // of one or more numbers, for example '0' or '1.3.0.1'.                         // 303
    var getPCKey = function() {                                                      // 304
      return (basePCKey ? basePCKey+'.' : '') + curIndex;                            // 305
    };                                                                               // 306
    var branch = function(name, func) {                                              // 307
      // Construct a unique branch identifier based on what partial                  // 308
      // we're in, what partial or helper we're calling, and our index               // 309
      // into the template AST (essentially the program counter).                    // 310
      // If "foo" calls "bar" at index 3, it looks like: bar@foo#3.                  // 311
      return Spark.labelBranch(name + "@" + getPCKey(), func);                       // 312
    };                                                                               // 313
                                                                                     // 314
    _.each(elts, function (elt, index) {                                             // 315
      curIndex = index;                                                              // 316
      if (typeof(elt) === "string")                                                  // 317
        buf.push(elt);                                                               // 318
      else if (elt[0] === '{')                                                       // 319
        // {{double stache}}                                                         // 320
        buf.push(branch(elt[1], function () {                                        // 321
          return maybeEscape(invoke(stack, elt[1]));                                 // 322
        }));                                                                         // 323
      else if (elt[0] === '!')                                                       // 324
        // {{{triple stache}}}                                                       // 325
        buf.push(branch(elt[1], function () {                                        // 326
          return toString(invoke(stack, elt[1] || ''));                              // 327
        }));                                                                         // 328
      else if (elt[0] === '#') {                                                     // 329
        // {{#block helper}}                                                         // 330
        var pcKey = getPCKey();                                                      // 331
        var block = decorateBlockFn(                                                 // 332
          function (data) {                                                          // 333
            return template({parent: stack, data: data}, elt[2], pcKey);             // 334
          }, stack.data);                                                            // 335
        block.fn = block;                                                            // 336
        block.inverse = decorateBlockFn(                                             // 337
          function (data) {                                                          // 338
            return template({parent: stack, data: data}, elt[3] || [], pcKey);       // 339
          }, stack.data);                                                            // 340
        var html = branch(elt[1], function () {                                      // 341
          return toString(invoke(stack, elt[1], block, true));                       // 342
        });                                                                          // 343
        buf.push(html);                                                              // 344
      } else if (elt[0] === '>') {                                                   // 345
        // {{> partial}}                                                             // 346
        var partialName = elt[1];                                                    // 347
        if (!(partialName in partials))                                              // 348
          // XXX why do we call these templates in docs and partials in code?        // 349
          throw new Error("No such template '" + partialName + "'");                 // 350
        // call the partial                                                          // 351
        var html = branch(partialName, function () {                                 // 352
          return toString(partials[partialName](stack.data));                        // 353
        });                                                                          // 354
        buf.push(html);                                                              // 355
      } else                                                                         // 356
        throw new Error("bad element in template");                                  // 357
    });                                                                              // 358
                                                                                     // 359
    return buf.join('');                                                             // 360
  };                                                                                 // 361
                                                                                     // 362
  // Set the prefix for PC keys, which identify call sites in the AST                // 363
  // for the purpose of chunk matching.                                              // 364
  // `options.name` will be null in the body, but otherwise have a value,            // 365
  // assuming `options` was assembled in templating/deftemplate.js.                  // 366
  var rootPCKey = (options.name||"")+"#";                                            // 367
                                                                                     // 368
  return template({data: data, parent: null}, ast, rootPCKey);                       // 369
};                                                                                   // 370
                                                                                     // 371
Handlebars.SafeString = function(string) {                                           // 372
  this.string = string;                                                              // 373
};                                                                                   // 374
Handlebars.SafeString.prototype.toString = function() {                              // 375
  return this.string.toString();                                                     // 376
};                                                                                   // 377
                                                                                     // 378
///////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.handlebars = {
  Handlebars: Handlebars
};

})();

//# sourceMappingURL=0dfdd5a291ec535f18b1471d32e8cda17c87770c.map
