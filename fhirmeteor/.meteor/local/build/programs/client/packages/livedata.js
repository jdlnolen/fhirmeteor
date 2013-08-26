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
var check = Package.check.check;
var Match = Package.check.Match;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var JSON = Package.json.JSON;
var _ = Package.underscore._;
var Deps = Package.deps.Deps;
var Log = Package.logging.Log;
var Reload = Package.reload.Reload;
var LocalCollection = Package.minimongo.LocalCollection;

/* Package-scope variables */
var DDP, LivedataTest, SockJS, toSockjsUrl, toWebsocketUrl, SUPPORTED_DDP_VERSIONS, MethodInvocation, parseDDP, stringifyDDP, allConnections;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/livedata/common.js                                                                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
LivedataTest = {};                                                                                                // 1
                                                                                                                  // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/livedata/sockjs-0.3.4.js                                                                              //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
// XXX METEOR changes in <METEOR>                                                                                 // 1
                                                                                                                  // 2
/* SockJS client, version 0.3.4, http://sockjs.org, MIT License                                                   // 3
                                                                                                                  // 4
Copyright (c) 2011-2012 VMware, Inc.                                                                              // 5
                                                                                                                  // 6
Permission is hereby granted, free of charge, to any person obtaining a copy                                      // 7
of this software and associated documentation files (the "Software"), to deal                                     // 8
in the Software without restriction, including without limitation the rights                                      // 9
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell                                         // 10
copies of the Software, and to permit persons to whom the Software is                                             // 11
furnished to do so, subject to the following conditions:                                                          // 12
                                                                                                                  // 13
The above copyright notice and this permission notice shall be included in                                        // 14
all copies or substantial portions of the Software.                                                               // 15
                                                                                                                  // 16
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR                                        // 17
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,                                          // 18
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE                                       // 19
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER                                            // 20
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,                                     // 21
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN                                         // 22
THE SOFTWARE.                                                                                                     // 23
*/                                                                                                                // 24
                                                                                                                  // 25
// <METEOR> Commented out JSO implementation (use json package instead).                                          // 26
// JSON2 by Douglas Crockford (minified).                                                                         // 27
// var JSON;JSON||(JSON={}),function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g;return e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)typeof rep[c]=="string"&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver=="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")})}()
// </METEOR>                                                                                                      // 29
                                                                                                                  // 30
