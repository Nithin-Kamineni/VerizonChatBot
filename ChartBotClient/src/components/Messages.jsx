import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Image } from '@chakra-ui/react'

const Messages = ({ messages }) => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Flex minWidth='max-content' w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item, index) => {
        if (item.from === "me") {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
                bg="black"
                color="white"
                minW="100px"
                maxW="500px"
                my="1"
                p="3"
                borderRadius="20px"
              >
                <Text>{item.text}</Text>
              </Flex>
              <Avatar
                name="Computer"
                // src="https://images.thdstatic.com/productImages/d718180d-9156-4c29-b295-e39137151cd8/svn/gloss-wall-sculptures-ncflgt-235-01-64_600.jpg"
                src="https://www.alumnihall.com/prodimages/12024-UF-l.jpg"
                bg="blue.300"
              ></Avatar>
            </Flex>
          );
        } else {
          console.log(item)
          console.log("======================")
          if(item.type==='image'){
            return (
            <Flex key={index} w="100%">
                <Avatar
                  name="Computer"
                  src="https://yt3.googleusercontent.com/5Xh7asWKYA6sstWA_aafGdHql38cLcmNqR9otonw5K0m1UPhpH0-S-Kswyn_tdvbdmZ2Mb19=s900-c-k-c0x00ffffff-no-rj"
                  bg="blue.300"
                ></Avatar>
                <Flex
                  bg="gray.100"
                  color="black"
                  minW="100px"
                  maxW="500px"
                  my="1"
                  p="3"
                  borderRadius="10px"
                >
                <Image
                boxSize='150px'
                src={item.text}
                alt='Dan Abramov'/>
                </Flex>
              </Flex>
            )
          } else {
            return (
              <Flex key={index} w="100%">
                <Avatar
                  name="Computer"
                  src="https://yt3.googleusercontent.com/5Xh7asWKYA6sstWA_aafGdHql38cLcmNqR9otonw5K0m1UPhpH0-S-Kswyn_tdvbdmZ2Mb19=s900-c-k-c0x00ffffff-no-rj"
                  bg="blue.300"
                ></Avatar>
                <Flex
                  bg="gray.100"
                  color="black"
                  minW="100px"
                  maxW="500px"
                  my="1"
                  p="3"
                  borderRadius="10px"
                >
                  {/* <Text>{item.text}</Text> */}
                  <p>{item.text}</p>
                </Flex>
              </Flex>
            );
          }
        }
      })}
      {/* <AlwaysScrollToBottom /> */}
    </Flex>
  );
};

export default Messages;
