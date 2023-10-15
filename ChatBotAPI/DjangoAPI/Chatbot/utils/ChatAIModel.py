from llama_index import GPTSimpleVectorIndex
import os

class ChatAImodel:
    def __init__(self):
        print("model loading started...")

        self.openai_api_key = "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"
        os.environ["OPENAI_API_KEY"]=self.openai_api_key;
        self.prompt = "Act like a chatbot and only give answers using the dataset when the relevant question is asked until then initiate normal conversation by asking what the user needs. Give responses like a chatbot that gives any responses to customers of Verizon. answers the below question based on the parameters where 5 is your normal on 1 to 10. consise123/10 concise, friendly123/10 friendly, formal123/10 formal, lower the score keep it less concise, friendly, and formal. If the score is keep it more concise, friendly, and formal. Find the best route based on trained Verizon links. I have trained the data for each URL for the Verizon website, all related words or words present in the URL. Now according to the user text, you should find the URL that best meets the user text by checking the exact or nearest words given by the user and the regex of url by finding related words or phrases in each URL. act as a router and route the users to the correct route based on text given by users. do not generate more than one-word answers to the user. just give the most suitable route. if no related route is found, give output as www.verizon.com"  # Add your prompt here
        self.index = GPTSimpleVectorIndex.load_from_disk('static/index.json')
        
        print("model loading ended...")
    def AIChatResp(self, message, concise, friendly, formal):
        input_text = self.prompt + message  # Combine prompt and user input
        input_text = input_text.replace("consise123", str(concise))
        input_text = input_text.replace("friendly123", str(friendly))
        input_text = input_text.replace("formal123", str(formal))
        print(input_text)
        response = self.index.query(input_text)
        # Create a dictionary to hold the response data
        # response_data = {
        #     "data": response.response
        # }
        return response.response

chatAImodel = ChatAImodel()