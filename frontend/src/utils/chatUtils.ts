export interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export const processUserMessage = (
  message: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  const userMessage: Message = { text: message, sender: 'user' };
  setMessages((prevMessages) => [...prevMessages, userMessage]);

  // Simulate bot response
  setTimeout(() => {
    const botMessage: Message = {
      text: `Bot response to: ${message}`,
      sender: 'bot',
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  }, 1000);
};
