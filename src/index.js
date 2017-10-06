'use strict';

const Alexa = require('alexa-sdk');
const questions = require('./exercises');
const APP_ID = undefined;
const SKILL_NAME = "10 Minute Full Body Workouts"

const handlers = {

};

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
