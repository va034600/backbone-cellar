requirejs.config({
    baseUrl: './js',
    shim: {
	'jQuery': {exports: '$'},
	'underscore': {exports: '_'},
	'backbone': {
	    deps: ['underscore', 'jQuery'],
	    exports: 'Backbone'
	},
	'bootstrap': {
	    deps: ['jQuery'],
	    exports: 'bootstrap'
	}
    },
    paths: {
	'jQuery': '../lib/jquery-1.7.2.min',
	'underscore': '../lib/underscore-min',
	'backbone': '../lib/backbone-min',
	'bootstrap': '../lib/bootstrap'
    },
    
    deps:[
    'models/models',
    'views/header',
    'views/about',
    'views/winelist',
    'views/winedetails',
    'views/paginator',
    'utils', 
    'bootstrap', 
    'memorystore'
    ]

    , urlArgs: 'bust=' + (new Date()).getTime()
});

require([
], function() {


var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "list",
        "wines/page/:page"	: "list",
        "wines/add"         : "addWine",
        "wines/:id"         : "wineDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({success: function(){
            $("#content").html(new WineListView({model: wineList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    wineDetails: function (id) {
        var wine = new Wine({id: id});
        wine.fetch({success: function(){
            $("#content").html(new WineView({model: wine}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addWine: function() {
        var wine = new Wine();
        $('#content').html(new WineView({model: wine}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

window.utils.loadTemplate(['HeaderView', 'WineView', 'WineListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});



});
