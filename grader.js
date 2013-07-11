#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.fson";

var assertFileExists = function(infile) {
    var instr  = infile.toString();
    if(!fs.existsSync(instr)) {
	console.log("%s does not exists. Exiting.", instr);
	process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};

var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(fs.readFileSync(htmlfile));
};
var cheerioHtmlLink = function(result, response) {

    return cheerio.load(result);
};


var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(htmlfile, checksfile) {
    $ = cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
	var present = $(checks[ii]).length > 0;
	out[checks[ii]] = present;
    }
    return out;
};
var buildfn = function(checksfile) {
    //console.log(result)
    var checkHtml = function(result, response) {
        //console.log(result)
	   $ = cheerioHtmlLink(result);
	   var checks = loadChecks(checksfile).sort();
	   var out = {};
	   for(var ii in checks) {
	       var present = $(checks[ii]).length > 0;
	       out[checks[ii]] = present;
	   }
	   var outJson = JSON.stringify(out, null, 4);
       console.log(outJson);
       //return out;
   };
    return checkHtml;
};

var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

if(require.main == module) {
    program
	.option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
	.option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
	.option('-u, --url <html_url>', 'Link to html')
	.parse(process.argv);
    if(program.url) {
	   var rest = require('restler');
       console.log('try to get url')
       var checkHtml = buildfn(program.checks)
	   //var checkJson = 
       rest.get(program.url).on('complete', checkHtml);
	   //console.log(checkJson);
    } else {
	   var checkJson = checkHtmlFile(program.file, program.checks);
        var outJson = JSON.stringify(checkJson, null, 4);
        console.log(outJson);};
} else {
    exports.checkHtmlFile = checkHtmlFile;
}
