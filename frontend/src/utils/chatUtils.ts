import { formatDate } from './dateUtils';

export interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface Appointment {
  title: string;
  participant: string;
  participantPhoneNumber: number;
  date: Date;
}

export const processUserMessage = async (
  message: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  if (!message) return;

  const userMessage: Message = { text: message, sender: 'user' };
  setMessages((prevMessages) => [...prevMessages, userMessage]);

  try {
    const response = await fetch('http://localhost:5000/api/chatbot/prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ prompt: message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let botMessage: Message = {
      text: 'You have no appointments',
      sender: 'bot',
    };

    const data = await response.json();
    console.log(data);

    if (data.appointments) {
      botMessage.text = 'Your appointments are: ';
      const appointments = data.appointments;
      appointments.forEach((appointment: Appointment) => {
        const { title, participant, participantPhoneNumber, date } =
          appointment;
        botMessage.text += `${title} appointment with ${participant} on ${formatDate(
          date
        )}. ${participant}'s contact phone number is ${participantPhoneNumber}.`;
      });
    } else {
      botMessage.text =
        data.message || data.error || data.response || 'No response';
    }

    setMessages((prevMessages) => [...prevMessages, botMessage]);
  } catch (error) {
    console.error('Error sending prompt to the backend', error);
    const botMessage: Message = {
      text: 'Sorry, something went wrong.',
      sender: 'bot',
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  }
};
