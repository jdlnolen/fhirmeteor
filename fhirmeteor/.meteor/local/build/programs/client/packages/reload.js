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
var Log = Package.logging.Log;
var JSON = Package.json.JSON;

/* Package-scope variables */
var Reload;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/reload/reload.js                                                                 //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
/**                                                                                          // 1
 * This code does _NOT_ support hot (session-restoring) reloads on                           // 2
 * IE6,7. It only works on browsers with sessionStorage support.                             // 3
 *                                                                                           // 4
 * There are a couple approaches to add IE6,7 support:                                       // 5
 *                                                                                           // 6
 * - use IE's "userData" mechanism in combination with window.name.                          // 7
 * This mostly works, however the problem is that it can not get to the                      // 8
 * data until after DOMReady. This is a problem for us since this API                        // 9
 * relies on the data being ready before API users run. We could                             // 10
 * refactor using Meteor.startup in all API users, but that might slow                       // 11
 * page loads as we couldn't start the stream until after DOMReady.                          // 12
 * Here are some resources on this approach:                                                 // 13
 * https://github.com/hugeinc/USTORE.js                                                      // 14
 * http://thudjs.tumblr.com/post/419577524/localstorage-userdata                             // 15
 * http://www.javascriptkit.com/javatutors/domstorage2.shtml                                 // 16
 *                                                                                           // 17
 * - POST the data to the server, and have the server send it back on                        // 18
 * page load. This is nice because it sidesteps all the local storage                        // 19
 * compatibility issues, however it is kinda tricky. We can use a unique                     // 20
 * token in the URL, then get rid of it with HTML5 pushstate, but that                       // 21
 * only works on pushstate browsers.                                                         // 22
 *                                                                                           // 23
 * This will all need to be reworked entirely when we add server-side                        // 24
 * HTML rendering. In that case, the server will need to have access to                      // 25
 * the client's session to render properly.                                                  // 26
 */                                                                                          // 27
                                                                                             // 28
var KEY_NAME = 'Meteor_Reload';                                                              // 29
// after how long should we consider this no longer an automatic                             // 30
// reload, but a fresh restart. This only happens if a reload is                             // 31
// interrupted and a user manually restarts things. The only time                            // 32
// this is really weird is if a user navigates away mid-refresh,                             // 33
// then manually navigates back to the page.                                                 // 34
var TIMEOUT = 30000;                                                                         // 35
                                                                                             // 36
                                                                                             // 37
var old_data = {};                                                                           // 38
// read in old data at startup.                                                              // 39
var old_json;                                                                                // 40
// On Firefox with dom.storage.enabled set to false, sessionStorage is null,                 // 41
// so we have to both check to see if it is defined and not null.                            // 42
if (typeof sessionStorage !== "undefined" && sessionStorage) {                               // 43
  old_json = sessionStorage.getItem(KEY_NAME);                                               // 44
  sessionStorage.removeItem(KEY_NAME);                                                       // 45
} else {                                                                                     // 46
  // Unsupported browser (IE 6,7). No session resumption.                                    // 47
  // Meteor._debug("XXX UNSUPPORTED BROWSER");                                               // 48
}                                                                                            // 49
                                                                                             // 50
if (!old_json) old_json = '{}';                                                              // 51
var old_parsed = {};                                                                         // 52
try {                                                                                        // 53
  old_parsed = JSON.parse(old_json);                                                         // 54
  if (typeof old_parsed !== "object") {                                                      // 55
    Meteor._debug("Got bad data on reload. Ignoring.");                                      // 56
    old_parsed = {};                                                                         // 57
  }                                                                                          // 58
} catch (err) {                                                                              // 59
  Meteor._debug("Got invalid JSON on reload. Ignoring.");                                    // 60
}                                                                                            // 61
                                                                                             // 62
if (old_parsed.reload && typeof old_parsed.data === "object" &&                              // 63
    old_parsed.time + TIMEOUT > (new Date()).getTime()) {                                    // 64
  // Meteor._debug("Restoring reload data.");                                                // 65
  old_data = old_parsed.data;                                                                // 66
}                                                                                            // 67
                                                                                             // 68
                                                                                             // 69
var providers = [];                                                                          // 70
                                                                                             // 71
////////// External API //////////                                                           // 72
                                                                                             // 73
Reload = {};                                                                                 // 74
                                                                                             // 75
