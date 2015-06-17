/*
 * grunt-init-node
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a kraken module.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ shouldn\'t contain "node" or "js" and should ' +
  'be a unique ID not already in use at search.npmjs.org.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({
    type: 'node'
  }, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    // init.prompt('repository'),
    // init.prompt('homepage'),
    // init.prompt('bugs'),
    init.prompt('licenses'),
    init.prompt('author_name'),
    // init.prompt('author_email'),
    // init.prompt('author_url'),
    init.prompt('node_version', '>= 0.10.0'),
    init.prompt('main', 'index.js'), {
      name: 'travis',
      message: 'Will this project be tested with Travis CI?',
      default: 'Y/n',
      warning: 'If selected, you must enable Travis support for this project in https://travis-ci.org/profile'
    },
  ], function(err, props) {
    props.keywords = [];
    props.dependencies = {
      "ejs": "^1.0.0",
      "express": "^4.10.6",
      "express-session": "^1.9.3",
      "kraken-js": "^1.0.3",
      "moment": "^2.8.4",
      "async": "^0.9.0"
    };
    props.devDependencies = {
      "grunt-contrib-jshint": "~0.6.4",
      "grunt-contrib-watch": "~0.5.3",
      "profis": "git@github.com:52myu/profis.git",
      "prolayout": "git@github.com:52myu/prolayout.git",
      "proqiniu": "git@github.com:52myu/proqiniu.git"

    };
    props.travis = /y/i.test(props.travis);

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    if (!props.travis) {
      delete files['.travis.yml'];
    }

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};