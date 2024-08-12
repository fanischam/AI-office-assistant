import React from 'react';
import ChatWindow from '../components/ChatWindow';
import { Container } from 'react-bootstrap';

const ChatScreen: React.FC = () => {
  return (
    <Container className='chat d-flex flex-column justify-content-center align-items-center my-5'>
      <ChatWindow />
    </Container>
  );
};

export default ChatScreen;
