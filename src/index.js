'use strict';

const Alexa = require('alexa-sdk');// app that allows the code to be structured as below
const APP_ID = 'amzn1.ask.skill.4b44c855-a0fa-4c63-b50c-4ba7476538fc';
const exercises = require('./exercises'); // the exercise file
var ua = require('universal-analytics'); // setup for google analytics
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
            MSG_STRETCH: "This stretch exercise is a blend of various techniques including yoga. <break time='1s'/>  ",
            MSG_LEGS: "This workout set does not require any equipments. It targest the whole leg including the gluteus maximus.<break time='1s'/>  ",
            MSG_ABS: "No equipments are needed for this workout set. You will be lying on your back for most of the exercises.<break time='1s'/>  ",
            MSG_ARMS: "This workout set requires bench, medicine ball and dumbbells. You can use replacements. You have 10 seconds till it begins.<break time='10s'/>  ",
            MSG_BACK: "This workout set requires a bench, dumbbells and elastic bands. You can use replacements. 10 seconds till program begins.<break time='10s'/>  ",
            MSG_BUTT: "This workout does not require any equipments. To intensify the workout, add ankle weights or elastic bands. You have 5 seconds till the program begins.<break time='5s'/> ",
            SKILL_NAME: '10 Minutes Home Workout',
            WELCOME_MESSAGE: "Welcome to 10 Minutes Home Workout. You can say start abs or start butt. Which exercise do you want to do? ",
            WELCOME_REPROMPT: "You can say the word start and the exercise choice. Your choices are stretch, legs, abs, arms, butt, or back. You can say more info to learn how this program works or you can say exit. What would you like to do?",
            HELP_MESSAGE: "You can say exit, start stretch, start legs, start abs, arms, butt, or back. The command phrases are listed on Amazon skill page for 10 Minutes Home Workout. What would you like to do?",
            HELP_REPROMPT: "You can pick an exercise or say exit. You must say the word start and then the exercise name. Alternatively, you can say legs workout or begin legs. What would you like to do?",
            STOP_MESSAGE: "Let\'s stop here ",
            EXERCISE_NOT_FOUND: "I am not understanding. You can pick an exercise by saying start legs. You must say the word start and then the exercise. Alternatively you can say begin legs or legs workout. Or you can say exit. What can I help you with? ",
            MORE_INFO: "This program is a blend of various types of exercises primarily strength training, yoga, and pilates. It contains 10 minutes exercises for stretch, legs, abs, arms, and butt. To start the exercise, say start legs or start arms. Some of these exercises requires heavy and light dumbbells, bench, medicine ball, and stretch band. Once the workout starts, I will speak continuously for the next 10 minutes, and you will perform the exercises immediately. You will not be able to stop once I begin. Stretching is recommended before and after each exercise. Variations are welcomed. Do what feels natural and right for your body. Perform each set 2 to 3 times with few minutes break in between for better results. To increase fat burn, do a 20 minute cardio exercise before starting the set. Cardio exercises can be walking outside for at least 30 minutes.",
            FIRST_TIME_MESSAGE: "This program is built for you to listen to the instructions and perform the action immediately after the exercise is mentioned. As you are exercising, I will give advice on how to do the exercise properly. If this is your first time, you might not be able to follow as quickly and may need to replay the exercise. Keep yourself hydrated before each exercise ",
            FINISHED_EXERCISE: "<break time='2s'/> Your exercise is now complete. Perform each set 2 to 3 times for better results. Stretch after each workout. What would you like to do now?",
        },
    },
};

const handlers = { // structure based on alexa-sdk and amazon alexa - further configuration needed in developer.amazon.com
    'LaunchRequest': function () {
      var speechOutput = this.t('WELCOME_MESSAGE');
      var repromptspeech = this.t('WELCOME_REPROMPT');
      visitor.event("LaunchRequest", "Initiate Alexa skill").send(); // sends event to google analytics
      this.emit(':ask', speechOutput, repromptspeech); // what alexa should say after receiving this request
    },
    'InfoIntent': function () {
      const speechOutput = this.t('MORE_INFO') + "<break time='1s'/> Which exercise would you like to do?";
      const repromptspeech = this.t('HELP_MESSAGE');
      visitor.event("InfoIntent", "Request information").send();
      this.emit(':ask', speechOutput, repromptspeech);
    },
    'WorkoutIntent': function () {
      const workoutRequest = this.event.request.intent.slots.exercise.value.toUpperCase();
      const workout = this.t(workoutRequest);
      const reprompt = this.t('HELP_MESSAGE');
      const msg_workout = "MSG_" + workoutRequest;
      var speechOutput = workout;

      if (workoutRequest != "STRETCH") {
          speechOutput = shuffle(workout);
      }

      speechOutput = this.t(msg_workout) + workout;

      visitor.event("WorkoutIntent", "Start exercise", workoutRequest).send();
      speechOutput += this.t('FINISHED_EXERCISE');
      this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.HelpIntent': function () {
      const speechOutput = this.t('HELP_MESSAGE');
      const reprompt = this.t('HELP_REPROMPT');
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
    'AMAZON.PauseIntent': function () {
      visitor.event("Amazon.PauseIntent", "Pause").send();
      this.emit(':ask', "Amazon currently does not allowed this command to be applied to my speech. It is only available for certain files such as songs. This command will end the skill. If you want to start the workout again, say start and then the exercise choice. For instance, you can say start legs.");
    },
    'AMAZON.ResumeIntent': function () {
      visitor.event("Amazon.ResumeIntent", "Resume").send();
      this.emit(':ask', 'Amazon currently does not allowed this command to be applied to my speech. It is only available for certain files such as songs. This command will end the skill. If you want to start the workout again, say start and then the exercise choice. For instance, you can say start legs.');
    },
    'AMAZON.RepeatIntent': function () {
      visitor.event("Amazon.ResumeIntent", "Repeat").send();
      this.emit(':ask', 'Amazon currently does not allowed this command to be applied to my speech. It is only available for certain files such as songs. This command will end the skill. If you want to start the workout again, say start and then the exercise choice. For instance, you can say start legs.');
    },
    'Unhandled': function () {
      visitor.event("Unhandled", "Invalid request").send();
      var speechOutput = this.t('EXERCISE_NOT_FOUND');
      var reprompt = this.t('HELP_REPROMPT');
      this.emit(':ask', speechOutput, reprompt);
    },
};

function shuffle(array) { // function to shuffle the exercise order each time the application is called
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
