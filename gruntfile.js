module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-typedoc');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
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

    grunt.registerTask('default', ['typescript', 'typedoc']);
    grunt.registerTask('tsc', ['typescript']);
    grunt.registerTask('doc', ['typescript', 'typedoc']);
}
