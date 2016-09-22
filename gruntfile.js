module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: false
            },
            target: {
                files: {
                    'app/dist/js/app.min.js': ['app/src/js/app.js', 'app/src/js/controllers/*.js', 'app/src/js/services/*.js']
                }
            }
        }, //UGLIFY
        sass: {
            dev: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'app/dist/css/style.min.css': 'app/src/scss/style.scss'
                }
            }
        }, //SASS
        watch: {
            options: {
                livereload: true
            },
            srcipts: {
                files: ['app/src/js/app.js', 'app/src/js/controllers/*.js', 'app/src/js/services/*.js'],
                tasks: ['uglify']
            },
            css: {
                files: 'app/src/scss/style.scss',
                tasks: ['sass']
            }
        }, //WATCH
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'app/dist/css/*.css',
                        '*.html',
                        'app/dist/js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        } //SYNC
    });

    //load tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browser-sync');

    //register tasks
    grunt.registerTask('default', ['browserSync', 'watch']);
};
