///
/// GRUNT FILE
/// ----------
/// MUST BE PLACED AT ROOT OF APPLICATION FOLDER
///

module.exports = function(grunt){

  ///
  /// Grunt internal plugins
  ///

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);


  ///
  /// Paths configurations
  ///

    var paths =
    {
        // Location of assets folder
        assets : 'resources/assets',

        // Location of public folder
        pub    : 'public',

        // Active theme
        theme  : 'default'
    };


  ///
  /// Advanced paths configurations
  ///

    paths['scss'] = paths.assets + '/scss';
    paths['js']   = paths.assets + '/js';


  ///
  /// Grunt configurations
  ///

    grunt.initConfig(
    {

        // Start vars config

        librariesSource   : paths.js+'/lib/*.js',
        compiledLibraries : paths.js+'/_compiled/lib.js',
        scriptsSource     : paths.js+'/scripts/**/*.js',
        styleImports      : paths.scss+'/imports.scss',
        stylesSource      : paths.scss+'/styles.scss',
        devConfigStyles   : paths.scss+'/config/_dev.scss',
        buildConfigStyles : paths.scss+'/config/_build.scss',
        compiledScripts   : paths.pub+'/js/scripts.min.js',
        compiledStyles    : paths.pub+'/css/styles.css',

        // Package config

        pkg: grunt.file.readJSON('package.json'),

        // Tasks definitions

        uglify:
        {
            lib:
            {
                options:
                {
                    mangle   : true,
                    compress : true
                },

                files:
                {
                    '<%= compiledLibraries %>':
                    [
                        '<%= librariesSource %>'
                    ]
                }
            },

            dev:
            {
                options:
                {
                    mangle   : false,
                    compress : false
                },

                files:
                {
                    '<%= compiledScripts %>':
                    [
                        '<%= compiledLibraries %>',
                        '<%= scriptsSource %>'
                    ]
                }
            },

            build:
            {
                options:
                {
                    mangle   : true,
                    compress : true
                },

                files: '<%= uglify.dev.files %>'
            }
        },

        sass:
        {
            options:
            {
                sourcemap: 'none'
            },

            dev:
            {
                options:
                {
                    style : 'nested'
                },

                files:
                {
                    '<%= compiledStyles %>': '<%= stylesSource %>'
                }
            },

            build:
            {
                options:
                {
                    style : 'compact'
                },

                files: '<%= sass.dev.files %>'
            }
        },

        concat:
        {
            js:
            {
                options:
                {
                    process: function(src, filepath) {
                      return '//------------\n// ' + filepath + '\n//------------\n\n' + src + '\n\n';
                    }
                },

                src: [ '<%= compiledLibraries %>', '<%= scriptsSource %>' ],
                dest: '<%= compiledScripts %>'
            },

            sass_dev:
            {
                src: [ paths.scss+'/config/_dev.scss', '<%= styleImports %>' ],
                dest: '<%= stylesSource %>'
            },

            sass_build:
            {
                src: [ paths.scss+'/config/_build.scss', '<%= styleImports %>' ],
                dest: '<%= concat.scss_dev.dest %>'
            }
        },

        watch:
        {
            styles:
            {
                files: [ paths.scss+'theme/'+paths.theme+'/*.scss' ],
                tasks: [ 'css' ]
            },

            scripts:
            {
                files: [ paths.js+'/scripts/**/*.js' ],
                tasks: [ 'js' ],
                options: {
                    spawn: false,
                },
            }
        }
    });


  ///
  /// Grunt plugins
  ///

    grunt.loadNpmTasks( 'grunt-contrib-uglify' );  // https://github.com/gruntjs/grunt-contrib-uglify
    grunt.loadNpmTasks( 'grunt-contrib-sass' );    // https://github.com/gruntjs/grunt-contrib-sass
    grunt.loadNpmTasks( 'grunt-contrib-concat' );  // https://github.com/gruntjs/grunt-contrib-concat
    grunt.loadNpmTasks( 'grunt-contrib-watch' );   // https://github.com/gruntjs/grunt-contrib-watch


  ///
  /// Tasks registration
  ///

    // Pre-compile all libraries and append scripts
    grunt.registerTask( 'base', ['uglify:lib','concat:js','concat:sass_dev'] );

    // Tasks for development workflow
    grunt.registerTask( 'js',  ['concat:js'] );
    grunt.registerTask( 'css', ['concat:sass_dev','sass:dev'] );

    grunt.registerTask( 'default', ['concat:js','concat:sass_dev','sass:dev'] );
    grunt.registerTask( 'watch', ['watch'] );

    // Prepares a build for stage or production
    grunt.registerTask( 'build', ['uglify:lib','uglify:build','concat:sass_build','sass:build'] );

};
