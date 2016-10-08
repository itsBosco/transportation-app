module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: false
            },
            target: {
                files: {
                    'dist/js/app.min.js': ['src/js/app.min.js'],
                }
            }
        }, //UGLIFY
        sass: {
            dev: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/style.min.css': 'src/scss/style.scss'
                }
            }
        }, //SASS
        watch: {
            options: {
                livereload: true
            },
            srcipts: {
                files: ['src/js/*.js'],
                tasks: ['uglify']
            },
            css: {
                files: 'src/scss/style.scss',
                tasks: ['sass']
            }
        }, //WATCH
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'dist/css/*.css',
                        '*.html',
                        'dist/js/*.js'
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
    grunt.registerTask('default', ['uglify', 'sass', 'browserSync', 'watch']);
};
