/// <reference path="./index.ts" />
var LogMessage = (function () {
    function LogMessage(messageArg, typeArg) {
        this.message = messageArg;
        this.type = typeArg;
        this.printed = false;
    }
    ;
    LogMessage.prototype.print = function () {
        beautylog.log(this.message, this.type);
        this.printed = true;
    };
    ;
    return LogMessage;
})();
/// <reference path="typings/tsd.d.ts" />
/// <reference path="./classes.ts" />
var through = require("through2");
var path = require("path");
var beautylog = require("beautylog")("os");
var pipelog = {}; // module object
pipelog.stream = function (messageArg, typeArg, timingArg) {
    if (timingArg === void 0) { timingArg = "atEnd"; }
    var logMessage = new LogMessage(messageArg, typeArg);
    var logTiming = timingArg;
    var forEachChunk = function (file, enc, cb) {
        if (logTiming == "forEach") {
            logMessage.print();
        }
        else if (logTiming == "atStart" && !logMessage.printed) {
            logMessage.print();
        }
        return cb(null, file); //signal end of chunk processing.
    };
    var afterLastChunk = function (cb) {
        if (logTiming == "atEnd") {
            logMessage.print();
        }
        cb();
    };
    return through.obj(forEachChunk, afterLastChunk);
};
module.exports = pipelog;
