module.exports = function(grunt) {
	'use strict';

	var conf = {
		copy: {
			main: {
				
					expand: true,
					cwd: 'src/',
					dest: 'out/',
					src: '*'
			}
		},
		
		clean: {
			folder: 'out/*'
		},

		connect: {
			server: {
				options: {
					port: 8080,
					base: 'out/',
					keepalive: true
				}
			}
		},

	};

	grunt.initConfig(conf);

	// Libraries
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['clean', 'copy']);
};
