define(function(require){
    var _  = require('lodash');
    var Bb = require('backbone');
    var Mn = require('marionette');

    var TabContainer = Mn.CollectionView.extend({
        className: 'tabContainer',
        childView: Mn.View.extend({
            tagName: 'button',
            className: 'tab',
            template: '{{displayName}}',
            triggers: {
                'click': 'clicked'
            }
        }),
        initialize: function(options) {
            var models = _.map(options.tabNames, function(item) {
                return {displayName: item};
            });
            this.collection = new Bb.Collection(models);
        },
        onChildviewClicked: function(childView) {
            var children = this.children;
            children.forEach(function(child) {
                if(childView === child){
                    child.$el.addClass('selected');
                } else {
                    child.$el.removeClass('selected');
                }
            });
            this.triggerMethod('tab:click', childView.model.get('displayName'));
        }
    });

    return Mn.View.extend({
        template: require('text!templates/util/TabbedViewTemplate.hbs'),
        regions: {
            tabContainer: {
                el: '.tabContainer',
                replaceElement: true
            },
            content: {
                el: '.tabContent',
                replaceElement: true
            }
        },
        initialize: function(tabDefinitions, defaultTabIdx = 0) {
            var tabNames = _.map(tabDefinitions, function(item) {
                return item.tabName;
            });
            this.defaultTabName = tabDefinitions[defaultTabIdx].tabName;
            this.defaultTabIdx = defaultTabIdx;
            this.tabContainer = new TabContainer({
                tabNames: tabNames
            });
            var tabInstances = new Map();
            _.forEach(tabDefinitions, function(item) {
                tabInstances.set(item.tabName, new item.viewClass());
            });
            this.tabInstances = tabInstances;
        },
        onRender: function() {
            var tabContainer = this.tabContainer;
            this.showChildView('tabContainer', tabContainer);

            var defaultTabIdx = this.defaultTabIdx;
            var tabs = tabContainer.children.toArray();
            tabs[defaultTabIdx].$el.addClass('selected');

            var defaultTabName = this.defaultTabName;
            var tabInstances = this.tabInstances;
            this.showChildView('content', tabInstances.get(defaultTabName));
        },
        onChildviewTabClick: function(tabName) {
            var tabInstances = this.tabInstances;
            var contentRegion = this.getRegion('content');
            contentRegion.detachView();
            contentRegion.show(tabInstances.get(tabName));
        }
    });
});
