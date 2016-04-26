// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by reactive-window.js.
import { name as packageName } from "meteor/reactive-window";

// Write your tests here!
// Here is an example.
Tinytest.add('reactive-window - example', function (test) {
  test.equal(packageName, "reactive-window");
});
