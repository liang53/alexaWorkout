'use strict';

const Alexa = require('alexa-sdk');
const exercises = require('./exercises');
const APP_ID = undefined;

const languageStrings = {
  'en': {
    translation: {
      SKILL_NAME: '10 Minutes Full Body Workout',
      EXERCISES: exercises['EXERCISES_EN'],
      WELCOME_MESSAGE: "Welcome to %s. Which exercise do you want to do?",
      WELCOME_REPROMPT: "You can say stretch, legs, abs, arms, butt, or back. Say more info to learn more about how to complete this workout program. Say exit to stop program. What would you like to do?",
      HELP_MESSAGE: "You can say exit, stretch, legs, abs, arms, butt, or back."
      HELP_REPROMPT: "You can pick an exercise or say exit. What would you like to do?"
      STOP_MESSAGE: "Let's stop here. Come back soon.",
      REPEAT_EXERCISE: "To repeat the last exercise, say repeat.",
      EXERCISE_NOT_FOUND: "I'm sorry. This exercise do not exist.",
      MORE_INFO: "This program consists of an optional stretch exercise and 10 minute workouts each for legs, abs, back, arms, and butt. It is recommended to do stretching before and after every exercise, and to hold each pose for 60 seconds. Exercises are grouped into legs, abs, back, arms, and butt. To get better results, each exercise should be performed 2 times with a few minutes break in between. If you cannot keep up, do as much as you can. Another way to shape your workout is to do the sections across the week. For instance, you can do Monday legs, Tuesday, abs, Wednesday arms, and so on. To increase fat burn, do a 20 minute cardio before each exercise. ",
      FIRST_TIME_MESSAGE: "This program is built for you to listen to the instructions and perform the action immediately after the exercise is mentioned. As you are exercising, I will give advice on how to do the exercise properly. If this is your first time, you might not be able to follow as quickly and may need to replay the exercise. Keep yourself hydrated before each exercise.",
      FINISHED_EXERCISE: "Your workout is now complete. It is recommended for you to stretch your muscles after each workout.",
      BREAK_TIME: "Take a 3 minute break and hydrate yourself if you need to. Relax and stretch. Do anything that makes you feel comfortable. When you are ready say continue."
    },
  },
}

const handlers = {
  'LaunchRequest': function() {
    this.attributes.speechOutput = this.t('WELCOME_MESSAGE', this.t('SKILL_NAME'));
    this.attributes.repromptSpeech = this.t('WELCOME_REPROMPT');
    this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
    this.emit(':responseReady');
  },

  'WorkoutIntent': function () {
    const workout_rand = [];
    const exercise_requested = this.event.request.intent.slots.exercise.value;
    exercise_requested = exercise_requested.toLowerCase();
    const myExercises = this.t('EXERCISES');
    const current_workout = myExercises[exercise_requested];
    current_workout = shuffle(current_workout);

    if (current_workout) {
      this.attributes.speechOutput = current_workout;
      this.attributes.reprmptSpeech = this.t('REPEAT_EXERCISE');
      this.response.speak(current_workout).listen(this.attributes.repromptSpeech);
      this.emit(':responseReady');
    } else {
      var speechOutput = this.t('EXERCISE_NOT_FOUND');
      var repromptSpeech = this.t('EXERCISE_NOT_FOUND');
      this.attributes.speechOutput = speechOutput;
      this.attributes.repromptSpeech = repromptSpeech;
      this.response.speak(speechOutput).listen(repromptSpeech);
      this.emit(':responseReady');
    };
  },

  'InfoIntent': function () {
    var first_time = this.t('FIRST_TIME_MESSAGE');
    this.attributes.speechOutput = this.t('MORE_INFO');
    this.attributes.repromptSpeech = this.t('');
    this.response.speak(first_time);
    this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
    this.emit(':responseReady');
  },

  'AMAZON.HelpIntent': function () {
    this.attributes.speechOutput = this.t('HELP_MESSAGE');
    this.attributes.repromptSpeech = this.t('HELP_REPROMPT');
    this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
    this.emit(':responseReady');
  },

  'AMAZON.RepeatIntent': function () {
    this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
    this.emit(':responseReady');
  },

  'AMAZON.CancelIntent': function () {
    this.emit(':responseReady');
  },

  'AMAZON.StopIntent': function() {
    this.emit(':responseReady');
  },

  'Unhandled': function () {
    this.attributes.speechOutput = this.t('HELP_MESSAGE');
    this.attributes.repromptSpeech = this.t('HELP_REPROMPT');
    this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
    this.emit(':responseReady');
  },

};


function shuffle(array) {
  var temp = null,
      j = 0,
      i = 0

  for (i = array.length - 1 ; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };

  return array;
};

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.resources = languageString;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
