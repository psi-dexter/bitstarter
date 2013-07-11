var url = 'http://infinite-bastion-2114.herokuapp.com/v2';
var rest = require('restler');
console.log('try to get url');
var buildfn = function (result, response) {
	console.log(result);
}
//var checkJson = 
rest.get(url).on('complete', buildfn);
