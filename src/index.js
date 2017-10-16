'use strict';

var Alexa = require('alexa-sdk');
var APP_ID = 'amzn1.ask.skill.4b44c855-a0fa-4c63-b50c-4ba7476538fc';

const languageStrings = {
  'en': {
    translation: {
      SKILL_NAME: '10 Minutes Full Body Workout',
      EXERCISES: exercises.Exercises_EN,
      WELCOME_MESSAGE: "Welcome to %s. Which exercise do you want to do?",
      WELCOME_REPROMPT: "You can say stretch, legs, abs, arms, butt, or back. Say more info to learn more about how to complete this workout program. Say exit to stop program. What would you like to do?",
      HELP_MESSAGE: "You can say exit, stretch, legs, abs, arms, butt, or back."
      HELP_REPROMPT: "You can pick an exercise or say exit. What would you like to do?"
      STOP_MESSAGE: "Let\'s stop here. Come back soon.",
      REPEAT_EXERCISE: "To repeat the last exercise, say repeat.",
      EXERCISE_NOT_FOUND: "I'm sorry. This exercise do not exist.",
      MORE_INFO: "This program consists of an optional stretch exercise and 10 minute workouts each for legs, abs, back, arms, and butt. It is recommended to do stretching before and after every exercise, and to hold each pose for 60 seconds. Exercises are grouped into legs, abs, back, arms, and butt. To get better results, each exercise should be performed 2 times with a few minutes break in between. If you cannot keep up, do as much as you can. Another way to shape your workout is to do the sections across the week. For instance, you can do Monday legs, Tuesday, abs, Wednesday arms, and so on. To increase fat burn, do a 20 minute cardio before each exercise. ",
      FIRST_TIME_MESSAGE: "This program is built for you to listen to the instructions and perform the action immediately after the exercise is mentioned. As you are exercising, I will give advice on how to do the exercise properly. If this is your first time, you might not be able to follow as quickly and may need to replay the exercise. Keep yourself hydrated before each exercise.",
      FINISHED_EXERCISE: "Your workout is now complete. It is recommended for you to stretch your muscles after each workout.",
      BREAK_TIME: "Take a 3 minute break and hydrate yourself if you need to. Relax and stretch. Do anything that makes you feel comfortable. When you are ready say continue."
    },
  },
};

var handlers = {
  'InfoIntent': function () {
    this.response.speak("Testing");
  },
  'WorkoutIntent': function () {
    this.response.speak('Testing');
  },
  'AMAZON.HelpIntent': function () { (11)
    var speechOutput = this.t('HELP_MESSAGE');
    var reprompt = this.t('HELP_REPROMPT');
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function () { (12)
    this.emit(':tell', 'Goodbye!');
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', 'Let\'s stop here. Come back soon.');
  },
  'AMAZON.RepeatIntent': function () {
    var speechOutput = this.t('REPEAT_EXERCISE');
    var reprompt = this.t('REPEAT_EXERCISE');
    this.emit(':ask', speechOutput, reprompt);
  }
};

exports.handler = function (event, context) {
  var alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
