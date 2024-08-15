import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
// import { FaMicrophone, FaStop } from 'react-icons/fa';
import VoiceRecorder from './VoiceRecorder';
import { speechRecognitionMiddleware } from '../middleware/speechRecognitionMiddleware';
// import 'regenerator-runtime';
// import speech, { useSpeechRecognition } from 'react-speech-recognition';

interface InputFieldProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<InputFieldProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');
  // const { listening, transcript } = useSpeechRecognition();

  // const handleSpeechToText = () => {
  //   if (!listening) {
  //     speech.startListening();
  //   } else {
  //     speech.stopListening();
  //   }
  // };
  // useEffect(() => {
  //   if (!listening && transcript) {
  //     onSendMessage(transcript);
  //   }
  // }, [listening, transcript]);

  const handleSend = () => {
    if (input.trim() !== '') {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleAudioRecorded = (audioUrl: string) => {
    // speechRecognitionMiddleware(audioUrl);
    onSendMessage(`Audio message: ${audioUrl}`);
  };

  return (
    <InputGroup className='input-field'>
      <FormControl
        placeholder='Type your message...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => (e.key === 'Enter' ? handleSend() : null)}
      />
      {/* <Button variant='secondary' onClick={handleSpeechToText}>
        {listening ? <FaStop /> : <FaMicrophone />}
      </Button> */}
      <VoiceRecorder onAudioRecorded={handleAudioRecorded} />
      <Button variant='primary' onClick={handleSend}>
        Send
      </Button>
    </InputGroup>
  );
};

export default ChatInput;
