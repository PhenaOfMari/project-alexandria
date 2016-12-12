define(function(require){
    var Handlebars = require('handlebars');
    var Backbone   = require('backbone');
    var Mn         = require('marionette');
    var TabbedView = require('views/util/TabbedView');

    Mn.TemplateCache.prototype.loadTemplate = function(templateId) {
        return templateId;
    };
    Mn.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
        return Handlebars.compile(rawTemplate);
    };

    var App = new Mn.Application({
        region: {
            el: '#main',
            replaceElement: true
        }
    });

    var EmptyView = Mn.View.extend({
        template: ' '
    });
    var tabs = [{'tabName': 'Home', 'viewClass': EmptyView}];

    var MainView = TabbedView.extend();

    App.getRegion().show(new MainView(tabs));
    App.start();
});
