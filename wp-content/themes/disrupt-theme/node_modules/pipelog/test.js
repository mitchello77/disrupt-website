/// <reference path="typings/tsd.d.ts" />
var pipelog = require("./index.js");
var gulpPipelog = pipelog.stream;
var gulp = require("gulp");
var pr = require("pushrocks");
pr.beautylog.log('Starting the test script');
gulp.task("default", [], function () {
    var stream = gulp.src("./test/*.md")
        .pipe(gulpPipelog("this message should appear 3 times", "info", "forEach"))
        .pipe(gulpPipelog("this warn message should appear once in between the three info messages", "warn", "atStart"))
        .pipe(gulpPipelog("this OK! message should appear once at the End", "ok", "atEnd"));
    return stream;
});
gulp.start.apply(gulp, ['default']);