//     [*] Including lib/index.js                                                                                 // 31
// Public object                                                                                                  // 32
SockJS = (function(){                                                                                             // 33
              var _document = document;                                                                           // 34
              var _window = window;                                                                               // 35
              var utils = {};                                                                                     // 36
                                                                                                                  // 37
                                                                                                                  // 38
//         [*] Including lib/reventtarget.js                                                                      // 39
/*                                                                                                                // 40
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 41
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 42
 *                                                                                                                // 43
 * For the license see COPYING.                                                                                   // 44
 * ***** END LICENSE BLOCK *****                                                                                  // 45
 */                                                                                                               // 46
                                                                                                                  // 47
/* Simplified implementation of DOM2 EventTarget.                                                                 // 48
 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget                                       // 49
 */                                                                                                               // 50
var REventTarget = function() {};                                                                                 // 51
REventTarget.prototype.addEventListener = function (eventType, listener) {                                        // 52
    if(!this._listeners) {                                                                                        // 53
         this._listeners = {};                                                                                    // 54
    }                                                                                                             // 55
    if(!(eventType in this._listeners)) {                                                                         // 56
        this._listeners[eventType] = [];                                                                          // 57
    }                                                                                                             // 58
    var arr = this._listeners[eventType];                                                                         // 59
    if(utils.arrIndexOf(arr, listener) === -1) {                                                                  // 60
        arr.push(listener);                                                                                       // 61
    }                                                                                                             // 62
    return;                                                                                                       // 63
};                                                                                                                // 64
                                                                                                                  // 65
REventTarget.prototype.removeEventListener = function (eventType, listener) {                                     // 66
    if(!(this._listeners && (eventType in this._listeners))) {                                                    // 67
        return;                                                                                                   // 68
    }                                                                                                             // 69
    var arr = this._listeners[eventType];                                                                         // 70
    var idx = utils.arrIndexOf(arr, listener);                                                                    // 71
    if (idx !== -1) {                                                                                             // 72
        if(arr.length > 1) {                                                                                      // 73
            this._listeners[eventType] = arr.slice(0, idx).concat( arr.slice(idx+1) );                            // 74
        } else {                                                                                                  // 75
            delete this._listeners[eventType];                                                                    // 76
        }                                                                                                         // 77
        return;                                                                                                   // 78
    }                                                                                                             // 79
    return;                                                                                                       // 80
};                                                                                                                // 81
                                                                                                                  // 82
REventTarget.prototype.dispatchEvent = function (event) {                                                         // 83
    var t = event.type;                                                                                           // 84
    var args = Array.prototype.slice.call(arguments, 0);                                                          // 85
    if (this['on'+t]) {                                                                                           // 86
        this['on'+t].apply(this, args);                                                                           // 87
    }                                                                                                             // 88
    if (this._listeners && t in this._listeners) {                                                                // 89
        for(var i=0; i < this._listeners[t].length; i++) {                                                        // 90
            this._listeners[t][i].apply(this, args);                                                              // 91
        }                                                                                                         // 92
    }                                                                                                             // 93
};                                                                                                                // 94
//         [*] End of lib/reventtarget.js                                                                         // 95
                                                                                                                  // 96
                                                                                                                  // 97
//         [*] Including lib/simpleevent.js                                                                       // 98
/*                                                                                                                // 99
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 100
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 101
 *                                                                                                                // 102
 * For the license see COPYING.                                                                                   // 103
 * ***** END LICENSE BLOCK *****                                                                                  // 104
 */                                                                                                               // 105
                                                                                                                  // 106
var SimpleEvent = function(type, obj) {                                                                           // 107
    this.type = type;                                                                                             // 108
    if (typeof obj !== 'undefined') {                                                                             // 109
        for(var k in obj) {                                                                                       // 110
            if (!obj.hasOwnProperty(k)) continue;                                                                 // 111
            this[k] = obj[k];                                                                                     // 112
        }                                                                                                         // 113
    }                                                                                                             // 114
};                                                                                                                // 115
                                                                                                                  // 116
SimpleEvent.prototype.toString = function() {                                                                     // 117
    var r = [];                                                                                                   // 118
    for(var k in this) {                                                                                          // 119
        if (!this.hasOwnProperty(k)) continue;                                                                    // 120
        var v = this[k];                                                                                          // 121
        if (typeof v === 'function') v = '[function]';                                                            // 122
        r.push(k + '=' + v);                                                                                      // 123
    }                                                                                                             // 124
    return 'SimpleEvent(' + r.join(', ') + ')';                                                                   // 125
};                                                                                                                // 126
//         [*] End of lib/simpleevent.js                                                                          // 127
                                                                                                                  // 128
                                                                                                                  // 129
//         [*] Including lib/eventemitter.js                                                                      // 130
/*                                                                                                                // 131
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 132
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 133
 *                                                                                                                // 134
 * For the license see COPYING.                                                                                   // 135
 * ***** END LICENSE BLOCK *****                                                                                  // 136
 */                                                                                                               // 137
                                                                                                                  // 138
var EventEmitter = function(events) {                                                                             // 139
    var that = this;                                                                                              // 140
    that._events = events || [];                                                                                  // 141
    that._listeners = {};                                                                                         // 142
};                                                                                                                // 143
EventEmitter.prototype.emit = function(type) {                                                                    // 144
    var that = this;                                                                                              // 145
    that._verifyType(type);                                                                                       // 146
    if (that._nuked) return;                                                                                      // 147
                                                                                                                  // 148
    var args = Array.prototype.slice.call(arguments, 1);                                                          // 149
    if (that['on'+type]) {                                                                                        // 150
        that['on'+type].apply(that, args);                                                                        // 151
    }                                                                                                             // 152
    if (type in that._listeners) {                                                                                // 153
        for(var i = 0; i < that._listeners[type].length; i++) {                                                   // 154
            that._listeners[type][i].apply(that, args);                                                           // 155
        }                                                                                                         // 156
    }                                                                                                             // 157
};                                                                                                                // 158
                                                                                                                  // 159
EventEmitter.prototype.on = function(type, callback) {                                                            // 160
    var that = this;                                                                                              // 161
    that._verifyType(type);                                                                                       // 162
    if (that._nuked) return;                                                                                      // 163
                                                                                                                  // 164
    if (!(type in that._listeners)) {                                                                             // 165
        that._listeners[type] = [];                                                                               // 166
    }                                                                                                             // 167
    that._listeners[type].push(callback);                                                                         // 168
};                                                                                                                // 169
                                                                                                                  // 170
EventEmitter.prototype._verifyType = function(type) {                                                             // 171
    var that = this;                                                                                              // 172
    if (utils.arrIndexOf(that._events, type) === -1) {                                                            // 173
        utils.log('Event ' + JSON.stringify(type) +                                                               // 174
                  ' not listed ' + JSON.stringify(that._events) +                                                 // 175
                  ' in ' + that);                                                                                 // 176
    }                                                                                                             // 177
};                                                                                                                // 178
                                                                                                                  // 179
EventEmitter.prototype.nuke = function() {                                                                        // 180
    var that = this;                                                                                              // 181
    that._nuked = true;                                                                                           // 182
    for(var i=0; i<that._events.length; i++) {                                                                    // 183
        delete that[that._events[i]];                                                                             // 184
    }                                                                                                             // 185
    that._listeners = {};                                                                                         // 186
};                                                                                                                // 187
//         [*] End of lib/eventemitter.js                                                                         // 188
                                                                                                                  // 189
                                                                                                                  // 190
//         [*] Including lib/utils.js                                                                             // 191
/*                                                                                                                // 192
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 193
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 194
 *                                                                                                                // 195
 * For the license see COPYING.                                                                                   // 196
 * ***** END LICENSE BLOCK *****                                                                                  // 197
 */                                                                                                               // 198
                                                                                                                  // 199
var random_string_chars = 'abcdefghijklmnopqrstuvwxyz0123456789_';                                                // 200
utils.random_string = function(length, max) {                                                                     // 201
    max = max || random_string_chars.length;                                                                      // 202
    var i, ret = [];                                                                                              // 203
    for(i=0; i < length; i++) {                                                                                   // 204
        ret.push( random_string_chars.substr(Math.floor(Math.random() * max),1) );                                // 205
    }                                                                                                             // 206
    return ret.join('');                                                                                          // 207
};                                                                                                                // 208
utils.random_number = function(max) {                                                                             // 209
    return Math.floor(Math.random() * max);                                                                       // 210
};                                                                                                                // 211
utils.random_number_string = function(max) {                                                                      // 212
    var t = (''+(max - 1)).length;                                                                                // 213
    var p = Array(t+1).join('0');                                                                                 // 214
    return (p + utils.random_number(max)).slice(-t);                                                              // 215
};                                                                                                                // 216
                                                                                                                  // 217
// Assuming that url looks like: http://asdasd:111/asd                                                            // 218
utils.getOrigin = function(url) {                                                                                 // 219
    url += '/';                                                                                                   // 220
    var parts = url.split('/').slice(0, 3);                                                                       // 221
    return parts.join('/');                                                                                       // 222
};                                                                                                                // 223
                                                                                                                  // 224
utils.isSameOriginUrl = function(url_a, url_b) {                                                                  // 225
    // location.origin would do, but it's not always available.                                                   // 226
    if (!url_b) url_b = _window.location.href;                                                                    // 227
                                                                                                                  // 228
    return (url_a.split('/').slice(0,3).join('/')                                                                 // 229
                ===                                                                                               // 230
            url_b.split('/').slice(0,3).join('/'));                                                               // 231
};                                                                                                                // 232
                                                                                                                  // 233
// <METEOR>                                                                                                       // 234
// https://github.com/sockjs/sockjs-client/issues/79                                                              // 235
utils.isSameOriginScheme = function(url_a, url_b) {                                                               // 236
    if (!url_b) url_b = _window.location.href;                                                                    // 237
                                                                                                                  // 238
    return (url_a.split(':')[0]                                                                                   // 239
                ===                                                                                               // 240
            url_b.split(':')[0]);                                                                                 // 241
};                                                                                                                // 242
// </METEOR>                                                                                                      // 243
                                                                                                                  // 244
                                                                                                                  // 245
utils.getParentDomain = function(url) {                                                                           // 246
    // ipv4 ip address                                                                                            // 247
    if (/^[0-9.]*$/.test(url)) return url;                                                                        // 248
    // ipv6 ip address                                                                                            // 249
    if (/^\[/.test(url)) return url;                                                                              // 250
    // no dots                                                                                                    // 251
    if (!(/[.]/.test(url))) return url;                                                                           // 252
                                                                                                                  // 253
    var parts = url.split('.').slice(1);                                                                          // 254
    return parts.join('.');                                                                                       // 255
};                                                                                                                // 256
                                                                                                                  // 257
utils.objectExtend = function(dst, src) {                                                                         // 258
    for(var k in src) {                                                                                           // 259
        if (src.hasOwnProperty(k)) {                                                                              // 260
            dst[k] = src[k];                                                                                      // 261
        }                                                                                                         // 262
    }                                                                                                             // 263
    return dst;                                                                                                   // 264
};                                                                                                                // 265
                                                                                                                  // 266
var WPrefix = '_jp';                                                                                              // 267
                                                                                                                  // 268
utils.polluteGlobalNamespace = function() {                                                                       // 269
    if (!(WPrefix in _window)) {                                                                                  // 270
        _window[WPrefix] = {};                                                                                    // 271
    }                                                                                                             // 272
};                                                                                                                // 273
                                                                                                                  // 274
utils.closeFrame = function (code, reason) {                                                                      // 275
    return 'c'+JSON.stringify([code, reason]);                                                                    // 276
};                                                                                                                // 277
                                                                                                                  // 278
utils.userSetCode = function (code) {                                                                             // 279
    return code === 1000 || (code >= 3000 && code <= 4999);                                                       // 280
};                                                                                                                // 281
                                                                                                                  // 282
// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/                                         // 283
// and RFC 2988.                                                                                                  // 284
utils.countRTO = function (rtt) {                                                                                 // 285
    var rto;                                                                                                      // 286
    if (rtt > 100) {                                                                                              // 287
        rto = 3 * rtt; // rto > 300msec                                                                           // 288
    } else {                                                                                                      // 289
        rto = rtt + 200; // 200msec < rto <= 300msec                                                              // 290
    }                                                                                                             // 291
    return rto;                                                                                                   // 292
}                                                                                                                 // 293
                                                                                                                  // 294
utils.log = function() {                                                                                          // 295
    if (_window.console && console.log && console.log.apply) {                                                    // 296
        console.log.apply(console, arguments);                                                                    // 297
    }                                                                                                             // 298
};                                                                                                                // 299
                                                                                                                  // 300
utils.bind = function(fun, that) {                                                                                // 301
    if (fun.bind) {                                                                                               // 302
        return fun.bind(that);                                                                                    // 303
    } else {                                                                                                      // 304
        return function() {                                                                                       // 305
            return fun.apply(that, arguments);                                                                    // 306
        };                                                                                                        // 307
    }                                                                                                             // 308
};                                                                                                                // 309
                                                                                                                  // 310
utils.flatUrl = function(url) {                                                                                   // 311
    return url.indexOf('?') === -1 && url.indexOf('#') === -1;                                                    // 312
};                                                                                                                // 313
                                                                                                                  // 314
utils.amendUrl = function(url) {                                                                                  // 315
    var dl = _document.location;                                                                                  // 316
    if (!url) {                                                                                                   // 317
        throw new Error('Wrong url for SockJS');                                                                  // 318
    }                                                                                                             // 319
    if (!utils.flatUrl(url)) {                                                                                    // 320
        throw new Error('Only basic urls are supported in SockJS');                                               // 321
    }                                                                                                             // 322
                                                                                                                  // 323
    //  '//abc' --> 'http://abc'                                                                                  // 324
    if (url.indexOf('//') === 0) {                                                                                // 325
        url = dl.protocol + url;                                                                                  // 326
    }                                                                                                             // 327
    // '/abc' --> 'http://localhost:1234/abc'                                                                     // 328
    if (url.indexOf('/') === 0) {                                                                                 // 329
        url = dl.protocol + '//' + dl.host + url;                                                                 // 330
    }                                                                                                             // 331
    // strip trailing slashes                                                                                     // 332
    url = url.replace(/[/]+$/,'');                                                                                // 333
                                                                                                                  // 334
    // We have a full url here, with proto and host. For some browsers                                            // 335
    // http://localhost:80/ is not in the same origin as http://localhost/                                        // 336
	// Remove explicit :80 or :443 in such cases. See #74                                                            // 337
    var parts = url.split("/");                                                                                   // 338
    if ((parts[0] === "http:" && /:80$/.test(parts[2])) ||                                                        // 339
	    (parts[0] === "https:" && /:443$/.test(parts[2]))) {                                                         // 340
		parts[2] = parts[2].replace(/:(80|443)$/, "");                                                                  // 341
	}                                                                                                                // 342
    url = parts.join("/");                                                                                        // 343
    return url;                                                                                                   // 344
};                                                                                                                // 345
                                                                                                                  // 346
// IE doesn't support [].indexOf.                                                                                 // 347
utils.arrIndexOf = function(arr, obj){                                                                            // 348
    for(var i=0; i < arr.length; i++){                                                                            // 349
        if(arr[i] === obj){                                                                                       // 350
            return i;                                                                                             // 351
        }                                                                                                         // 352
    }                                                                                                             // 353
    return -1;                                                                                                    // 354
};                                                                                                                // 355
                                                                                                                  // 356
utils.arrSkip = function(arr, obj) {                                                                              // 357
    var idx = utils.arrIndexOf(arr, obj);                                                                         // 358
    if (idx === -1) {                                                                                             // 359
        return arr.slice();                                                                                       // 360
    } else {                                                                                                      // 361
        var dst = arr.slice(0, idx);                                                                              // 362
        return dst.concat(arr.slice(idx+1));                                                                      // 363
    }                                                                                                             // 364
};                                                                                                                // 365
                                                                                                                  // 366
// Via: https://gist.github.com/1133122/2121c601c5549155483f50be3da5305e83b8c5df                                  // 367
utils.isArray = Array.isArray || function(value) {                                                                // 368
    return {}.toString.call(value).indexOf('Array') >= 0                                                          // 369
};                                                                                                                // 370
                                                                                                                  // 371
utils.delay = function(t, fun) {                                                                                  // 372
    if(typeof t === 'function') {                                                                                 // 373
        fun = t;                                                                                                  // 374
        t = 0;                                                                                                    // 375
    }                                                                                                             // 376
    return setTimeout(fun, t);                                                                                    // 377
};                                                                                                                // 378
                                                                                                                  // 379
                                                                                                                  // 380
// Chars worth escaping, as defined by Douglas Crockford:                                                         // 381
//   https://github.com/douglascrockford/JSON-js/blob/47a9882cddeb1e8529e07af9736218075372b8ac/json2.js#L196      // 382
var json_escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    json_lookup = {                                                                                               // 384
"\u0000":"\\u0000","\u0001":"\\u0001","\u0002":"\\u0002","\u0003":"\\u0003",                                      // 385
"\u0004":"\\u0004","\u0005":"\\u0005","\u0006":"\\u0006","\u0007":"\\u0007",                                      // 386
"\b":"\\b","\t":"\\t","\n":"\\n","\u000b":"\\u000b","\f":"\\f","\r":"\\r",                                        // 387
"\u000e":"\\u000e","\u000f":"\\u000f","\u0010":"\\u0010","\u0011":"\\u0011",                                      // 388
"\u0012":"\\u0012","\u0013":"\\u0013","\u0014":"\\u0014","\u0015":"\\u0015",                                      // 389
"\u0016":"\\u0016","\u0017":"\\u0017","\u0018":"\\u0018","\u0019":"\\u0019",                                      // 390
"\u001a":"\\u001a","\u001b":"\\u001b","\u001c":"\\u001c","\u001d":"\\u001d",                                      // 391
"\u001e":"\\u001e","\u001f":"\\u001f","\"":"\\\"","\\":"\\\\",                                                    // 392
"\u007f":"\\u007f","\u0080":"\\u0080","\u0081":"\\u0081","\u0082":"\\u0082",                                      // 393
"\u0083":"\\u0083","\u0084":"\\u0084","\u0085":"\\u0085","\u0086":"\\u0086",                                      // 394
"\u0087":"\\u0087","\u0088":"\\u0088","\u0089":"\\u0089","\u008a":"\\u008a",                                      // 395
"\u008b":"\\u008b","\u008c":"\\u008c","\u008d":"\\u008d","\u008e":"\\u008e",                                      // 396
"\u008f":"\\u008f","\u0090":"\\u0090","\u0091":"\\u0091","\u0092":"\\u0092",                                      // 397
"\u0093":"\\u0093","\u0094":"\\u0094","\u0095":"\\u0095","\u0096":"\\u0096",                                      // 398
"\u0097":"\\u0097","\u0098":"\\u0098","\u0099":"\\u0099","\u009a":"\\u009a",                                      // 399
"\u009b":"\\u009b","\u009c":"\\u009c","\u009d":"\\u009d","\u009e":"\\u009e",                                      // 400
"\u009f":"\\u009f","\u00ad":"\\u00ad","\u0600":"\\u0600","\u0601":"\\u0601",                                      // 401
"\u0602":"\\u0602","\u0603":"\\u0603","\u0604":"\\u0604","\u070f":"\\u070f",                                      // 402
"\u17b4":"\\u17b4","\u17b5":"\\u17b5","\u200c":"\\u200c","\u200d":"\\u200d",                                      // 403
"\u200e":"\\u200e","\u200f":"\\u200f","\u2028":"\\u2028","\u2029":"\\u2029",                                      // 404
"\u202a":"\\u202a","\u202b":"\\u202b","\u202c":"\\u202c","\u202d":"\\u202d",                                      // 405
"\u202e":"\\u202e","\u202f":"\\u202f","\u2060":"\\u2060","\u2061":"\\u2061",                                      // 406
"\u2062":"\\u2062","\u2063":"\\u2063","\u2064":"\\u2064","\u2065":"\\u2065",                                      // 407
"\u2066":"\\u2066","\u2067":"\\u2067","\u2068":"\\u2068","\u2069":"\\u2069",                                      // 408
"\u206a":"\\u206a","\u206b":"\\u206b","\u206c":"\\u206c","\u206d":"\\u206d",                                      // 409
"\u206e":"\\u206e","\u206f":"\\u206f","\ufeff":"\\ufeff","\ufff0":"\\ufff0",                                      // 410
"\ufff1":"\\ufff1","\ufff2":"\\ufff2","\ufff3":"\\ufff3","\ufff4":"\\ufff4",                                      // 411
"\ufff5":"\\ufff5","\ufff6":"\\ufff6","\ufff7":"\\ufff7","\ufff8":"\\ufff8",                                      // 412
"\ufff9":"\\ufff9","\ufffa":"\\ufffa","\ufffb":"\\ufffb","\ufffc":"\\ufffc",                                      // 413
"\ufffd":"\\ufffd","\ufffe":"\\ufffe","\uffff":"\\uffff"};                                                        // 414
                                                                                                                  // 415
// Some extra characters that Chrome gets wrong, and substitutes with                                             // 416
// something else on the wire.                                                                                    // 417
var extra_escapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,
    extra_lookup;                                                                                                 // 419
                                                                                                                  // 420
// JSON Quote string. Use native implementation when possible.                                                    // 421
var JSONQuote = (JSON && JSON.stringify) || function(string) {                                                    // 422
    json_escapable.lastIndex = 0;                                                                                 // 423
    if (json_escapable.test(string)) {                                                                            // 424
        string = string.replace(json_escapable, function(a) {                                                     // 425
            return json_lookup[a];                                                                                // 426
        });                                                                                                       // 427
    }                                                                                                             // 428
    return '"' + string + '"';                                                                                    // 429
};                                                                                                                // 430
                                                                                                                  // 431
// This may be quite slow, so let's delay until user actually uses bad                                            // 432
// characters.                                                                                                    // 433
var unroll_lookup = function(escapable) {                                                                         // 434
    var i;                                                                                                        // 435
    var unrolled = {}                                                                                             // 436
    var c = []                                                                                                    // 437
    for(i=0; i<65536; i++) {                                                                                      // 438
        c.push( String.fromCharCode(i) );                                                                         // 439
    }                                                                                                             // 440
    escapable.lastIndex = 0;                                                                                      // 441
    c.join('').replace(escapable, function (a) {                                                                  // 442
        unrolled[ a ] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);                                // 443
        return '';                                                                                                // 444
    });                                                                                                           // 445
    escapable.lastIndex = 0;                                                                                      // 446
    return unrolled;                                                                                              // 447
};                                                                                                                // 448
                                                                                                                  // 449
// Quote string, also taking care of unicode characters that browsers                                             // 450
// often break. Especially, take care of unicode surrogates:                                                      // 451
//    http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates                                       // 452
utils.quote = function(string) {                                                                                  // 453
    var quoted = JSONQuote(string);                                                                               // 454
                                                                                                                  // 455
    // In most cases this should be very fast and good enough.                                                    // 456
    extra_escapable.lastIndex = 0;                                                                                // 457
    if(!extra_escapable.test(quoted)) {                                                                           // 458
        return quoted;                                                                                            // 459
    }                                                                                                             // 460
                                                                                                                  // 461
    if(!extra_lookup) extra_lookup = unroll_lookup(extra_escapable);                                              // 462
                                                                                                                  // 463
    return quoted.replace(extra_escapable, function(a) {                                                          // 464
        return extra_lookup[a];                                                                                   // 465
    });                                                                                                           // 466
}                                                                                                                 // 467
                                                                                                                  // 468
var _all_protocols = ['websocket',                                                                                // 469
                      'xdr-streaming',                                                                            // 470
                      'xhr-streaming',                                                                            // 471
                      'iframe-eventsource',                                                                       // 472
                      'iframe-htmlfile',                                                                          // 473
                      'xdr-polling',                                                                              // 474
                      'xhr-polling',                                                                              // 475
                      'iframe-xhr-polling',                                                                       // 476
                      'jsonp-polling'];                                                                           // 477
                                                                                                                  // 478
utils.probeProtocols = function() {                                                                               // 479
    var probed = {};                                                                                              // 480
    for(var i=0; i<_all_protocols.length; i++) {                                                                  // 481
        var protocol = _all_protocols[i];                                                                         // 482
        // User can have a typo in protocol name.                                                                 // 483
        probed[protocol] = SockJS[protocol] &&                                                                    // 484
                           SockJS[protocol].enabled();                                                            // 485
    }                                                                                                             // 486
    return probed;                                                                                                // 487
};                                                                                                                // 488
                                                                                                                  // 489
utils.detectProtocols = function(probed, protocols_whitelist, info) {                                             // 490
    var pe = {},                                                                                                  // 491
        protocols = [];                                                                                           // 492
    if (!protocols_whitelist) protocols_whitelist = _all_protocols;                                               // 493
    for(var i=0; i<protocols_whitelist.length; i++) {                                                             // 494
        var protocol = protocols_whitelist[i];                                                                    // 495
        pe[protocol] = probed[protocol];                                                                          // 496
    }                                                                                                             // 497
    var maybe_push = function(protos) {                                                                           // 498
        var proto = protos.shift();                                                                               // 499
        if (pe[proto]) {                                                                                          // 500
            protocols.push(proto);                                                                                // 501
        } else {                                                                                                  // 502
            if (protos.length > 0) {                                                                              // 503
                maybe_push(protos);                                                                               // 504
            }                                                                                                     // 505
        }                                                                                                         // 506
    }                                                                                                             // 507
                                                                                                                  // 508
    // 1. Websocket                                                                                               // 509
    if (info.websocket !== false) {                                                                               // 510
        maybe_push(['websocket']);                                                                                // 511
    }                                                                                                             // 512
                                                                                                                  // 513
    // 2. Streaming                                                                                               // 514
    if (pe['xhr-streaming'] && !info.null_origin) {                                                               // 515
        protocols.push('xhr-streaming');                                                                          // 516
    } else {                                                                                                      // 517
        if (pe['xdr-streaming'] && !info.cookie_needed && !info.null_origin) {                                    // 518
            protocols.push('xdr-streaming');                                                                      // 519
        } else {                                                                                                  // 520
            maybe_push(['iframe-eventsource',                                                                     // 521
                        'iframe-htmlfile']);                                                                      // 522
        }                                                                                                         // 523
    }                                                                                                             // 524
                                                                                                                  // 525
    // 3. Polling                                                                                                 // 526
    if (pe['xhr-polling'] && !info.null_origin) {                                                                 // 527
        protocols.push('xhr-polling');                                                                            // 528
    } else {                                                                                                      // 529
        if (pe['xdr-polling'] && !info.cookie_needed && !info.null_origin) {                                      // 530
            protocols.push('xdr-polling');                                                                        // 531
        } else {                                                                                                  // 532
            maybe_push(['iframe-xhr-polling',                                                                     // 533
                        'jsonp-polling']);                                                                        // 534
        }                                                                                                         // 535
    }                                                                                                             // 536
    return protocols;                                                                                             // 537
}                                                                                                                 // 538
//         [*] End of lib/utils.js                                                                                // 539
                                                                                                                  // 540
                                                                                                                  // 541
//         [*] Including lib/dom.js                                                                               // 542
/*                                                                                                                // 543
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 544
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 545
 *                                                                                                                // 546
 * For the license see COPYING.                                                                                   // 547
 * ***** END LICENSE BLOCK *****                                                                                  // 548
 */                                                                                                               // 549
                                                                                                                  // 550
// May be used by htmlfile jsonp and transports.                                                                  // 551
var MPrefix = '_sockjs_global';                                                                                   // 552
utils.createHook = function() {                                                                                   // 553
    var window_id = 'a' + utils.random_string(8);                                                                 // 554
    if (!(MPrefix in _window)) {                                                                                  // 555
        var map = {};                                                                                             // 556
        _window[MPrefix] = function(window_id) {                                                                  // 557
            if (!(window_id in map)) {                                                                            // 558
                map[window_id] = {                                                                                // 559
                    id: window_id,                                                                                // 560
                    del: function() {delete map[window_id];}                                                      // 561
                };                                                                                                // 562
            }                                                                                                     // 563
            return map[window_id];                                                                                // 564
        }                                                                                                         // 565
    }                                                                                                             // 566
    return _window[MPrefix](window_id);                                                                           // 567
};                                                                                                                // 568
                                                                                                                  // 569
                                                                                                                  // 570
                                                                                                                  // 571
utils.attachMessage = function(listener) {                                                                        // 572
    utils.attachEvent('message', listener);                                                                       // 573
};                                                                                                                // 574
utils.attachEvent = function(event, listener) {                                                                   // 575
    if (typeof _window.addEventListener !== 'undefined') {                                                        // 576
        _window.addEventListener(event, listener, false);                                                         // 577
    } else {                                                                                                      // 578
        // IE quirks.                                                                                             // 579
        // According to: http://stevesouders.com/misc/test-postmessage.php                                        // 580
        // the message gets delivered only to 'document', not 'window'.                                           // 581
        _document.attachEvent("on" + event, listener);                                                            // 582
        // I get 'window' for ie8.                                                                                // 583
        _window.attachEvent("on" + event, listener);                                                              // 584
    }                                                                                                             // 585
};                                                                                                                // 586
                                                                                                                  // 587
utils.detachMessage = function(listener) {                                                                        // 588
    utils.detachEvent('message', listener);                                                                       // 589
};                                                                                                                // 590
utils.detachEvent = function(event, listener) {                                                                   // 591
    if (typeof _window.addEventListener !== 'undefined') {                                                        // 592
        _window.removeEventListener(event, listener, false);                                                      // 593
    } else {                                                                                                      // 594
        _document.detachEvent("on" + event, listener);                                                            // 595
        _window.detachEvent("on" + event, listener);                                                              // 596
    }                                                                                                             // 597
};                                                                                                                // 598
                                                                                                                  // 599
                                                                                                                  // 600
var on_unload = {};                                                                                               // 601
// Things registered after beforeunload are to be called immediately.                                             // 602
var after_unload = false;                                                                                         // 603
                                                                                                                  // 604
var trigger_unload_callbacks = function() {                                                                       // 605
    for(var ref in on_unload) {                                                                                   // 606
        on_unload[ref]();                                                                                         // 607
        delete on_unload[ref];                                                                                    // 608
    };                                                                                                            // 609
};                                                                                                                // 610
                                                                                                                  // 611
var unload_triggered = function() {                                                                               // 612
    if(after_unload) return;                                                                                      // 613
    after_unload = true;                                                                                          // 614
    trigger_unload_callbacks();                                                                                   // 615
};                                                                                                                // 616
                                                                                                                  // 617
// 'unload' alone is not reliable in opera within an iframe, but we                                               // 618
// can't use `beforeunload` as IE fires it on javascript: links.                                                  // 619
utils.attachEvent('unload', unload_triggered);                                                                    // 620
                                                                                                                  // 621
utils.unload_add = function(listener) {                                                                           // 622
    var ref = utils.random_string(8);                                                                             // 623
    on_unload[ref] = listener;                                                                                    // 624
    if (after_unload) {                                                                                           // 625
        utils.delay(trigger_unload_callbacks);                                                                    // 626
    }                                                                                                             // 627
    return ref;                                                                                                   // 628
};                                                                                                                // 629
utils.unload_del = function(ref) {                                                                                // 630
    if (ref in on_unload)                                                                                         // 631
        delete on_unload[ref];                                                                                    // 632
};                                                                                                                // 633
                                                                                                                  // 634
                                                                                                                  // 635
utils.createIframe = function (iframe_url, error_callback) {                                                      // 636
    var iframe = _document.createElement('iframe');                                                               // 637
    var tref, unload_ref;                                                                                         // 638
    var unattach = function() {                                                                                   // 639
        clearTimeout(tref);                                                                                       // 640
        // Explorer had problems with that.                                                                       // 641
        try {iframe.onload = null;} catch (x) {}                                                                  // 642
        iframe.onerror = null;                                                                                    // 643
    };                                                                                                            // 644
    var cleanup = function() {                                                                                    // 645
        if (iframe) {                                                                                             // 646
            unattach();                                                                                           // 647
            // This timeout makes chrome fire onbeforeunload event                                                // 648
            // within iframe. Without the timeout it goes straight to                                             // 649
            // onunload.                                                                                          // 650
            setTimeout(function() {                                                                               // 651
                if(iframe) {                                                                                      // 652
                    iframe.parentNode.removeChild(iframe);                                                        // 653
                }                                                                                                 // 654
                iframe = null;                                                                                    // 655
            }, 0);                                                                                                // 656
            utils.unload_del(unload_ref);                                                                         // 657
        }                                                                                                         // 658
    };                                                                                                            // 659
    var onerror = function(r) {                                                                                   // 660
        if (iframe) {                                                                                             // 661
            cleanup();                                                                                            // 662
            error_callback(r);                                                                                    // 663
        }                                                                                                         // 664
    };                                                                                                            // 665
    var post = function(msg, origin) {                                                                            // 666
        try {                                                                                                     // 667
            // When the iframe is not loaded, IE raises an exception                                              // 668
            // on 'contentWindow'.                                                                                // 669
            if (iframe && iframe.contentWindow) {                                                                 // 670
                iframe.contentWindow.postMessage(msg, origin);                                                    // 671
            }                                                                                                     // 672
        } catch (x) {};                                                                                           // 673
    };                                                                                                            // 674
                                                                                                                  // 675
    iframe.src = iframe_url;                                                                                      // 676
    iframe.style.display = 'none';                                                                                // 677
    iframe.style.position = 'absolute';                                                                           // 678
    iframe.onerror = function(){onerror('onerror');};                                                             // 679
    iframe.onload = function() {                                                                                  // 680
        // `onload` is triggered before scripts on the iframe are                                                 // 681
        // executed. Give it few seconds to actually load stuff.                                                  // 682
        clearTimeout(tref);                                                                                       // 683
        tref = setTimeout(function(){onerror('onload timeout');}, 2000);                                          // 684
    };                                                                                                            // 685
    _document.body.appendChild(iframe);                                                                           // 686
    tref = setTimeout(function(){onerror('timeout');}, 15000);                                                    // 687
    unload_ref = utils.unload_add(cleanup);                                                                       // 688
    return {                                                                                                      // 689
        post: post,                                                                                               // 690
        cleanup: cleanup,                                                                                         // 691
        loaded: unattach                                                                                          // 692
    };                                                                                                            // 693
};                                                                                                                // 694
                                                                                                                  // 695
utils.createHtmlfile = function (iframe_url, error_callback) {                                                    // 696
    var doc = new ActiveXObject('htmlfile');                                                                      // 697
    var tref, unload_ref;                                                                                         // 698
    var iframe;                                                                                                   // 699
    var unattach = function() {                                                                                   // 700
        clearTimeout(tref);                                                                                       // 701
    };                                                                                                            // 702
    var cleanup = function() {                                                                                    // 703
        if (doc) {                                                                                                // 704
            unattach();                                                                                           // 705
            utils.unload_del(unload_ref);                                                                         // 706
            iframe.parentNode.removeChild(iframe);                                                                // 707
            iframe = doc = null;                                                                                  // 708
            CollectGarbage();                                                                                     // 709
        }                                                                                                         // 710
    };                                                                                                            // 711
    var onerror = function(r)  {                                                                                  // 712
        if (doc) {                                                                                                // 713
            cleanup();                                                                                            // 714
            error_callback(r);                                                                                    // 715
        }                                                                                                         // 716
    };                                                                                                            // 717
    var post = function(msg, origin) {                                                                            // 718
        try {                                                                                                     // 719
            // When the iframe is not loaded, IE raises an exception                                              // 720
            // on 'contentWindow'.                                                                                // 721
            if (iframe && iframe.contentWindow) {                                                                 // 722
                iframe.contentWindow.postMessage(msg, origin);                                                    // 723
            }                                                                                                     // 724
        } catch (x) {};                                                                                           // 725
    };                                                                                                            // 726
                                                                                                                  // 727
    doc.open();                                                                                                   // 728
    doc.write('<html><s' + 'cript>' +                                                                             // 729
              'document.domain="' + document.domain + '";' +                                                      // 730
              '</s' + 'cript></html>');                                                                           // 731
    doc.close();                                                                                                  // 732
    doc.parentWindow[WPrefix] = _window[WPrefix];                                                                 // 733
    var c = doc.createElement('div');                                                                             // 734
    doc.body.appendChild(c);                                                                                      // 735
    iframe = doc.createElement('iframe');                                                                         // 736
    c.appendChild(iframe);                                                                                        // 737
    iframe.src = iframe_url;                                                                                      // 738
    tref = setTimeout(function(){onerror('timeout');}, 15000);                                                    // 739
    unload_ref = utils.unload_add(cleanup);                                                                       // 740
    return {                                                                                                      // 741
        post: post,                                                                                               // 742
        cleanup: cleanup,                                                                                         // 743
        loaded: unattach                                                                                          // 744
    };                                                                                                            // 745
};                                                                                                                // 746
//         [*] End of lib/dom.js                                                                                  // 747
                                                                                                                  // 748
                                                                                                                  // 749
//         [*] Including lib/dom2.js                                                                              // 750
/*                                                                                                                // 751
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 752
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 753
 *                                                                                                                // 754
 * For the license see COPYING.                                                                                   // 755
 * ***** END LICENSE BLOCK *****                                                                                  // 756
 */                                                                                                               // 757
                                                                                                                  // 758
var AbstractXHRObject = function(){};                                                                             // 759
AbstractXHRObject.prototype = new EventEmitter(['chunk', 'finish']);                                              // 760
                                                                                                                  // 761
AbstractXHRObject.prototype._start = function(method, url, payload, opts) {                                       // 762
    var that = this;                                                                                              // 763
                                                                                                                  // 764
    try {                                                                                                         // 765
        that.xhr = new XMLHttpRequest();                                                                          // 766
    } catch(x) {};                                                                                                // 767
                                                                                                                  // 768
    if (!that.xhr) {                                                                                              // 769
        try {                                                                                                     // 770
            that.xhr = new _window.ActiveXObject('Microsoft.XMLHTTP');                                            // 771
        } catch(x) {};                                                                                            // 772
    }                                                                                                             // 773
    if (_window.ActiveXObject || _window.XDomainRequest) {                                                        // 774
        // IE8 caches even POSTs                                                                                  // 775
        url += ((url.indexOf('?') === -1) ? '?' : '&') + 't='+(+new Date);                                        // 776
    }                                                                                                             // 777
                                                                                                                  // 778
    // Explorer tends to keep connection open, even after the                                                     // 779
    // tab gets closed: http://bugs.jquery.com/ticket/5280                                                        // 780
    that.unload_ref = utils.unload_add(function(){that._cleanup(true);});                                         // 781
    try {                                                                                                         // 782
        that.xhr.open(method, url, true);                                                                         // 783
    } catch(e) {                                                                                                  // 784
        // IE raises an exception on wrong port.                                                                  // 785
        that.emit('finish', 0, '');                                                                               // 786
        that._cleanup();                                                                                          // 787
        return;                                                                                                   // 788
    };                                                                                                            // 789
                                                                                                                  // 790
    if (!opts || !opts.no_credentials) {                                                                          // 791
        // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :                                    // 792
        // "This never affects same-site requests."                                                               // 793
        that.xhr.withCredentials = 'true';                                                                        // 794
    }                                                                                                             // 795
    if (opts && opts.headers) {                                                                                   // 796
        for(var key in opts.headers) {                                                                            // 797
            that.xhr.setRequestHeader(key, opts.headers[key]);                                                    // 798
        }                                                                                                         // 799
    }                                                                                                             // 800
                                                                                                                  // 801
    that.xhr.onreadystatechange = function() {                                                                    // 802
        if (that.xhr) {                                                                                           // 803
            var x = that.xhr;                                                                                     // 804
            switch (x.readyState) {                                                                               // 805
            case 3:                                                                                               // 806
                // IE doesn't like peeking into responseText or status                                            // 807
                // on Microsoft.XMLHTTP and readystate=3                                                          // 808
                try {                                                                                             // 809
                    var status = x.status;                                                                        // 810
                    var text = x.responseText;                                                                    // 811
                } catch (x) {};                                                                                   // 812
                // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450                                    // 813
                if (status === 1223) status = 204;                                                                // 814
                                                                                                                  // 815
                // IE does return readystate == 3 for 404 answers.                                                // 816
                if (text && text.length > 0) {                                                                    // 817
                    that.emit('chunk', status, text);                                                             // 818
                }                                                                                                 // 819
                break;                                                                                            // 820
            case 4:                                                                                               // 821
                var status = x.status;                                                                            // 822
                // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450                                    // 823
                if (status === 1223) status = 204;                                                                // 824
                                                                                                                  // 825
                that.emit('finish', status, x.responseText);                                                      // 826
                that._cleanup(false);                                                                             // 827
                break;                                                                                            // 828
            }                                                                                                     // 829
        }                                                                                                         // 830
    };                                                                                                            // 831
    that.xhr.send(payload);                                                                                       // 832
};                                                                                                                // 833
                                                                                                                  // 834
AbstractXHRObject.prototype._cleanup = function(abort) {                                                          // 835
    var that = this;                                                                                              // 836
    if (!that.xhr) return;                                                                                        // 837
    utils.unload_del(that.unload_ref);                                                                            // 838
                                                                                                                  // 839
    // IE needs this field to be a function                                                                       // 840
    that.xhr.onreadystatechange = function(){};                                                                   // 841
                                                                                                                  // 842
    if (abort) {                                                                                                  // 843
        try {                                                                                                     // 844
            that.xhr.abort();                                                                                     // 845
        } catch(x) {};                                                                                            // 846
    }                                                                                                             // 847
    that.unload_ref = that.xhr = null;                                                                            // 848
};                                                                                                                // 849
                                                                                                                  // 850
AbstractXHRObject.prototype.close = function() {                                                                  // 851
    var that = this;                                                                                              // 852
    that.nuke();                                                                                                  // 853
    that._cleanup(true);                                                                                          // 854
};                                                                                                                // 855
                                                                                                                  // 856
var XHRCorsObject = utils.XHRCorsObject = function() {                                                            // 857
    var that = this, args = arguments;                                                                            // 858
    utils.delay(function(){that._start.apply(that, args);});                                                      // 859
};                                                                                                                // 860
XHRCorsObject.prototype = new AbstractXHRObject();                                                                // 861
                                                                                                                  // 862
var XHRLocalObject = utils.XHRLocalObject = function(method, url, payload) {                                      // 863
    var that = this;                                                                                              // 864
    utils.delay(function(){                                                                                       // 865
        that._start(method, url, payload, {                                                                       // 866
            no_credentials: true                                                                                  // 867
        });                                                                                                       // 868
    });                                                                                                           // 869
};                                                                                                                // 870
XHRLocalObject.prototype = new AbstractXHRObject();                                                               // 871
                                                                                                                  // 872
                                                                                                                  // 873
                                                                                                                  // 874
// References:                                                                                                    // 875
//   http://ajaxian.com/archives/100-line-ajax-wrapper                                                            // 876
//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx                                               // 877
var XDRObject = utils.XDRObject = function(method, url, payload) {                                                // 878
    var that = this;                                                                                              // 879
    utils.delay(function(){that._start(method, url, payload);});                                                  // 880
};                                                                                                                // 881
XDRObject.prototype = new EventEmitter(['chunk', 'finish']);                                                      // 882
XDRObject.prototype._start = function(method, url, payload) {                                                     // 883
    var that = this;                                                                                              // 884
    var xdr = new XDomainRequest();                                                                               // 885
    // IE caches even POSTs                                                                                       // 886
    url += ((url.indexOf('?') === -1) ? '?' : '&') + 't='+(+new Date);                                            // 887
                                                                                                                  // 888
    var onerror = xdr.ontimeout = xdr.onerror = function() {                                                      // 889
        that.emit('finish', 0, '');                                                                               // 890
        that._cleanup(false);                                                                                     // 891
    };                                                                                                            // 892
    xdr.onprogress = function() {                                                                                 // 893
        that.emit('chunk', 200, xdr.responseText);                                                                // 894
    };                                                                                                            // 895
    xdr.onload = function() {                                                                                     // 896
        that.emit('finish', 200, xdr.responseText);                                                               // 897
        that._cleanup(false);                                                                                     // 898
    };                                                                                                            // 899
    that.xdr = xdr;                                                                                               // 900
    that.unload_ref = utils.unload_add(function(){that._cleanup(true);});                                         // 901
    try {                                                                                                         // 902
        // Fails with AccessDenied if port number is bogus                                                        // 903
        that.xdr.open(method, url);                                                                               // 904
        that.xdr.send(payload);                                                                                   // 905
    } catch(x) {                                                                                                  // 906
        onerror();                                                                                                // 907
    }                                                                                                             // 908
};                                                                                                                // 909
                                                                                                                  // 910
XDRObject.prototype._cleanup = function(abort) {                                                                  // 911
    var that = this;                                                                                              // 912
    if (!that.xdr) return;                                                                                        // 913
    utils.unload_del(that.unload_ref);                                                                            // 914
                                                                                                                  // 915
    that.xdr.ontimeout = that.xdr.onerror = that.xdr.onprogress =                                                 // 916
        that.xdr.onload = null;                                                                                   // 917
    if (abort) {                                                                                                  // 918
        try {                                                                                                     // 919
            that.xdr.abort();                                                                                     // 920
        } catch(x) {};                                                                                            // 921
    }                                                                                                             // 922
    that.unload_ref = that.xdr = null;                                                                            // 923
};                                                                                                                // 924
                                                                                                                  // 925
XDRObject.prototype.close = function() {                                                                          // 926
    var that = this;                                                                                              // 927
    that.nuke();                                                                                                  // 928
    that._cleanup(true);                                                                                          // 929
};                                                                                                                // 930
                                                                                                                  // 931
// 1. Is natively via XHR                                                                                         // 932
// 2. Is natively via XDR                                                                                         // 933
// 3. Nope, but postMessage is there so it should work via the Iframe.                                            // 934
// 4. Nope, sorry.                                                                                                // 935
utils.isXHRCorsCapable = function() {                                                                             // 936
    if (_window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()) {                                    // 937
        return 1;                                                                                                 // 938
    }                                                                                                             // 939
    // XDomainRequest doesn't work if page is served from file://                                                 // 940
    if (_window.XDomainRequest && _document.domain) {                                                             // 941
        return 2;                                                                                                 // 942
    }                                                                                                             // 943
    if (IframeTransport.enabled()) {                                                                              // 944
        return 3;                                                                                                 // 945
    }                                                                                                             // 946
    return 4;                                                                                                     // 947
};                                                                                                                // 948
//         [*] End of lib/dom2.js                                                                                 // 949
                                                                                                                  // 950
                                                                                                                  // 951
//         [*] Including lib/sockjs.js                                                                            // 952
/*                                                                                                                // 953
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 954
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 955
 *                                                                                                                // 956
 * For the license see COPYING.                                                                                   // 957
 * ***** END LICENSE BLOCK *****                                                                                  // 958
 */                                                                                                               // 959
                                                                                                                  // 960
var SockJS = function(url, dep_protocols_whitelist, options) {                                                    // 961
    if (!(this instanceof SockJS)) {                                                                              // 962
        // makes `new` optional                                                                                   // 963
        return new SockJS(url, dep_protocols_whitelist, options);                                                 // 964
    }                                                                                                             // 965
                                                                                                                  // 966
    var that = this, protocols_whitelist;                                                                         // 967
    that._options = {devel: false, debug: false, protocols_whitelist: [],                                         // 968
                     info: undefined, rtt: undefined};                                                            // 969
    if (options) {                                                                                                // 970
        utils.objectExtend(that._options, options);                                                               // 971
    }                                                                                                             // 972
    that._base_url = utils.amendUrl(url);                                                                         // 973
    that._server = that._options.server || utils.random_number_string(1000);                                      // 974
    if (that._options.protocols_whitelist &&                                                                      // 975
        that._options.protocols_whitelist.length) {                                                               // 976
        protocols_whitelist = that._options.protocols_whitelist;                                                  // 977
    } else {                                                                                                      // 978
        // Deprecated API                                                                                         // 979
        if (typeof dep_protocols_whitelist === 'string' &&                                                        // 980
            dep_protocols_whitelist.length > 0) {                                                                 // 981
            protocols_whitelist = [dep_protocols_whitelist];                                                      // 982
        } else if (utils.isArray(dep_protocols_whitelist)) {                                                      // 983
            protocols_whitelist = dep_protocols_whitelist                                                         // 984
        } else {                                                                                                  // 985
            protocols_whitelist = null;                                                                           // 986
        }                                                                                                         // 987
        if (protocols_whitelist) {                                                                                // 988
            that._debug('Deprecated API: Use "protocols_whitelist" option ' +                                     // 989
                        'instead of supplying protocol list as a second ' +                                       // 990
                        'parameter to SockJS constructor.');                                                      // 991
        }                                                                                                         // 992
    }                                                                                                             // 993
    that._protocols = [];                                                                                         // 994
    that.protocol = null;                                                                                         // 995
    that.readyState = SockJS.CONNECTING;                                                                          // 996
    that._ir = createInfoReceiver(that._base_url);                                                                // 997
    that._ir.onfinish = function(info, rtt) {                                                                     // 998
        that._ir = null;                                                                                          // 999
        if (info) {                                                                                               // 1000
            if (that._options.info) {                                                                             // 1001
                // Override if user supplies the option                                                           // 1002
                info = utils.objectExtend(info, that._options.info);                                              // 1003
            }                                                                                                     // 1004
            if (that._options.rtt) {                                                                              // 1005
                rtt = that._options.rtt;                                                                          // 1006
            }                                                                                                     // 1007
            that._applyInfo(info, rtt, protocols_whitelist);                                                      // 1008
            that._didClose();                                                                                     // 1009
        } else {                                                                                                  // 1010
            that._didClose(1002, 'Can\'t connect to server', true);                                               // 1011
        }                                                                                                         // 1012
    };                                                                                                            // 1013
};                                                                                                                // 1014
// Inheritance                                                                                                    // 1015
SockJS.prototype = new REventTarget();                                                                            // 1016
                                                                                                                  // 1017
SockJS.version = "0.3.4";                                                                                         // 1018
                                                                                                                  // 1019
SockJS.CONNECTING = 0;                                                                                            // 1020
SockJS.OPEN = 1;                                                                                                  // 1021
SockJS.CLOSING = 2;                                                                                               // 1022
SockJS.CLOSED = 3;                                                                                                // 1023
                                                                                                                  // 1024
SockJS.prototype._debug = function() {                                                                            // 1025
    if (this._options.debug)                                                                                      // 1026
        utils.log.apply(utils, arguments);                                                                        // 1027
};                                                                                                                // 1028
                                                                                                                  // 1029
SockJS.prototype._dispatchOpen = function() {                                                                     // 1030
    var that = this;                                                                                              // 1031
    if (that.readyState === SockJS.CONNECTING) {                                                                  // 1032
        if (that._transport_tref) {                                                                               // 1033
            clearTimeout(that._transport_tref);                                                                   // 1034
            that._transport_tref = null;                                                                          // 1035
        }                                                                                                         // 1036
        that.readyState = SockJS.OPEN;                                                                            // 1037
        that.dispatchEvent(new SimpleEvent("open"));                                                              // 1038
    } else {                                                                                                      // 1039
        // The server might have been restarted, and lost track of our                                            // 1040
        // connection.                                                                                            // 1041
        that._didClose(1006, "Server lost session");                                                              // 1042
    }                                                                                                             // 1043
};                                                                                                                // 1044
                                                                                                                  // 1045
SockJS.prototype._dispatchMessage = function(data) {                                                              // 1046
    var that = this;                                                                                              // 1047
    if (that.readyState !== SockJS.OPEN)                                                                          // 1048
            return;                                                                                               // 1049
    that.dispatchEvent(new SimpleEvent("message", {data: data}));                                                 // 1050
};                                                                                                                // 1051
                                                                                                                  // 1052
SockJS.prototype._dispatchHeartbeat = function(data) {                                                            // 1053
    var that = this;                                                                                              // 1054
    if (that.readyState !== SockJS.OPEN)                                                                          // 1055
        return;                                                                                                   // 1056
    that.dispatchEvent(new SimpleEvent('heartbeat', {}));                                                         // 1057
};                                                                                                                // 1058
                                                                                                                  // 1059
SockJS.prototype._didClose = function(code, reason, force) {                                                      // 1060
    var that = this;                                                                                              // 1061
    if (that.readyState !== SockJS.CONNECTING &&                                                                  // 1062
        that.readyState !== SockJS.OPEN &&                                                                        // 1063
        that.readyState !== SockJS.CLOSING)                                                                       // 1064
            throw new Error('INVALID_STATE_ERR');                                                                 // 1065
    if (that._ir) {                                                                                               // 1066
        that._ir.nuke();                                                                                          // 1067
        that._ir = null;                                                                                          // 1068
    }                                                                                                             // 1069
                                                                                                                  // 1070
    if (that._transport) {                                                                                        // 1071
        that._transport.doCleanup();                                                                              // 1072
        that._transport = null;                                                                                   // 1073
    }                                                                                                             // 1074
                                                                                                                  // 1075
    var close_event = new SimpleEvent("close", {                                                                  // 1076
        code: code,                                                                                               // 1077
        reason: reason,                                                                                           // 1078
        wasClean: utils.userSetCode(code)});                                                                      // 1079
                                                                                                                  // 1080
    if (!utils.userSetCode(code) &&                                                                               // 1081
        that.readyState === SockJS.CONNECTING && !force) {                                                        // 1082
        if (that._try_next_protocol(close_event)) {                                                               // 1083
            return;                                                                                               // 1084
        }                                                                                                         // 1085
        close_event = new SimpleEvent("close", {code: 2000,                                                       // 1086
                                                reason: "All transports failed",                                  // 1087
                                                wasClean: false,                                                  // 1088
                                                last_event: close_event});                                        // 1089
    }                                                                                                             // 1090
    that.readyState = SockJS.CLOSED;                                                                              // 1091
                                                                                                                  // 1092
    utils.delay(function() {                                                                                      // 1093
                   that.dispatchEvent(close_event);                                                               // 1094
                });                                                                                               // 1095
};                                                                                                                // 1096
                                                                                                                  // 1097
SockJS.prototype._didMessage = function(data) {                                                                   // 1098
    var that = this;                                                                                              // 1099
    var type = data.slice(0, 1);                                                                                  // 1100
    switch(type) {                                                                                                // 1101
    case 'o':                                                                                                     // 1102
        that._dispatchOpen();                                                                                     // 1103
        break;                                                                                                    // 1104
    case 'a':                                                                                                     // 1105
        var payload = JSON.parse(data.slice(1) || '[]');                                                          // 1106
        for(var i=0; i < payload.length; i++){                                                                    // 1107
            that._dispatchMessage(payload[i]);                                                                    // 1108
        }                                                                                                         // 1109
        break;                                                                                                    // 1110
    case 'm':                                                                                                     // 1111
        var payload = JSON.parse(data.slice(1) || 'null');                                                        // 1112
        that._dispatchMessage(payload);                                                                           // 1113
        break;                                                                                                    // 1114
    case 'c':                                                                                                     // 1115
        var payload = JSON.parse(data.slice(1) || '[]');                                                          // 1116
        that._didClose(payload[0], payload[1]);                                                                   // 1117
        break;                                                                                                    // 1118
    case 'h':                                                                                                     // 1119
        that._dispatchHeartbeat();                                                                                // 1120
        break;                                                                                                    // 1121
    }                                                                                                             // 1122
};                                                                                                                // 1123
                                                                                                                  // 1124
SockJS.prototype._try_next_protocol = function(close_event) {                                                     // 1125
    var that = this;                                                                                              // 1126
    if (that.protocol) {                                                                                          // 1127
        that._debug('Closed transport:', that.protocol, ''+close_event);                                          // 1128
        that.protocol = null;                                                                                     // 1129
    }                                                                                                             // 1130
    if (that._transport_tref) {                                                                                   // 1131
        clearTimeout(that._transport_tref);                                                                       // 1132
        that._transport_tref = null;                                                                              // 1133
    }                                                                                                             // 1134
                                                                                                                  // 1135
    while(1) {                                                                                                    // 1136
        var protocol = that.protocol = that._protocols.shift();                                                   // 1137
        if (!protocol) {                                                                                          // 1138
            return false;                                                                                         // 1139
        }                                                                                                         // 1140
        // Some protocols require access to `body`, what if were in                                               // 1141
        // the `head`?                                                                                            // 1142
        if (SockJS[protocol] &&                                                                                   // 1143
            SockJS[protocol].need_body === true &&                                                                // 1144
            (!_document.body ||                                                                                   // 1145
             (typeof _document.readyState !== 'undefined'                                                         // 1146
              && _document.readyState !== 'complete'))) {                                                         // 1147
            that._protocols.unshift(protocol);                                                                    // 1148
            that.protocol = 'waiting-for-load';                                                                   // 1149
            utils.attachEvent('load', function(){                                                                 // 1150
                that._try_next_protocol();                                                                        // 1151
            });                                                                                                   // 1152
            return true;                                                                                          // 1153
        }                                                                                                         // 1154
                                                                                                                  // 1155
        if (!SockJS[protocol] ||                                                                                  // 1156
              !SockJS[protocol].enabled(that._options)) {                                                         // 1157
            that._debug('Skipping transport:', protocol);                                                         // 1158
        } else {                                                                                                  // 1159
            var roundTrips = SockJS[protocol].roundTrips || 1;                                                    // 1160
            var to = ((that._options.rto || 0) * roundTrips) || 5000;                                             // 1161
            that._transport_tref = utils.delay(to, function() {                                                   // 1162
                if (that.readyState === SockJS.CONNECTING) {                                                      // 1163
                    // I can't understand how it is possible to run                                               // 1164
                    // this timer, when the state is CLOSED, but                                                  // 1165
                    // apparently in IE everythin is possible.                                                    // 1166
                    that._didClose(2007, "Transport timeouted");                                                  // 1167
                }                                                                                                 // 1168
            });                                                                                                   // 1169
                                                                                                                  // 1170
            var connid = utils.random_string(8);                                                                  // 1171
            var trans_url = that._base_url + '/' + that._server + '/' + connid;                                   // 1172
            that._debug('Opening transport:', protocol, ' url:'+trans_url,                                        // 1173
                        ' RTO:'+that._options.rto);                                                               // 1174
            that._transport = new SockJS[protocol](that, trans_url,                                               // 1175
                                                   that._base_url);                                               // 1176
            return true;                                                                                          // 1177
        }                                                                                                         // 1178
    }                                                                                                             // 1179
};                                                                                                                // 1180
                                                                                                                  // 1181
SockJS.prototype.close = function(code, reason) {                                                                 // 1182
    var that = this;                                                                                              // 1183
    if (code && !utils.userSetCode(code))                                                                         // 1184
        throw new Error("INVALID_ACCESS_ERR");                                                                    // 1185
    if(that.readyState !== SockJS.CONNECTING &&                                                                   // 1186
       that.readyState !== SockJS.OPEN) {                                                                         // 1187
        return false;                                                                                             // 1188
    }                                                                                                             // 1189
    that.readyState = SockJS.CLOSING;                                                                             // 1190
    that._didClose(code || 1000, reason || "Normal closure");                                                     // 1191
    return true;                                                                                                  // 1192
};                                                                                                                // 1193
                                                                                                                  // 1194
SockJS.prototype.send = function(data) {                                                                          // 1195
    var that = this;                                                                                              // 1196
    if (that.readyState === SockJS.CONNECTING)                                                                    // 1197
        throw new Error('INVALID_STATE_ERR');                                                                     // 1198
    if (that.readyState === SockJS.OPEN) {                                                                        // 1199
        that._transport.doSend(utils.quote('' + data));                                                           // 1200
    }                                                                                                             // 1201
    return true;                                                                                                  // 1202
};                                                                                                                // 1203
                                                                                                                  // 1204
SockJS.prototype._applyInfo = function(info, rtt, protocols_whitelist) {                                          // 1205
    var that = this;                                                                                              // 1206
    that._options.info = info;                                                                                    // 1207
    that._options.rtt = rtt;                                                                                      // 1208
    that._options.rto = utils.countRTO(rtt);                                                                      // 1209
    that._options.info.null_origin = !_document.domain;                                                           // 1210
    // Servers can override base_url, eg to provide a randomized domain name and                                  // 1211
    // avoid browser per-domain connection limits.                                                                // 1212
    if (info.base_url)                                                                                            // 1213
      that._base_url = info.base_url;                                                                             // 1214
    var probed = utils.probeProtocols();                                                                          // 1215
    that._protocols = utils.detectProtocols(probed, protocols_whitelist, info);                                   // 1216
// <METEOR>                                                                                                       // 1217
// https://github.com/sockjs/sockjs-client/issues/79                                                              // 1218
    // Hack to avoid XDR when using different protocols                                                           // 1219
    // We're on IE trying to do cross-protocol. jsonp only.                                                       // 1220
    if (!utils.isSameOriginScheme(that._base_url) &&                                                              // 1221
        2 === utils.isXHRCorsCapable()) {                                                                         // 1222
        that._protocols = ['jsonp-polling'];                                                                      // 1223
    }                                                                                                             // 1224
// </METEOR>                                                                                                      // 1225
};                                                                                                                // 1226
//         [*] End of lib/sockjs.js                                                                               // 1227
                                                                                                                  // 1228
                                                                                                                  // 1229
//         [*] Including lib/trans-websocket.js                                                                   // 1230
/*                                                                                                                // 1231
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 1232
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 1233
 *                                                                                                                // 1234
 * For the license see COPYING.                                                                                   // 1235
 * ***** END LICENSE BLOCK *****                                                                                  // 1236
 */                                                                                                               // 1237
                                                                                                                  // 1238
var WebSocketTransport = SockJS.websocket = function(ri, trans_url) {                                             // 1239
    var that = this;                                                                                              // 1240
    var url = trans_url + '/websocket';                                                                           // 1241
    if (url.slice(0, 5) === 'https') {                                                                            // 1242
        url = 'wss' + url.slice(5);                                                                               // 1243
    } else {                                                                                                      // 1244
        url = 'ws' + url.slice(4);                                                                                // 1245
    }                                                                                                             // 1246
    that.ri = ri;                                                                                                 // 1247
    that.url = url;                                                                                               // 1248
    var Constructor = _window.WebSocket || _window.MozWebSocket;                                                  // 1249
                                                                                                                  // 1250
    that.ws = new Constructor(that.url);                                                                          // 1251
    that.ws.onmessage = function(e) {                                                                             // 1252
        that.ri._didMessage(e.data);                                                                              // 1253
    };                                                                                                            // 1254
    // Firefox has an interesting bug. If a websocket connection is                                               // 1255
    // created after onunload, it stays alive even when user                                                      // 1256
    // navigates away from the page. In such situation let's lie -                                                // 1257
    // let's not open the ws connection at all. See:                                                              // 1258
    // https://github.com/sockjs/sockjs-client/issues/28                                                          // 1259
    // https://bugzilla.mozilla.org/show_bug.cgi?id=696085                                                        // 1260
    that.unload_ref = utils.unload_add(function(){that.ws.close()});                                              // 1261
    that.ws.onclose = function() {                                                                                // 1262
        that.ri._didMessage(utils.closeFrame(1006, "WebSocket connection broken"));                               // 1263
    };                                                                                                            // 1264
};                                                                                                                // 1265
                                                                                                                  // 1266
WebSocketTransport.prototype.doSend = function(data) {                                                            // 1267
    this.ws.send('[' + data + ']');                                                                               // 1268
};                                                                                                                // 1269
                                                                                                                  // 1270
WebSocketTransport.prototype.doCleanup = function() {                                                             // 1271
    var that = this;                                                                                              // 1272
    var ws = that.ws;                                                                                             // 1273
    if (ws) {                                                                                                     // 1274
        ws.onmessage = ws.onclose = null;                                                                         // 1275
        ws.close();                                                                                               // 1276
        utils.unload_del(that.unload_ref);                                                                        // 1277
        that.unload_ref = that.ri = that.ws = null;                                                               // 1278
    }                                                                                                             // 1279
};                                                                                                                // 1280
                                                                                                                  // 1281
WebSocketTransport.enabled = function() {                                                                         // 1282
    return !!(_window.WebSocket || _window.MozWebSocket);                                                         // 1283
};                                                                                                                // 1284
                                                                                                                  // 1285
// In theory, ws should require 1 round trip. But in chrome, this is                                              // 1286
// not very stable over SSL. Most likely a ws connection requires a                                               // 1287
// separate SSL connection, in which case 2 round trips are an                                                    // 1288
// absolute minumum.                                                                                              // 1289
WebSocketTransport.roundTrips = 2;                                                                                // 1290
//         [*] End of lib/trans-websocket.js                                                                      // 1291
                                                                                                                  // 1292
                                                                                                                  // 1293
//         [*] Including lib/trans-sender.js                                                                      // 1294
/*                                                                                                                // 1295
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 1296
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 1297
 *                                                                                                                // 1298
 * For the license see COPYING.                                                                                   // 1299
 * ***** END LICENSE BLOCK *****                                                                                  // 1300
 */                                                                                                               // 1301
                                                                                                                  // 1302
var BufferedSender = function() {};                                                                               // 1303
BufferedSender.prototype.send_constructor = function(sender) {                                                    // 1304
    var that = this;                                                                                              // 1305
    that.send_buffer = [];                                                                                        // 1306
    that.sender = sender;                                                                                         // 1307
};                                                                                                                // 1308
BufferedSender.prototype.doSend = function(message) {                                                             // 1309
    var that = this;                                                                                              // 1310
    that.send_buffer.push(message);                                                                               // 1311
    if (!that.send_stop) {                                                                                        // 1312
        that.send_schedule();                                                                                     // 1313
    }                                                                                                             // 1314
};                                                                                                                // 1315
                                                                                                                  // 1316
// For polling transports in a situation when in the message callback,                                            // 1317
// new message is being send. If the sending connection was started                                               // 1318
// before receiving one, it is possible to saturate the network and                                               // 1319
// timeout due to the lack of receiving socket. To avoid that we delay                                            // 1320
// sending messages by some small time, in order to let receiving                                                 // 1321
// connection be started beforehand. This is only a halfmeasure and                                               // 1322
// does not fix the big problem, but it does make the tests go more                                               // 1323
// stable on slow networks.                                                                                       // 1324
BufferedSender.prototype.send_schedule_wait = function() {                                                        // 1325
    var that = this;                                                                                              // 1326
    var tref;                                                                                                     // 1327
    that.send_stop = function() {                                                                                 // 1328
        that.send_stop = null;                                                                                    // 1329
        clearTimeout(tref);                                                                                       // 1330
    };                                                                                                            // 1331
    tref = utils.delay(25, function() {                                                                           // 1332
        that.send_stop = null;                                                                                    // 1333
        that.send_schedule();                                                                                     // 1334
    });                                                                                                           // 1335
};                                                                                                                // 1336
                                                                                                                  // 1337
BufferedSender.prototype.send_schedule = function() {                                                             // 1338
    var that = this;                                                                                              // 1339
    if (that.send_buffer.length > 0) {                                                                            // 1340
        var payload = '[' + that.send_buffer.join(',') + ']';                                                     // 1341
        that.send_stop = that.sender(that.trans_url, payload, function(success, abort_reason) {                   // 1342
            that.send_stop = null;                                                                                // 1343
            if (success === false) {                                                                              // 1344
                that.ri._didClose(1006, 'Sending error ' + abort_reason);                                         // 1345
            } else {                                                                                              // 1346
                that.send_schedule_wait();                                                                        // 1347
            }                                                                                                     // 1348
        });                                                                                                       // 1349
        that.send_buffer = [];                                                                                    // 1350
    }                                                                                                             // 1351
};                                                                                                                // 1352
                                                                                                                  // 1353
BufferedSender.prototype.send_destructor = function() {                                                           // 1354
    var that = this;                                                                                              // 1355
    if (that._send_stop) {                                                                                        // 1356
        that._send_stop();                                                                                        // 1357
    }                                                                                                             // 1358
    that._send_stop = null;                                                                                       // 1359
};                                                                                                                // 1360
                                                                                                                  // 1361
var jsonPGenericSender = function(url, payload, callback) {                                                       // 1362
    var that = this;                                                                                              // 1363
                                                                                                                  // 1364
    if (!('_send_form' in that)) {                                                                                // 1365
        var form = that._send_form = _document.createElement('form');                                             // 1366
        var area = that._send_area = _document.createElement('textarea');                                         // 1367
        area.name = 'd';                                                                                          // 1368
        form.style.display = 'none';                                                                              // 1369
        form.style.position = 'absolute';                                                                         // 1370
        form.method = 'POST';                                                                                     // 1371
        form.enctype = 'application/x-www-form-urlencoded';                                                       // 1372
        form.acceptCharset = "UTF-8";                                                                             // 1373
        form.appendChild(area);                                                                                   // 1374
        _document.body.appendChild(form);                                                                         // 1375
    }                                                                                                             // 1376
    var form = that._send_form;                                                                                   // 1377
    var area = that._send_area;                                                                                   // 1378
    var id = 'a' + utils.random_string(8);                                                                        // 1379
    form.target = id;                                                                                             // 1380
    form.action = url + '/jsonp_send?i=' + id;                                                                    // 1381
                                                                                                                  // 1382
    var iframe;                                                                                                   // 1383
    try {                                                                                                         // 1384
        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)                                    // 1385
        iframe = _document.createElement('<iframe name="'+ id +'">');                                             // 1386
    } catch(x) {                                                                                                  // 1387
        iframe = _document.createElement('iframe');                                                               // 1388
        iframe.name = id;                                                                                         // 1389
    }                                                                                                             // 1390
    iframe.id = id;                                                                                               // 1391
    form.appendChild(iframe);                                                                                     // 1392
    iframe.style.display = 'none';                                                                                // 1393
                                                                                                                  // 1394
    try {                                                                                                         // 1395
        area.value = payload;                                                                                     // 1396
    } catch(e) {                                                                                                  // 1397
        utils.log('Your browser is seriously broken. Go home! ' + e.message);                                     // 1398
    }                                                                                                             // 1399
    form.submit();                                                                                                // 1400
                                                                                                                  // 1401
    var completed = function(e) {                                                                                 // 1402
        if (!iframe.onerror) return;                                                                              // 1403
        iframe.onreadystatechange = iframe.onerror = iframe.onload = null;                                        // 1404
        // Opera mini doesn't like if we GC iframe                                                                // 1405
        // immediately, thus this timeout.                                                                        // 1406
        utils.delay(500, function() {                                                                             // 1407
                       iframe.parentNode.removeChild(iframe);                                                     // 1408
                       iframe = null;                                                                             // 1409
                   });                                                                                            // 1410
        area.value = '';                                                                                          // 1411
        // It is not possible to detect if the iframe succeeded or                                                // 1412
        // failed to submit our form.                                                                             // 1413
        callback(true);                                                                                           // 1414
    };                                                                                                            // 1415
    iframe.onerror = iframe.onload = completed;                                                                   // 1416
    iframe.onreadystatechange = function(e) {                                                                     // 1417
        if (iframe.readyState == 'complete') completed();                                                         // 1418
    };                                                                                                            // 1419
    return completed;                                                                                             // 1420
};                                                                                                                // 1421
                                                                                                                  // 1422
var createAjaxSender = function(AjaxObject) {                                                                     // 1423
    return function(url, payload, callback) {                                                                     // 1424
        var xo = new AjaxObject('POST', url + '/xhr_send', payload);                                              // 1425
        xo.onfinish = function(status, text) {                                                                    // 1426
            callback(status === 200 || status === 204,                                                            // 1427
                     'http status ' + status);                                                                    // 1428
        };                                                                                                        // 1429
        return function(abort_reason) {                                                                           // 1430
            callback(false, abort_reason);                                                                        // 1431
        };                                                                                                        // 1432
    };                                                                                                            // 1433
};                                                                                                                // 1434
//         [*] End of lib/trans-sender.js                                                                         // 1435
                                                                                                                  // 1436
                                                                                                                  // 1437
//         [*] Including lib/trans-jsonp-receiver.js                                                              // 1438
/*                                                                                                                // 1439
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 1440
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 1441
 *                                                                                                                // 1442
 * For the license see COPYING.                                                                                   // 1443
 * ***** END LICENSE BLOCK *****                                                                                  // 1444
 */                                                                                                               // 1445
                                                                                                                  // 1446
// Parts derived from Socket.io:                                                                                  // 1447
//    https://github.com/LearnBoost/socket.io/blob/0.6.17/lib/socket.io/transports/jsonp-polling.js               // 1448
// and jQuery-JSONP:                                                                                              // 1449
//    https://code.google.com/p/jquery-jsonp/source/browse/trunk/core/jquery.jsonp.js                             // 1450
var jsonPGenericReceiver = function(url, callback) {                                                              // 1451
    var tref;                                                                                                     // 1452
    var script = _document.createElement('script');                                                               // 1453
    var script2;  // Opera synchronous load trick.                                                                // 1454
    var close_script = function(frame) {                                                                          // 1455
        if (script2) {                                                                                            // 1456
            script2.parentNode.removeChild(script2);                                                              // 1457
            script2 = null;                                                                                       // 1458
        }                                                                                                         // 1459
        if (script) {                                                                                             // 1460
            clearTimeout(tref);                                                                                   // 1461
            // Unfortunately, you can't really abort script loading of                                            // 1462
            // the script.                                                                                        // 1463
            script.parentNode.removeChild(script);                                                                // 1464
            script.onreadystatechange = script.onerror =                                                          // 1465
                script.onload = script.onclick = null;                                                            // 1466
            script = null;                                                                                        // 1467
            callback(frame);                                                                                      // 1468
            callback = null;                                                                                      // 1469
        }                                                                                                         // 1470
    };                                                                                                            // 1471
                                                                                                                  // 1472
    // IE9 fires 'error' event after orsc or before, in random order.                                             // 1473
    var loaded_okay = false;                                                                                      // 1474
    var error_timer = null;                                                                                       // 1475
                                                                                                                  // 1476
    script.id = 'a' + utils.random_string(8);                                                                     // 1477
    script.src = url;                                                                                             // 1478
    script.type = 'text/javascript';                                                                              // 1479
    script.charset = 'UTF-8';                                                                                     // 1480
    script.onerror = function(e) {                                                                                // 1481
        if (!error_timer) {                                                                                       // 1482
            // Delay firing close_script.                                                                         // 1483
            error_timer = setTimeout(function() {                                                                 // 1484
                if (!loaded_okay) {                                                                               // 1485
                    close_script(utils.closeFrame(                                                                // 1486
                        1006,                                                                                     // 1487
                        "JSONP script loaded abnormally (onerror)"));                                             // 1488
                }                                                                                                 // 1489
            }, 1000);                                                                                             // 1490
        }                                                                                                         // 1491
    };                                                                                                            // 1492
    script.onload = function(e) {                                                                                 // 1493
        close_script(utils.closeFrame(1006, "JSONP script loaded abnormally (onload)"));                          // 1494
    };                                                                                                            // 1495
                                                                                                                  // 1496
    script.onreadystatechange = function(e) {                                                                     // 1497
        if (/loaded|closed/.test(script.readyState)) {                                                            // 1498
            if (script && script.htmlFor && script.onclick) {                                                     // 1499
                loaded_okay = true;                                                                               // 1500
                try {                                                                                             // 1501
                    // In IE, actually execute the script.                                                        // 1502
                    script.onclick();                                                                             // 1503
                } catch (x) {}                                                                                    // 1504
            }                                                                                                     // 1505
            if (script) {                                                                                         // 1506
                close_script(utils.closeFrame(1006, "JSONP script loaded abnormally (onreadystatechange)"));      // 1507
            }                                                                                                     // 1508
        }                                                                                                         // 1509
    };                                                                                                            // 1510
    // IE: event/htmlFor/onclick trick.                                                                           // 1511
    // One can't rely on proper order for onreadystatechange. In order to                                         // 1512
    // make sure, set a 'htmlFor' and 'event' properties, so that                                                 // 1513
    // script code will be installed as 'onclick' handler for the                                                 // 1514
    // script object. Later, onreadystatechange, manually execute this                                            // 1515
    // code. FF and Chrome doesn't work with 'event' and 'htmlFor'                                                // 1516
    // set. For reference see:                                                                                    // 1517
    //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html                                    // 1518
    // Also, read on that about script ordering:                                                                  // 1519
    //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order                                               // 1520
    if (typeof script.async === 'undefined' && _document.attachEvent) {                                           // 1521
        // According to mozilla docs, in recent browsers script.async defaults                                    // 1522
        // to 'true', so we may use it to detect a good browser:                                                  // 1523
        // https://developer.mozilla.org/en/HTML/Element/script                                                   // 1524
        if (!/opera/i.test(navigator.userAgent)) {                                                                // 1525
            // Naively assume we're in IE                                                                         // 1526
            try {                                                                                                 // 1527
                script.htmlFor = script.id;                                                                       // 1528
                script.event = "onclick";                                                                         // 1529
            } catch (x) {}                                                                                        // 1530
            script.async = true;                                                                                  // 1531
        } else {                                                                                                  // 1532
            // Opera, second sync script hack                                                                     // 1533
            script2 = _document.createElement('script');                                                          // 1534
            script2.text = "try{var a = document.getElementById('"+script.id+"'); if(a)a.onerror();}catch(x){};"; // 1535
            script.async = script2.async = false;                                                                 // 1536
        }                                                                                                         // 1537
    }                                                                                                             // 1538
    if (typeof script.async !== 'undefined') {                                                                    // 1539
        script.async = true;                                                                                      // 1540
    }                                                                                                             // 1541
                                                                                                                  // 1542
    // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.                                  // 1543
    tref = setTimeout(function() {                                                                                // 1544
                          close_script(utils.closeFrame(1006, "JSONP script loaded abnormally (timeout)"));       // 1545
                      }, 35000);                                                                                  // 1546
                                                                                                                  // 1547
    var head = _document.getElementsByTagName('head')[0];                                                         // 1548
    head.insertBefore(script, head.firstChild);                                                                   // 1549
    if (script2) {                                                                                                // 1550
        head.insertBefore(script2, head.firstChild);                                                              // 1551
    }                                                                                                             // 1552
    return close_script;                                                                                          // 1553
};                                                                                                                // 1554
//         [*] End of lib/trans-jsonp-receiver.js                                                                 // 1555
                                                                                                                  // 1556
                                                                                                                  // 1557
//         [*] Including lib/trans-jsonp-polling.js                                                               // 1558
/*                                                                                                                // 1559
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 1560
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 1561
 *                                                                                                                // 1562
 * For the license see COPYING.                                                                                   // 1563
 * ***** END LICENSE BLOCK *****                                                                                  // 1564
 */                                                                                                               // 1565
                                                                                                                  // 1566
// The simplest and most robust transport, using the well-know cross                                              // 1567
// domain hack - JSONP. This transport is quite inefficient - one                                                 // 1568
// mssage could use up to one http request. But at least it works almost                                          // 1569
// everywhere.                                                                                                    // 1570
// Known limitations:                                                                                             // 1571
//   o you will get a spinning cursor                                                                             // 1572
//   o for Konqueror a dumb timer is needed to detect errors                                                      // 1573
                                                                                                                  // 1574
                                                                                                                  // 1575
var JsonPTransport = SockJS['jsonp-polling'] = function(ri, trans_url) {                                          // 1576
    utils.polluteGlobalNamespace();                                                                               // 1577
    var that = this;                                                                                              // 1578
    that.ri = ri;                                                                                                 // 1579
    that.trans_url = trans_url;                                                                                   // 1580
    that.send_constructor(jsonPGenericSender);                                                                    // 1581
    that._schedule_recv();                                                                                        // 1582
};                                                                                                                // 1583
                                                                                                                  // 1584
// Inheritnace                                                                                                    // 1585
JsonPTransport.prototype = new BufferedSender();                                                                  // 1586
                                                                                                                  // 1587
JsonPTransport.prototype._schedule_recv = function() {                                                            // 1588
    var that = this;                                                                                              // 1589
    var callback = function(data) {                                                                               // 1590
        that._recv_stop = null;                                                                                   // 1591
        if (data) {                                                                                               // 1592
            // no data - heartbeat;                                                                               // 1593
            if (!that._is_closing) {                                                                              // 1594
                that.ri._didMessage(data);                                                                        // 1595
            }                                                                                                     // 1596
        }                                                                                                         // 1597
        // The message can be a close message, and change is_closing state.                                       // 1598
        if (!that._is_closing) {                                                                                  // 1599
            that._schedule_recv();                                                                                // 1600
        }                                                                                                         // 1601
    };                                                                                                            // 1602
    that._recv_stop = jsonPReceiverWrapper(that.trans_url + '/jsonp',                                             // 1603
                                           jsonPGenericReceiver, callback);                                       // 1604
};                                                                                                                // 1605
                                                                                                                  // 1606
JsonPTransport.enabled = function() {                                                                             // 1607
    return true;                                                                                                  // 1608
};                                                                                                                // 1609
                                                                                                                  // 1610
JsonPTransport.need_body = true;                                                                                  // 1611
                                                                                                                  // 1612
                                                                                                                  // 1613
JsonPTransport.prototype.doCleanup = function() {                                                                 // 1614
    var that = this;                                                                                              // 1615
    that._is_closing = true;                                                                                      // 1616
    if (that._recv_stop) {                                                                                        // 1617
        that._recv_stop();                                                                                        // 1618
    }                                                                                                             // 1619
    that.ri = that._recv_stop = null;                                                                             // 1620
    that.send_destructor();                                                                                       // 1621
};                                                                                                                // 1622
                                                                                                                  // 1623
                                                                                                                  // 1624
// Abstract away code that handles global namespace pollution.                                                    // 1625
var jsonPReceiverWrapper = function(url, constructReceiver, user_callback) {                                      // 1626
    var id = 'a' + utils.random_string(6);                                                                        // 1627
    var url_id = url + '?c=' + escape(WPrefix + '.' + id);                                                        // 1628
                                                                                                                  // 1629
    // Unfortunately it is not possible to abort loading of the                                                   // 1630
    // script. We need to keep track of frake close frames.                                                       // 1631
    var aborting = 0;                                                                                             // 1632
                                                                                                                  // 1633
    // Callback will be called exactly once.                                                                      // 1634
    var callback = function(frame) {                                                                              // 1635
        switch(aborting) {                                                                                        // 1636
        case 0:                                                                                                   // 1637
            // Normal behaviour - delete hook _and_ emit message.                                                 // 1638
            delete _window[WPrefix][id];                                                                          // 1639
            user_callback(frame);                                                                                 // 1640
            break;                                                                                                // 1641
        case 1:                                                                                                   // 1642
            // Fake close frame - emit but don't delete hook.                                                     // 1643
            user_callback(frame);                                                                                 // 1644
            aborting = 2;                                                                                         // 1645
            break;                                                                                                // 1646
        case 2:                                                                                                   // 1647
            // Got frame after connection was closed, delete hook, don't emit.                                    // 1648
            delete _window[WPrefix][id];                                                                          // 1649
            break;                                                                                                // 1650
        }                                                                                                         // 1651
    };                                                                                                            // 1652
                                                                                                                  // 1653
    var close_script = constructReceiver(url_id, callback);                                                       // 1654
    _window[WPrefix][id] = close_script;                                                                          // 1655
    var stop = function() {                                                                                       // 1656
        if (_window[WPrefix][id]) {                                                                               // 1657
            aborting = 1;                                                                                         // 1658
            _window[WPrefix][id](utils.closeFrame(1000, "JSONP user aborted read"));                              // 1659
        }                                                                                                         // 1660
    };                                                                                                            // 1661
    return stop;                                                                                                  // 1662
};                                                                                                                // 1663
//         [*] End of lib/trans-jsonp-polling.js                                                                  // 1664
                                                                                                                  // 1665
                                                                                                                  // 1666
//         [*] Including lib/trans-xhr.js                                                                         // 1667
/*                                                                                                                // 1668
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 1669
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 1670
 *                                                                                                                // 1671
 * For the license see COPYING.                                                                                   // 1672
 * ***** END LICENSE BLOCK *****                                                                                  // 1673
 */                                                                                                               // 1674
                                                                                                                  // 1675
var AjaxBasedTransport = function() {};                                                                           // 1676
AjaxBasedTransport.prototype = new BufferedSender();                                                              // 1677
                                                                                                                  // 1678
AjaxBasedTransport.prototype.run = function(ri, trans_url,                                                        // 1679
                                            url_suffix, Receiver, AjaxObject) {                                   // 1680
    var that = this;                                                                                              // 1681
    that.ri = ri;                                                                                                 // 1682
    that.trans_url = trans_url;                                                                                   // 1683
    that.send_constructor(createAjaxSender(AjaxObject));                                                          // 1684
    that.poll = new Polling(ri, Receiver,                                                                         // 1685
                            trans_url + url_suffix, AjaxObject);                                                  // 1686
};                                                                                                                // 1687
                                                                                                                  // 1688
AjaxBasedTransport.prototype.doCleanup = function() {                                                             // 1689
    var that = this;                                                                                              // 1690
    if (that.poll) {                                                                                              // 1691
        that.poll.abort();                                                                                        // 1692
        that.poll = null;                                                                                         // 1693
    }                                                                                                             // 1694
};                                                                                                                // 1695
                                                                                                                  // 1696
// xhr-streaming                                                                                                  // 1697
var XhrStreamingTransport = SockJS['xhr-streaming'] = function(ri, trans_url) {                                   // 1698
    this.run(ri, trans_url, '/xhr_streaming', XhrReceiver, utils.XHRCorsObject);                                  // 1699
};                                                                                                                // 1700
                                                                                                                  // 1701
XhrStreamingTransport.prototype = new AjaxBasedTransport();                                                       // 1702
                                                                                                                  // 1703
XhrStreamingTransport.enabled = function() {                                                                      // 1704
    // Support for CORS Ajax aka Ajax2? Opera 12 claims CORS but                                                  // 1705
    // doesn't do streaming.                                                                                      // 1706
    return (_window.XMLHttpRequest &&                                                                             // 1707
            'withCredentials' in new XMLHttpRequest() &&                                                          // 1708
            (!/opera/i.test(navigator.userAgent)));                                                               // 1709
};                                                                                                                // 1710
XhrStreamingTransport.roundTrips = 2; // preflight, ajax                                                          // 1711
                                                                                                                  // 1712
// Safari gets confused when a streaming ajax request is started                                                  // 1713
// before onload. This causes the load indicator to spin indefinetely.                                            // 1714
XhrStreamingTransport.need_body = true;                                                                           // 1715
                                                                                                                  // 1716
                                                                                                                  // 1717
// According to:                                                                                                  // 1718
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests           // 1719
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/                                        // 1720
                                                                                                                  // 1721
                                                                                                                  // 1722
// xdr-streaming                                                                                                  // 1723
var XdrStreamingTransport = SockJS['xdr-streaming'] = function(ri, trans_url) {                                   // 1724
    this.run(ri, trans_url, '/xhr_streaming', XhrReceiver, utils.XDRObject);                                      // 1725
};                                                                                                                // 1726
                                                                                                                  // 1727
XdrStreamingTransport.prototype = new AjaxBasedTransport();                                                       // 1728
                                                                                                                  // 1729
XdrStreamingTransport.enabled = function() {                                                                      // 1730
    return !!_window.XDomainRequest;                                                                              // 1731
};                                                                                                                // 1732
XdrStreamingTransport.roundTrips = 2; // preflight, ajax                                                          // 1733
                                                                                                                  // 1734
                                                                                                                  // 1735
                                                                                                                  // 1736
// xhr-polling                                                                                                    // 1737
var XhrPollingTransport = SockJS['xhr-polling'] = function(ri, trans_url) {                                       // 1738
    this.run(ri, trans_url, '/xhr', XhrReceiver, utils.XHRCorsObject);                                            // 1739
};                                                                                                                // 1740
                                                                                                                  // 1741
XhrPollingTransport.prototype = new AjaxBasedTransport();                                                         // 1742
                                                                                                                  // 1743
XhrPollingTransport.enabled = XhrStreamingTransport.enabled;                                                      // 1744
XhrPollingTransport.roundTrips = 2; // preflight, ajax                                                            // 1745
                                                                                                                  // 1746
                                                                                                                  // 1747
// xdr-polling                                                                                                    // 1748
var XdrPollingTransport = SockJS['xdr-polling'] = function(ri, trans_url) {                                       // 1749
    this.run(ri, trans_url, '/xhr', XhrReceiver, utils.XDRObject);                                                // 1750
};                                                                                                                // 1751
                                                                                                                  // 1752
XdrPollingTransport.prototype = new AjaxBasedTransport();                                                         // 1753
                                                                                                                  // 1754
XdrPollingTransport.enabled = XdrStreamingTransport.enabled;                                                      // 1755
XdrPollingTransport.roundTrips = 2; // preflight, ajax                                                            // 1756
//         [*] End of lib/trans-xhr.js                                                                            // 1757
                                                                                                                  // 1758
                                                                                                                  // 1759
//         [*] Including lib/trans-iframe.js                                                                      // 1760
/*                                                                                                                // 1761
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 1762
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 1763
 *                                                                                                                // 1764
 * For the license see COPYING.                                                                                   // 1765
 * ***** END LICENSE BLOCK *****                                                                                  // 1766
 */                                                                                                               // 1767
                                                                                                                  // 1768
// Few cool transports do work only for same-origin. In order to make                                             // 1769
// them working cross-domain we shall use iframe, served form the                                                 // 1770
// remote domain. New browsers, have capabilities to communicate with                                             // 1771
// cross domain iframe, using postMessage(). In IE it was implemented                                             // 1772
// from IE 8+, but of course, IE got some details wrong:                                                          // 1773
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx                                              // 1774
//    http://stevesouders.com/misc/test-postmessage.php                                                           // 1775
                                                                                                                  // 1776
var IframeTransport = function() {};                                                                              // 1777
                                                                                                                  // 1778
IframeTransport.prototype.i_constructor = function(ri, trans_url, base_url) {                                     // 1779
    var that = this;                                                                                              // 1780
    that.ri = ri;                                                                                                 // 1781
    that.origin = utils.getOrigin(base_url);                                                                      // 1782
    that.base_url = base_url;                                                                                     // 1783
    that.trans_url = trans_url;                                                                                   // 1784
                                                                                                                  // 1785
    var iframe_url = base_url + '/iframe.html';                                                                   // 1786
    if (that.ri._options.devel) {                                                                                 // 1787
        iframe_url += '?t=' + (+new Date);                                                                        // 1788
    }                                                                                                             // 1789
    that.window_id = utils.random_string(8);                                                                      // 1790
    iframe_url += '#' + that.window_id;                                                                           // 1791
                                                                                                                  // 1792
    that.iframeObj = utils.createIframe(iframe_url, function(r) {                                                 // 1793
                                            that.ri._didClose(1006, "Unable to load an iframe (" + r + ")");      // 1794
                                        });                                                                       // 1795
                                                                                                                  // 1796
    that.onmessage_cb = utils.bind(that.onmessage, that);                                                         // 1797
    utils.attachMessage(that.onmessage_cb);                                                                       // 1798
};                                                                                                                // 1799
                                                                                                                  // 1800
IframeTransport.prototype.doCleanup = function() {                                                                // 1801
    var that = this;                                                                                              // 1802
    if (that.iframeObj) {                                                                                         // 1803
        utils.detachMessage(that.onmessage_cb);                                                                   // 1804
        try {                                                                                                     // 1805
            // When the iframe is not loaded, IE raises an exception                                              // 1806
            // on 'contentWindow'.                                                                                // 1807
            if (that.iframeObj.iframe.contentWindow) {                                                            // 1808
                that.postMessage('c');                                                                            // 1809
            }                                                                                                     // 1810
        } catch (x) {}                                                                                            // 1811
        that.iframeObj.cleanup();                                                                                 // 1812
        that.iframeObj = null;                                                                                    // 1813
        that.onmessage_cb = that.iframeObj = null;                                                                // 1814
    }                                                                                                             // 1815
};                                                                                                                // 1816
                                                                                                                  // 1817
IframeTransport.prototype.onmessage = function(e) {                                                               // 1818
    var that = this;                                                                                              // 1819
    if (e.origin !== that.origin) return;                                                                         // 1820
    var window_id = e.data.slice(0, 8);                                                                           // 1821
    var type = e.data.slice(8, 9);                                                                                // 1822
    var data = e.data.slice(9);                                                                                   // 1823
                                                                                                                  // 1824
    if (window_id !== that.window_id) return;                                                                     // 1825
                                                                                                                  // 1826
    switch(type) {                                                                                                // 1827
    case 's':                                                                                                     // 1828
        that.iframeObj.loaded();                                                                                  // 1829
        that.postMessage('s', JSON.stringify([SockJS.version, that.protocol, that.trans_url, that.base_url]));    // 1830
        break;                                                                                                    // 1831
    case 't':                                                                                                     // 1832
        that.ri._didMessage(data);                                                                                // 1833
        break;                                                                                                    // 1834
    }                                                                                                             // 1835
};                                                                                                                // 1836
                                                                                                                  // 1837
IframeTransport.prototype.postMessage = function(type, data) {                                                    // 1838
    var that = this;                                                                                              // 1839
    that.iframeObj.post(that.window_id + type + (data || ''), that.origin);                                       // 1840
};                                                                                                                // 1841
                                                                                                                  // 1842
IframeTransport.prototype.doSend = function (message) {                                                           // 1843
    this.postMessage('m', message);                                                                               // 1844
};                                                                                                                // 1845
                                                                                                                  // 1846
IframeTransport.enabled = function() {                                                                            // 1847
    // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with                                // 1848
    // huge delay, or not at all.                                                                                 // 1849
    var konqueror = navigator && navigator.userAgent && navigator.userAgent.indexOf('Konqueror') !== -1;          // 1850
    return ((typeof _window.postMessage === 'function' ||                                                         // 1851
            typeof _window.postMessage === 'object') && (!konqueror));                                            // 1852
};                                                                                                                // 1853
//         [*] End of lib/trans-iframe.js                                                                         // 1854
                                                                                                                  // 1855
                                                                                                                  // 1856
//         [*] Including lib/trans-iframe-within.js                                                               // 1857
/*                                                                                                                // 1858
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 1859
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 1860
 *                                                                                                                // 1861
 * For the license see COPYING.                                                                                   // 1862
 * ***** END LICENSE BLOCK *****                                                                                  // 1863
 */                                                                                                               // 1864
                                                                                                                  // 1865
var curr_window_id;                                                                                               // 1866
                                                                                                                  // 1867
var postMessage = function (type, data) {                                                                         // 1868
    if(parent !== _window) {                                                                                      // 1869
        parent.postMessage(curr_window_id + type + (data || ''), '*');                                            // 1870
    } else {                                                                                                      // 1871
        utils.log("Can't postMessage, no parent window.", type, data);                                            // 1872
    }                                                                                                             // 1873
};                                                                                                                // 1874
                                                                                                                  // 1875
var FacadeJS = function() {};                                                                                     // 1876
FacadeJS.prototype._didClose = function (code, reason) {                                                          // 1877
    postMessage('t', utils.closeFrame(code, reason));                                                             // 1878
};                                                                                                                // 1879
FacadeJS.prototype._didMessage = function (frame) {                                                               // 1880
    postMessage('t', frame);                                                                                      // 1881
};                                                                                                                // 1882
FacadeJS.prototype._doSend = function (data) {                                                                    // 1883
    this._transport.doSend(data);                                                                                 // 1884
};                                                                                                                // 1885
FacadeJS.prototype._doCleanup = function () {                                                                     // 1886
    this._transport.doCleanup();                                                                                  // 1887
};                                                                                                                // 1888
                                                                                                                  // 1889
utils.parent_origin = undefined;                                                                                  // 1890
                                                                                                                  // 1891
SockJS.bootstrap_iframe = function() {                                                                            // 1892
    var facade;                                                                                                   // 1893
    curr_window_id = _document.location.hash.slice(1);                                                            // 1894
    var onMessage = function(e) {                                                                                 // 1895
        if(e.source !== parent) return;                                                                           // 1896
        if(typeof utils.parent_origin === 'undefined')                                                            // 1897
            utils.parent_origin = e.origin;                                                                       // 1898
        if (e.origin !== utils.parent_origin) return;                                                             // 1899
                                                                                                                  // 1900
        var window_id = e.data.slice(0, 8);                                                                       // 1901
        var type = e.data.slice(8, 9);                                                                            // 1902
        var data = e.data.slice(9);                                                                               // 1903
        if (window_id !== curr_window_id) return;                                                                 // 1904
        switch(type) {                                                                                            // 1905
        case 's':                                                                                                 // 1906
            var p = JSON.parse(data);                                                                             // 1907
            var version = p[0];                                                                                   // 1908
            var protocol = p[1];                                                                                  // 1909
            var trans_url = p[2];                                                                                 // 1910
            var base_url = p[3];                                                                                  // 1911
            if (version !== SockJS.version) {                                                                     // 1912
                utils.log("Incompatibile SockJS! Main site uses:" +                                               // 1913
                          " \"" + version + "\", the iframe:" +                                                   // 1914
                          " \"" + SockJS.version + "\".");                                                        // 1915
            }                                                                                                     // 1916
            if (!utils.flatUrl(trans_url) || !utils.flatUrl(base_url)) {                                          // 1917
                utils.log("Only basic urls are supported in SockJS");                                             // 1918
                return;                                                                                           // 1919
            }                                                                                                     // 1920
                                                                                                                  // 1921
            if (!utils.isSameOriginUrl(trans_url) ||                                                              // 1922
                !utils.isSameOriginUrl(base_url)) {                                                               // 1923
                utils.log("Can't connect to different domain from within an " +                                   // 1924
                          "iframe. (" + JSON.stringify([_window.location.href, trans_url, base_url]) +            // 1925
                          ")");                                                                                   // 1926
                return;                                                                                           // 1927
            }                                                                                                     // 1928
            facade = new FacadeJS();                                                                              // 1929
            facade._transport = new FacadeJS[protocol](facade, trans_url, base_url);                              // 1930
            break;                                                                                                // 1931
        case 'm':                                                                                                 // 1932
            facade._doSend(data);                                                                                 // 1933
            break;                                                                                                // 1934
        case 'c':                                                                                                 // 1935
            if (facade)                                                                                           // 1936
                facade._doCleanup();                                                                              // 1937
            facade = null;                                                                                        // 1938
            break;                                                                                                // 1939
        }                                                                                                         // 1940
    };                                                                                                            // 1941
                                                                                                                  // 1942
    // alert('test ticker');                                                                                      // 1943
    // facade = new FacadeJS();                                                                                   // 1944
    // facade._transport = new FacadeJS['w-iframe-xhr-polling'](facade, 'http://host.com:9999/ticker/12/basd');   // 1945
                                                                                                                  // 1946
    utils.attachMessage(onMessage);                                                                               // 1947
                                                                                                                  // 1948
    // Start                                                                                                      // 1949
    postMessage('s');                                                                                             // 1950
};                                                                                                                // 1951
//         [*] End of lib/trans-iframe-within.js                                                                  // 1952
                                                                                                                  // 1953
                                                                                                                  // 1954
//         [*] Including lib/info.js                                                                              // 1955
/*                                                                                                                // 1956
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 1957
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 1958
 *                                                                                                                // 1959
 * For the license see COPYING.                                                                                   // 1960
 * ***** END LICENSE BLOCK *****                                                                                  // 1961
 */                                                                                                               // 1962
                                                                                                                  // 1963
var InfoReceiver = function(base_url, AjaxObject) {                                                               // 1964
    var that = this;                                                                                              // 1965
    utils.delay(function(){that.doXhr(base_url, AjaxObject);});                                                   // 1966
};                                                                                                                // 1967
                                                                                                                  // 1968
InfoReceiver.prototype = new EventEmitter(['finish']);                                                            // 1969
                                                                                                                  // 1970
InfoReceiver.prototype.doXhr = function(base_url, AjaxObject) {                                                   // 1971
    var that = this;                                                                                              // 1972
    var t0 = (new Date()).getTime();                                                                              // 1973
                                                                                                                  // 1974
// <METEOR>                                                                                                       // 1975
  // https://github.com/sockjs/sockjs-client/pull/129                                                             // 1976
  // var xo = new AjaxObject('GET', base_url + '/info');                                                          // 1977
                                                                                                                  // 1978
    var xo = new AjaxObject(                                                                                      // 1979
      // add cachebusting parameter to url to work around a chrome bug:                                           // 1980
      // https://code.google.com/p/chromium/issues/detail?id=263981                                               // 1981
      // or misbehaving proxies.                                                                                  // 1982
      'GET', base_url + '/info?cb=' + utils.random_string(10))                                                    // 1983
// </METEOR>                                                                                                      // 1984
                                                                                                                  // 1985
    var tref = utils.delay(8000,                                                                                  // 1986
                           function(){xo.ontimeout();});                                                          // 1987
                                                                                                                  // 1988
    xo.onfinish = function(status, text) {                                                                        // 1989
        clearTimeout(tref);                                                                                       // 1990
        tref = null;                                                                                              // 1991
        if (status === 200) {                                                                                     // 1992
            var rtt = (new Date()).getTime() - t0;                                                                // 1993
            var info = JSON.parse(text);                                                                          // 1994
            if (typeof info !== 'object') info = {};                                                              // 1995
            that.emit('finish', info, rtt);                                                                       // 1996
        } else {                                                                                                  // 1997
            that.emit('finish');                                                                                  // 1998
        }                                                                                                         // 1999
    };                                                                                                            // 2000
    xo.ontimeout = function() {                                                                                   // 2001
        xo.close();                                                                                               // 2002
        that.emit('finish');                                                                                      // 2003
    };                                                                                                            // 2004
};                                                                                                                // 2005
                                                                                                                  // 2006
var InfoReceiverIframe = function(base_url) {                                                                     // 2007
    var that = this;                                                                                              // 2008
    var go = function() {                                                                                         // 2009
        var ifr = new IframeTransport();                                                                          // 2010
        ifr.protocol = 'w-iframe-info-receiver';                                                                  // 2011
        var fun = function(r) {                                                                                   // 2012
            if (typeof r === 'string' && r.substr(0,1) === 'm') {                                                 // 2013
                var d = JSON.parse(r.substr(1));                                                                  // 2014
                var info = d[0], rtt = d[1];                                                                      // 2015
                that.emit('finish', info, rtt);                                                                   // 2016
            } else {                                                                                              // 2017
                that.emit('finish');                                                                              // 2018
            }                                                                                                     // 2019
            ifr.doCleanup();                                                                                      // 2020
            ifr = null;                                                                                           // 2021
        };                                                                                                        // 2022
        var mock_ri = {                                                                                           // 2023
            _options: {},                                                                                         // 2024
            _didClose: fun,                                                                                       // 2025
            _didMessage: fun                                                                                      // 2026
        };                                                                                                        // 2027
        ifr.i_constructor(mock_ri, base_url, base_url);                                                           // 2028
    }                                                                                                             // 2029
    if(!_document.body) {                                                                                         // 2030
        utils.attachEvent('load', go);                                                                            // 2031
    } else {                                                                                                      // 2032
        go();                                                                                                     // 2033
    }                                                                                                             // 2034
};                                                                                                                // 2035
InfoReceiverIframe.prototype = new EventEmitter(['finish']);                                                      // 2036
                                                                                                                  // 2037
                                                                                                                  // 2038
var InfoReceiverFake = function() {                                                                               // 2039
    // It may not be possible to do cross domain AJAX to get the info                                             // 2040
    // data, for example for IE7. But we want to run JSONP, so let's                                              // 2041
    // fake the response, with rtt=2s (rto=6s).                                                                   // 2042
    var that = this;                                                                                              // 2043
    utils.delay(function() {                                                                                      // 2044
        that.emit('finish', {}, 2000);                                                                            // 2045
    });                                                                                                           // 2046
};                                                                                                                // 2047
InfoReceiverFake.prototype = new EventEmitter(['finish']);                                                        // 2048
                                                                                                                  // 2049
var createInfoReceiver = function(base_url) {                                                                     // 2050
    if (utils.isSameOriginUrl(base_url)) {                                                                        // 2051
        // If, for some reason, we have SockJS locally - there's no                                               // 2052
        // need to start up the complex machinery. Just use ajax.                                                 // 2053
        return new InfoReceiver(base_url, utils.XHRLocalObject);                                                  // 2054
    }                                                                                                             // 2055
    switch (utils.isXHRCorsCapable()) {                                                                           // 2056
    case 1:                                                                                                       // 2057
        // XHRLocalObject -> no_credentials=true                                                                  // 2058
        return new InfoReceiver(base_url, utils.XHRLocalObject);                                                  // 2059
    case 2:                                                                                                       // 2060
// <METEOR>                                                                                                       // 2061
// https://github.com/sockjs/sockjs-client/issues/79                                                              // 2062
        // XDR doesn't work across different schemes                                                              // 2063
        // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
        if (utils.isSameOriginScheme(base_url))                                                                   // 2065
            return new InfoReceiver(base_url, utils.XDRObject);                                                   // 2066
        else                                                                                                      // 2067
            return new InfoReceiverFake();                                                                        // 2068
// </METEOR>                                                                                                      // 2069
    case 3:                                                                                                       // 2070
        // Opera                                                                                                  // 2071
        return new InfoReceiverIframe(base_url);                                                                  // 2072
    default:                                                                                                      // 2073
        // IE 7                                                                                                   // 2074
        return new InfoReceiverFake();                                                                            // 2075
    };                                                                                                            // 2076
};                                                                                                                // 2077
                                                                                                                  // 2078
                                                                                                                  // 2079
var WInfoReceiverIframe = FacadeJS['w-iframe-info-receiver'] = function(ri, _trans_url, base_url) {               // 2080
    var ir = new InfoReceiver(base_url, utils.XHRLocalObject);                                                    // 2081
    ir.onfinish = function(info, rtt) {                                                                           // 2082
        ri._didMessage('m'+JSON.stringify([info, rtt]));                                                          // 2083
        ri._didClose();                                                                                           // 2084
    }                                                                                                             // 2085
};                                                                                                                // 2086
WInfoReceiverIframe.prototype.doCleanup = function() {};                                                          // 2087
//         [*] End of lib/info.js                                                                                 // 2088
                                                                                                                  // 2089
                                                                                                                  // 2090
//         [*] Including lib/trans-iframe-eventsource.js                                                          // 2091
/*                                                                                                                // 2092
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 2093
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 2094
 *                                                                                                                // 2095
 * For the license see COPYING.                                                                                   // 2096
 * ***** END LICENSE BLOCK *****                                                                                  // 2097
 */                                                                                                               // 2098
                                                                                                                  // 2099
var EventSourceIframeTransport = SockJS['iframe-eventsource'] = function () {                                     // 2100
    var that = this;                                                                                              // 2101
    that.protocol = 'w-iframe-eventsource';                                                                       // 2102
    that.i_constructor.apply(that, arguments);                                                                    // 2103
};                                                                                                                // 2104
                                                                                                                  // 2105
EventSourceIframeTransport.prototype = new IframeTransport();                                                     // 2106
                                                                                                                  // 2107
EventSourceIframeTransport.enabled = function () {                                                                // 2108
    return ('EventSource' in _window) && IframeTransport.enabled();                                               // 2109
};                                                                                                                // 2110
                                                                                                                  // 2111
EventSourceIframeTransport.need_body = true;                                                                      // 2112
EventSourceIframeTransport.roundTrips = 3; // html, javascript, eventsource                                       // 2113
                                                                                                                  // 2114
                                                                                                                  // 2115
// w-iframe-eventsource                                                                                           // 2116
var EventSourceTransport = FacadeJS['w-iframe-eventsource'] = function(ri, trans_url) {                           // 2117
    this.run(ri, trans_url, '/eventsource', EventSourceReceiver, utils.XHRLocalObject);                           // 2118
}                                                                                                                 // 2119
EventSourceTransport.prototype = new AjaxBasedTransport();                                                        // 2120
//         [*] End of lib/trans-iframe-eventsource.js                                                             // 2121
                                                                                                                  // 2122
                                                                                                                  // 2123
//         [*] Including lib/trans-iframe-xhr-polling.js                                                          // 2124
/*                                                                                                                // 2125
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 2126
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 2127
 *                                                                                                                // 2128
 * For the license see COPYING.                                                                                   // 2129
 * ***** END LICENSE BLOCK *****                                                                                  // 2130
 */                                                                                                               // 2131
                                                                                                                  // 2132
var XhrPollingIframeTransport = SockJS['iframe-xhr-polling'] = function () {                                      // 2133
    var that = this;                                                                                              // 2134
    that.protocol = 'w-iframe-xhr-polling';                                                                       // 2135
    that.i_constructor.apply(that, arguments);                                                                    // 2136
};                                                                                                                // 2137
                                                                                                                  // 2138
XhrPollingIframeTransport.prototype = new IframeTransport();                                                      // 2139
                                                                                                                  // 2140
XhrPollingIframeTransport.enabled = function () {                                                                 // 2141
    return _window.XMLHttpRequest && IframeTransport.enabled();                                                   // 2142
};                                                                                                                // 2143
                                                                                                                  // 2144
XhrPollingIframeTransport.need_body = true;                                                                       // 2145
XhrPollingIframeTransport.roundTrips = 3; // html, javascript, xhr                                                // 2146
                                                                                                                  // 2147
                                                                                                                  // 2148
// w-iframe-xhr-polling                                                                                           // 2149
var XhrPollingITransport = FacadeJS['w-iframe-xhr-polling'] = function(ri, trans_url) {                           // 2150
    this.run(ri, trans_url, '/xhr', XhrReceiver, utils.XHRLocalObject);                                           // 2151
};                                                                                                                // 2152
                                                                                                                  // 2153
XhrPollingITransport.prototype = new AjaxBasedTransport();                                                        // 2154
//         [*] End of lib/trans-iframe-xhr-polling.js                                                             // 2155
                                                                                                                  // 2156
                                                                                                                  // 2157
//         [*] Including lib/trans-iframe-htmlfile.js                                                             // 2158
/*                                                                                                                // 2159
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 2160
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 2161
 *                                                                                                                // 2162
 * For the license see COPYING.                                                                                   // 2163
 * ***** END LICENSE BLOCK *****                                                                                  // 2164
 */                                                                                                               // 2165
                                                                                                                  // 2166
// This transport generally works in any browser, but will cause a                                                // 2167
// spinning cursor to appear in any browser other than IE.                                                        // 2168
// We may test this transport in all browsers - why not, but in                                                   // 2169
// production it should be only run in IE.                                                                        // 2170
                                                                                                                  // 2171
var HtmlFileIframeTransport = SockJS['iframe-htmlfile'] = function () {                                           // 2172
    var that = this;                                                                                              // 2173
    that.protocol = 'w-iframe-htmlfile';                                                                          // 2174
    that.i_constructor.apply(that, arguments);                                                                    // 2175
};                                                                                                                // 2176
                                                                                                                  // 2177
// Inheritance.                                                                                                   // 2178
HtmlFileIframeTransport.prototype = new IframeTransport();                                                        // 2179
                                                                                                                  // 2180
HtmlFileIframeTransport.enabled = function() {                                                                    // 2181
    return IframeTransport.enabled();                                                                             // 2182
};                                                                                                                // 2183
                                                                                                                  // 2184
HtmlFileIframeTransport.need_body = true;                                                                         // 2185
HtmlFileIframeTransport.roundTrips = 3; // html, javascript, htmlfile                                             // 2186
                                                                                                                  // 2187
                                                                                                                  // 2188
// w-iframe-htmlfile                                                                                              // 2189
var HtmlFileTransport = FacadeJS['w-iframe-htmlfile'] = function(ri, trans_url) {                                 // 2190
    this.run(ri, trans_url, '/htmlfile', HtmlfileReceiver, utils.XHRLocalObject);                                 // 2191
};                                                                                                                // 2192
HtmlFileTransport.prototype = new AjaxBasedTransport();                                                           // 2193
//         [*] End of lib/trans-iframe-htmlfile.js                                                                // 2194
                                                                                                                  // 2195
                                                                                                                  // 2196
//         [*] Including lib/trans-polling.js                                                                     // 2197
/*                                                                                                                // 2198
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 2199
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 2200
 *                                                                                                                // 2201
 * For the license see COPYING.                                                                                   // 2202
 * ***** END LICENSE BLOCK *****                                                                                  // 2203
 */                                                                                                               // 2204
                                                                                                                  // 2205
var Polling = function(ri, Receiver, recv_url, AjaxObject) {                                                      // 2206
    var that = this;                                                                                              // 2207
    that.ri = ri;                                                                                                 // 2208
    that.Receiver = Receiver;                                                                                     // 2209
    that.recv_url = recv_url;                                                                                     // 2210
    that.AjaxObject = AjaxObject;                                                                                 // 2211
    that._scheduleRecv();                                                                                         // 2212
};                                                                                                                // 2213
                                                                                                                  // 2214
Polling.prototype._scheduleRecv = function() {                                                                    // 2215
    var that = this;                                                                                              // 2216
    var poll = that.poll = new that.Receiver(that.recv_url, that.AjaxObject);                                     // 2217
    var msg_counter = 0;                                                                                          // 2218
    poll.onmessage = function(e) {                                                                                // 2219
        msg_counter += 1;                                                                                         // 2220
        that.ri._didMessage(e.data);                                                                              // 2221
    };                                                                                                            // 2222
    poll.onclose = function(e) {                                                                                  // 2223
        that.poll = poll = poll.onmessage = poll.onclose = null;                                                  // 2224
        if (!that.poll_is_closing) {                                                                              // 2225
            if (e.reason === 'permanent') {                                                                       // 2226
                that.ri._didClose(1006, 'Polling error (' + e.reason + ')');                                      // 2227
            } else {                                                                                              // 2228
                that._scheduleRecv();                                                                             // 2229
            }                                                                                                     // 2230
        }                                                                                                         // 2231
    };                                                                                                            // 2232
};                                                                                                                // 2233
                                                                                                                  // 2234
Polling.prototype.abort = function() {                                                                            // 2235
    var that = this;                                                                                              // 2236
    that.poll_is_closing = true;                                                                                  // 2237
    if (that.poll) {                                                                                              // 2238
        that.poll.abort();                                                                                        // 2239
    }                                                                                                             // 2240
};                                                                                                                // 2241
//         [*] End of lib/trans-polling.js                                                                        // 2242
                                                                                                                  // 2243
                                                                                                                  // 2244
//         [*] Including lib/trans-receiver-eventsource.js                                                        // 2245
/*                                                                                                                // 2246
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 2247
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 2248
 *                                                                                                                // 2249
 * For the license see COPYING.                                                                                   // 2250
 * ***** END LICENSE BLOCK *****                                                                                  // 2251
 */                                                                                                               // 2252
                                                                                                                  // 2253
var EventSourceReceiver = function(url) {                                                                         // 2254
    var that = this;                                                                                              // 2255
    var es = new EventSource(url);                                                                                // 2256
    es.onmessage = function(e) {                                                                                  // 2257
        that.dispatchEvent(new SimpleEvent('message',                                                             // 2258
                                           {'data': unescape(e.data)}));                                          // 2259
    };                                                                                                            // 2260
    that.es_close = es.onerror = function(e, abort_reason) {                                                      // 2261
        // ES on reconnection has readyState = 0 or 1.                                                            // 2262
        // on network error it's CLOSED = 2                                                                       // 2263
        var reason = abort_reason ? 'user' :                                                                      // 2264
            (es.readyState !== 2 ? 'network' : 'permanent');                                                      // 2265
        that.es_close = es.onmessage = es.onerror = null;                                                         // 2266
        // EventSource reconnects automatically.                                                                  // 2267
        es.close();                                                                                               // 2268
        es = null;                                                                                                // 2269
        // Safari and chrome < 15 crash if we close window before                                                 // 2270
        // waiting for ES cleanup. See:                                                                           // 2271
        //   https://code.google.com/p/chromium/issues/detail?id=89155                                            // 2272
        utils.delay(200, function() {                                                                             // 2273
                        that.dispatchEvent(new SimpleEvent('close', {reason: reason}));                           // 2274
                    });                                                                                           // 2275
    };                                                                                                            // 2276
};                                                                                                                // 2277
                                                                                                                  // 2278
EventSourceReceiver.prototype = new REventTarget();                                                               // 2279
                                                                                                                  // 2280
EventSourceReceiver.prototype.abort = function() {                                                                // 2281
    var that = this;                                                                                              // 2282
    if (that.es_close) {                                                                                          // 2283
        that.es_close({}, true);                                                                                  // 2284
    }                                                                                                             // 2285
};                                                                                                                // 2286
//         [*] End of lib/trans-receiver-eventsource.js                                                           // 2287
                                                                                                                  // 2288
                                                                                                                  // 2289
//         [*] Including lib/trans-receiver-htmlfile.js                                                           // 2290
/*                                                                                                                // 2291
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 2292
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 2293
 *                                                                                                                // 2294
 * For the license see COPYING.                                                                                   // 2295
 * ***** END LICENSE BLOCK *****                                                                                  // 2296
 */                                                                                                               // 2297
                                                                                                                  // 2298
var _is_ie_htmlfile_capable;                                                                                      // 2299
var isIeHtmlfileCapable = function() {                                                                            // 2300
    if (_is_ie_htmlfile_capable === undefined) {                                                                  // 2301
        if ('ActiveXObject' in _window) {                                                                         // 2302
            try {                                                                                                 // 2303
                _is_ie_htmlfile_capable = !!new ActiveXObject('htmlfile');                                        // 2304
            } catch (x) {}                                                                                        // 2305
        } else {                                                                                                  // 2306
            _is_ie_htmlfile_capable = false;                                                                      // 2307
        }                                                                                                         // 2308
    }                                                                                                             // 2309
    return _is_ie_htmlfile_capable;                                                                               // 2310
};                                                                                                                // 2311
                                                                                                                  // 2312
                                                                                                                  // 2313
var HtmlfileReceiver = function(url) {                                                                            // 2314
    var that = this;                                                                                              // 2315
    utils.polluteGlobalNamespace();                                                                               // 2316
                                                                                                                  // 2317
    that.id = 'a' + utils.random_string(6, 26);                                                                   // 2318
    url += ((url.indexOf('?') === -1) ? '?' : '&') +                                                              // 2319
        'c=' + escape(WPrefix + '.' + that.id);                                                                   // 2320
                                                                                                                  // 2321
    var constructor = isIeHtmlfileCapable() ?                                                                     // 2322
        utils.createHtmlfile : utils.createIframe;                                                                // 2323
                                                                                                                  // 2324
    var iframeObj;                                                                                                // 2325
    _window[WPrefix][that.id] = {                                                                                 // 2326
        start: function () {                                                                                      // 2327
            iframeObj.loaded();                                                                                   // 2328
        },                                                                                                        // 2329
        message: function (data) {                                                                                // 2330
            that.dispatchEvent(new SimpleEvent('message', {'data': data}));                                       // 2331
        },                                                                                                        // 2332
        stop: function () {                                                                                       // 2333
            that.iframe_close({}, 'network');                                                                     // 2334
        }                                                                                                         // 2335
    };                                                                                                            // 2336
    that.iframe_close = function(e, abort_reason) {                                                               // 2337
        iframeObj.cleanup();                                                                                      // 2338
        that.iframe_close = iframeObj = null;                                                                     // 2339
        delete _window[WPrefix][that.id];                                                                         // 2340
        that.dispatchEvent(new SimpleEvent('close', {reason: abort_reason}));                                     // 2341
    };                                                                                                            // 2342
    iframeObj = constructor(url, function(e) {                                                                    // 2343
                                that.iframe_close({}, 'permanent');                                               // 2344
                            });                                                                                   // 2345
};                                                                                                                // 2346
                                                                                                                  // 2347
HtmlfileReceiver.prototype = new REventTarget();                                                                  // 2348
                                                                                                                  // 2349
HtmlfileReceiver.prototype.abort = function() {                                                                   // 2350
    var that = this;                                                                                              // 2351
    if (that.iframe_close) {                                                                                      // 2352
        that.iframe_close({}, 'user');                                                                            // 2353
    }                                                                                                             // 2354
};                                                                                                                // 2355
//         [*] End of lib/trans-receiver-htmlfile.js                                                              // 2356
                                                                                                                  // 2357
                                                                                                                  // 2358
//         [*] Including lib/trans-receiver-xhr.js                                                                // 2359
/*                                                                                                                // 2360
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 2361
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 2362
 *                                                                                                                // 2363
 * For the license see COPYING.                                                                                   // 2364
 * ***** END LICENSE BLOCK *****                                                                                  // 2365
 */                                                                                                               // 2366
                                                                                                                  // 2367
var XhrReceiver = function(url, AjaxObject) {                                                                     // 2368
    var that = this;                                                                                              // 2369
    var buf_pos = 0;                                                                                              // 2370
                                                                                                                  // 2371
    that.xo = new AjaxObject('POST', url, null);                                                                  // 2372
    that.xo.onchunk = function(status, text) {                                                                    // 2373
        if (status !== 200) return;                                                                               // 2374
        while (1) {                                                                                               // 2375
            var buf = text.slice(buf_pos);                                                                        // 2376
            var p = buf.indexOf('\n');                                                                            // 2377
            if (p === -1) break;                                                                                  // 2378
            buf_pos += p+1;                                                                                       // 2379
            var msg = buf.slice(0, p);                                                                            // 2380
            that.dispatchEvent(new SimpleEvent('message', {data: msg}));                                          // 2381
        }                                                                                                         // 2382
    };                                                                                                            // 2383
    that.xo.onfinish = function(status, text) {                                                                   // 2384
        that.xo.onchunk(status, text);                                                                            // 2385
        that.xo = null;                                                                                           // 2386
        var reason = status === 200 ? 'network' : 'permanent';                                                    // 2387
        that.dispatchEvent(new SimpleEvent('close', {reason: reason}));                                           // 2388
    }                                                                                                             // 2389
};                                                                                                                // 2390
                                                                                                                  // 2391
XhrReceiver.prototype = new REventTarget();                                                                       // 2392
                                                                                                                  // 2393
XhrReceiver.prototype.abort = function() {                                                                        // 2394
    var that = this;                                                                                              // 2395
    if (that.xo) {                                                                                                // 2396
        that.xo.close();                                                                                          // 2397
        that.dispatchEvent(new SimpleEvent('close', {reason: 'user'}));                                           // 2398
        that.xo = null;                                                                                           // 2399
    }                                                                                                             // 2400
};                                                                                                                // 2401
//         [*] End of lib/trans-receiver-xhr.js                                                                   // 2402
                                                                                                                  // 2403
                                                                                                                  // 2404
//         [*] Including lib/test-hooks.js                                                                        // 2405
/*                                                                                                                // 2406
 * ***** BEGIN LICENSE BLOCK *****                                                                                // 2407
 * Copyright (c) 2011-2012 VMware, Inc.                                                                           // 2408
 *                                                                                                                // 2409
 * For the license see COPYING.                                                                                   // 2410
 * ***** END LICENSE BLOCK *****                                                                                  // 2411
 */                                                                                                               // 2412
                                                                                                                  // 2413
// For testing                                                                                                    // 2414
SockJS.getUtils = function(){                                                                                     // 2415
    return utils;                                                                                                 // 2416
};                                                                                                                // 2417
                                                                                                                  // 2418
SockJS.getIframeTransport = function(){                                                                           // 2419
    return IframeTransport;                                                                                       // 2420
};                                                                                                                // 2421
//         [*] End of lib/test-hooks.js                                                                           // 2422
                                                                                                                  // 2423
                  return SockJS;                                                                                  // 2424
          })();                                                                                                   // 2425
