var express = require('express');
var path = require('path');
var logBackup = console.log;
var logMessages = [];

console.log = function() {
    logMessages.push.apply(logMessages, arguments);
    logBackup.apply(console, arguments);
};
express.static(path.join(__dirname, console.log(process.cwd())));
