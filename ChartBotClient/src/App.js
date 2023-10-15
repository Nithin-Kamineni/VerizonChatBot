import { ChakraProvider, theme } from "@chakra-ui/react";
import Chat from "./pages/Chat";

const App = () => {
  return (
	<ChakraProvider theme={theme}>
  	<Chat />
	</ChakraProvider>
  );
};

export default App;