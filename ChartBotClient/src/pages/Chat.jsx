import { Flex, Heading, Box, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper  } from "@chakra-ui/react";
import React, { useState } from "react";
import Divider from "../components/Divider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Messages from "../components/Messages";
import apiCall from "../utils/apiCall"
import useSpeechToText from 'react-hook-speech-to-text';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,Text 
} from '@chakra-ui/react'
import Sliders from "../components/Sliders";
import {DataValuesContext} from '../contexts/DataValuesContext'
const Chat = () => {

  const [concise, setConcise] = React.useState(5);
  const [friendly, setFriendly] = React.useState(5);
  const [formal, setFormal] = React.useState(5);

  // const [sliderValue, setSliderValue] = React.useState(50)


  const [messages, setMessages] = useState([
    { from: "computer", text: "Hi, My Name is HoneyChat" },
    { from: "me", text: "Hey there" },
    { from: "me", text: "Myself Ferin Patel" },
    {
      from: "computer",
      text:
        "Nice to meet you. You can send me message and i'll reply you with same message."
    }
  ]);

  let {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, { from: "me", text: data }]);

    setInputMessage("");
    setTimeout(async () => {
      //api call logic
      
      if(data.slice(0,4)==="http"){
        setMessages((old) => [...old, { from: "computer", text: data, type:"image" }]);
      } else{
        console.log("=============afsdf=========================")
      
        let response = await apiCall("query",{"data":data, "concise":concise, "friendly":friendly, "formal":formal});
        console.log(response);
        setMessages((old) => [...old, { from: "computer", text: response.data }]);
        console.log("=============afsdf=========================")
      }
      results=[];
    }, 5000);
  };

  

  return (
    <>
    <div 
    style={{ width: '33%', margin: '0 auto', marginTop:'15px' }}>
    <Text fontSize='sm'>Tip: Customize the sliders below to achieve the desired response based on selected value.</Text>
    <Box>
      <FormLabel htmlFor="owner">Concise:</FormLabel>
      <Sliders interval={concise} setInterval={setConcise}/>
    </Box>
    <Box>
      <FormLabel htmlFor="owner">Friendly:</FormLabel>
      <Sliders interval={friendly} setInterval={setFriendly}/>
    </Box>
    <Box>
      <FormLabel htmlFor="owner">Formal:</FormLabel>
      <Sliders interval={formal} setInterval={setFormal}/>
    </Box>
    </div>

    <Flex w="100%" h="100vh" justify="center" align="center">
      <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column">
        <Header />
        <Divider />
        <Messages messages={messages} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          error={error}
          isRecording={isRecording}
          results={results}
          startSpeechToText={startSpeechToText}
          stopSpeechToText={stopSpeechToText}
        />
      </Flex>
    </Flex>
    </>
  );
};

export default Chat;
