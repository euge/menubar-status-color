module.exports = function(grunt) {

  var shell = require('shelljs');

  grunt.loadNpmTasks('grunt-download-atom-shell');

  grunt.initConfig({
    'download-atom-shell': {
      version: '0.15.1',
      outputDir: 'binaries'
    }
  });

  grunt.registerTask("build", function() {
    shell.rm('-rf', 'dist');
    shell.mkdir('dist');
    // copy vanilla Atom
    shell.exec('cp -R binaries/Atom.app/ dist/MenubarStatusColor.app');
    // copy appliction source into our app
    shell.exec('cp -R app dist/MenubarStatusColor.app/Contents/Resources');
    // copy icons
    shell.exec("cp icons/icons.icns dist/MenubarStatusColor.app/Contents/Resources/atom.icns");

  });

};