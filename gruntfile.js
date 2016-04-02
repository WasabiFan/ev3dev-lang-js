module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-typedoc');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            main: {
                src: "src/index.ts",
                dest: 'bin/',
                options: {
                    target: 'es5',
                    sourceMap: true,
                    declaration: true,
                    module: 'commonjs'
                }
            }
        },
        typedoc: {
            doc: {
                src: "src/index.ts",
                options: {
                    out: './docs',
                    name: 'ev3dev-lang for Node.JS',
                    target: 'es5',
                    disableOutputCheck: '',
                    module: 'commonjs'
                }
            }
        }
    });

    grunt.registerTask('default', ['ts', 'typedoc']);
    grunt.registerTask('tsc', ['ts']);
    grunt.registerTask('doc', ['ts', 'typedoc']);
}