// Packages that support migration should register themselves by                             // 76
// calling this function. When it's time to migrate, callback will                           // 77
// be called with one argument, the "retry function." If the package                         // 78
// is ready to migrate, it should return [true, data], where data is                         // 79
// its migration data, an arbitrary JSON value (or [true] if it has                          // 80
// no migration data this time). If the package needs more time                              // 81
// before it is ready to migrate, it should return false. Then, once                         // 82
// it is ready to migrating again, it should call the retry                                  // 83
// function. The retry function will return immediately, but will                            // 84
// schedule the migration to be retried, meaning that every package                          // 85
// will be polled once again for its migration data. If they are all                         // 86
// ready this time, then the migration will happen. name must be set if there                // 87
// is migration data.                                                                        // 88
//                                                                                           // 89
Reload._onMigrate = function (name, callback) {                                              // 90
  if (!callback) {                                                                           // 91
    // name not provided, so first arg is callback.                                          // 92
    callback = name;                                                                         // 93
    name = undefined;                                                                        // 94
  }                                                                                          // 95
  providers.push({name: name, callback: callback});                                          // 96
};                                                                                           // 97
                                                                                             // 98
// Called by packages when they start up.                                                    // 99
// Returns the object that was saved, or undefined if none saved.                            // 100
//                                                                                           // 101
Reload._migrationData = function (name) {                                                    // 102
  return old_data[name];                                                                     // 103
};                                                                                           // 104
                                                                                             // 105
// Migrating reload: reload this page (presumably to pick up a new                           // 106
// version of the code or assets), but save the program state and                            // 107
// migrate it over. This function returns immediately. The reload                            // 108
// will happen at some point in the future once all of the packages                          // 109
// are ready to migrate.                                                                     // 110
//                                                                                           // 111
var reloading = false;                                                                       // 112
Reload._reload = function () {                                                               // 113
  if (reloading)                                                                             // 114
    return;                                                                                  // 115
  reloading = true;                                                                          // 116
                                                                                             // 117
  var tryReload = function () { _.defer(function () {                                        // 118
    // Make sure each package is ready to go, and collect their                              // 119
    // migration data                                                                        // 120
    var migrationData = {};                                                                  // 121
    var remaining = _.clone(providers);                                                      // 122
    while (remaining.length) {                                                               // 123
      var p = remaining.shift();                                                             // 124
      var status = p.callback(tryReload);                                                    // 125
      if (!status[0])                                                                        // 126
        return; // not ready yet..                                                           // 127
      if (status.length > 1 && p.name)                                                       // 128
        migrationData[p.name] = status[1];                                                   // 129
    };                                                                                       // 130
                                                                                             // 131
    try {                                                                                    // 132
      // Persist the migration data                                                          // 133
      var json = JSON.stringify({                                                            // 134
        time: (new Date()).getTime(), data: migrationData, reload: true                      // 135
      });                                                                                    // 136
    } catch (err) {                                                                          // 137
      Meteor._debug("Couldn't serialize data for migration", migrationData);                 // 138
      throw err;                                                                             // 139
    }                                                                                        // 140
                                                                                             // 141
    if (typeof sessionStorage !== "undefined" && sessionStorage) {                           // 142
      sessionStorage.setItem(KEY_NAME, json);                                                // 143
    } else {                                                                                 // 144
      Meteor._debug("Browser does not support sessionStorage. Not saving migration state."); // 145
    }                                                                                        // 146
                                                                                             // 147
    // Tell the browser to shut down this VM and make a new one                              // 148
    window.location.reload();                                                                // 149
  }); };                                                                                     // 150
                                                                                             // 151
  tryReload();                                                                               // 152
};                                                                                           // 153
                                                                                             // 154
///////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/reload/deprecated.js                                                             //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
// Reload functionality used to live on Meteor._reload. Be nice and try not to               // 1
// break code that uses it, even though it's internal.                                       // 2
// XXX COMPAT WITH 0.6.4                                                                     // 3
Meteor._reload = {                                                                           // 4
  onMigrate: Reload._onMigrate,                                                              // 5
  migrationData: Reload._migrationData,                                                      // 6
  reload: Reload._reload                                                                     // 7
};                                                                                           // 8
                                                                                             // 9
///////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.reload = {
  Reload: Reload
};

})();

//# sourceMappingURL=acb1a2a618bdea7a55ce912cfcf348b9d89e0876.map
