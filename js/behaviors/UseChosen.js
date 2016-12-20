define(function(require){
    var _      = require('lodash');
    var chosen = require('chosen');
    var Mn     = require('marionette');

    return Mn.Behavior.extend({
        defaults: {
            chosenOptions: {}
        },
        events: {
            'change .chosen-select': 'onChange'
        },
        onAttach: function() {
            var options = this.options;
            _.forEach(this.view.$('.chosen-select'), function(item) {
                var chosenOptions = _.clone(options.chosenOptions);
                var $item = $(item);
                if(_.isUndefined(chosenOptions.width)) {
                    var width = $item.width() + 20;
                    chosenOptions.width = width + 'px';
                    if(!_.isNull(item.getAttribute('multiple'))) {
                        chosenOptions.width = width * 4 + 'px';
                    }
                }
                $item.chosen(chosenOptions);
            });
        },
        onChange: function(event, params) {
            var model = this.view.model;
            var property = event.target.getAttribute('data-attr');
            var value = params.selected;
            var isMultiple = !_.isNull(event.target.getAttribute('multiple'));
            if(isMultiple) {
                var oldValue = model.get(property);
                if(!_.isUndefined(params.selected)) {
                    value = _.concat(oldValue, params.selected);
                }
                if(!_.isUndefined(params.deselected)) {
                    value = _.without(oldValue, params.deselected);
                }
            }
            model.set(property, value);
        }
    });
});
