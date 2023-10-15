import React from "react";
import { Flex, Avatar, Text,HStack, Spacer, IconButton, Tooltip } from "@chakra-ui/react";
import { PhoneIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { MdOutlineSupportAgent } from "react-icons/md";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react'

const Header = () => {
  return (
    <Flex w="100%">
      <Avatar size="lg" name="Dan Abrahmov" src="data:image/png;base64,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">
        {/* <AvatarBadge boxSize="1.25em" bg="green.500" /> */}
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          Verizon
        </Text>
        <Text color="green.500">Bot is active</Text>
      </Flex>      
      <Spacer />
      <HStack spacing='12px'>
      <Tooltip label='Connect with live agent'>
        <IconButton icon={<MdOutlineSupportAgent size={"40px"}/>} 
        color='blackAlpha'
        colorScheme='white'
        size="sm"
        aria-label='Connect with live agent'
        fontSize='30px'/>
      </Tooltip>
      <a href={`tel:877-728-6101'`}>
      <Tooltip label='Call Customer Service'>
        <IconButton icon={<PhoneIcon/>} 
        color='blackAlpha'
        colorScheme='white'
        size="sm"
        aria-label='Call Customer Service'
        fontSize='30px'/>
      </Tooltip>
      </a>

      <Popover isLazy>
      <PopoverTrigger>
      {/* <Tooltip label='More info'> */}
        <IconButton icon={<InfoOutlineIcon/>} 
        color='blackAlpha'
        colorScheme='white'
        size="sm"
        aria-label='Call Customer Service'
        fontSize='30px'/>
        {/* </Tooltip> */}
      </PopoverTrigger>
      <PopoverContent>
    <PopoverHeader fontWeight='semibold'>Verizon Chatbot</PopoverHeader>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverBody>
    This chatbot is designed to route users to the most relevant information on the Verizon website based on their input. It uses a trained dataset to match user text with related words and phrases in Verizon website URLs to provide the best route. If no related route is found, it defaults to www.verizon.com for further assistance.
    Team Members:
    Nithin, Visesha, Anudeep, Pavan
    </PopoverBody>
  </PopoverContent>
  </Popover>
        
      </HStack>
    </Flex>
  );
};

export default Header;
