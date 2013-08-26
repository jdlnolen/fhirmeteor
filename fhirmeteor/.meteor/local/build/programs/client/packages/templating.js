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
var Handlebars = Package.handlebars.Handlebars;

/* Package-scope variables */
var Template;

(function () {

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/templating/deftemplate.js                                      //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
Template = {};                                                             // 1
                                                                           // 2
var registeredPartials = {};                                               // 3
                                                                           // 4
// XXX Handlebars hooking is janky and gross                               // 5
var hookHandlebars = function () {                                         // 6
  hookHandlebars = function(){}; // install the hook only once             // 7
                                                                           // 8
  var orig = Handlebars._default_helpers.each;                             // 9
  Handlebars._default_helpers.each = function (arg, options) {             // 10
    // if arg isn't an observable (like LocalCollection.Cursor),           // 11
    // don't use this reactive implementation of #each.                    // 12
    if (!(arg && 'observeChanges' in arg))                                 // 13
      return orig.call(this, arg, options);                                // 14
                                                                           // 15
    return Spark.list(                                                     // 16
      arg,                                                                 // 17
      function (item) {                                                    // 18
        return Spark.labelBranch(                                          // 19
          (item && item._id) || Spark.UNIQUE_LABEL, function () {          // 20
            var html = Spark.isolate(_.bind(options.fn, null, item));      // 21
            return Spark.setDataContext(item, html);                       // 22
          });                                                              // 23
      },                                                                   // 24
      function () {                                                        // 25
        return options.inverse ?                                           // 26
          Spark.isolate(options.inverse) : '';                             // 27
      }                                                                    // 28
    );                                                                     // 29
  };                                                                       // 30
                                                                           // 31
  _.extend(Handlebars._default_helpers, {                                  // 32
    isolate: function (options) {                                          // 33
      var data = this;                                                     // 34
      return Spark.isolate(function () {                                   // 35
        return options.fn(data);                                           // 36
      });                                                                  // 37
    },                                                                     // 38
    constant: function (options) {                                         // 39
      var data = this;                                                     // 40
      return Spark.createLandmark({ constant: true }, function () {        // 41
        return options.fn(data);                                           // 42
      });                                                                  // 43
    }                                                                      // 44
  });                                                                      // 45
};                                                                         // 46
                                                                           // 47
// map from landmark id, to the 'this' object for                          // 48
// created/rendered/destroyed callbacks on templates                       // 49
var templateInstanceData = {};                                             // 50
                                                                           // 51
var templateObjFromLandmark = function (landmark) {                        // 52
  var template = templateInstanceData[landmark.id] || (                    // 53
    templateInstanceData[landmark.id] = {                                  // 54
      // set these once                                                    // 55
      find: function (selector) {                                          // 56
        if (! landmark.hasDom())                                           // 57
          throw new Error("Template not in DOM");                          // 58
        return landmark.find(selector);                                    // 59
      },                                                                   // 60
      findAll: function (selector) {                                       // 61
        if (! landmark.hasDom())                                           // 62
          throw new Error("Template not in DOM");                          // 63
        return landmark.findAll(selector);                                 // 64
      }                                                                    // 65
    });                                                                    // 66
  // set these each time                                                   // 67
  template.firstNode = landmark.hasDom() ? landmark.firstNode() : null;    // 68
  template.lastNode = landmark.hasDom() ? landmark.lastNode() : null;      // 69
  return template;                                                         // 70
};                                                                         // 71
                                                                           // 72
// XXX forms hooks into this to add "bind"?                                // 73
var templateBase = {                                                       // 74
  // methods store data here (event map, etc.).  initialized per template. // 75
  _tmpl_data: null,                                                        // 76
  // these functions must be generic (i.e. use `this`)                     // 77
  events: function (eventMap) {                                            // 78
    var events =                                                           // 79
          (this._tmpl_data.events = (this._tmpl_data.events || {}));       // 80
    _.each(eventMap, function(callback, spec) {                            // 81
      events[spec] = (events[spec] || []);                                 // 82
      events[spec].push(callback);                                         // 83
    });                                                                    // 84
  },                                                                       // 85
  preserve: function (preserveMap) {                                       // 86
    var preserve =                                                         // 87
          (this._tmpl_data.preserve = (this._tmpl_data.preserve || {}));   // 88
                                                                           // 89
    if (_.isArray(preserveMap))                                            // 90
      _.each(preserveMap, function (selector) {                            // 91
        preserve[selector] = true;                                         // 92
      });                                                                  // 93
    else                                                                   // 94
      _.extend(preserve, preserveMap);                                     // 95
  },                                                                       // 96
  helpers: function (helperMap) {                                          // 97
    var helpers =                                                          // 98
          (this._tmpl_data.helpers = (this._tmpl_data.helpers || {}));     // 99
    for(var h in helperMap)                                                // 100
      helpers[h] = helperMap[h];                                           // 101
  }                                                                        // 102
};                                                                         // 103
                                                                           // 104
Template.__define__ = function (name, raw_func) {                          // 105
  hookHandlebars();                                                        // 106
                                                                           // 107
  if (name === '__define__')                                               // 108
    throw new Error("Sorry, '__define__' is a special name and " +         // 109
                    "cannot be used as the name of a template");           // 110
                                                                           // 111
  // Define the function assigned to Template.<name>.                      // 112
                                                                           // 113
  var partial = function (data) {                                          // 114
    var tmpl = name && Template[name] || {};                               // 115
    var tmplData = tmpl._tmpl_data || {};                                  // 116
                                                                           // 117
    var html = Spark.labelBranch("Template."+name, function () {           // 118
      var html = Spark.createLandmark({                                    // 119
        preserve: tmplData.preserve || {},                                 // 120
        created: function () {                                             // 121
          var template = templateObjFromLandmark(this);                    // 122
          template.data = data;                                            // 123
          tmpl.created && tmpl.created.call(template);                     // 124
        },                                                                 // 125
        rendered: function () {                                            // 126
          var template = templateObjFromLandmark(this);                    // 127
          template.data = data;                                            // 128
          tmpl.rendered && tmpl.rendered.call(template);                   // 129
        },                                                                 // 130
        destroyed: function () {                                           // 131
          // template.data is already set from previous callbacks          // 132
          tmpl.destroyed &&                                                // 133
            tmpl.destroyed.call(templateObjFromLandmark(this));            // 134
          delete templateInstanceData[this.id];                            // 135
        }                                                                  // 136
      }, function (landmark) {                                             // 137
        var html = Spark.isolate(function () {                             // 138
          // XXX Forms needs to run a hook before and after raw_func       // 139
          // (and receive 'landmark')                                      // 140
          return raw_func(data, {                                          // 141
            helpers: _.extend({}, partial, tmplData.helpers || {}),        // 142
            partials: registeredPartials,                                  // 143
            name: name                                                     // 144
          });                                                              // 145
        });                                                                // 146
                                                                           // 147
        // take an event map with `function (event, template)` handlers    // 148
        // and produce one with `function (event, landmark)` handlers      // 149
        // for Spark, by inserting logic to create the template object.    // 150
        var wrapEventMap = function (oldEventMap) {                        // 151
          var newEventMap = {};                                            // 152
          _.each(oldEventMap, function (handlers, key) {                   // 153
            if ('function' === typeof handlers) {                          // 154
              //Template.foo.events = ... way will give a fn, not an array // 155
              handlers = [ handlers ];                                     // 156
            }                                                              // 157
            newEventMap[key] = _.map(handlers, function (handler) {        // 158
              return function (event, landmark) {                          // 159
                return handler.call(this, event,                           // 160
                                    templateObjFromLandmark(landmark));    // 161
              };                                                           // 162
            });                                                            // 163
          });                                                              // 164
          return newEventMap;                                              // 165
        };                                                                 // 166
                                                                           // 167
        // support old Template.foo.events = {...} format                  // 168
        var events =                                                       // 169
              (tmpl.events !== templateBase.events ?                       // 170
               tmpl.events : tmplData.events);                             // 171
        // events need to be inside the landmark, not outside, so          // 172
        // that when an event fires, you can retrieve the enclosing        // 173
        // landmark to get the template data                               // 174
        if (tmpl.events)                                                   // 175
          html = Spark.attachEvents(wrapEventMap(events), html);           // 176
        return html;                                                       // 177
      });                                                                  // 178
      html = Spark.setDataContext(data, html);                             // 179
      return html;                                                         // 180
    });                                                                    // 181
                                                                           // 182
    return html;                                                           // 183
  };                                                                       // 184
                                                                           // 185
  // XXX hack.. copy all of Handlebars' built in helpers over to           // 186
  // the partial. it would be better to hook helperMissing (or             // 187
  // something like that?) so that Template.foo is searched only           // 188
  // if it's not a built-in helper.                                        // 189
  _.extend(partial, Handlebars.helpers);                                   // 190
                                                                           // 191
                                                                           // 192
  if (name) {                                                              // 193
    if (Template[name])                                                    // 194
      throw new Error("There are multiple templates named '" + name +      // 195
                      "'. Each template needs a unique name.");            // 196
                                                                           // 197
    Template[name] = partial;                                              // 198
    _.extend(partial, templateBase);                                       // 199
    partial._tmpl_data = {};                                               // 200
                                                                           // 201
    registeredPartials[name] = partial;                                    // 202
  }                                                                        // 203
                                                                           // 204
  // useful for unnamed templates, like body                               // 205
  return partial;                                                          // 206
};                                                                         // 207
                                                                           // 208
/////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.templating = {
  Template: Template
};

})();

//# sourceMappingURL=05b762a6c16769651cfe346f68018b47eacac716.map
