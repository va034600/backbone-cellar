module.exports = function(grunt) {
    grunt.initConfig({
	watch: {
	    files: './js/**',
	    tasks: ['requirejs']
	},
	requirejs: {
	    compile_main: {
		options: {
		    name: 'main',
		    baseUrl: "./js",
		    mainConfigFile: './js/main.js',
		    out: "./build/main.min.js",
		    // ソースマップ対応
		    optimize: "uglify2",
		    generateSourceMaps: true,
		    preserveLicenseComments: false,
		}
	    }
	}
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['requirejs', 'watch']);
}