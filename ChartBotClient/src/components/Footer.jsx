import React from "react";
import { Flex, Input, Button, Tooltip, AvatarBadge, IconButton } from "@chakra-ui/react";
import { MdMic } from "react-icons/md";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

let start=0;
const Footer = ({ inputMessage, setInputMessage, handleSendMessage, error, isRecording, results, startSpeechToText, stopSpeechToText }) => {

  const [micToggleStatus, setMicToggleStatus] = React.useState(false);
  let tempStr=""

  React.useEffect(()=>{
    if(results.length>0){
      console.log(results)
      tempStr=""
      while(start<results.length){
        tempStr+=results[start].transcript+' ';
        start+=1;
      }
      setInputMessage(tempStr);
    }
  },[results])

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <Flex w="100%" mt="5">
      <Tooltip label='voice search'>
        <IconButton icon={<MdMic size={"40px"}/>} 
        color={isRecording ? 'green' : 'blackAlpha'}
        colorScheme='white'
        size="sm"
        aria-label='Connect with live agent'
        fontSize='30px'
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
        />
      </Tooltip>
      <Input
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        _focus={{
          border: "1px solid black",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button
        bg="black"
        color="white"
        borderRadius="none"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
};

export default Footer;
