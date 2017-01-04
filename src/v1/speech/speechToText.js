const debug = require('debug')(`${process.env.APPNAME}:speech`);
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');
const speech_to_text = new SpeechToTextV1 ({
  "username": process.env.SPEECHUSER,
  "password": process.env.SPEECHPASS
});

const speechToText = (req, res) => {
  debug("speechToText request");
  
  // var params = {
  //   audio: fs.createReadStream('audio-file.flac'),
  //   content_type: 'audio/flac',
  //   max_alternatives: 3,
  //   word_confidence: true,
  // };
  
  //   speech_to_text.recognize(params, function(error, transcript) {
  //     if (error)
  //       debug('speechToTexterror:', error);
  //     else {
  //       debug("speechToText successful");
  //       // debug(JSON.stringify(transcript, null, 2));
  //       res.status(200).send({message: transcript.results[0].alternatives[0].transcript});
  //     }
  //   });
  
  //WebSockets
  var params = {
    model: 'en-US_BroadbandModel',
    content_type: 'audio/flac',
    continuous: true,
    interim_results: true,
    max_alternatives: 3,
    word_confidence: false,
    timestamps: false,
  };
  
  // Create the stream.
  var recognizeStream = speech_to_text.createRecognizeStream(params);

  // Pipe in the audio.
  fs.createReadStream('audio-file.flac').pipe(recognizeStream);

  // Pipe out the transcription to a file.
  // recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

  // Get strings instead of buffers from 'data' events.
  recognizeStream.setEncoding('utf8');

  // Listen for events.
  recognizeStream.on('results', function(event) { onEvent('Results:', event); });
  recognizeStream.on('data', function(event) { onEvent('Data:', event); });
  recognizeStream.on('error', function(event) { onEvent('Error:', event); });
  recognizeStream.on('close', function(event) { onEvent('Close:', event); });
  recognizeStream.on('speaker_labels', function(event) { onEvent('Speaker_Labels:', event); });

  // Displays events on the console.
   onEvent = (name, event) => {
    debug(name, JSON.stringify(event, null, 2));
    if (name==="Data:") {
      res.status(200).send({message: event});
    }
  };
}

module.exports = speechToText;