var r = require('request');
module.exports = {        
  extend: 'apostrophe-widgets',        
  label: 'College Scorecard',
  name: 'college-scorecard', 
  addFields: [
  	{
  		name: 'api_key',
  		type: 'string',
  		label: 'API key'
  	},
  	{
  		name: 'school',
  		type: 'string',
  		label: 'School Name',
  		def: 'Earlham College'
  	}
  ],       
  construct: function (self, options) {
    self.template = "placeholder";
    var widgetOptions = {};
    self.route('get', 'collegescorecard', function (req, res) {
      var url = 'https://api.data.gov/ed/collegescorecard/v1/schools?api_key='+req.query.api_key+'&school.name='+req.query.school
      return self.getData(url, function (err, results) {
      	
        if (err) {
          results = [];
        }
        return res.send(self.render(req, 'widget', {
          data: results
        }));
      });
    });
    self.getData = function (url, callback) {
      return r(url, function (err, results) {
        if (err) {
          console.error('error:', err);
          return callback(err);
        }
        return callback(null, JSON.parse(results.body));
      });
    }
  }     
};