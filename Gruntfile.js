module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        cssmin: {
            sitecss: {
                files: {
                    'build/styles/site.min.css': [
                        "src/styles/site.css",
                        "src/styles/bootstrap.min.css"
                    ]
                }
            }
        },
        typescript: {
            main: {
                src: ['src/scripts/**/*.ts'],
                dest: 'build/tmp/site.js',
                options: {
                    module: 'amd'
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'build/scripts/site.min.js': ['build/tmp/site.js', 'vendor/**/*.js']
                }
            }
        },
        clean: {
            initial: ["build"],
            final: ["build/tmp"]
        },
        watch: {
            scripts: {
                files: ['src/scripts/**/*.ts'],
                tasks: ['default'],
                options: {
                    spawn: false
                },
            },
            styles: {
                files: ['src/styles/site.css'],
                tasks: ['cssmin'],
                options: {
                    spawn: false
                }
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'src/sounds/', src: ['**'], dest: 'build/sounds/' },
                ]
            }
        }
    });

    grunt.registerTask("default", ["clean:initial", "cssmin", "typescript", "uglify", "copy", "clean:final"]);
};