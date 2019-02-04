/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

/* APL OBJECT */
const APL = {
    document: require('./apl/document.json'),
    datasource: require('./apl/datasource.json')
};

/* MULTILANGUAGE FUNCTION */
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

/* LANGUAGE STRING OBJECT */
const languageStrings = {
    'en': require('./i18n/en'),
    'it': require('./i18n/it'),
};

/* HELPER FUNCTIONS */
// returns true if the skill is running on a device with a display (show|spot)
function supportsDisplay(handlerInput) {
    var hasDisplay =
        handlerInput.requestEnvelope.context &&
        handlerInput.requestEnvelope.context.System &&
        handlerInput.requestEnvelope.context.System.device &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;

    console.log("Supported Interfaces are" + JSON.stringify(handlerInput.requestEnvelope.context.System.device.supportedInterfaces));
    return hasDisplay;
}

/* AUDIO STREAM OBJECT */
const STREAMS = [{
    'token': 'stream-12',
    'url': 'https://cassini.shoutca.st/tunein/maurizi1.pls',
    'metadata': {
        'title': 'Radio Divina Fm',
        'subtitle': 'La radio Della Costa D\'Amalfi',
        'art': {
            'sources': [{
                'contentDescription': 'Radio Divina Fm',
                'url': 'https://php.localidautore.it/images/divinafm/skill-divinafm-small.png',
                'widthPixels': 512,
                'heightPixels': 512
            }]
        },
        'backgroundImage': {
            'sources': [{
                'contentDescription': 'Radio Divina Fm',
                'url': 'https://php.localidautore.it/images/divinafm/skill-divinafm-large.png',
                'widthPixels': 1200,
                'heightPixels': 800
            }]
        }
    }
}];

/* INITIALIZE FUNCTION */
function initialize(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    APL.datasource.bodyTemplate6Data.textContent.primaryText.text = requestAttributes.t('SKILL_NAME');
    APL.datasource.bodyTemplate6Data.hintText = requestAttributes.t('SKILL_SLANG');
}

/* LAUNCH REQUEST & PLAY INTENT */
const PlayStreamIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest' ||
            (handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
                handlerInput.requestEnvelope.request.intent.name === 'PlayStreamIntent') ||
            (handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent');
    },
    handle(handlerInput) {
        let stream = STREAMS[0];

        initialize(handlerInput);


        if (supportsDisplay(handlerInput)) {
            handlerInput.responseBuilder
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    document: APL.document,
                    datasources: APL.datasource
                })
        }

        handlerInput.responseBuilder
            .speak(APL.datasource.bodyTemplate6Data.textContent.primaryText.text)
            .addAudioPlayerPlayDirective('REPLACE_ALL', stream.url, stream.token, 0, null, stream.metadata);


        return handlerInput.responseBuilder
            .getResponse();
    }
};

/* HELP INTENT */
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {

        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const outputText = requestAttributes.t('SKILL_HELP_1') + `<break time="1s"/>` + requestAttributes.t('SKILL_HELP_2');

        if (supportsDisplay(handlerInput)) {

            handlerInput.responseBuilder
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    document: APL.document,
                    datasources: APL.datasource
                })
        }

        return handlerInput.responseBuilder
            .speak(outputText)
            .reprompt(outputText)
            .getResponse();
    }
};

/* ABOUT INTENT */
const AboutIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AboutIntent';
    },
    handle(handlerInput) {

        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const outputText = requestAttributes.t('SKILL_CONTACT_1') + `<break time="1s"/>` + requestAttributes.t('SKILL_CONTACT_2') + `<break time="1s"/>` + requestAttributes.t('SKILL_CONTACT_3');

        if (supportsDisplay(handlerInput)) {

            APL.datasource.bodyTemplate6Data.textContent.primaryText.text = "www.divinafm.it";

            handlerInput.responseBuilder
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    document: APL.document,
                    datasources: APL.datasource
                })
        }


        return handlerInput.responseBuilder
            .speak(outputText)
            .reprompt(speechText)
            .getResponse();
    }
};

