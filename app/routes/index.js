'use strict';

var path = process.cwd();

module.exports = function (app) {

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/:time')
		.get(function(req, res) {
			let timeStr = req.params.time;
			let timestamp;
			let result = {unix: null, natural: null};

			// If the time string contains non-numeric characters, attempt to parse it as as time string.
			if (timeStr.match(/\D/)) {
				timestamp = Date.parse(timeStr);
			} else {
				// Question: Do we need to round to the start of the day?
				timestamp = Number(timeStr * 1000);
			}

			if (!isNaN(timestamp)) {
				let theDate = new Date(timestamp);
				result = {
					unix: Math.floor(timestamp / 1000),
					natural: formatDate(theDate)
				}
			}
			res.json(result);
		});
};

// From a given date object, return a string of the form Jan 23, 2013.
function formatDate(aDate) {
	let splitDate = aDate.toDateString().split(' ');
	splitDate[2] = splitDate[2] + ',';
	return splitDate.slice(1).join(' ');
}