import Ember from 'ember';
import config from '../config/environment';

export function getGlobalName() {
  const value = config.exportApplicationGlobal;
  let name;

  if (typeof value === 'string') {
    name = value;
  } else {
    name = Ember.String.classify(config.modulePrefix);
  }
  return name;
}

export function initialize() {
  var application = arguments[1] || arguments[0];
  if (config.exportApplicationGlobal !== false) {
    const globalName = getGlobalName();
    if (!window[globalName]) {
      window[globalName] = application;

      application.reopen({
        willDestroy: function() {
          this._super.apply(this, arguments);
          delete window[globalName];
        }
      });
    }
  }
}

export default {
  name: 'export-application-global',

  initialize: initialize
};