if ('_sockjs_onload' in window) setTimeout(_sockjs_onload, 1);                                                    // 2426
                                                                                                                  // 2427
// AMD compliance                                                                                                 // 2428
if (typeof define === 'function' && define.amd) {                                                                 // 2429
    define('sockjs', [], function(){return SockJS;});                                                             // 2430
}                                                                                                                 // 2431
//     [*] End of lib/index.js                                                                                    // 2432
                                                                                                                  // 2433
// [*] End of lib/all.js                                                                                          // 2434
                                                                                                                  // 2435
                                                                                                                  // 2436
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/livedata/stream_client_sockjs.js                                                                      //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
// @param url {String} URL to Meteor app                                                                          // 1
//   "http://subdomain.meteor.com/" or "/" or                                                                     // 2
//   "ddp+sockjs://foo-**.meteor.com/sockjs"                                                                      // 3
LivedataTest.ClientStream = function (url) {                                                                      // 4
  var self = this;                                                                                                // 5
  self._initCommon();                                                                                             // 6
                                                                                                                  // 7
  //// Constants                                                                                                  // 8
                                                                                                                  // 9
                                                                                                                  // 10
  // how long between hearing heartbeat from the server until we declare                                          // 11
  // the connection dead. heartbeats come every 25s (stream_server.js)                                            // 12
  //                                                                                                              // 13
  // NOTE: this is a workaround until sockjs detects heartbeats on the                                            // 14
  // client automatically.                                                                                        // 15
  // https://github.com/sockjs/sockjs-client/issues/67                                                            // 16
  // https://github.com/sockjs/sockjs-node/issues/68                                                              // 17
  self.HEARTBEAT_TIMEOUT = 60000;                                                                                 // 18
                                                                                                                  // 19
  self.rawUrl = url;                                                                                              // 20
  self.socket = null;                                                                                             // 21
                                                                                                                  // 22
  self.sent_update_available = false;                                                                             // 23
                                                                                                                  // 24
  self.heartbeatTimer = null;                                                                                     // 25
                                                                                                                  // 26
  // Listen to global 'online' event if we are running in a browser.                                              // 27
  // (IE8 does not support addEventListener)                                                                      // 28
  if (typeof window !== 'undefined' && window.addEventListener)                                                   // 29
    window.addEventListener("online", _.bind(self._online, self),                                                 // 30
                            false /* useCapture. make FF3.6 happy. */);                                           // 31
                                                                                                                  // 32
  //// Kickoff!                                                                                                   // 33
  self._launchConnection();                                                                                       // 34
};                                                                                                                // 35
                                                                                                                  // 36
