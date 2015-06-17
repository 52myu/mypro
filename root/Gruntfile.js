module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({
        fis: {
            compile: {
                options: {
                    src: './site/',
                    dist: '../dist',
                    pack: true, //是否按照将js,css的uri打包
                    env: {
                        'NODE_ENV': 'development'
                    },
                    command: 'm,D,l,p' //m: md5, D: domains, l: lint, o: optimize, p: pack
                }
            },
            deploy: {
                options: {
                    src: './site/',
                    dist: '../dist',
                    pack: true, //是否按照将js,css的uri打包
                    env: {
                        'NODE_ENV': 'production'
                    },
                    command: 'm,D,l,o,p' //m: md5, D: domains, l: lint, o: optimize, p: pack
                }
            }
        },

        layout: {
            view: {
                options: {
                    dist: './site/'
                },
                tree: ['{0}/page/index.ejs', '{0}/static/index.css', '{0}/static/index.js', '{0}/static/image/', '{0}/tpl/']
            },
            controller: {
                options: {
                    dist: './controllers/'
                },
                tree: ['{0}/index.js']
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            modules: {
                src: ['modules/**/*.js']
            }
        },

        qiniu: {
            sync: {
                options: {
                    ACCESS_KEY: '',
                    SECRET_KEY: '',
                    bucket: '',
                    prefix: 'static/',
                    path: __dirname
                },
                files: {
                    'logs/qiniu.json': ['dist/static/']
                }
            }
        },

        watch: {
            scripts: {
                options: {
                    livereload: 1337
                },
                files: ['site/**/*'],
                tasks: ['fis:compile']
            }
        }
    });

    grunt.loadNpmTasks('profis');
    grunt.loadNpmTasks('prolayout');
    grunt.loadNpmTasks('proqiniu');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask('deploy', ['fis:deploy', 'qiniu']);

    grunt.registerTask('default', ['jshint']);

    grunt.registerTask('cp', ['fis:compile']);
    grunt.registerTask('av', ['layout:view']);
    grunt.registerTask('ac', ['layout:controller']);
};