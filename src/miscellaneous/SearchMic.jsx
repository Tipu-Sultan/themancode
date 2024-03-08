import React, { useRef, useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import clickSound from '../assets/mic-on.mp3';
import completeSound from '../assets/mic-on.mp3';
import { useColorModeValue } from '@chakra-ui/react';

const SearchWithMicInput = () => {
  const recognition = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const clickSoundPlay = new Audio(clickSound);
  const completeSoundOff = new Audio(completeSound);

  const handleMicClick = () => {
    clickSoundPlay.play();
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    recognition.current = new window.webkitSpeechRecognition();
    recognition.current.onresult = handleSpeechResult;
    recognition.current.start();
    recognition.current.onend = stopListening;
    setIsListening(true);
  };

  const stopListening = () => {
    recognition.current.stop();
    completeSoundOff.play();
    setIsListening(false);
  };

  const handleSpeechResult = (event) => {
    const transcript = event.results[0][0].transcript;

    if (transcript.toLowerCase().includes('videos')) {
      window.location.href = '/videos';
    } else if (transcript.toLowerCase().includes('certificates')) {
      window.location.href = '/my-certificates';
    } else if (transcript.toLowerCase().includes('home')) {
      window.location.href = '/';
    } else if (transcript.toLowerCase().includes('code block')) {
      window.location.href = '/codeblock';
    } else if (transcript.toLowerCase().includes('url shortener')) {
      window.location.href = '/url-shortener';
    } else {
      const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(transcript)}`;
      window.open(googleSearchURL, '_blank');
    }
    setIsListening(true);
    stopListening();

  };
  const bgColor = useColorModeValue("gray.100", "gray.900")

  return (
    <>
      <FaMicrophone style={{cursor:"pointer"}} size={25} onClick={handleMicClick} color={isListening ? 'red' : bgColor} />
    </>
  );
};

export default SearchWithMicInput;
