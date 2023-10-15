from llama_index import GPTSimpleVectorIndex
import os
import pandas as pd
import numpy as np
from ast import literal_eval
from openai.embeddings_utils import distances_from_embeddings, cosine_similarity
import openai
import csv

def safe_literal_eval(x): 
    try:
        return literal_eval(x)
    except (SyntaxError, ValueError):
        return None

class ChatAImodel:
    def __init__(self):
        print("model loading started...")

        self.openai_api_key = "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"
        os.environ["OPENAI_API_KEY"]=self.openai_api_key
        self.prompt = "Act like a chatbot and only give answers using the dataset when the relevant question is asked until then initiate normal conversation by asking what the user needs, Don't give any aditional details than you need to and only give details if a question is asked. Don't greet the user evey time a queation is asked. Give responses like a chatbot that gives any responses to customers of Verizon. answers the below question based on the parameters where 5 is your normal on 1 to 10. consise123/10 concise, friendly123/10 friendly, formal123/10 formal, lower the score keep it less concise, friendly, and formal. If the score is keep it more concise, friendly, and formal. Don't bombard user with information when user just greets and doesn't ask any question. Find the best route based on trained Verizon links. I have trained the data for each URL for the Verizon website, all related words or words present in the URL. Now according to the user text, you should find the URL that best meets the user text by checking the exact or nearest words given by the user and the regex of url by finding related words or phrases in each URL. act as a router and route the users to the correct route based on text given by users. just give the most suitable route. Dont give user more information if user dint ask for it and keep the responses short unless needed. if no related route is found, give output as www.verizon.com"  # Add your prompt here
        self.index = GPTSimpleVectorIndex.load_from_disk('static/index.json')
        
        CSV_PATH = 'static/embeddings.csv'
                
        # self.DF = pd.read_csv(CSV_PATH, index_col=0)
        # self.DF['embeddings'] = self.DF['embeddings'].apply(safe_literal_eval).apply(np.array)


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


    def create_context(self, question, max_len=1800, size="ada"):
        df=self.DF
        q_embeddings = openai.Embedding.create(
            input=question, engine='text-embedding-ada-002')['data'][0]['embedding']
        df['distances'] = distances_from_embeddings(
            q_embeddings, df['embeddings'].values, distance_metric='cosine')
        returns = []
        cur_len = 0
        for i, row in df.sort_values('distances', ascending=True).iterrows():
            cur_len += row['n_tokens'] + 4
            if cur_len > max_len:
                break
            returns.append(row["text"])
        return "\n\n###\n\n".join(returns)


    def answer_question(self, question=5, concise=5, friendly=5, formal=5):
        context = self.create_context(question)
        try:
            input_text = self.prompt + question  # Combine prompt and user input
            input_text = input_text.replace("consise123", str(concise))
            input_text = input_text.replace("friendly123", str(friendly))
            input_text = input_text.replace("formal123", str(formal))
            response = openai.Completion.create(
                prompt=input_text,
                temperature=0,
                max_tokens=150,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0,
                stop=None,
                model="gpt-3.5-turbo",
            )
            return response
        except Exception as e:
            # Log the exception instead of printing it
            print(e)

chatAImodel = ChatAImodel()