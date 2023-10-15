import React from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box
} from '@chakra-ui/react'
import { Flex, Avatar, Text,HStack, Spacer, IconButton, Tooltip, NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper } from "@chakra-ui/react";
import { PhoneIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { MdOutlineSupportAgent } from "react-icons/md";
import {DataValuesContext} from '../contexts/DataValuesContext'

const Sliders = (props) => {

  const dataValuesContext = React.useContext(DataValuesContext);
  // const [interval, setInterval] = [dataValuesContext.concise, dataValuesContext.setConcise];
  const [interval, setInterval] = [props.interval, props.setInterval]

  return (
  <Flex>
  <NumberInput
    min={1}
    max={10}
    maxW="100px"
    mr="2rem"
    value={interval}
    onChange={setInterval}
  >
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
  <Slider
        flex="1"
        // defaultValue={5}
        min={1}
        max={10}
        focusThumbOnChange={false}
        value={interval}
        onChange={setInterval}
      >
        <SliderMark value={0.9} mt="4" ml="1" fontSize="sm">
          1
        </SliderMark>
        <SliderMark value={9.5} mt="4" ml="1" fontSize="sm">
          10
        </SliderMark>
        <SliderMark
          value={interval}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-5"
          ml="-5"
          w="12"
        >
          {interval}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb
        // fontSize="sm"
        // boxSize="32px"
        // children={value}
        />
      </Slider>
  </Flex>
  )
};

export default Sliders;