/* FREQUENCY INTENT */
const FrequencyIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'FrequencyIntent';
    },
    handle(handlerInput) {

        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        const outputText = requestAttributes.t('SKILL_FREQUENCY_1') + `<break time="1s"/>` + requestAttributes.t('SKILL_FREQUENCY_2') + `<break time="1s"/>` + requestAttributes.t('SKILL_FREQUENCY_3')+ `<break time="1s"/>` + requestAttributes.t('SKILL_FREQUENCY_4')+ `<break time="1s"/>` + requestAttributes.t('SKILL_FREQUENCY_5');

        if (supportsDisplay(handlerInput)) {

            APL.datasource.bodyTemplate6Data.textContent.primaryText.text = "92.2 - 92.3 - 96.3 - 104.2";

            handlerInput.responseBuilder
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    document: APL.document,
                    datasources: APL.datasource
                })
        }
        return handlerInput.responseBuilder
            .speak(outputText)
            .reprompt(speechText)
            .getResponse();
    }
};

/* CANCEL & STOP INTENT */
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent' ||
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent');
    },
    handle(handlerInput) {

        initialize(handlerInput);

        handlerInput.responseBuilder
            .addAudioPlayerClearQueueDirective('CLEAR_ALL')
            .addAudioPlayerStopDirective();


        if (supportsDisplay(handlerInput)) {
            handlerInput.responseBuilder
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    document: APL.document,
                    datasources: APL.datasource
                })
        }

        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const outputText = requestAttributes.t('SKILL_PAUSE_1') + `<break time="1s"/>` + requestAttributes.t('SKILL_PAUSE_2');


        return handlerInput.responseBuilder
            .speak(outputText)
            .getResponse();
    }
};

/* PLAYBACK STOP INTENT */
const PlaybackStoppedIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStopped';
    },
    handle(handlerInput) {
        // should save details so play can be resumed.
        return true;
    }
};

/* PLAYBACK START INTENT */
const PlaybackStartedIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStarted';
    },
    handle(handlerInput) {
        handlerInput.responseBuilder
            .addAudioPlayerClearQueueDirective('CLEAR_ENQUEUED');

        return handlerInput.responseBuilder
            .getResponse();
    }
};

/* SESSION END REQUEST */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const outputText = requestAttributes.t('SKILL_EXIT_1');

        return handlerInput.responseBuilder
            .speak(outputText)
            .getResponse();
    }
};

/* SYSTEM EXCEPTION */
const ExceptionEncounteredRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'System.ExceptionEncountered';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        return true;
    }
};

/* ERROR HANDLER */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .addAudioPlayerClearQueueDirective('CLEAR_ALL')
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

/* LOCALIZATION INTERCEPTOR */
const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            fallbackLng: 'en', // fallback to EN if locale doesn't exist
            resources: languageStrings
        });

        localizationClient.localize = function () {
            const args = arguments;
            let values = [];

            for (var i = 1; i < args.length; i++) {
                values.push(args[i]);
            }
            const value = i18n.t(args[0], {
                returnObjects: true,
                postProcess: 'sprintf',
                sprintf: values
            });

            if (Array.isArray(value)) {
                return value[Math.floor(Math.random() * value.length)];
            } else {
                return value;
            }
        };

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) { // pass on arguments to the localizationClient
            return localizationClient.localize(...args);
        };
    },
};

/* SKILL BUILDER */
const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        PlayStreamIntentHandler,
        PlaybackStartedIntentHandler,
        CancelAndStopIntentHandler,
        PlaybackStoppedIntentHandler,
        AboutIntentHandler,
        FrequencyIntentHandler,
        HelpIntentHandler,
        ExceptionEncounteredRequestHandler,
        SessionEndedRequestHandler
    )
    .addRequestInterceptors(LocalizationInterceptor)
    .addErrorHandlers(ErrorHandler)
    .lambda();