_.extend(LivedataTest.ClientStream.prototype, {                                                                   // 37
                                                                                                                  // 38
  // data is a utf8 string. Data sent while not connected is dropped on                                           // 39
  // the floor, and it is up the user of this API to retransmit lost                                              // 40
  // messages on 'reset'                                                                                          // 41
  send: function (data) {                                                                                         // 42
    var self = this;                                                                                              // 43
    if (self.currentStatus.connected) {                                                                           // 44
      self.socket.send(data);                                                                                     // 45
    }                                                                                                             // 46
  },                                                                                                              // 47
                                                                                                                  // 48
  // Changes where this connection points                                                                         // 49
  _changeUrl: function (url) {                                                                                    // 50
    var self = this;                                                                                              // 51
    self.rawUrl = url;                                                                                            // 52
  },                                                                                                              // 53
                                                                                                                  // 54
  _connected: function (welcome_message) {                                                                        // 55
    var self = this;                                                                                              // 56
                                                                                                                  // 57
    if (self.connectionTimer) {                                                                                   // 58
      clearTimeout(self.connectionTimer);                                                                         // 59
      self.connectionTimer = null;                                                                                // 60
    }                                                                                                             // 61
                                                                                                                  // 62
    if (self.currentStatus.connected) {                                                                           // 63
      // already connected. do nothing. this probably shouldn't happen.                                           // 64
      return;                                                                                                     // 65
    }                                                                                                             // 66
                                                                                                                  // 67
    // inspect the welcome data and decide if we have to reload                                                   // 68
    try {                                                                                                         // 69
      var welcome_data = JSON.parse(welcome_message);                                                             // 70
    } catch (err) {                                                                                               // 71
      Meteor._debug("DEBUG: malformed welcome packet", welcome_message);                                          // 72
    }                                                                                                             // 73
                                                                                                                  // 74
    if (welcome_data && welcome_data.server_id) {                                                                 // 75
      if (__meteor_runtime_config__.serverId &&                                                                   // 76
          __meteor_runtime_config__.serverId !== welcome_data.server_id &&                                        // 77
          !self.sent_update_available) {                                                                          // 78
        self.sent_update_available = true;                                                                        // 79
        _.each(self.eventCallbacks.update_available,                                                              // 80
               function (callback) { callback(); });                                                              // 81
      }                                                                                                           // 82
    } else                                                                                                        // 83
      Meteor._debug("DEBUG: invalid welcome packet", welcome_data);                                               // 84
                                                                                                                  // 85
    // update status                                                                                              // 86
    self.currentStatus.status = "connected";                                                                      // 87
    self.currentStatus.connected = true;                                                                          // 88
    self.currentStatus.retryCount = 0;                                                                            // 89
    self.statusChanged();                                                                                         // 90
                                                                                                                  // 91
    // fire resets. This must come after status change so that clients                                            // 92
    // can call send from within a reset callback.                                                                // 93
    _.each(self.eventCallbacks.reset, function (callback) { callback(); });                                       // 94
                                                                                                                  // 95
  },                                                                                                              // 96
                                                                                                                  // 97
  _cleanup: function () {                                                                                         // 98
    var self = this;                                                                                              // 99
                                                                                                                  // 100
    self._clearConnectionAndHeartbeatTimers();                                                                    // 101
    if (self.socket) {                                                                                            // 102
      self.socket.onmessage = self.socket.onclose                                                                 // 103
        = self.socket.onerror = self.socket.onheartbeat = function () {};                                         // 104
      self.socket.close();                                                                                        // 105
      self.socket = null;                                                                                         // 106
    }                                                                                                             // 107
  },                                                                                                              // 108
                                                                                                                  // 109
  _clearConnectionAndHeartbeatTimers: function () {                                                               // 110
    var self = this;                                                                                              // 111
    if (self.connectionTimer) {                                                                                   // 112
      clearTimeout(self.connectionTimer);                                                                         // 113
      self.connectionTimer = null;                                                                                // 114
    }                                                                                                             // 115
    if (self.heartbeatTimer) {                                                                                    // 116
      clearTimeout(self.heartbeatTimer);                                                                          // 117
      self.heartbeatTimer = null;                                                                                 // 118
    }                                                                                                             // 119
  },                                                                                                              // 120
                                                                                                                  // 121
  _heartbeat_timeout: function () {                                                                               // 122
    var self = this;                                                                                              // 123
    Meteor._debug("Connection timeout. No heartbeat received.");                                                  // 124
    self._lostConnection();                                                                                       // 125
  },                                                                                                              // 126
                                                                                                                  // 127
  _heartbeat_received: function () {                                                                              // 128
    var self = this;                                                                                              // 129
    // If we've already permanently shut down this stream, the timeout is                                         // 130
    // already cleared, and we don't need to set it again.                                                        // 131
    if (self._forcedToDisconnect)                                                                                 // 132
      return;                                                                                                     // 133
    if (self.heartbeatTimer)                                                                                      // 134
      clearTimeout(self.heartbeatTimer);                                                                          // 135
    self.heartbeatTimer = setTimeout(                                                                             // 136
      _.bind(self._heartbeat_timeout, self),                                                                      // 137
      self.HEARTBEAT_TIMEOUT);                                                                                    // 138
  },                                                                                                              // 139
                                                                                                                  // 140
  _sockjsProtocolsWhitelist: function () {                                                                        // 141
    // only allow polling protocols. no streaming.  streaming                                                     // 142
    // makes safari spin.                                                                                         // 143
    var protocolsWhitelist = [                                                                                    // 144
      'xdr-polling', 'xhr-polling', 'iframe-xhr-polling', 'jsonp-polling'];                                       // 145
                                                                                                                  // 146
    // iOS 4 and 5 and below crash when using websockets over certain                                             // 147
    // proxies. this seems to be resolved with iOS 6. eg                                                          // 148
    // https://github.com/LearnBoost/socket.io/issues/193#issuecomment-7308865.                                   // 149
    //                                                                                                            // 150
    // iOS <4 doesn't support websockets at all so sockjs will just                                               // 151
    // immediately fall back to http                                                                              // 152
    var noWebsockets = navigator &&                                                                               // 153
          /iPhone|iPad|iPod/.test(navigator.userAgent) &&                                                         // 154
          /OS 4_|OS 5_/.test(navigator.userAgent);                                                                // 155
                                                                                                                  // 156
    if (!noWebsockets)                                                                                            // 157
      protocolsWhitelist = ['websocket'].concat(protocolsWhitelist);                                              // 158
                                                                                                                  // 159
    return protocolsWhitelist;                                                                                    // 160
  },                                                                                                              // 161
                                                                                                                  // 162
  _launchConnection: function () {                                                                                // 163
    var self = this;                                                                                              // 164
    self._cleanup(); // cleanup the old socket, if there was one.                                                 // 165
                                                                                                                  // 166
    // Convert raw URL to SockJS URL each time we open a connection, so that we                                   // 167
    // can connect to random hostnames and get around browser per-host                                            // 168
    // connection limits.                                                                                         // 169
    self.socket = new SockJS(                                                                                     // 170
      toSockjsUrl(self.rawUrl), undefined, {                                                                      // 171
        debug: false, protocols_whitelist: self._sockjsProtocolsWhitelist()                                       // 172
      });                                                                                                         // 173
    self.socket.onmessage = function (data) {                                                                     // 174
      self._heartbeat_received();                                                                                 // 175
                                                                                                                  // 176
      // first message we get when we're connecting goes to _connected,                                           // 177
      // which connects us. All subsequent messages (while connected) go to                                       // 178
      // the callback.                                                                                            // 179
      if (self.currentStatus.status === "connecting")                                                             // 180
        self._connected(data.data);                                                                               // 181
      else if (self.currentStatus.connected)                                                                      // 182
        _.each(self.eventCallbacks.message, function (callback) {                                                 // 183
          callback(data.data);                                                                                    // 184
        });                                                                                                       // 185
    };                                                                                                            // 186
    self.socket.onclose = function () {                                                                           // 187
      // Meteor._debug("stream disconnect", _.toArray(arguments), (new Date()).toDateString());                   // 188
      self._lostConnection();                                                                                     // 189
    };                                                                                                            // 190
    self.socket.onerror = function () {                                                                           // 191
      // XXX is this ever called?                                                                                 // 192
      Meteor._debug("stream error", _.toArray(arguments), (new Date()).toDateString());                           // 193
    };                                                                                                            // 194
                                                                                                                  // 195
    self.socket.onheartbeat =  function () {                                                                      // 196
      self._heartbeat_received();                                                                                 // 197
    };                                                                                                            // 198
                                                                                                                  // 199
    if (self.connectionTimer)                                                                                     // 200
      clearTimeout(self.connectionTimer);                                                                         // 201
    self.connectionTimer = setTimeout(                                                                            // 202
      _.bind(self._lostConnection, self),                                                                         // 203
      self.CONNECT_TIMEOUT);                                                                                      // 204
  }                                                                                                               // 205
});                                                                                                               // 206
                                                                                                                  // 207
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/livedata/stream_client_common.js                                                                      //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
// XXX from Underscore.String (http://epeli.github.com/underscore.string/)                                        // 1
var startsWith = function(str, starts) {                                                                          // 2
  return str.length >= starts.length &&                                                                           // 3
    str.substring(0, starts.length) === starts;                                                                   // 4
};                                                                                                                // 5
var endsWith = function(str, ends) {                                                                              // 6
  return str.length >= ends.length &&                                                                             // 7
    str.substring(str.length - ends.length) === ends;                                                             // 8
};                                                                                                                // 9
                                                                                                                  // 10
