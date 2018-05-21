"use strict";

var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

var gutil = require('gulp-util');
var through = require('through2');

var PLUGIN_NAME = 'gulp-asset-rev';

var ASSET_REG = {
    "SCRIPT": /(<script[^>]+src=)['"]([^'"]+)[""]/ig,
    "STYLESHEET": /(<link[^>]+href=)['"]([^'"]+)[""]/ig,
    "IMAGE": /(<img[^>]+src=)['"]([^'"]+)[""]/ig
};


module.exports = function (options) {
    return through.obj(function (file, enc, cb) {

        options = options || {};

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        var content = file.contents.toString();

        var filePath = path.dirname(file.path);

        for (var type in ASSET_REG) {
            content = content.replace(ASSET_REG[type], function (str, tag, src) {
                var getTimes = new Date().getTime();
                if(!/\?v=/.test(str)){
                    return str.replace(src,src + '?v=' + getTimes);
                }else{
                    return str.split('?v')[0] + '?v=' + getTimes + '"';
                }
            });
        }

        file.contents = new Buffer(content);
        this.push(file);
        cb();
    });
};