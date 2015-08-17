module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-typedoc');

    var tsSrc = ['include.ts', 'io.ts', 'motor.ts', 'sensor.ts', 'extras.ts', 'export.ts'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            tsc: {
                src: tsSrc,
                dest: 'bin/index.js',
                options: {
                    target: 'es5'
                }
            }
        },
        typedoc: {
            doc: {
                src: tsSrc,
                options: {
                    out: './docs',
                    name: 'ev3dev-lang for Node.JS',
                    target: 'es5'
                }
            }
        },
        watch: {
            files: __dirname + '/*.ts',
            tasks: ['shell']
        }
    });

    grunt.registerTask('default', ['typescript', 'typedoc']);
    grunt.registerTask('watch', ['watch']); //Has issues, shouldn't use
    grunt.registerTask('tsc', ['typescript']);
    grunt.registerTask('doc', ['typescript', 'typedoc']);
}