// @param url {String} URL to Meteor app, eg:                                                                     // 11
//   "/" or "madewith.meteor.com" or "https://foo.meteor.com"                                                     // 12
//   or "ddp+sockjs://ddp--****-foo.meteor.com/sockjs"                                                            // 13
// @returns {String} URL to the endpoint with the specific scheme and subPath, e.g.                               // 14
// for scheme "http" and subPath "sockjs"                                                                         // 15
//   "http://subdomain.meteor.com/sockjs" or "/sockjs"                                                            // 16
//   or "https://ddp--1234-foo.meteor.com/sockjs"                                                                 // 17
var translateUrl =  function(url, newSchemeBase, subPath) {                                                       // 18
  if (! newSchemeBase) {                                                                                          // 19
    newSchemeBase = "http";                                                                                       // 20
  }                                                                                                               // 21
                                                                                                                  // 22
  var ddpUrlMatch = url.match(/^ddp(i?)\+sockjs:\/\//);                                                           // 23
  var httpUrlMatch = url.match(/^http(s?):\/\//);                                                                 // 24
  var newScheme;                                                                                                  // 25
  if (ddpUrlMatch) {                                                                                              // 26
    // Remove scheme and split off the host.                                                                      // 27
    var urlAfterDDP = url.substr(ddpUrlMatch[0].length);                                                          // 28
    newScheme = ddpUrlMatch[1] === "i" ? newSchemeBase : newSchemeBase + "s";                                     // 29
    var slashPos = urlAfterDDP.indexOf('/');                                                                      // 30
    var host =                                                                                                    // 31
          slashPos === -1 ? urlAfterDDP : urlAfterDDP.substr(0, slashPos);                                        // 32
    var rest = slashPos === -1 ? '' : urlAfterDDP.substr(slashPos);                                               // 33
                                                                                                                  // 34
    // In the host (ONLY!), change '*' characters into random digits. This                                        // 35
    // allows different stream connections to connect to different hostnames                                      // 36
    // and avoid browser per-hostname connection limits.                                                          // 37
    host = host.replace(/\*/g, function () {                                                                      // 38
      return Math.floor(Random.fraction()*10);                                                                    // 39
    });                                                                                                           // 40
                                                                                                                  // 41
    return newScheme + '://' + host + rest;                                                                       // 42
  } else if (httpUrlMatch) {                                                                                      // 43
    newScheme = !httpUrlMatch[1] ? newSchemeBase : newSchemeBase + "s";                                           // 44
    var urlAfterHttp = url.substr(httpUrlMatch[0].length);                                                        // 45
    url = newScheme + "://" + urlAfterHttp;                                                                       // 46
  }                                                                                                               // 47
                                                                                                                  // 48
  // Prefix FQDNs but not relative URLs                                                                           // 49
  if (url.indexOf("://") === -1 && !startsWith(url, "/")) {                                                       // 50
    url = newSchemeBase + "://" + url;                                                                            // 51
  }                                                                                                               // 52
                                                                                                                  // 53
  url = Meteor._relativeToSiteRootUrl(url);                                                                       // 54
                                                                                                                  // 55
  if (endsWith(url, "/"))                                                                                         // 56
    return url + subPath;                                                                                         // 57
  else                                                                                                            // 58
    return url + "/" + subPath;                                                                                   // 59
};                                                                                                                // 60
                                                                                                                  // 61
toSockjsUrl = function (url) {                                                                                    // 62
  return translateUrl(url, "http", "sockjs");                                                                     // 63
};                                                                                                                // 64
                                                                                                                  // 65
toWebsocketUrl = function (url) {                                                                                 // 66
  var ret = translateUrl(url, "ws", "websocket");                                                                 // 67
  return ret;                                                                                                     // 68
};                                                                                                                // 69
                                                                                                                  // 70
LivedataTest.toSockjsUrl = toSockjsUrl;                                                                           // 71
                                                                                                                  // 72
                                                                                                                  // 73
_.extend(LivedataTest.ClientStream.prototype, {                                                                   // 74
                                                                                                                  // 75
  // Register for callbacks.                                                                                      // 76
  on: function (name, callback) {                                                                                 // 77
    var self = this;                                                                                              // 78
                                                                                                                  // 79
    if (name !== 'message' && name !== 'reset' && name !== 'update_available')                                    // 80
      throw new Error("unknown event type: " + name);                                                             // 81
                                                                                                                  // 82
    if (!self.eventCallbacks[name])                                                                               // 83
      self.eventCallbacks[name] = [];                                                                             // 84
    self.eventCallbacks[name].push(callback);                                                                     // 85
  },                                                                                                              // 86
                                                                                                                  // 87
                                                                                                                  // 88
  _initCommon: function () {                                                                                      // 89
    var self = this;                                                                                              // 90
    //// Constants                                                                                                // 91
                                                                                                                  // 92
    // how long to wait until we declare the connection attempt                                                   // 93
    // failed.                                                                                                    // 94
    self.CONNECT_TIMEOUT = 10000;                                                                                 // 95
                                                                                                                  // 96
                                                                                                                  // 97
    // time for initial reconnect attempt.                                                                        // 98
    self.RETRY_BASE_TIMEOUT = 1000;                                                                               // 99
    // exponential factor to increase timeout each attempt.                                                       // 100
    self.RETRY_EXPONENT = 2.2;                                                                                    // 101
    // maximum time between reconnects. keep this intentionally                                                   // 102
    // high-ish to ensure a server can recover from a failure caused                                              // 103
    // by load                                                                                                    // 104
    self.RETRY_MAX_TIMEOUT = 5 * 60000; // 5 minutes                                                              // 105
    // time to wait for the first 2 retries.  this helps page reload                                              // 106
    // speed during dev mode restarts, but doesn't hurt prod too                                                  // 107
    // much (due to CONNECT_TIMEOUT)                                                                              // 108
    self.RETRY_MIN_TIMEOUT = 10;                                                                                  // 109
    // how many times to try to reconnect 'instantly'                                                             // 110
    self.RETRY_MIN_COUNT = 2;                                                                                     // 111
    // fuzz factor to randomize reconnect times by. avoid reconnect                                               // 112
    // storms.                                                                                                    // 113
    self.RETRY_FUZZ = 0.5; // +- 25%                                                                              // 114
                                                                                                                  // 115
                                                                                                                  // 116
                                                                                                                  // 117
    self.eventCallbacks = {}; // name -> [callback]                                                               // 118
                                                                                                                  // 119
    self._forcedToDisconnect = false;                                                                             // 120
                                                                                                                  // 121
    //// Reactive status                                                                                          // 122
    self.currentStatus = {                                                                                        // 123
      status: "connecting",                                                                                       // 124
      connected: false,                                                                                           // 125
      retryCount: 0                                                                                               // 126
    };                                                                                                            // 127
                                                                                                                  // 128
                                                                                                                  // 129
    self.statusListeners = typeof Deps !== 'undefined' && new Deps.Dependency;                                    // 130
    self.statusChanged = function () {                                                                            // 131
      if (self.statusListeners)                                                                                   // 132
        self.statusListeners.changed();                                                                           // 133
    };                                                                                                            // 134
                                                                                                                  // 135
    //// Retry logic                                                                                              // 136
    self.retryTimer = null;                                                                                       // 137
    self.connectionTimer = null;                                                                                  // 138
                                                                                                                  // 139
  },                                                                                                              // 140
                                                                                                                  // 141
  // Trigger a reconnect.                                                                                         // 142
  reconnect: function (options) {                                                                                 // 143
    var self = this;                                                                                              // 144
    options = options || {};                                                                                      // 145
                                                                                                                  // 146
    if (options.url) {                                                                                            // 147
      self._changeUrl(options.url);                                                                               // 148
    }                                                                                                             // 149
                                                                                                                  // 150
    if (self.currentStatus.connected) {                                                                           // 151
      if (options._force || options.url) {                                                                        // 152
        // force reconnect.                                                                                       // 153
        self._lostConnection();                                                                                   // 154
      } // else, noop.                                                                                            // 155
      return;                                                                                                     // 156
    }                                                                                                             // 157
                                                                                                                  // 158
    // if we're mid-connection, stop it.                                                                          // 159
    if (self.currentStatus.status === "connecting") {                                                             // 160
      self._lostConnection();                                                                                     // 161
    }                                                                                                             // 162
                                                                                                                  // 163
    if (self.retryTimer)                                                                                          // 164
      clearTimeout(self.retryTimer);                                                                              // 165
    self.retryTimer = null;                                                                                       // 166
    self.currentStatus.retryCount -= 1; // don't count manual retries                                             // 167
    self._retryNow();                                                                                             // 168
  },                                                                                                              // 169
                                                                                                                  // 170
  disconnect: function (options) {                                                                                // 171
    var self = this;                                                                                              // 172
    options = options || {};                                                                                      // 173
                                                                                                                  // 174
    // Failed is permanent. If we're failed, don't let people go back                                             // 175
    // online by calling 'disconnect' then 'reconnect'.                                                           // 176
    if (self._forcedToDisconnect)                                                                                 // 177
      return;                                                                                                     // 178
                                                                                                                  // 179
    // If _permanent is set, permanently disconnect a stream. Once a stream                                       // 180
    // is forced to disconnect, it can never reconnect. This is for                                               // 181
    // error cases such as ddp version mismatch, where trying again                                               // 182
    // won't fix the problem.                                                                                     // 183
    if (options._permanent) {                                                                                     // 184
      self._forcedToDisconnect = true;                                                                            // 185
    }                                                                                                             // 186
                                                                                                                  // 187
    self._cleanup();                                                                                              // 188
    if (self.retryTimer) {                                                                                        // 189
      clearTimeout(self.retryTimer);                                                                              // 190
      self.retryTimer = null;                                                                                     // 191
    }                                                                                                             // 192
                                                                                                                  // 193
    self.currentStatus = {                                                                                        // 194
      status: (options._permanent ? "failed" : "offline"),                                                        // 195
      connected: false,                                                                                           // 196
      retryCount: 0                                                                                               // 197
    };                                                                                                            // 198
                                                                                                                  // 199
    if (options._permanent && options._error)                                                                     // 200
      self.currentStatus.reason = options._error;                                                                 // 201
                                                                                                                  // 202
    self.statusChanged();                                                                                         // 203
  },                                                                                                              // 204
                                                                                                                  // 205
  _lostConnection: function () {                                                                                  // 206
    var self = this;                                                                                              // 207
                                                                                                                  // 208
    self._cleanup();                                                                                              // 209
    self._retryLater(); // sets status. no need to do it here.                                                    // 210
  },                                                                                                              // 211
                                                                                                                  // 212
  _retryTimeout: function (count) {                                                                               // 213
    var self = this;                                                                                              // 214
                                                                                                                  // 215
    if (count < self.RETRY_MIN_COUNT)                                                                             // 216
      return self.RETRY_MIN_TIMEOUT;                                                                              // 217
                                                                                                                  // 218
    var timeout = Math.min(                                                                                       // 219
      self.RETRY_MAX_TIMEOUT,                                                                                     // 220
      self.RETRY_BASE_TIMEOUT * Math.pow(self.RETRY_EXPONENT, count));                                            // 221
    // fuzz the timeout randomly, to avoid reconnect storms when a                                                // 222
    // server goes down.                                                                                          // 223
    timeout = timeout * ((Random.fraction() * self.RETRY_FUZZ) +                                                  // 224
                         (1 - self.RETRY_FUZZ/2));                                                                // 225
    return timeout;                                                                                               // 226
  },                                                                                                              // 227
                                                                                                                  // 228
  // fired when we detect that we've gone online. try to reconnect                                                // 229
  // immediately.                                                                                                 // 230
  _online: function () {                                                                                          // 231
    // if we've requested to be offline by disconnecting, don't reconnect.                                        // 232
    if (this.currentStatus.status != "offline")                                                                   // 233
      this.reconnect();                                                                                           // 234
  },                                                                                                              // 235
                                                                                                                  // 236
  _retryLater: function () {                                                                                      // 237
    var self = this;                                                                                              // 238
                                                                                                                  // 239
    var timeout = self._retryTimeout(self.currentStatus.retryCount);                                              // 240
    if (self.retryTimer)                                                                                          // 241
      clearTimeout(self.retryTimer);                                                                              // 242
    self.retryTimer = setTimeout(_.bind(self._retryNow, self), timeout);                                          // 243
                                                                                                                  // 244
    self.currentStatus.status = "waiting";                                                                        // 245
    self.currentStatus.connected = false;                                                                         // 246
    self.currentStatus.retryTime = (new Date()).getTime() + timeout;                                              // 247
    self.statusChanged();                                                                                         // 248
  },                                                                                                              // 249
                                                                                                                  // 250
  _retryNow: function () {                                                                                        // 251
    var self = this;                                                                                              // 252
                                                                                                                  // 253
    if (self._forcedToDisconnect)                                                                                 // 254
      return;                                                                                                     // 255
                                                                                                                  // 256
    self.currentStatus.retryCount += 1;                                                                           // 257
    self.currentStatus.status = "connecting";                                                                     // 258
    self.currentStatus.connected = false;                                                                         // 259
    delete self.currentStatus.retryTime;                                                                          // 260
    self.statusChanged();                                                                                         // 261
                                                                                                                  // 262
    self._launchConnection();                                                                                     // 263
  },                                                                                                              // 264
                                                                                                                  // 265
                                                                                                                  // 266
  // Get current status. Reactive.                                                                                // 267
  status: function () {                                                                                           // 268
    var self = this;                                                                                              // 269
    if (self.statusListeners)                                                                                     // 270
      self.statusListeners.depend();                                                                              // 271
    return self.currentStatus;                                                                                    // 272
  }                                                                                                               // 273
});                                                                                                               // 274
                                                                                                                  // 275
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/livedata/livedata_common.js                                                                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
DDP = {};                                                                                                         // 1
                                                                                                                  // 2
SUPPORTED_DDP_VERSIONS = [ 'pre1' ];                                                                              // 3
                                                                                                                  // 4
LivedataTest.SUPPORTED_DDP_VERSIONS = SUPPORTED_DDP_VERSIONS;                                                     // 5
                                                                                                                  // 6
MethodInvocation = function (options) {                                                                           // 7
  var self = this;                                                                                                // 8
                                                                                                                  // 9
  // true if we're running not the actual method, but a stub (that is,                                            // 10
  // if we're on a client (which may be a browser, or in the future a                                             // 11
  // server connecting to another server) and presently running a                                                 // 12
  // simulation of a server-side method for latency compensation                                                  // 13
  // purposes). not currently true except in a client such as a browser,                                          // 14
  // since there's usually no point in running stubs unless you have a                                            // 15
  // zero-latency connection to the user.                                                                         // 16
  this.isSimulation = options.isSimulation;                                                                       // 17
                                                                                                                  // 18
  // call this function to allow other method invocations (from the                                               // 19
  // same client) to continue running without waiting for this one to                                             // 20
  // complete.                                                                                                    // 21
  this._unblock = options.unblock || function () {};                                                              // 22
  this._calledUnblock = false;                                                                                    // 23
                                                                                                                  // 24
  // current user id                                                                                              // 25
  this.userId = options.userId;                                                                                   // 26
                                                                                                                  // 27
  // sets current user id in all appropriate server contexts and                                                  // 28
  // reruns subscriptions                                                                                         // 29
  this._setUserId = options.setUserId || function () {};                                                          // 30
                                                                                                                  // 31
  // Scratch data scoped to this connection (livedata_connection on the                                           // 32
  // client, livedata_session on the server). This is only used                                                   // 33
  // internally, but we should have real and documented API for this                                              // 34
  // sort of thing someday.                                                                                       // 35
  this._sessionData = options.sessionData;                                                                        // 36
};                                                                                                                // 37
                                                                                                                  // 38
_.extend(MethodInvocation.prototype, {                                                                            // 39
  unblock: function () {                                                                                          // 40
    var self = this;                                                                                              // 41
    self._calledUnblock = true;                                                                                   // 42
    self._unblock();                                                                                              // 43
  },                                                                                                              // 44
  setUserId: function(userId) {                                                                                   // 45
    var self = this;                                                                                              // 46
    if (self._calledUnblock)                                                                                      // 47
      throw new Error("Can't call setUserId in a method after calling unblock");                                  // 48
    self.userId = userId;                                                                                         // 49
    self._setUserId(userId);                                                                                      // 50
  }                                                                                                               // 51
});                                                                                                               // 52
                                                                                                                  // 53
parseDDP = function (stringMessage) {                                                                             // 54
  try {                                                                                                           // 55
    var msg = JSON.parse(stringMessage);                                                                          // 56
  } catch (e) {                                                                                                   // 57
    Meteor._debug("Discarding message with invalid JSON", stringMessage);                                         // 58
    return null;                                                                                                  // 59
  }                                                                                                               // 60
  // DDP messages must be objects.                                                                                // 61
  if (msg === null || typeof msg !== 'object') {                                                                  // 62
    Meteor._debug("Discarding non-object DDP message", stringMessage);                                            // 63
    return null;                                                                                                  // 64
  }                                                                                                               // 65
                                                                                                                  // 66
  // massage msg to get it into "abstract ddp" rather than "wire ddp" format.                                     // 67
                                                                                                                  // 68
  // switch between "cleared" rep of unsetting fields and "undefined"                                             // 69
  // rep of same                                                                                                  // 70
  if (_.has(msg, 'cleared')) {                                                                                    // 71
    if (!_.has(msg, 'fields'))                                                                                    // 72
      msg.fields = {};                                                                                            // 73
    _.each(msg.cleared, function (clearKey) {                                                                     // 74
      msg.fields[clearKey] = undefined;                                                                           // 75
    });                                                                                                           // 76
    delete msg.cleared;                                                                                           // 77
  }                                                                                                               // 78
                                                                                                                  // 79
  _.each(['fields', 'params', 'result'], function (field) {                                                       // 80
    if (_.has(msg, field))                                                                                        // 81
      msg[field] = EJSON._adjustTypesFromJSONValue(msg[field]);                                                   // 82
  });                                                                                                             // 83
                                                                                                                  // 84
  return msg;                                                                                                     // 85
};                                                                                                                // 86
                                                                                                                  // 87
stringifyDDP = function (msg) {                                                                                   // 88
  var copy = EJSON.clone(msg);                                                                                    // 89
  // swizzle 'changed' messages from 'fields undefined' rep to 'fields                                            // 90
  // and cleared' rep                                                                                             // 91
  if (_.has(msg, 'fields')) {                                                                                     // 92
    var cleared = [];                                                                                             // 93
    _.each(msg.fields, function (value, key) {                                                                    // 94
      if (value === undefined) {                                                                                  // 95
        cleared.push(key);                                                                                        // 96
        delete copy.fields[key];                                                                                  // 97
      }                                                                                                           // 98
    });                                                                                                           // 99
    if (!_.isEmpty(cleared))                                                                                      // 100
      copy.cleared = cleared;                                                                                     // 101
    if (_.isEmpty(copy.fields))                                                                                   // 102
      delete copy.fields;                                                                                         // 103
  }                                                                                                               // 104
  // adjust types to basic                                                                                        // 105
  _.each(['fields', 'params', 'result'], function (field) {                                                       // 106
    if (_.has(copy, field))                                                                                       // 107
      copy[field] = EJSON._adjustTypesToJSONValue(copy[field]);                                                   // 108
  });                                                                                                             // 109
  if (msg.id && typeof msg.id !== 'string') {                                                                     // 110
    throw new Error("Message id is not a string");                                                                // 111
  }                                                                                                               // 112
  return JSON.stringify(copy);                                                                                    // 113
};                                                                                                                // 114
                                                                                                                  // 115
// This is private but it's used in a few places. accounts-base uses                                              // 116
// it to get the current user. accounts-password uses it to stash SRP                                             // 117
// state in the DDP session. Meteor.setTimeout and friends clear                                                  // 118
// it. We can probably find a better way to factor this.                                                          // 119
DDP._CurrentInvocation = new Meteor.EnvironmentVariable;                                                          // 120
                                                                                                                  // 121
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/livedata/livedata_connection.js                                                                       //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
if (Meteor.isServer) {                                                                                            // 1
  var path = Npm.require('path');                                                                                 // 2
  var Fiber = Npm.require('fibers');                                                                              // 3
  var Future = Npm.require(path.join('fibers', 'future'));                                                        // 4
}                                                                                                                 // 5
                                                                                                                  // 6
// @param url {String|Object} URL to Meteor app,                                                                  // 7
//   or an object as a test hook (see code)                                                                       // 8
// Options:                                                                                                       // 9
//   reloadOnUpdate: should we try to reload when the server says                                                 // 10
//                      there's new code available?                                                               // 11
//   reloadWithOutstanding: is it OK to reload if there are outstanding methods?                                  // 12
var Connection = function (url, options) {                                                                        // 13
  var self = this;                                                                                                // 14
  options = _.extend({                                                                                            // 15
    reloadOnUpdate: false,                                                                                        // 16
    // The rest of these options are only for testing.                                                            // 17
    reloadWithOutstanding: false,                                                                                 // 18
    supportedDDPVersions: SUPPORTED_DDP_VERSIONS,                                                                 // 19
    onConnectionFailure: function (reason) {                                                                      // 20
      Meteor._debug("Failed DDP connection: " + reason);                                                          // 21
    },                                                                                                            // 22
    onConnected: function () {}                                                                                   // 23
  }, options);                                                                                                    // 24
                                                                                                                  // 25
  // If set, called when we reconnect, queuing method calls _before_ the                                          // 26
  // existing outstanding ones. This is the only data member that is part of the                                  // 27
  // public API!                                                                                                  // 28
  self.onReconnect = null;                                                                                        // 29
                                                                                                                  // 30
  // as a test hook, allow passing a stream instead of a url.                                                     // 31
  if (typeof url === "object") {                                                                                  // 32
    self._stream = url;                                                                                           // 33
  } else {                                                                                                        // 34
    self._stream = new LivedataTest.ClientStream(url);                                                            // 35
  }                                                                                                               // 36
                                                                                                                  // 37
  self._lastSessionId = null;                                                                                     // 38
  self._versionSuggestion = null;  // The last proposed DDP version.                                              // 39
  self._version = null;   // The DDP version agreed on by client and server.                                      // 40
  self._stores = {}; // name -> object with methods                                                               // 41
  self._methodHandlers = {}; // name -> func                                                                      // 42
  self._nextMethodId = 1;                                                                                         // 43
  self._supportedDDPVersions = options.supportedDDPVersions;                                                      // 44
                                                                                                                  // 45
  // Tracks methods which the user has tried to call but which have not yet                                       // 46
  // called their user callback (ie, they are waiting on their result or for all                                  // 47
  // of their writes to be written to the local cache). Map from method ID to                                     // 48
  // MethodInvoker object.                                                                                        // 49
  self._methodInvokers = {};                                                                                      // 50
                                                                                                                  // 51
  // Tracks methods which the user has called but whose result messages have not                                  // 52
  // arrived yet.                                                                                                 // 53
  //                                                                                                              // 54
  // _outstandingMethodBlocks is an array of blocks of methods. Each block                                        // 55
  // represents a set of methods that can run at the same time. The first block                                   // 56
  // represents the methods which are currently in flight; subsequent blocks                                      // 57
  // must wait for previous blocks to be fully finished before they can be sent                                   // 58
  // to the server.                                                                                               // 59
  //                                                                                                              // 60
  // Each block is an object with the following fields:                                                           // 61
  // - methods: a list of MethodInvoker objects                                                                   // 62
  // - wait: a boolean; if true, this block had a single method invoked with                                      // 63
  //         the "wait" option                                                                                    // 64
  //                                                                                                              // 65
  // There will never be adjacent blocks with wait=false, because the only thing                                  // 66
  // that makes methods need to be serialized is a wait method.                                                   // 67
  //                                                                                                              // 68
  // Methods are removed from the first block when their "result" is                                              // 69
  // received. The entire first block is only removed when all of the in-flight                                   // 70
  // methods have received their results (so the "methods" list is empty) *AND*                                   // 71
  // all of the data written by those methods are visible in the local cache. So                                  // 72
  // it is possible for the first block's methods list to be empty, if we are                                     // 73
  // still waiting for some objects to quiesce.                                                                   // 74
  //                                                                                                              // 75
  // Example:                                                                                                     // 76
  //  _outstandingMethodBlocks = [                                                                                // 77
  //    {wait: false, methods: []},                                                                               // 78
  //    {wait: true, methods: [<MethodInvoker for 'login'>]},                                                     // 79
  //    {wait: false, methods: [<MethodInvoker for 'foo'>,                                                        // 80
  //                            <MethodInvoker for 'bar'>]}]                                                      // 81
  // This means that there were some methods which were sent to the server and                                    // 82
  // which have returned their results, but some of the data written by                                           // 83
  // the methods may not be visible in the local cache. Once all that data is                                     // 84
  // visible, we will send a 'login' method. Once the login method has returned                                   // 85
  // and all the data is visible (including re-running subs if userId changes),                                   // 86
  // we will send the 'foo' and 'bar' methods in parallel.                                                        // 87
  self._outstandingMethodBlocks = [];                                                                             // 88
                                                                                                                  // 89
  // method ID -> array of objects with keys 'collection' and 'id', listing                                       // 90
  // documents written by a given method's stub. keys are associated with                                         // 91
  // methods whose stub wrote at least one document, and whose data-done message                                  // 92
  // has not yet been received.                                                                                   // 93
  self._documentsWrittenByStub = {};                                                                              // 94
  // collection -> id -> "server document" object. A "server document" has:                                       // 95
  // - "document": the version of the document according the                                                      // 96
  //   server (ie, the snapshot before a stub wrote it, amended by any changes                                    // 97
  //   received from the server)                                                                                  // 98
  //   It is undefined if we think the document does not exist                                                    // 99
  // - "writtenByStubs": a set of method IDs whose stubs wrote to the document                                    // 100
  //   whose "data done" messages have not yet been processed                                                     // 101
  self._serverDocuments = {};                                                                                     // 102
                                                                                                                  // 103
  // Array of callbacks to be called after the next update of the local                                           // 104
  // cache. Used for:                                                                                             // 105
  //  - Calling methodInvoker.dataVisible and sub ready callbacks after                                           // 106
  //    the relevant data is flushed.                                                                             // 107
  //  - Invoking the callbacks of "half-finished" methods after reconnect                                         // 108
  //    quiescence. Specifically, methods whose result was received over the old                                  // 109
  //    connection (so we don't re-send it) but whose data had not been made                                      // 110
  //    visible.                                                                                                  // 111
  self._afterUpdateCallbacks = [];                                                                                // 112
                                                                                                                  // 113
  // In two contexts, we buffer all incoming data messages and then process them                                  // 114
  // all at once in a single update:                                                                              // 115
  //   - During reconnect, we buffer all data messages until all subs that had                                    // 116
  //     been ready before reconnect are ready again, and all methods that are                                    // 117
  //     active have returned their "data done message"; then                                                     // 118
  //   - During the execution of a "wait" method, we buffer all data messages                                     // 119
  //     until the wait method gets its "data done" message. (If the wait method                                  // 120
  //     occurs during reconnect, it doesn't get any special handling.)                                           // 121
  // all data messages are processed in one update.                                                               // 122
  //                                                                                                              // 123
  // The following fields are used for this "quiescence" process.                                                 // 124
                                                                                                                  // 125
  // This buffers the messages that aren't being processed yet.                                                   // 126
  self._messagesBufferedUntilQuiescence = [];                                                                     // 127
  // Map from method ID -> true. Methods are removed from this when their                                         // 128
  // "data done" message is received, and we will not quiesce until it is                                         // 129
  // empty.                                                                                                       // 130
  self._methodsBlockingQuiescence = {};                                                                           // 131
  // map from sub ID -> true for subs that were ready (ie, called the sub                                         // 132
  // ready callback) before reconnect but haven't become ready again yet                                          // 133
  self._subsBeingRevived = {}; // map from sub._id -> true                                                        // 134
  // if true, the next data update should reset all stores. (set during                                           // 135
  // reconnect.)                                                                                                  // 136
  self._resetStores = false;                                                                                      // 137
                                                                                                                  // 138
  // name -> array of updates for (yet to be created) collections                                                 // 139
  self._updatesForUnknownStores = {};                                                                             // 140
  // if we're blocking a migration, the retry func                                                                // 141
  self._retryMigrate = null;                                                                                      // 142
                                                                                                                  // 143
  // metadata for subscriptions.  Map from sub ID to object with keys:                                            // 144
  //   - id                                                                                                       // 145
  //   - name                                                                                                     // 146
  //   - params                                                                                                   // 147
  //   - inactive (if true, will be cleaned up if not reused in re-run)                                           // 148
  //   - ready (has the 'ready' message been received?)                                                           // 149
  //   - readyCallback (an optional callback to call when ready)                                                  // 150
  //   - errorCallback (an optional callback to call if the sub terminates with                                   // 151
  //                    an error)                                                                                 // 152
  self._subscriptions = {};                                                                                       // 153
                                                                                                                  // 154
  // Per-connection scratch area. This is only used internally, but we                                            // 155
  // should have real and documented API for this sort of thing someday.                                          // 156
  self._sessionData = {};                                                                                         // 157
                                                                                                                  // 158
  // Reactive userId.                                                                                             // 159
  self._userId = null;                                                                                            // 160
  self._userIdDeps = (typeof Deps !== "undefined") && new Deps.Dependency;                                        // 161
                                                                                                                  // 162
  // Block auto-reload while we're waiting for method responses.                                                  // 163
  if (Meteor.isClient && Package.reload && !options.reloadWithOutstanding) {                                      // 164
    Reload._onMigrate(function (retry) {                                                                          // 165
      if (!self._readyToMigrate()) {                                                                              // 166
        if (self._retryMigrate)                                                                                   // 167
          throw new Error("Two migrations in progress?");                                                         // 168
        self._retryMigrate = retry;                                                                               // 169
        return false;                                                                                             // 170
      } else {                                                                                                    // 171
        return [true];                                                                                            // 172
      }                                                                                                           // 173
    });                                                                                                           // 174
  }                                                                                                               // 175
                                                                                                                  // 176
  var onMessage = function (raw_msg) {                                                                            // 177
    try {                                                                                                         // 178
      var msg = parseDDP(raw_msg);                                                                                // 179
    } catch (e) {                                                                                                 // 180
      Meteor._debug("Exception while parsing DDP", e);                                                            // 181
      return;                                                                                                     // 182
    }                                                                                                             // 183
                                                                                                                  // 184
    if (msg === null || !msg.msg) {                                                                               // 185
      Meteor._debug("discarding invalid livedata message", msg);                                                  // 186
      return;                                                                                                     // 187
    }                                                                                                             // 188
                                                                                                                  // 189
    if (msg.msg === 'connected') {                                                                                // 190
      self._version = self._versionSuggestion;                                                                    // 191
      options.onConnected();                                                                                      // 192
      self._livedata_connected(msg);                                                                              // 193
    }                                                                                                             // 194
    else if (msg.msg == 'failed') {                                                                               // 195
      if (_.contains(self._supportedDDPVersions, msg.version)) {                                                  // 196
        self._versionSuggestion = msg.version;                                                                    // 197
        self._stream.reconnect({_force: true});                                                                   // 198
      } else {                                                                                                    // 199
        var error =                                                                                               // 200
              "Version negotiation failed; server requested version " + msg.version;                              // 201
        self._stream.disconnect({_permanent: true, _error: error});                                               // 202
        options.onConnectionFailure(error);                                                                       // 203
      }                                                                                                           // 204
    }                                                                                                             // 205
    else if (_.include(['added', 'changed', 'removed', 'ready', 'updated'], msg.msg))                             // 206
      self._livedata_data(msg);                                                                                   // 207
    else if (msg.msg === 'nosub')                                                                                 // 208
      self._livedata_nosub(msg);                                                                                  // 209
    else if (msg.msg === 'result')                                                                                // 210
      self._livedata_result(msg);                                                                                 // 211
    else if (msg.msg === 'error')                                                                                 // 212
      self._livedata_error(msg);                                                                                  // 213
    else                                                                                                          // 214
      Meteor._debug("discarding unknown livedata message type", msg);                                             // 215
  };                                                                                                              // 216
                                                                                                                  // 217
  var onReset = function () {                                                                                     // 218
    // Send a connect message at the beginning of the stream.                                                     // 219
    // NOTE: reset is called even on the first connection, so this is                                             // 220
    // the only place we send this message.                                                                       // 221
    var msg = {msg: 'connect'};                                                                                   // 222
    if (self._lastSessionId)                                                                                      // 223
      msg.session = self._lastSessionId;                                                                          // 224
    msg.version = self._versionSuggestion || self._supportedDDPVersions[0];                                       // 225
    self._versionSuggestion = msg.version;                                                                        // 226
    msg.support = self._supportedDDPVersions;                                                                     // 227
    self._send(msg);                                                                                              // 228
                                                                                                                  // 229
    // Now, to minimize setup latency, go ahead and blast out all of                                              // 230
    // our pending methods ands subscriptions before we've even taken                                             // 231
    // the necessary RTT to know if we successfully reconnected. (1)                                              // 232
    // They're supposed to be idempotent; (2) even if we did                                                      // 233
    // reconnect, we're not sure what messages might have gotten lost                                             // 234
    // (in either direction) since we were disconnected (TCP being                                                // 235
    // sloppy about that.)                                                                                        // 236
                                                                                                                  // 237
    // If the current block of methods all got their results (but didn't all get                                  // 238
    // their data visible), discard the empty block now.                                                          // 239
    if (! _.isEmpty(self._outstandingMethodBlocks) &&                                                             // 240
        _.isEmpty(self._outstandingMethodBlocks[0].methods)) {                                                    // 241
      self._outstandingMethodBlocks.shift();                                                                      // 242
    }                                                                                                             // 243
                                                                                                                  // 244
    // Mark all messages as unsent, they have not yet been sent on this                                           // 245
    // connection.                                                                                                // 246
    _.each(self._methodInvokers, function (m) {                                                                   // 247
      m.sentMessage = false;                                                                                      // 248
    });                                                                                                           // 249
                                                                                                                  // 250
    // If an `onReconnect` handler is set, call it first. Go through                                              // 251
    // some hoops to ensure that methods that are called from within                                              // 252
    // `onReconnect` get executed _before_ ones that were originally                                              // 253
    // outstanding (since `onReconnect` is used to re-establish auth                                              // 254
    // certificates)                                                                                              // 255
    if (self.onReconnect)                                                                                         // 256
      self._callOnReconnectAndSendAppropriateOutstandingMethods();                                                // 257
    else                                                                                                          // 258
      self._sendOutstandingMethods();                                                                             // 259
                                                                                                                  // 260
    // add new subscriptions at the end. this way they take effect after                                          // 261
    // the handlers and we don't see flicker.                                                                     // 262
    _.each(self._subscriptions, function (sub, id) {                                                              // 263
      self._send({                                                                                                // 264
        msg: 'sub',                                                                                               // 265
        id: id,                                                                                                   // 266
        name: sub.name,                                                                                           // 267
        params: sub.params                                                                                        // 268
      });                                                                                                         // 269
    });                                                                                                           // 270
  };                                                                                                              // 271
                                                                                                                  // 272
  if (Meteor.isServer) {                                                                                          // 273
    self._stream.on('message', Meteor.bindEnvironment(onMessage, Meteor._debug));                                 // 274
    self._stream.on('reset', Meteor.bindEnvironment(onReset, Meteor._debug));                                     // 275
  } else {                                                                                                        // 276
    self._stream.on('message', onMessage);                                                                        // 277
    self._stream.on('reset', onReset);                                                                            // 278
  }                                                                                                               // 279
                                                                                                                  // 280
                                                                                                                  // 281
  if (Meteor.isClient && Package.reload && options.reloadOnUpdate) {                                              // 282
    self._stream.on('update_available', function () {                                                             // 283
      // Start trying to migrate to a new version. Until all packages                                             // 284
      // signal that they're ready for a migration, the app will                                                  // 285
      // continue running normally.                                                                               // 286
      Reload._reload();                                                                                           // 287
    });                                                                                                           // 288
  }                                                                                                               // 289
                                                                                                                  // 290
};                                                                                                                // 291
                                                                                                                  // 292
// A MethodInvoker manages sending a method to the server and calling the user's                                  // 293
// callbacks. On construction, it registers itself in the connection's                                            // 294
// _methodInvokers map; it removes itself once the method is fully finished and                                   // 295
// the callback is invoked. This occurs when it has both received a result,                                       // 296
// and the data written by it is fully visible.                                                                   // 297
var MethodInvoker = function (options) {                                                                          // 298
  var self = this;                                                                                                // 299
                                                                                                                  // 300
  // Public (within this file) fields.                                                                            // 301
  self.methodId = options.methodId;                                                                               // 302
  self.sentMessage = false;                                                                                       // 303
                                                                                                                  // 304
  self._callback = options.callback;                                                                              // 305
  self._connection = options.connection;                                                                          // 306
  self._message = options.message;                                                                                // 307
  self._onResultReceived = options.onResultReceived || function () {};                                            // 308
  self._wait = options.wait;                                                                                      // 309
  self._methodResult = null;                                                                                      // 310
  self._dataVisible = false;                                                                                      // 311
                                                                                                                  // 312
  // Register with the connection.                                                                                // 313
  self._connection._methodInvokers[self.methodId] = self;                                                         // 314
};                                                                                                                // 315
_.extend(MethodInvoker.prototype, {                                                                               // 316
  // Sends the method message to the server. May be called additional times if                                    // 317
  // we lose the connection and reconnect before receiving a result.                                              // 318
  sendMessage: function () {                                                                                      // 319
    var self = this;                                                                                              // 320
    // This function is called before sending a method (including resending on                                    // 321
    // reconnect). We should only (re)send methods where we don't already have a                                  // 322
    // result!                                                                                                    // 323
    if (self.gotResult())                                                                                         // 324
      throw new Error("sendingMethod is called on method with result");                                           // 325
                                                                                                                  // 326
    // If we're re-sending it, it doesn't matter if data was written the first                                    // 327
    // time.                                                                                                      // 328
    self._dataVisible = false;                                                                                    // 329
                                                                                                                  // 330
    self.sentMessage = true;                                                                                      // 331
                                                                                                                  // 332
    // If this is a wait method, make all data messages be buffered until it is                                   // 333
    // done.                                                                                                      // 334
    if (self._wait)                                                                                               // 335
      self._connection._methodsBlockingQuiescence[self.methodId] = true;                                          // 336
                                                                                                                  // 337
    // Actually send the message.                                                                                 // 338
    self._connection._send(self._message);                                                                        // 339
  },                                                                                                              // 340
  // Invoke the callback, if we have both a result and know that all data has                                     // 341
  // been written to the local cache.                                                                             // 342
  _maybeInvokeCallback: function () {                                                                             // 343
    var self = this;                                                                                              // 344
    if (self._methodResult && self._dataVisible) {                                                                // 345
      // Call the callback. (This won't throw: the callback was wrapped with                                      // 346
      // bindEnvironment.)                                                                                        // 347
      self._callback(self._methodResult[0], self._methodResult[1]);                                               // 348
                                                                                                                  // 349
      // Forget about this method.                                                                                // 350
      delete self._connection._methodInvokers[self.methodId];                                                     // 351
                                                                                                                  // 352
      // Let the connection know that this method is finished, so it can try to                                   // 353
      // move on to the next block of methods.                                                                    // 354
      self._connection._outstandingMethodFinished();                                                              // 355
    }                                                                                                             // 356
  },                                                                                                              // 357
  // Call with the result of the method from the server. Only may be called                                       // 358
  // once; once it is called, you should not call sendMessage again.                                              // 359
  // If the user provided an onResultReceived callback, call it immediately.                                      // 360
  // Then invoke the main callback if data is also visible.                                                       // 361
  receiveResult: function (err, result) {                                                                         // 362
    var self = this;                                                                                              // 363
    if (self.gotResult())                                                                                         // 364
      throw new Error("Methods should only receive results once");                                                // 365
    self._methodResult = [err, result];                                                                           // 366
    self._onResultReceived(err, result);                                                                          // 367
    self._maybeInvokeCallback();                                                                                  // 368
  },                                                                                                              // 369
  // Call this when all data written by the method is visible. This means that                                    // 370
  // the method has returns its "data is done" message *AND* all server                                           // 371
  // documents that are buffered at that time have been written to the local                                      // 372
  // cache. Invokes the main callback if the result has been received.                                            // 373
  dataVisible: function () {                                                                                      // 374
    var self = this;                                                                                              // 375
    self._dataVisible = true;                                                                                     // 376
    self._maybeInvokeCallback();                                                                                  // 377
  },                                                                                                              // 378
  // True if receiveResult has been called.                                                                       // 379
  gotResult: function () {                                                                                        // 380
    var self = this;                                                                                              // 381
    return !!self._methodResult;                                                                                  // 382
  }                                                                                                               // 383
});                                                                                                               // 384
                                                                                                                  // 385
_.extend(Connection.prototype, {                                                                                  // 386
  // 'name' is the name of the data on the wire that should go in the                                             // 387
  // store. 'wrappedStore' should be an object with methods beginUpdate, update,                                  // 388
  // endUpdate, saveOriginals, retrieveOriginals. see Collection for an example.                                  // 389
  registerStore: function (name, wrappedStore) {                                                                  // 390
    var self = this;                                                                                              // 391
                                                                                                                  // 392
    if (name in self._stores)                                                                                     // 393
      return false;                                                                                               // 394
                                                                                                                  // 395
    // Wrap the input object in an object which makes any store method not                                        // 396
    // implemented by 'store' into a no-op.                                                                       // 397
    var store = {};                                                                                               // 398
    _.each(['update', 'beginUpdate', 'endUpdate', 'saveOriginals',                                                // 399
            'retrieveOriginals'], function (method) {                                                             // 400
              store[method] = function () {                                                                       // 401
                return (wrappedStore[method]                                                                      // 402
                        ? wrappedStore[method].apply(wrappedStore, arguments)                                     // 403
                        : undefined);                                                                             // 404
              };                                                                                                  // 405
            });                                                                                                   // 406
                                                                                                                  // 407
    self._stores[name] = store;                                                                                   // 408
                                                                                                                  // 409
    var queued = self._updatesForUnknownStores[name];                                                             // 410
    if (queued) {                                                                                                 // 411
      store.beginUpdate(queued.length, false);                                                                    // 412
      _.each(queued, function (msg) {                                                                             // 413
        store.update(msg);                                                                                        // 414
      });                                                                                                         // 415
      store.endUpdate();                                                                                          // 416
      delete self._updatesForUnknownStores[name];                                                                 // 417
    }                                                                                                             // 418
                                                                                                                  // 419
    return true;                                                                                                  // 420
  },                                                                                                              // 421
                                                                                                                  // 422
  subscribe: function (name /* .. [arguments] .. (callback|callbacks) */) {                                       // 423
    var self = this;                                                                                              // 424
                                                                                                                  // 425
    var params = Array.prototype.slice.call(arguments, 1);                                                        // 426
    var callbacks = {};                                                                                           // 427
    if (params.length) {                                                                                          // 428
      var lastParam = params[params.length - 1];                                                                  // 429
      if (typeof lastParam === "function") {                                                                      // 430
        callbacks.onReady = params.pop();                                                                         // 431
      } else if (lastParam && (typeof lastParam.onReady === "function" ||                                         // 432
                               typeof lastParam.onError === "function")) {                                        // 433
        callbacks = params.pop();                                                                                 // 434
      }                                                                                                           // 435
    }                                                                                                             // 436
                                                                                                                  // 437
    // Is there an existing sub with the same name and param, run in an                                           // 438
    // invalidated Computation? This will happen if we are rerunning an                                           // 439
    // existing computation.                                                                                      // 440
    //                                                                                                            // 441
    // For example, consider a rerun of:                                                                          // 442
    //                                                                                                            // 443
    //     Deps.autorun(function () {                                                                             // 444
    //       Meteor.subscribe("foo", Session.get("foo"));                                                         // 445
    //       Meteor.subscribe("bar", Session.get("bar"));                                                         // 446
    //     });                                                                                                    // 447
    //                                                                                                            // 448
    // If "foo" has changed but "bar" has not, we will match the "bar"                                            // 449
    // subcribe to an existing inactive subscription in order to not                                              // 450
    // unsub and resub the subscription unnecessarily.                                                            // 451
    //                                                                                                            // 452
    // We only look for one such sub; if there are N apparently-identical subs                                    // 453
    // being invalidated, we will require N matching subscribe calls to keep                                      // 454
    // them all active.                                                                                           // 455
    var existing = _.find(self._subscriptions, function (sub) {                                                   // 456
      return sub.inactive && sub.name === name &&                                                                 // 457
        EJSON.equals(sub.params, params);                                                                         // 458
    });                                                                                                           // 459
                                                                                                                  // 460
    var id;                                                                                                       // 461
    if (existing) {                                                                                               // 462
      id = existing.id;                                                                                           // 463
      existing.inactive = false; // reactivate                                                                    // 464
                                                                                                                  // 465
      if (callbacks.onReady) {                                                                                    // 466
        // If the sub is not already ready, replace any ready callback with the                                   // 467
        // one provided now. (It's not really clear what users would expect for                                   // 468
        // an onReady callback inside an autorun; the semantics we provide is                                     // 469
        // that at the time the sub first becomes ready, we call the last                                         // 470
        // onReady callback provided, if any.)                                                                    // 471
        if (!existing.ready)                                                                                      // 472
          existing.readyCallback = callbacks.onReady;                                                             // 473
      }                                                                                                           // 474
      if (callbacks.onError) {                                                                                    // 475
        // Replace existing callback if any, so that errors aren't                                                // 476
        // double-reported.                                                                                       // 477
        existing.errorCallback = callbacks.onError;                                                               // 478
      }                                                                                                           // 479
    } else {                                                                                                      // 480
      // New sub! Generate an id, save it locally, and send message.                                              // 481
      id = Random.id();                                                                                           // 482
      self._subscriptions[id] = {                                                                                 // 483
        id: id,                                                                                                   // 484
        name: name,                                                                                               // 485
        params: params,                                                                                           // 486
        inactive: false,                                                                                          // 487
        ready: false,                                                                                             // 488
        readyDeps: (typeof Deps !== "undefined") && new Deps.Dependency,                                          // 489
        readyCallback: callbacks.onReady,                                                                         // 490
        errorCallback: callbacks.onError                                                                          // 491
      };                                                                                                          // 492
      self._send({msg: 'sub', id: id, name: name, params: params});                                               // 493
    }                                                                                                             // 494
                                                                                                                  // 495
    // return a handle to the application.                                                                        // 496
    var handle = {                                                                                                // 497
      stop: function () {                                                                                         // 498
        if (!_.has(self._subscriptions, id))                                                                      // 499
          return;                                                                                                 // 500
        self._send({msg: 'unsub', id: id});                                                                       // 501
        delete self._subscriptions[id];                                                                           // 502
      },                                                                                                          // 503
      ready: function () {                                                                                        // 504
        // return false if we've unsubscribed.                                                                    // 505
        if (!_.has(self._subscriptions, id))                                                                      // 506
          return false;                                                                                           // 507
        var record = self._subscriptions[id];                                                                     // 508
        record.readyDeps && record.readyDeps.depend();                                                            // 509
        return record.ready;                                                                                      // 510
      }                                                                                                           // 511
    };                                                                                                            // 512
                                                                                                                  // 513
    if (Deps.active) {                                                                                            // 514
      // We're in a reactive computation, so we'd like to unsubscribe when the                                    // 515
      // computation is invalidated... but not if the rerun just re-subscribes                                    // 516
      // to the same subscription!  When a rerun happens, we use onInvalidate                                     // 517
      // as a change to mark the subscription "inactive" so that it can                                           // 518
      // be reused from the rerun.  If it isn't reused, it's killed from                                          // 519
      // an afterFlush.                                                                                           // 520
      Deps.onInvalidate(function (c) {                                                                            // 521
        if (_.has(self._subscriptions, id))                                                                       // 522
          self._subscriptions[id].inactive = true;                                                                // 523
                                                                                                                  // 524
        Deps.afterFlush(function () {                                                                             // 525
          if (_.has(self._subscriptions, id) &&                                                                   // 526
              self._subscriptions[id].inactive)                                                                   // 527
            handle.stop();                                                                                        // 528
        });                                                                                                       // 529
      });                                                                                                         // 530
    }                                                                                                             // 531
                                                                                                                  // 532
    return handle;                                                                                                // 533
  },                                                                                                              // 534
                                                                                                                  // 535
  // options:                                                                                                     // 536
  // - onLateError {Function(error)} called if an error was received after the ready event.                       // 537
  //     (errors received before ready cause an error to be thrown)                                               // 538
  _subscribeAndWait: function (name, args, options) {                                                             // 539
    var self = this;                                                                                              // 540
    var f = new Future();                                                                                         // 541
    var ready = false;                                                                                            // 542
    args = args || [];                                                                                            // 543
    args.push({                                                                                                   // 544
      onReady: function () {                                                                                      // 545
        ready = true;                                                                                             // 546
        f['return']();                                                                                            // 547
      },                                                                                                          // 548
      onError: function (e) {                                                                                     // 549
        if (!ready)                                                                                               // 550
          f['throw'](e);                                                                                          // 551
        else                                                                                                      // 552
          options && options.onLateError && options.onLateError(e);                                               // 553
      }                                                                                                           // 554
    });                                                                                                           // 555
                                                                                                                  // 556
    self.subscribe.apply(self, [name].concat(args));                                                              // 557
    f.wait();                                                                                                     // 558
  },                                                                                                              // 559
                                                                                                                  // 560
  methods: function (methods) {                                                                                   // 561
    var self = this;                                                                                              // 562
    _.each(methods, function (func, name) {                                                                       // 563
      if (self._methodHandlers[name])                                                                             // 564
        throw new Error("A method named '" + name + "' is already defined");                                      // 565
      self._methodHandlers[name] = func;                                                                          // 566
    });                                                                                                           // 567
  },                                                                                                              // 568
                                                                                                                  // 569
  call: function (name /* .. [arguments] .. callback */) {                                                        // 570
    // if it's a function, the last argument is the result callback,                                              // 571
    // not a parameter to the remote method.                                                                      // 572
    var args = Array.prototype.slice.call(arguments, 1);                                                          // 573
    if (args.length && typeof args[args.length - 1] === "function")                                               // 574
      var callback = args.pop();                                                                                  // 575
    return this.apply(name, args, callback);                                                                      // 576
  },                                                                                                              // 577
                                                                                                                  // 578
  // @param options {Optional Object}                                                                             // 579
  //   wait: Boolean - Should we wait to call this until all current methods                                      // 580
  //                   are fully finished, and block subsequent method calls                                      // 581
  //                   until this method is fully finished?                                                       // 582
  //                   (does not affect methods called from within this method)                                   // 583
  //   onResultReceived: Function - a callback to call as soon as the method                                      // 584
  //                                result is received. the data written by                                       // 585
  //                                the method may not yet be in the cache!                                       // 586
  // @param callback {Optional Function}                                                                          // 587
  apply: function (name, args, options, callback) {                                                               // 588
    var self = this;                                                                                              // 589
                                                                                                                  // 590
    // We were passed 3 arguments. They may be either (name, args, options)                                       // 591
    // or (name, args, callback)                                                                                  // 592
    if (!callback && typeof options === 'function') {                                                             // 593
      callback = options;                                                                                         // 594
      options = {};                                                                                               // 595
    }                                                                                                             // 596
    options = options || {};                                                                                      // 597
                                                                                                                  // 598
    if (callback) {                                                                                               // 599
      // XXX would it be better form to do the binding in stream.on,                                              // 600
      // or caller, instead of here?                                                                              // 601
      callback = Meteor.bindEnvironment(callback, function (e) {                                                  // 602
        // XXX improve error message (and how we report it)                                                       // 603
        Meteor._debug("Exception while delivering result of invoking '" +                                         // 604
                      name + "'", e, e.stack);                                                                    // 605
      });                                                                                                         // 606
    }                                                                                                             // 607
                                                                                                                  // 608
    // Lazily allocate method ID once we know that it'll be needed.                                               // 609
    var methodId = (function () {                                                                                 // 610
      var id;                                                                                                     // 611
      return function () {                                                                                        // 612
        if (id === undefined)                                                                                     // 613
          id = '' + (self._nextMethodId++);                                                                       // 614
        return id;                                                                                                // 615
      };                                                                                                          // 616
    })();                                                                                                         // 617
                                                                                                                  // 618
    // Run the stub, if we have one. The stub is supposed to make some                                            // 619
    // temporary writes to the database to give the user a smooth experience                                      // 620
    // until the actual result of executing the method comes back from the                                        // 621
    // server (whereupon the temporary writes to the database will be reversed                                    // 622
    // during the beginUpdate/endUpdate process.)                                                                 // 623
    //                                                                                                            // 624
    // Normally, we ignore the return value of the stub (even if it is an                                         // 625
    // exception), in favor of the real return value from the server. The                                         // 626
    // exception is if the *caller* is a stub. In that case, we're not going                                      // 627
    // to do a RPC, so we use the return value of the stub as our return                                          // 628
    // value.                                                                                                     // 629
                                                                                                                  // 630
    var enclosing = DDP._CurrentInvocation.get();                                                                 // 631
    var alreadyInSimulation = enclosing && enclosing.isSimulation;                                                // 632
                                                                                                                  // 633
    var stub = self._methodHandlers[name];                                                                        // 634
    if (stub) {                                                                                                   // 635
      var setUserId = function(userId) {                                                                          // 636
        self.setUserId(userId);                                                                                   // 637
      };                                                                                                          // 638
      var invocation = new MethodInvocation({                                                                     // 639
        isSimulation: true,                                                                                       // 640
        userId: self.userId(), setUserId: setUserId,                                                              // 641
        sessionData: self._sessionData                                                                            // 642
      });                                                                                                         // 643
                                                                                                                  // 644
      if (!alreadyInSimulation)                                                                                   // 645
        self._saveOriginals();                                                                                    // 646
                                                                                                                  // 647
      try {                                                                                                       // 648
        // Note that unlike in the corresponding server code, we never audit                                      // 649
        // that stubs check() their arguments.                                                                    // 650
        var ret = DDP._CurrentInvocation.withValue(invocation, function () {                                      // 651
          if (Meteor.isServer) {                                                                                  // 652
            // Because saveOriginals and retrieveOriginals aren't reentrant,                                      // 653
            // don't allow stubs to yield.                                                                        // 654
            return Meteor._noYieldsAllowed(function () {                                                          // 655
              return stub.apply(invocation, EJSON.clone(args));                                                   // 656
            });                                                                                                   // 657
          } else {                                                                                                // 658
            return stub.apply(invocation, EJSON.clone(args));                                                     // 659
          }                                                                                                       // 660
        });                                                                                                       // 661
      }                                                                                                           // 662
      catch (e) {                                                                                                 // 663
        var exception = e;                                                                                        // 664
      }                                                                                                           // 665
                                                                                                                  // 666
      if (!alreadyInSimulation)                                                                                   // 667
        self._retrieveAndStoreOriginals(methodId());                                                              // 668
    }                                                                                                             // 669
                                                                                                                  // 670
    // If we're in a simulation, stop and return the result we have,                                              // 671
    // rather than going on to do an RPC. If there was no stub,                                                   // 672
    // we'll end up returning undefined.                                                                          // 673
    if (alreadyInSimulation) {                                                                                    // 674
      if (callback) {                                                                                             // 675
        callback(exception, ret);                                                                                 // 676
        return undefined;                                                                                         // 677
      }                                                                                                           // 678
      if (exception)                                                                                              // 679
        throw exception;                                                                                          // 680
      return ret;                                                                                                 // 681
    }                                                                                                             // 682
                                                                                                                  // 683
    // If an exception occurred in a stub, and we're ignoring it                                                  // 684
    // because we're doing an RPC and want to use what the server                                                 // 685
    // returns instead, log it so the developer knows.                                                            // 686
    //                                                                                                            // 687
    // Tests can set the 'expected' flag on an exception so it won't                                              // 688
    // go to log.                                                                                                 // 689
    if (exception && !exception.expected) {                                                                       // 690
      Meteor._debug("Exception while simulating the effect of invoking '" +                                       // 691
                    name + "'", exception, exception.stack);                                                      // 692
    }                                                                                                             // 693
                                                                                                                  // 694
                                                                                                                  // 695
    // At this point we're definitely doing an RPC, and we're going to                                            // 696
    // return the value of the RPC to the caller.                                                                 // 697
                                                                                                                  // 698
    // If the caller didn't give a callback, decide what to do.                                                   // 699
    if (!callback) {                                                                                              // 700
      if (Meteor.isClient) {                                                                                      // 701
        // On the client, we don't have fibers, so we can't block. The                                            // 702
        // only thing we can do is to return undefined and discard the                                            // 703
        // result of the RPC.                                                                                     // 704
        callback = function () {};                                                                                // 705
      } else {                                                                                                    // 706
        // On the server, make the function synchronous. Throw on                                                 // 707
        // errors, return on success.                                                                             // 708
        var future = new Future;                                                                                  // 709
        callback = future.resolver();                                                                             // 710
      }                                                                                                           // 711
    }                                                                                                             // 712
    // Send the RPC. Note that on the client, it is important that the                                            // 713
    // stub have finished before we send the RPC, so that we know we have                                         // 714
    // a complete list of which local documents the stub wrote.                                                   // 715
    var methodInvoker = new MethodInvoker({                                                                       // 716
      methodId: methodId(),                                                                                       // 717
      callback: callback,                                                                                         // 718
      connection: self,                                                                                           // 719
      onResultReceived: options.onResultReceived,                                                                 // 720
      wait: !!options.wait,                                                                                       // 721
      message: {                                                                                                  // 722
        msg: 'method',                                                                                            // 723
        method: name,                                                                                             // 724
        params: args,                                                                                             // 725
        id: methodId()                                                                                            // 726
      }                                                                                                           // 727
    });                                                                                                           // 728
                                                                                                                  // 729
    if (options.wait) {                                                                                           // 730
      // It's a wait method! Wait methods go in their own block.                                                  // 731
      self._outstandingMethodBlocks.push(                                                                         // 732
        {wait: true, methods: [methodInvoker]});                                                                  // 733
    } else {                                                                                                      // 734
      // Not a wait method. Start a new block if the previous block was a wait                                    // 735
      // block, and add it to the last block of methods.                                                          // 736
      if (_.isEmpty(self._outstandingMethodBlocks) ||                                                             // 737
          _.last(self._outstandingMethodBlocks).wait)                                                             // 738
        self._outstandingMethodBlocks.push({wait: false, methods: []});                                           // 739
      _.last(self._outstandingMethodBlocks).methods.push(methodInvoker);                                          // 740
    }                                                                                                             // 741
                                                                                                                  // 742
    // If we added it to the first block, send it out now.                                                        // 743
    if (self._outstandingMethodBlocks.length === 1)                                                               // 744
      methodInvoker.sendMessage();                                                                                // 745
                                                                                                                  // 746
    // If we're using the default callback on the server,                                                         // 747
    // block waiting for the result.                                                                              // 748
    if (future) {                                                                                                 // 749
      return future.wait();                                                                                       // 750
    }                                                                                                             // 751
    return undefined;                                                                                             // 752
  },                                                                                                              // 753
                                                                                                                  // 754
  // Before calling a method stub, prepare all stores to track changes and allow                                  // 755
  // _retrieveAndStoreOriginals to get the original versions of changed                                           // 756
  // documents.                                                                                                   // 757
  _saveOriginals: function () {                                                                                   // 758
    var self = this;                                                                                              // 759
    _.each(self._stores, function (s) {                                                                           // 760
      s.saveOriginals();                                                                                          // 761
    });                                                                                                           // 762
  },                                                                                                              // 763
  // Retrieves the original versions of all documents modified by the stub for                                    // 764
  // method 'methodId' from all stores and saves them to _serverDocuments (keyed                                  // 765
  // by document) and _documentsWrittenByStub (keyed by method ID).                                               // 766
  _retrieveAndStoreOriginals: function (methodId) {                                                               // 767
    var self = this;                                                                                              // 768
    if (self._documentsWrittenByStub[methodId])                                                                   // 769
      throw new Error("Duplicate methodId in _retrieveAndStoreOriginals");                                        // 770
                                                                                                                  // 771
    var docsWritten = [];                                                                                         // 772
    _.each(self._stores, function (s, collection) {                                                               // 773
      var originals = s.retrieveOriginals();                                                                      // 774
      _.each(originals, function (doc, id) {                                                                      // 775
        if (typeof id !== 'string')                                                                               // 776
          throw new Error("id is not a string");                                                                  // 777
        docsWritten.push({collection: collection, id: id});                                                       // 778
        var serverDoc = Meteor._ensure(self._serverDocuments, collection, id);                                    // 779
        if (serverDoc.writtenByStubs) {                                                                           // 780
          // We're not the first stub to write this doc. Just add our method ID                                   // 781
          // to the record.                                                                                       // 782
          serverDoc.writtenByStubs[methodId] = true;                                                              // 783
        } else {                                                                                                  // 784
          // First stub! Save the original value and our method ID.                                               // 785
          serverDoc.document = doc;                                                                               // 786
          serverDoc.flushCallbacks = [];                                                                          // 787
          serverDoc.writtenByStubs = {};                                                                          // 788
          serverDoc.writtenByStubs[methodId] = true;                                                              // 789
        }                                                                                                         // 790
      });                                                                                                         // 791
    });                                                                                                           // 792
    if (!_.isEmpty(docsWritten)) {                                                                                // 793
      self._documentsWrittenByStub[methodId] = docsWritten;                                                       // 794
    }                                                                                                             // 795
  },                                                                                                              // 796
                                                                                                                  // 797
  // This is very much a private function we use to make the tests                                                // 798
  // take up fewer server resources after they complete.                                                          // 799
  _unsubscribeAll: function () {                                                                                  // 800
    var self = this;                                                                                              // 801
    _.each(_.clone(self._subscriptions), function (sub, id) {                                                     // 802
      self._send({msg: 'unsub', id: id});                                                                         // 803
      delete self._subscriptions[id];                                                                             // 804
    });                                                                                                           // 805
  },                                                                                                              // 806
                                                                                                                  // 807
  // Sends the DDP stringification of the given message object                                                    // 808
  _send: function (obj) {                                                                                         // 809
    var self = this;                                                                                              // 810
    self._stream.send(stringifyDDP(obj));                                                                         // 811
  },                                                                                                              // 812
                                                                                                                  // 813
  status: function (/*passthrough args*/) {                                                                       // 814
    var self = this;                                                                                              // 815
    return self._stream.status.apply(self._stream, arguments);                                                    // 816
  },                                                                                                              // 817
                                                                                                                  // 818
  reconnect: function (/*passthrough args*/) {                                                                    // 819
    var self = this;                                                                                              // 820
    return self._stream.reconnect.apply(self._stream, arguments);                                                 // 821
  },                                                                                                              // 822
                                                                                                                  // 823
  disconnect: function (/*passthrough args*/) {                                                                   // 824
    var self = this;                                                                                              // 825
    return self._stream.disconnect.apply(self._stream, arguments);                                                // 826
  },                                                                                                              // 827
                                                                                                                  // 828
  close: function () {                                                                                            // 829
    var self = this;                                                                                              // 830
    return self._stream.disconnect({_permanent: true});                                                           // 831
  },                                                                                                              // 832
                                                                                                                  // 833
  ///                                                                                                             // 834
  /// Reactive user system                                                                                        // 835
  ///                                                                                                             // 836
  userId: function () {                                                                                           // 837
    var self = this;                                                                                              // 838
    if (self._userIdDeps)                                                                                         // 839
      self._userIdDeps.depend();                                                                                  // 840
    return self._userId;                                                                                          // 841
  },                                                                                                              // 842
                                                                                                                  // 843
  setUserId: function (userId) {                                                                                  // 844
    var self = this;                                                                                              // 845
    // Avoid invalidating dependents if setUserId is called with current value.                                   // 846
    if (self._userId === userId)                                                                                  // 847
      return;                                                                                                     // 848
    self._userId = userId;                                                                                        // 849
    if (self._userIdDeps)                                                                                         // 850
      self._userIdDeps.changed();                                                                                 // 851
  },                                                                                                              // 852
                                                                                                                  // 853
  // Returns true if we are in a state after reconnect of waiting for subs to be                                  // 854
  // revived or early methods to finish their data, or we are waiting for a                                       // 855
  // "wait" method to finish.                                                                                     // 856
  _waitingForQuiescence: function () {                                                                            // 857
    var self = this;                                                                                              // 858
    return (! _.isEmpty(self._subsBeingRevived) ||                                                                // 859
            ! _.isEmpty(self._methodsBlockingQuiescence));                                                        // 860
  },                                                                                                              // 861
                                                                                                                  // 862
  // Returns true if any method whose message has been sent to the server has                                     // 863
  // not yet invoked its user callback.                                                                           // 864
  _anyMethodsAreOutstanding: function () {                                                                        // 865
    var self = this;                                                                                              // 866
    return _.any(_.pluck(self._methodInvokers, 'sentMessage'));                                                   // 867
  },                                                                                                              // 868
                                                                                                                  // 869
  _livedata_connected: function (msg) {                                                                           // 870
    var self = this;                                                                                              // 871
                                                                                                                  // 872
    // If this is a reconnect, we'll have to reset all stores.                                                    // 873
    if (self._lastSessionId)                                                                                      // 874
      self._resetStores = true;                                                                                   // 875
                                                                                                                  // 876
    if (typeof (msg.session) === "string") {                                                                      // 877
      var reconnectedToPreviousSession = (self._lastSessionId === msg.session);                                   // 878
      self._lastSessionId = msg.session;                                                                          // 879
    }                                                                                                             // 880
                                                                                                                  // 881
    if (reconnectedToPreviousSession) {                                                                           // 882
      // Successful reconnection -- pick up where we left off.  Note that right                                   // 883
      // now, this never happens: the server never connects us to a previous                                      // 884
      // session, because DDP doesn't provide enough data for the server to know                                  // 885
      // what messages the client has processed. We need to improve DDP to make                                   // 886
      // this possible, at which point we'll probably need more code here.                                        // 887
      return;                                                                                                     // 888
    }                                                                                                             // 889
                                                                                                                  // 890
    // Server doesn't have our data any more. Re-sync a new session.                                              // 891
                                                                                                                  // 892
    // Forget about messages we were buffering for unknown collections. They'll                                   // 893
    // be resent if still relevant.                                                                               // 894
    self._updatesForUnknownStores = {};                                                                           // 895
                                                                                                                  // 896
    if (self._resetStores) {                                                                                      // 897
      // Forget about the effects of stubs. We'll be resetting all collections                                    // 898
      // anyway.                                                                                                  // 899
      self._documentsWrittenByStub = {};                                                                          // 900
      self._serverDocuments = {};                                                                                 // 901
    }                                                                                                             // 902
                                                                                                                  // 903
    // Clear _afterUpdateCallbacks.                                                                               // 904
    self._afterUpdateCallbacks = [];                                                                              // 905
                                                                                                                  // 906
    // Mark all named subscriptions which are ready (ie, we already called the                                    // 907
    // ready callback) as needing to be revived.                                                                  // 908
    // XXX We should also block reconnect quiescence until unnamed subscriptions                                  // 909
    //     (eg, autopublish) are done re-publishing to avoid flicker!                                             // 910
    self._subsBeingRevived = {};                                                                                  // 911
    _.each(self._subscriptions, function (sub, id) {                                                              // 912
      if (sub.ready)                                                                                              // 913
        self._subsBeingRevived[id] = true;                                                                        // 914
    });                                                                                                           // 915
                                                                                                                  // 916
    // Arrange for "half-finished" methods to have their callbacks run, and                                       // 917
    // track methods that were sent on this connection so that we don't                                           // 918
    // quiesce until they are all done.                                                                           // 919
    //                                                                                                            // 920
    // Start by clearing _methodsBlockingQuiescence: methods sent before                                          // 921
    // reconnect don't matter, and any "wait" methods sent on the new connection                                  // 922
    // that we drop here will be restored by the loop below.                                                      // 923
    self._methodsBlockingQuiescence = {};                                                                         // 924
    if (self._resetStores) {                                                                                      // 925
      _.each(self._methodInvokers, function (invoker) {                                                           // 926
        if (invoker.gotResult()) {                                                                                // 927
          // This method already got its result, but it didn't call its callback                                  // 928
          // because its data didn't become visible. We did not resend the                                        // 929
          // method RPC. We'll call its callback when we get a full quiesce,                                      // 930
          // since that's as close as we'll get to "data must be visible".                                        // 931
          self._afterUpdateCallbacks.push(_.bind(invoker.dataVisible, invoker));                                  // 932
        } else if (invoker.sentMessage) {                                                                         // 933
          // This method has been sent on this connection (maybe as a resend                                      // 934
          // from the last connection, maybe from onReconnect, maybe just very                                    // 935
          // quickly before processing the connected message).                                                    // 936
          //                                                                                                      // 937
          // We don't need to do anything special to ensure its callbacks get                                     // 938
          // called, but we'll count it as a method which is preventing                                           // 939
          // reconnect quiescence. (eg, it might be a login method that was run                                   // 940
          // from onReconnect, and we don't want to see flicker by seeing a                                       // 941
          // logged-out state.)                                                                                   // 942
          self._methodsBlockingQuiescence[invoker.methodId] = true;                                               // 943
        }                                                                                                         // 944
      });                                                                                                         // 945
    }                                                                                                             // 946
                                                                                                                  // 947
    self._messagesBufferedUntilQuiescence = [];                                                                   // 948
                                                                                                                  // 949
    // If we're not waiting on any methods or subs, we can reset the stores and                                   // 950
    // call the callbacks immediately.                                                                            // 951
    if (!self._waitingForQuiescence()) {                                                                          // 952
      if (self._resetStores) {                                                                                    // 953
        _.each(self._stores, function (s) {                                                                       // 954
          s.beginUpdate(0, true);                                                                                 // 955
          s.endUpdate();                                                                                          // 956
        });                                                                                                       // 957
        self._resetStores = false;                                                                                // 958
      }                                                                                                           // 959
      self._runAfterUpdateCallbacks();                                                                            // 960
    }                                                                                                             // 961
  },                                                                                                              // 962
                                                                                                                  // 963
                                                                                                                  // 964
  _processOneDataMessage: function (msg, updates) {                                                               // 965
    var self = this;                                                                                              // 966
    // Using underscore here so as not to need to capitalize.                                                     // 967
    self['_process_' + msg.msg](msg, updates);                                                                    // 968
  },                                                                                                              // 969
                                                                                                                  // 970
                                                                                                                  // 971
  _livedata_data: function (msg) {                                                                                // 972
    var self = this;                                                                                              // 973
                                                                                                                  // 974
    // collection name -> array of messages                                                                       // 975
    var updates = {};                                                                                             // 976
                                                                                                                  // 977
    if (self._waitingForQuiescence()) {                                                                           // 978
      self._messagesBufferedUntilQuiescence.push(msg);                                                            // 979
                                                                                                                  // 980
      if (msg.msg === "nosub")                                                                                    // 981
        delete self._subsBeingRevived[msg.id];                                                                    // 982
                                                                                                                  // 983
      _.each(msg.subs || [], function (subId) {                                                                   // 984
        delete self._subsBeingRevived[subId];                                                                     // 985
      });                                                                                                         // 986
      _.each(msg.methods || [], function (methodId) {                                                             // 987
        delete self._methodsBlockingQuiescence[methodId];                                                         // 988
      });                                                                                                         // 989
                                                                                                                  // 990
      if (self._waitingForQuiescence())                                                                           // 991
        return;                                                                                                   // 992
                                                                                                                  // 993
      // No methods or subs are blocking quiescence!                                                              // 994
      // We'll now process and all of our buffered messages, reset all stores,                                    // 995
      // and apply them all at once.                                                                              // 996
      _.each(self._messagesBufferedUntilQuiescence, function (bufferedMsg) {                                      // 997
        self._processOneDataMessage(bufferedMsg, updates);                                                        // 998
      });                                                                                                         // 999
      self._messagesBufferedUntilQuiescence = [];                                                                 // 1000
    } else {                                                                                                      // 1001
      self._processOneDataMessage(msg, updates);                                                                  // 1002
    }                                                                                                             // 1003
                                                                                                                  // 1004
    if (self._resetStores || !_.isEmpty(updates)) {                                                               // 1005
      // Begin a transactional update of each store.                                                              // 1006
      _.each(self._stores, function (s, storeName) {                                                              // 1007
        s.beginUpdate(_.has(updates, storeName) ? updates[storeName].length : 0,                                  // 1008
                      self._resetStores);                                                                         // 1009
      });                                                                                                         // 1010
      self._resetStores = false;                                                                                  // 1011
                                                                                                                  // 1012
      _.each(updates, function (updateMessages, storeName) {                                                      // 1013
        var store = self._stores[storeName];                                                                      // 1014
        if (store) {                                                                                              // 1015
          _.each(updateMessages, function (updateMessage) {                                                       // 1016
            store.update(updateMessage);                                                                          // 1017
          });                                                                                                     // 1018
        } else {                                                                                                  // 1019
          // Nobody's listening for this data. Queue it up until                                                  // 1020
          // someone wants it.                                                                                    // 1021
          // XXX memory use will grow without bound if you forget to                                              // 1022
          // create a collection or just don't care about it... going                                             // 1023
          // to have to do something about that.                                                                  // 1024
          if (!_.has(self._updatesForUnknownStores, storeName))                                                   // 1025
            self._updatesForUnknownStores[storeName] = [];                                                        // 1026
          Array.prototype.push.apply(self._updatesForUnknownStores[storeName],                                    // 1027
                                     updateMessages);                                                             // 1028
        }                                                                                                         // 1029
      });                                                                                                         // 1030
                                                                                                                  // 1031
      // End update transaction.                                                                                  // 1032
      _.each(self._stores, function (s) { s.endUpdate(); });                                                      // 1033
    }                                                                                                             // 1034
                                                                                                                  // 1035
    self._runAfterUpdateCallbacks();                                                                              // 1036
  },                                                                                                              // 1037
                                                                                                                  // 1038
  // Call any callbacks deferred with _runWhenAllServerDocsAreFlushed whose                                       // 1039
  // relevant docs have been flushed, as well as dataVisible callbacks at                                         // 1040
  // reconnect-quiescence time.                                                                                   // 1041
  _runAfterUpdateCallbacks: function () {                                                                         // 1042
    var self = this;                                                                                              // 1043
    var callbacks = self._afterUpdateCallbacks;                                                                   // 1044
    self._afterUpdateCallbacks = [];                                                                              // 1045
    _.each(callbacks, function (c) {                                                                              // 1046
      c();                                                                                                        // 1047
    });                                                                                                           // 1048
  },                                                                                                              // 1049
                                                                                                                  // 1050
  _pushUpdate: function (updates, collection, msg) {                                                              // 1051
    var self = this;                                                                                              // 1052
    if (!_.has(updates, collection)) {                                                                            // 1053
      updates[collection] = [];                                                                                   // 1054
    }                                                                                                             // 1055
    updates[collection].push(msg);                                                                                // 1056
  },                                                                                                              // 1057
                                                                                                                  // 1058
  _process_added: function (msg, updates) {                                                                       // 1059
    var self = this;                                                                                              // 1060
    var serverDoc = Meteor._get(self._serverDocuments, msg.collection, msg.id);                                   // 1061
    if (serverDoc) {                                                                                              // 1062
      // Some outstanding stub wrote here.                                                                        // 1063
      if (serverDoc.document !== undefined) {                                                                     // 1064
        throw new Error("It doesn't make sense to be adding something we know exists: "                           // 1065
                        + msg.id);                                                                                // 1066
      }                                                                                                           // 1067
      serverDoc.document = msg.fields || {};                                                                      // 1068
      serverDoc.document._id = LocalCollection._idParse(msg.id);                                                  // 1069
    } else {                                                                                                      // 1070
      self._pushUpdate(updates, msg.collection, msg);                                                             // 1071
    }                                                                                                             // 1072
  },                                                                                                              // 1073
                                                                                                                  // 1074
  _process_changed: function (msg, updates) {                                                                     // 1075
    var self = this;                                                                                              // 1076
    var serverDoc = Meteor._get(self._serverDocuments, msg.collection, msg.id);                                   // 1077
    if (serverDoc) {                                                                                              // 1078
      if (serverDoc.document === undefined) {                                                                     // 1079
        throw new Error("It doesn't make sense to be changing something we don't think exists: "                  // 1080
                        + msg.id);                                                                                // 1081
      }                                                                                                           // 1082
      LocalCollection._applyChanges(serverDoc.document, msg.fields);                                              // 1083
    } else {                                                                                                      // 1084
      self._pushUpdate(updates, msg.collection, msg);                                                             // 1085
    }                                                                                                             // 1086
  },                                                                                                              // 1087
                                                                                                                  // 1088
  _process_removed: function (msg, updates) {                                                                     // 1089
    var self = this;                                                                                              // 1090
    var serverDoc = Meteor._get(                                                                                  // 1091
      self._serverDocuments, msg.collection, msg.id);                                                             // 1092
    if (serverDoc) {                                                                                              // 1093
      // Some outstanding stub wrote here.                                                                        // 1094
      if (serverDoc.document === undefined) {                                                                     // 1095
        throw new Error("It doesn't make sense to be deleting something we don't know exists: "                   // 1096
                        + msg.id);                                                                                // 1097
      }                                                                                                           // 1098
      serverDoc.document = undefined;                                                                             // 1099
    } else {                                                                                                      // 1100
      self._pushUpdate(updates, msg.collection, {                                                                 // 1101
        msg: 'removed',                                                                                           // 1102
        collection: msg.collection,                                                                               // 1103
        id: msg.id                                                                                                // 1104
      });                                                                                                         // 1105
    }                                                                                                             // 1106
  },                                                                                                              // 1107
                                                                                                                  // 1108
  _process_updated: function (msg, updates) {                                                                     // 1109
    var self = this;                                                                                              // 1110
    // Process "method done" messages.                                                                            // 1111
    _.each(msg.methods, function (methodId) {                                                                     // 1112
      _.each(self._documentsWrittenByStub[methodId], function (written) {                                         // 1113
        var serverDoc = Meteor._get(self._serverDocuments,                                                        // 1114
                                    written.collection, written.id);                                              // 1115
        if (!serverDoc)                                                                                           // 1116
          throw new Error("Lost serverDoc for " + JSON.stringify(written));                                       // 1117
        if (!serverDoc.writtenByStubs[methodId])                                                                  // 1118
          throw new Error("Doc " + JSON.stringify(written) +                                                      // 1119
                          " not written by  method " + methodId);                                                 // 1120
        delete serverDoc.writtenByStubs[methodId];                                                                // 1121
        if (_.isEmpty(serverDoc.writtenByStubs)) {                                                                // 1122
          // All methods whose stubs wrote this method have completed! We can                                     // 1123
          // now copy the saved document to the database (reverting the stub's                                    // 1124
          // change if the server did not write to this object, or applying the                                   // 1125
          // server's writes if it did).                                                                          // 1126
                                                                                                                  // 1127
          // This is a fake ddp 'replace' message.  It's just for talking between                                 // 1128
          // livedata connections and minimongo.                                                                  // 1129
          self._pushUpdate(updates, written.collection, {                                                         // 1130
            msg: 'replace',                                                                                       // 1131
            id: written.id,                                                                                       // 1132
            replace: serverDoc.document                                                                           // 1133
          });                                                                                                     // 1134
          // Call all flush callbacks.                                                                            // 1135
          _.each(serverDoc.flushCallbacks, function (c) {                                                         // 1136
            c();                                                                                                  // 1137
          });                                                                                                     // 1138
                                                                                                                  // 1139
          // Delete this completed serverDocument. Don't bother to GC empty                                       // 1140
          // objects inside self._serverDocuments, since there probably aren't                                    // 1141
          // many collections and they'll be written repeatedly.                                                  // 1142
          delete self._serverDocuments[written.collection][written.id];                                           // 1143
        }                                                                                                         // 1144
      });                                                                                                         // 1145
      delete self._documentsWrittenByStub[methodId];                                                              // 1146
                                                                                                                  // 1147
      // We want to call the data-written callback, but we can't do so until all                                  // 1148
      // currently buffered messages are flushed.                                                                 // 1149
      var callbackInvoker = self._methodInvokers[methodId];                                                       // 1150
      if (!callbackInvoker)                                                                                       // 1151
        throw new Error("No callback invoker for method " + methodId);                                            // 1152
      self._runWhenAllServerDocsAreFlushed(                                                                       // 1153
        _.bind(callbackInvoker.dataVisible, callbackInvoker));                                                    // 1154
    });                                                                                                           // 1155
  },                                                                                                              // 1156
                                                                                                                  // 1157
  _process_ready: function (msg, updates) {                                                                       // 1158
    var self = this;                                                                                              // 1159
    // Process "sub ready" messages. "sub ready" messages don't take effect                                       // 1160
    // until all current server documents have been flushed to the local                                          // 1161
    // database. We can use a write fence to implement this.                                                      // 1162
    _.each(msg.subs, function (subId) {                                                                           // 1163
      self._runWhenAllServerDocsAreFlushed(function () {                                                          // 1164
        var subRecord = self._subscriptions[subId];                                                               // 1165
        // Did we already unsubscribe?                                                                            // 1166
        if (!subRecord)                                                                                           // 1167
          return;                                                                                                 // 1168
        // Did we already receive a ready message? (Oops!)                                                        // 1169
        if (subRecord.ready)                                                                                      // 1170
          return;                                                                                                 // 1171
        subRecord.readyCallback && subRecord.readyCallback();                                                     // 1172
        subRecord.ready = true;                                                                                   // 1173
        subRecord.readyDeps && subRecord.readyDeps.changed();                                                     // 1174
      });                                                                                                         // 1175
    });                                                                                                           // 1176
  },                                                                                                              // 1177
                                                                                                                  // 1178
  // Ensures that "f" will be called after all documents currently in                                             // 1179
  // _serverDocuments have been written to the local cache. f will not be called                                  // 1180
  // if the connection is lost before then!                                                                       // 1181
  _runWhenAllServerDocsAreFlushed: function (f) {                                                                 // 1182
    var self = this;                                                                                              // 1183
    var runFAfterUpdates = function () {                                                                          // 1184
      self._afterUpdateCallbacks.push(f);                                                                         // 1185
    };                                                                                                            // 1186
    var unflushedServerDocCount = 0;                                                                              // 1187
    var onServerDocFlush = function () {                                                                          // 1188
      --unflushedServerDocCount;                                                                                  // 1189
      if (unflushedServerDocCount === 0) {                                                                        // 1190
        // This was the last doc to flush! Arrange to run f after the updates                                     // 1191
        // have been applied.                                                                                     // 1192
        runFAfterUpdates();                                                                                       // 1193
      }                                                                                                           // 1194
    };                                                                                                            // 1195
    _.each(self._serverDocuments, function (collectionDocs) {                                                     // 1196
      _.each(collectionDocs, function (serverDoc) {                                                               // 1197
        var writtenByStubForAMethodWithSentMessage = _.any(                                                       // 1198
          serverDoc.writtenByStubs, function (dummy, methodId) {                                                  // 1199
            var invoker = self._methodInvokers[methodId];                                                         // 1200
            return invoker && invoker.sentMessage;                                                                // 1201
          });                                                                                                     // 1202
        if (writtenByStubForAMethodWithSentMessage) {                                                             // 1203
          ++unflushedServerDocCount;                                                                              // 1204
          serverDoc.flushCallbacks.push(onServerDocFlush);                                                        // 1205
        }                                                                                                         // 1206
      });                                                                                                         // 1207
    });                                                                                                           // 1208
    if (unflushedServerDocCount === 0) {                                                                          // 1209
      // There aren't any buffered docs --- we can call f as soon as the current                                  // 1210
      // round of updates is applied!                                                                             // 1211
      runFAfterUpdates();                                                                                         // 1212
    }                                                                                                             // 1213
  },                                                                                                              // 1214
                                                                                                                  // 1215
  _livedata_nosub: function (msg) {                                                                               // 1216
    var self = this;                                                                                              // 1217
                                                                                                                  // 1218
    // First pass it through _livedata_data, which only uses it to help get                                       // 1219
    // towards quiescence.                                                                                        // 1220
    self._livedata_data(msg);                                                                                     // 1221
                                                                                                                  // 1222
    // Do the rest of our processing immediately, with no                                                         // 1223
    // buffering-until-quiescence.                                                                                // 1224
                                                                                                                  // 1225
    // we weren't subbed anyway, or we initiated the unsub.                                                       // 1226
    if (!_.has(self._subscriptions, msg.id))                                                                      // 1227
      return;                                                                                                     // 1228
    var errorCallback = self._subscriptions[msg.id].errorCallback;                                                // 1229
    delete self._subscriptions[msg.id];                                                                           // 1230
    if (errorCallback && msg.error) {                                                                             // 1231
      errorCallback(new Meteor.Error(                                                                             // 1232
        msg.error.error, msg.error.reason, msg.error.details));                                                   // 1233
    }                                                                                                             // 1234
  },                                                                                                              // 1235
                                                                                                                  // 1236
  _process_nosub: function () {                                                                                   // 1237
    // This is called as part of the "buffer until quiescence" process, but                                       // 1238
    // nosub's effect is always immediate. It only goes in the buffer at all                                      // 1239
    // because it's possible for a nosub to be the thing that triggers                                            // 1240
    // quiescence, if we were waiting for a sub to be revived and it dies                                         // 1241
    // instead.                                                                                                   // 1242
  },                                                                                                              // 1243
                                                                                                                  // 1244
  _livedata_result: function (msg) {                                                                              // 1245
    // id, result or error. error has error (code), reason, details                                               // 1246
                                                                                                                  // 1247
    var self = this;                                                                                              // 1248
                                                                                                                  // 1249
    // find the outstanding request                                                                               // 1250
    // should be O(1) in nearly all realistic use cases                                                           // 1251
    if (_.isEmpty(self._outstandingMethodBlocks)) {                                                               // 1252
      Meteor._debug("Received method result but no methods outstanding");                                         // 1253
      return;                                                                                                     // 1254
    }                                                                                                             // 1255
    var currentMethodBlock = self._outstandingMethodBlocks[0].methods;                                            // 1256
    var m;                                                                                                        // 1257
    for (var i = 0; i < currentMethodBlock.length; i++) {                                                         // 1258
      m = currentMethodBlock[i];                                                                                  // 1259
      if (m.methodId === msg.id)                                                                                  // 1260
        break;                                                                                                    // 1261
    }                                                                                                             // 1262
                                                                                                                  // 1263
    if (!m) {                                                                                                     // 1264
      Meteor._debug("Can't match method response to original method call", msg);                                  // 1265
      return;                                                                                                     // 1266
    }                                                                                                             // 1267
                                                                                                                  // 1268
    // Remove from current method block. This may leave the block empty, but we                                   // 1269
    // don't move on to the next block until the callback has been delivered, in                                  // 1270
    // _outstandingMethodFinished.                                                                                // 1271
    currentMethodBlock.splice(i, 1);                                                                              // 1272
                                                                                                                  // 1273
    if (_.has(msg, 'error')) {                                                                                    // 1274
      m.receiveResult(new Meteor.Error(                                                                           // 1275
        msg.error.error, msg.error.reason,                                                                        // 1276
        msg.error.details));                                                                                      // 1277
    } else {                                                                                                      // 1278
      // msg.result may be undefined if the method didn't return a                                                // 1279
      // value                                                                                                    // 1280
      m.receiveResult(undefined, msg.result);                                                                     // 1281
    }                                                                                                             // 1282
  },                                                                                                              // 1283
                                                                                                                  // 1284
  // Called by MethodInvoker after a method's callback is invoked.  If this was                                   // 1285
  // the last outstanding method in the current block, runs the next block. If                                    // 1286
  // there are no more methods, consider accepting a hot code push.                                               // 1287
  _outstandingMethodFinished: function () {                                                                       // 1288
    var self = this;                                                                                              // 1289
    if (self._anyMethodsAreOutstanding())                                                                         // 1290
      return;                                                                                                     // 1291
                                                                                                                  // 1292
    // No methods are outstanding. This should mean that the first block of                                       // 1293
    // methods is empty. (Or it might not exist, if this was a method that                                        // 1294
    // half-finished before disconnect/reconnect.)                                                                // 1295
    if (! _.isEmpty(self._outstandingMethodBlocks)) {                                                             // 1296
      var firstBlock = self._outstandingMethodBlocks.shift();                                                     // 1297
      if (! _.isEmpty(firstBlock.methods))                                                                        // 1298
        throw new Error("No methods outstanding but nonempty block: " +                                           // 1299
                        JSON.stringify(firstBlock));                                                              // 1300
                                                                                                                  // 1301
      // Send the outstanding methods now in the first block.                                                     // 1302
      if (!_.isEmpty(self._outstandingMethodBlocks))                                                              // 1303
        self._sendOutstandingMethods();                                                                           // 1304
    }                                                                                                             // 1305
                                                                                                                  // 1306
    // Maybe accept a hot code push.                                                                              // 1307
    self._maybeMigrate();                                                                                         // 1308
  },                                                                                                              // 1309
                                                                                                                  // 1310
  // Sends messages for all the methods in the first block in                                                     // 1311
  // _outstandingMethodBlocks.                                                                                    // 1312
  _sendOutstandingMethods: function() {                                                                           // 1313
    var self = this;                                                                                              // 1314
    if (_.isEmpty(self._outstandingMethodBlocks))                                                                 // 1315
      return;                                                                                                     // 1316
    _.each(self._outstandingMethodBlocks[0].methods, function (m) {                                               // 1317
      m.sendMessage();                                                                                            // 1318
    });                                                                                                           // 1319
  },                                                                                                              // 1320
                                                                                                                  // 1321
  _livedata_error: function (msg) {                                                                               // 1322
    Meteor._debug("Received error from server: ", msg.reason);                                                    // 1323
    if (msg.offendingMessage)                                                                                     // 1324
      Meteor._debug("For: ", msg.offendingMessage);                                                               // 1325
  },                                                                                                              // 1326
                                                                                                                  // 1327
  _callOnReconnectAndSendAppropriateOutstandingMethods: function() {                                              // 1328
    var self = this;                                                                                              // 1329
    var oldOutstandingMethodBlocks = self._outstandingMethodBlocks;                                               // 1330
    self._outstandingMethodBlocks = [];                                                                           // 1331
                                                                                                                  // 1332
    self.onReconnect();                                                                                           // 1333
                                                                                                                  // 1334
    if (_.isEmpty(oldOutstandingMethodBlocks))                                                                    // 1335
      return;                                                                                                     // 1336
                                                                                                                  // 1337
    // We have at least one block worth of old outstanding methods to try                                         // 1338
    // again. First: did onReconnect actually send anything? If not, we just                                      // 1339
    // restore all outstanding methods and run the first block.                                                   // 1340
    if (_.isEmpty(self._outstandingMethodBlocks)) {                                                               // 1341
      self._outstandingMethodBlocks = oldOutstandingMethodBlocks;                                                 // 1342
      self._sendOutstandingMethods();                                                                             // 1343
      return;                                                                                                     // 1344
    }                                                                                                             // 1345
                                                                                                                  // 1346
    // OK, there are blocks on both sides. Special case: merge the last block of                                  // 1347
    // the reconnect methods with the first block of the original methods, if                                     // 1348
    // neither of them are "wait" blocks.                                                                         // 1349
    if (!_.last(self._outstandingMethodBlocks).wait &&                                                            // 1350
        !oldOutstandingMethodBlocks[0].wait) {                                                                    // 1351
      _.each(oldOutstandingMethodBlocks[0].methods, function (m) {                                                // 1352
        _.last(self._outstandingMethodBlocks).methods.push(m);                                                    // 1353
                                                                                                                  // 1354
        // If this "last block" is also the first block, send the message.                                        // 1355
        if (self._outstandingMethodBlocks.length === 1)                                                           // 1356
          m.sendMessage();                                                                                        // 1357
      });                                                                                                         // 1358
                                                                                                                  // 1359
      oldOutstandingMethodBlocks.shift();                                                                         // 1360
    }                                                                                                             // 1361
                                                                                                                  // 1362
    // Now add the rest of the original blocks on.                                                                // 1363
    _.each(oldOutstandingMethodBlocks, function (block) {                                                         // 1364
      self._outstandingMethodBlocks.push(block);                                                                  // 1365
    });                                                                                                           // 1366
  },                                                                                                              // 1367
                                                                                                                  // 1368
  // We can accept a hot code push if there are no methods in flight.                                             // 1369
  _readyToMigrate: function() {                                                                                   // 1370
    var self = this;                                                                                              // 1371
    return _.isEmpty(self._methodInvokers);                                                                       // 1372
  },                                                                                                              // 1373
                                                                                                                  // 1374
  // If we were blocking a migration, see if it's now possible to continue.                                       // 1375
  // Call whenever the set of outstanding/blocked methods shrinks.                                                // 1376
  _maybeMigrate: function () {                                                                                    // 1377
    var self = this;                                                                                              // 1378
    if (self._retryMigrate && self._readyToMigrate()) {                                                           // 1379
      self._retryMigrate();                                                                                       // 1380
      self._retryMigrate = null;                                                                                  // 1381
    }                                                                                                             // 1382
  }                                                                                                               // 1383
});                                                                                                               // 1384
                                                                                                                  // 1385
LivedataTest.Connection = Connection;                                                                             // 1386
                                                                                                                  // 1387
// @param url {String} URL to Meteor app,                                                                         // 1388
//     e.g.:                                                                                                      // 1389
//     "subdomain.meteor.com",                                                                                    // 1390
//     "http://subdomain.meteor.com",                                                                             // 1391
//     "/",                                                                                                       // 1392
//     "ddp+sockjs://ddp--****-foo.meteor.com/sockjs"                                                             // 1393
//                                                                                                                // 1394
DDP.connect = function (url, _reloadOnUpdate) {                                                                   // 1395
  var ret = new Connection(                                                                                       // 1396
    url, {reloadOnUpdate: _reloadOnUpdate});                                                                      // 1397
  allConnections.push(ret); // hack. see below.                                                                   // 1398
  return ret;                                                                                                     // 1399
};                                                                                                                // 1400
                                                                                                                  // 1401
// Hack for `spiderable` package: a way to see if the page is done                                                // 1402
// loading all the data it needs.                                                                                 // 1403
//                                                                                                                // 1404
allConnections = [];                                                                                              // 1405
DDP._allSubscriptionsReady = function () {                                                                        // 1406
  return _.all(allConnections, function (conn) {                                                                  // 1407
    return _.all(conn._subscriptions, function (sub) {                                                            // 1408
      return sub.ready;                                                                                           // 1409
    });                                                                                                           // 1410
  });                                                                                                             // 1411
};                                                                                                                // 1412
                                                                                                                  // 1413
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/livedata/client_convenience.js                                                                        //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
// Meteor.refresh can be called on the client (if you're in common code) but it                                   // 1
// only has an effect on the server.                                                                              // 2
Meteor.refresh = function (notification) {                                                                        // 3
};                                                                                                                // 4
                                                                                                                  // 5
if (Meteor.isClient) {                                                                                            // 6
  // By default, try to connect back to the same endpoint as the page                                             // 7
  // was served from.                                                                                             // 8
  var ddpUrl = '/';                                                                                               // 9
  if (typeof __meteor_runtime_config__ !== "undefined") {                                                         // 10
    if (__meteor_runtime_config__.DDP_DEFAULT_CONNECTION_URL)                                                     // 11
      ddpUrl = __meteor_runtime_config__.DDP_DEFAULT_CONNECTION_URL;                                              // 12
  }                                                                                                               // 13
  Meteor.connection =                                                                                             // 14
    DDP.connect(ddpUrl, true /* restart_on_update */);                                                            // 15
                                                                                                                  // 16
  // Proxy the public methods of Meteor.connection so they can                                                    // 17
  // be called directly on Meteor.                                                                                // 18
  _.each(['subscribe', 'methods', 'call', 'apply', 'status', 'reconnect',                                         // 19
          'disconnect'],                                                                                          // 20
         function (name) {                                                                                        // 21
           Meteor[name] = _.bind(Meteor.connection[name], Meteor.connection);                                     // 22
         });                                                                                                      // 23
} else {                                                                                                          // 24
  // Never set up a default connection on the server. Don't even map                                              // 25
  // subscribe/call/etc onto Meteor.                                                                              // 26
  Meteor.connection = null;                                                                                       // 27
}                                                                                                                 // 28
                                                                                                                  // 29
// Meteor.connection used to be called                                                                            // 30
// Meteor.default_connection. Provide backcompat as a courtesy even                                               // 31
// though it was never documented.                                                                                // 32
// XXX COMPAT WITH 0.6.4                                                                                          // 33
Meteor.default_connection = Meteor.connection;                                                                    // 34
                                                                                                                  // 35
// We should transition from Meteor.connect to DDP.connect.                                                       // 36
// XXX COMPAT WITH 0.6.4                                                                                          // 37
Meteor.connect = DDP.connect;                                                                                     // 38
                                                                                                                  // 39
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.livedata = {
  DDP: DDP,
  LivedataTest: LivedataTest
};

})();

//# sourceMappingURL=a3d111217f95d5af907302198a85413d1acbaf05.map
