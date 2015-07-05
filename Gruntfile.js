module.exports = function(grunt)
{

    grunt.initConfig(
    {

        sass :
        {
            dev :
            {
                options :
                {
                    style: 'expanded',
                    sourcemap: 'none'
                },

                files :
                {
                    'public/css/styles.css' : 'resources/assets/scss/styles.scss'
                }
            }
        },

        uglify :
        {
            dev :
            {

            }
        },

        watch: {
            styles: {
                files: [ 'resources/assets/scss/*.scss' ],
                tasks: [ 'sass:dev' ],
                options: {
                    spawn: false,
                },
            },
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask( 'default', [ 'sass:dev' ] );
    //grunt.registerTask( 'watch', [ 'watch' ] );
    //grunt.registerTask( 'prod',    [ 'sass:prod', 'uglify:prod' ] );

}