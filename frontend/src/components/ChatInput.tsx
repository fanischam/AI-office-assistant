import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaMicrophone } from 'react-icons/fa';
import { speechRecognitionMiddleware } from '../middleware/speechToText';

interface InputFieldProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<InputFieldProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSpeechToText = () => {
    speechRecognitionMiddleware();
  };

  const handleSend = () => {
    if (input.trim() !== '') {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <InputGroup className='input-field'>
      <FormControl
        placeholder='Type your message...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => (e.key === 'Enter' ? handleSend() : null)}
      />
      <Button variant='secondary' onClick={handleSpeechToText}>
        <FaMicrophone />
      </Button>
      <Button variant='primary' onClick={handleSend}>
        Send
      </Button>
    </InputGroup>
  );
};

export default ChatInput;
