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
        onRender: function() {
            var chosenObjects = this.view.$('.chosen-select');
            chosenObjects.chosen(this.options.chosenOptions);
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
