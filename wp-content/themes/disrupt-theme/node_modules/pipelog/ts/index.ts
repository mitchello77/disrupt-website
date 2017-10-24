/// <reference path="typings/tsd.d.ts" />
/// <reference path="./classes.ts" />
var through = require("through2");
var path = require("path");
var beautylog = require("beautylog")("os");

var pipelog:any = {} // module object

pipelog.stream = (messageArg:string,typeArg:string,timingArg:string = "atEnd") => {
    var logMessage = new LogMessage(messageArg,typeArg);
    var logTiming = timingArg;

    var forEachChunk = function(file, enc, cb) {
        if (logTiming == "forEach"){
            logMessage.print();
        } else if (logTiming == "atStart" && !logMessage.printed) {
            logMessage.print();

        }
        return cb(null, file); //signal end of chunk processing.
    };

    var afterLastChunk = function(cb){
        if(logTiming == "atEnd") {
            logMessage.print();
        }
        cb();
    };
    return through.obj(forEachChunk,afterLastChunk);
};

module.exports = pipelog;
