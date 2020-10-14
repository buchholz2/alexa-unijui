// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.

const Alexa = require('ask-sdk-core');

var lista;

var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./alexa-unijui.json");

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://alexa-unijui-t.firebaseio.com"
});

const db = admin.firestore();

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        let tempList = [];
        const snapshot = await db.collection("minhaConta").doc("algoritmos");
        console.log("TESTE"+snapshot)
        await snapshot.get().then(function (doc) {
            console.log(doc.data());
            tempList = doc.data()["notas"];
            // console.log("UM" + tempList);
        //     //snapshot.forEach((doc) => {tempList.push(doc.data());});
        //     console.log("DOIS" + tempList[1]);
        //     const quanti = tempList.length;
        //     console.log("TRES" + tempList["length"]);
        });
        
        // var addTurmas = [
        //     {
        //         name: {
        //             value: "teste",
        //             synonyms: [],
        //         },
        //     },
        // ];

        // for (var i = 0; i < tempList["length"]; i++) {
        //     var newstr = tempList[i].replace("1", "um");
        //     newstr = newstr.replace("2", "dois");
        //     newstr = newstr.replace("3", "três");
        //     newstr = newstr.replace("4", "quatro");
        //     newstr = newstr.replace("5", "cinco");

        //     var secretWords = [
        //         {
        //             name: {
        //                 value: newstr,
        //                 synonyms: [],
        //             },
        //         },
        //     ];

        //     addTurmas = addTurmas.concat(secretWords);
        // }

        // console.log(JSON.stringify(addTurmas));

        // addTurmas.forEach((word) => {
        //     console.log("word: ", JSON.stringify(word));
        //     console.log(word.name.value);
        // });

        // const secretWordEntities = {
        //     type: "Dialog.UpdateDynamicEntities",
        //     updateBehavior: "REPLACE",
        //     types: [
        //         {
        //             name: "diciplina",
        //             values: addTurmas,
        //         },
        //     ],
        // };

        const speakOutput = "Sua primeira nota foi de "+tempList[0]+" sua segunda nota foi de "+tempList[1]+" sua terceira nota foi de "+tempList[2];
        return handlerInput.responseBuilder
            // .addDirective(secretWordEntities)
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    },
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    
    
    async handle(handlerInput) {
        
        var turma = Alexa.getSlotValue(handlerInput.requestEnvelope,'turma');
        
        var count = 1;
        
        var speakOutput = 'talvez';
        if(count===1){
        
        const snapshot = await db.collection('notas').where('id', '==', turma).get()
        const tempList = [];
        
        snapshot.forEach((doc) => {tempList.push(doc.data());});
        console.log(tempList)
        const quanti = snapshot.docs.length
        console.log(quanti)
        
        speakOutput = 'Sua primeira nota foi de '+tempList[0]['primeira']+' pontos, segunda nota foi de '+tempList[0]['segunda']+' pontos, terceira nota foi de '+tempList[0]['terceira']+' pontos.';
        
        // var ref = firebase.database();
        
        // await ref.on("value", function(snapshot) {
        // console.log("TESTE "+snapshot.val());
        // }, function (errorObject) {
        // console.log("The read failed: " + errorObject.code);
        // });
        
        } else {
            speakOutput = 'Mais ainda';
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const informacaoTurmaHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'informacaoTurma';
    },
    
    
    async handle(handlerInput) {
        
        var turma = Alexa.getSlotValue(handlerInput.requestEnvelope,'turma');
        var info = Alexa.getSlotValue(handlerInput.requestEnvelope,'informacao');
        
        var speakOutput = 'talvez';
        if(info==='notas'){
        
        // const snapshot = await db.collection('notas').where('id', '==', turma).get()
        // const tempList = [];
        
        // snapshot.forEach((doc) => {tempList.push(doc.data());});
        // console.log(tempList)
        // const quanti = snapshot.docs.length
        // console.log(quanti)
        
        // speakOutput = 'Sua primeira nota foi de '+tempList[0]['primeira']+' pontos, segunda nota foi de '+tempList[0]['segunda']+' pontos, terceira nota foi de '+tempList[0]['terceira']+' pontos.';
        
        // var ref = firebase.database();
        
        // await ref.on("value", function(snapshot) {
        // console.log("TESTE "+snapshot.val());
        // }, function (errorObject) {
        // console.log("The read failed: " + errorObject.code);
        // });
        
        } else if (info==='campus') {
            // speakOutput = 'Mais ainda';
            
        } else if (info==='professor') {
            
        } else if (info==='sala') {
            
        } else if (info==='optativa') {
            
        } 
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        informacaoTurmaHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
