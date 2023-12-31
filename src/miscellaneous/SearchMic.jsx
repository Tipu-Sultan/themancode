import React, { useRef, useState } from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaMicrophone } from 'react-icons/fa';
import clickSound from '../assets/mic-on.mp3';
import completeSound from '../assets/mic-on.mp3';

const SearchWithMicInput = ({ isMobile }) => {
  const recognition = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [searchText, setSearchText] = useState('');
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
    recognition.current.onend = () => completeSoundOff.play();
    recognition.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognition.current.stop();
    setIsListening(false);
  };

  const handleSpeechResult = (event) => {
    const transcript = event.results[0][0].transcript;
    setSearchText(transcript);
  
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
  
    stopListening();
  };
  

  return (
    <InputGroup hidden={isMobile}>
      <InputLeftElement
        pointerEvents="auto"
        cursor="pointer"
        onClick={handleMicClick}
      >
        <FaMicrophone color={isListening ? 'red' : 'white'} />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Search with mic"
        w="300px"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchWithMicInput;
