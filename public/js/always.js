  apos.define('college-scorecard-widgets', {
  extend: 'apostrophe-pieces-widgets',
  construct: function(self, options) {
    self.play = function ($widget, data, options) {
       $.get('/modules/college-scorecard-widgets/collegescorecard?api_key='+data.api_key+'&school='+encodeURIComponent(data.school), function (results) {
         $widget.find('[data-events-contents]').html(results).addClass('loaded'); //this is an attribute into your html placeholder,if I remember correctly
       });
    };
  }
});
