'use strict';

var Alexa = require('alexa-sdk');
var APP_ID = 'amzn1.ask.skill.4b44c855-a0fa-4c63-b50c-4ba7476538fc';

var SKILL_NAME = '10 Minutes Home Workout';
var WELCOME_MESSAGE = "Welcome to %s. Which exercise do you want to do?";
var WELCOME_REPROMPT: "You can say stretch, legs, abs, arms, butt, or back. Say more info to learn more about how to complete this workout program. Say exit to stop program. What would you like to do?";
var HELP_MESSAGE: "You can say exit, stretch, legs, abs, arms, butt, or back. What would you like to do?";
var HELP_REPROMPT: "You can pick an exercise or say exit. What would you like to do?";
var STOP_MESSAGE: "Let\'s stop here. Come back soon.";
var REPEAT_EXERCISE: "To repeat the last exercise, say repeat.";
var EXERCISE_NOT_FOUND: "I'm sorry. This exercise do not exist.";
var MORE_INFO: "This program consists of an optional stretch exercise and 10 minute workouts each for legs, abs, back, arms, and butt. It is recommended to do stretching before and after every exercise, and to hold each pose for 60 seconds. Exercises are grouped into legs, abs, back, arms, and butt. To get better results, each exercise should be performed 2 times with a few minutes break in between. If you cannot keep up, do as much as you can. Another way to shape your workout is to do the sections across the week. For instance, you can do Monday legs, Tuesday, abs, Wednesday arms, and so on. To increase fat burn, do a 20 minute cardio before each exercise. ";
var FIRST_TIME_MESSAGE: "This program is built for you to listen to the instructions and perform the action immediately after the exercise is mentioned. As you are exercising, I will give advice on how to do the exercise properly. If this is your first time, you might not be able to follow as quickly and may need to replay the exercise. Keep yourself hydrated before each exercise.";
var FINISHED_EXERCISE: "Your workout is now complete. It is recommended for you to stretch your muscles after each workout.";
var BREAK_TIME: "Take a 3 minute break and hydrate yourself if you need to. Relax and stretch. Do anything that makes you feel comfortable. When you are ready say continue.";


var handlers = {
  'LaunchRequest': function () {
    this.emit(':ask', WELCOME_MESSAGE, WELCOME_REPROMPT);
  },
  'InfoIntent': function () {
    var speechOutput = MORE_INFO + HELP_MESSAGE;
    var repromptSpeech = HELP_REPROMPT;
    this.emit(':ask', speechOutput, repromptSpeech);
  },
  'WorkoutIntent': function () {
    this.emit(':tell', "Testing");
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':ask', HELP_MESSAGE);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', STOP_MESSAGE);
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', STOP_MESSAGE);
  },
  'AMAZON.RepeatIntent': function (){
    this.emit(':ask', 'Repeating')
  },
  'SessionEndedRequest': function () {
    console.log('session ended!');
  },
  'Unhandled': function() {
    this.emit(':ask', 'Sorry, I didn\'t get that. Which part of your body would you like to workout?', 'Pick a workout.');
  }
};

exports.handler = function (event, context, callback) {
  var alexa = Alexa.handler(event, context, callback);
  alexa.appID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
