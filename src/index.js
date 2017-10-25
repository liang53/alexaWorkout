'use strict';

const Alexa = require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.4b44c855-a0fa-4c63-b50c-4ba7476538fc';
const exercises = require('./exercises');
var ua = require('universal-analytics');
var visitor = ua('UA-108353707-1');

const languageStrings = {
    'en': {
        translation: {
            EXERCISES: exercises['EXERCISES_EN_US'],
            STRETCH: exercises['EXERCISES_EN_US'][0][Object.keys(exercises['EXERCISES_EN_US'][0])],
            LEGS: exercises['EXERCISES_EN_US'][1][Object.keys(exercises['EXERCISES_EN_US'][1])],
            ABS: exercises['EXERCISES_EN_US'][2][Object.keys(exercises['EXERCISES_EN_US'][2])],
            ARMS: exercises['EXERCISES_EN_US'][3][Object.keys(exercises['EXERCISES_EN_US'][3])],
            BACK: exercises['EXERCISES_EN_US'][4][Object.keys(exercises['EXERCISES_EN_US'][4])],
            BUTT: exercises['EXERCISES_EN_US'][5][Object.keys(exercises['EXERCISES_EN_US'][5])],
            SKILL_NAME: '10 Minutes Home Workout',
            WELCOME_MESSAGE: "Welcome to 10 Minutes Home Workout. Which exercise do you want to do?",
            WELCOME_REPROMPT: "You can say stretch, legs, abs, arms, butt, or back. You can say more info to learn how this program works or you can say exit. What would you like to do?",
            HELP_MESSAGE: "You can say exit, stretch, legs, abs, arms, butt, or back. What would you like to do?",
            HELP_REPROMPT: "You can pick an exercise or say exit. What would you like to do?",
            STOP_MESSAGE: "Let\'s stop here.",
            EXERCISE_NOT_FOUND: "I'm sorry. This exercise do not exist.",
            MORE_INFO: "This program consists of an optional stretch exercise and 10 minute workouts each for legs, abs, back, arms, and butt. I will continuously speak for the next 8 to 10 minutes. It is recommended to do stretching before and after every exercise, and to hold each pose for 60 seconds. Exercises are grouped into legs, abs, back, arms, and butt. To get better results, each exercise should be performed 2 times with a few minutes break in between. If you cannot keep up, do as much as you can. Another way to shape your workout is to do the sections across the week. For instance, you can do Monday legs, Tuesday, abs, Wednesday arms, and so on. To increase fat burn, do a 20 minute cardio before each exercise. ",
            FIRST_TIME_MESSAGE: "This program is built for you to listen to the instructions and perform the action immediately after the exercise is mentioned. As you are exercising, I will give advice on how to do the exercise properly. If this is your first time, you might not be able to follow as quickly and may need to replay the exercise. Keep yourself hydrated before each exercise.",
            FINISHED_EXERCISE: "Your exercise is now complete. Always stretch your muscles after each workout. What would you like to do now?",
            BREAK_TIME: "Take a 3 minute break and hydrate yourself if you need to. Relax and stretch. Do anything that makes you feel comfortable. When you are ready say continue.",
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
      var speechOutput = this.t('WELCOME_MESSAGE');
      var repromptspeech = this.t('WELCOME_REPROMPT');
      visitor.event("LaunchRequest", "Initiate Alexa skill").send();
      this.emit(':ask', speechOutput, repromptspeech);
    },
    'InfoIntent': function () {
      const speechOutput = this.t('MORE_INFO') + "Which exercise would you like to do?";
      const repromptspeech = this.t('HELP_MESSAGE');
      visitor.event("InfoIntent", "Request information").send();
      this.emit(':ask', speechOutput, repromptspeech);
    },
    'WorkoutIntent': function () {
      const workoutRequest = this.event.request.intent.slots.exercise.value.toUpperCase();
      const workout = this.t(workoutRequest);
      var speechOutput = workout;
      const reprompt = this.t('HELP_MESSAGE');

      if (workoutRequest != "STRETCH") {
          speechOutput = shuffle(workout);
      }

      visitor.event("WorkoutIntent", "Start exercise", workoutRequest).send();
      speechOutput += this.t('FINISHED_EXERCISE');
      this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.HelpIntent': function () {
      const speechOutput = this.t('HELP_MESSAGE');
      const reprompt = this.t('HELP_MESSAGE');
      visitor.event("Amazon.HelpIntent", "Help").send();
      this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
      visitor.event("Amazon.CancelIntent", "Cancel").send();
      this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
      visitor.event("Amazon.StopIntent", "Stop").send();
      this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'Unhandled': function () {
      visitor.event("Unhandled", "Invalid request").send();
      this.emit(':tell', 'I am not understanding. You can pick an exercise by saying start legs or you can say exit. What can I help you with?');
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
  }
  return array;
}



exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
