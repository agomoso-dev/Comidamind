import os 
from dotenv import load_dotenv
from langchain_ollama import OllamaLLM

load_dotenv(override=True)
OLLAMA_SERVER_URL = os.environ['OLLAMA_SERVER_URL']
print(OLLAMA_SERVER_URL)

llm = OllamaLLM(model="gemma3", base_url=OLLAMA_SERVER_URL)

response = llm.invoke("Can you create a diet plan for me?")
print(response)