Package.describe({
  name: 'jcheroske:reactive-media-queries',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Reactive media queries',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/jcheroske/meteor-reactive-media-queries.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use('tracker', 'client');
  api.use('ecmascript', 'client');
  api.use('underscore', 'client');
  api.mainModule('index.js', 'client');
});
