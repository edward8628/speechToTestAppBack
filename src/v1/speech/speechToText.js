const debug = require('debug')(`${process.env.APPNAME}:speech`);
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');
const speech_to_text = new SpeechToTextV1 ({
  "username": process.env.SPEECHUSER,
  "password": process.env.SPEECHPASS
});

const speechToText = (req, res) => {
  debug("speechToText request");
  
  var params = {
    audio: fs.createReadStream('audio-file.flac'),
    content_type: 'audio/flac',
    max_alternatives: 3,
    word_confidence: true,
    keywords: ['colorado', 'tornado', 'tornadoes'],
    keywords_threshold: 0.5
  };
  
  // speech_to_text.getModels(null, function(error, models) {
  //   if (error)
  //     debug('error:', error);
  //   else {
  //     debug(JSON.stringify(models, null, 2));
  //     res.status(200).send({success: "ok"});
  //   }
  // });
  
  speech_to_text.recognize(params, function(error, transcript) {
    if (error)
      debug('speechToTexterror:', error);
    else {
/*      debug("speechToText successful", JSON.stringify(transcript, null, 2));*/
      res.status(200).send({message: transcript.results[0].alternatives[0].transcript});
    }
  });

}

module.exports = speechToText;