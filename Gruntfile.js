module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        cssmin: {
            sitecss: {
                options: {
                    banner: "/* Minified and bundled css for TeaTime. */"
                },
                files: {
                    'public/stylesheets/site.min.css': [
                        "public/stylesheets/bootstrap.min.css",
                        "public/stylesheets/style.css"]
                }
            }
        },
        uglify: {
            options: {
                compress: true
            },
            applib: {
                src: [
                    "public/javascripts/utils/jquery-1.11.1.min.js",
                    "public/javascripts/AudioElement.js",
                    "public/javascripts/BrewingTime.js",
                    "public/javascripts/Helper.js",
                    "public/javascripts/Timer.js"
                ],
                dest: "public/javascripts/site.min.js"
            }
        }
    });

    grunt.registerTask("default", ["uglify", "cssmin"]);
};