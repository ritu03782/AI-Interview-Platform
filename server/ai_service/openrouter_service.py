import os
from openai import OpenAI , APIStatusError
from dotenv import load_dotenv

load_dotenv()

class OpenRouterService:
    def __init__(self, api_key: str | None = None):
        resolved_key = api_key or os.getenv("OPENROUTER_API_KEY")

        if not resolved_key:
            raise ValueError("OpenRouter API key is missing")

        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=resolved_key
        )
    
    def ask_ai(self, messages: list, model: str = "nvidia/nemotron-3-ultra-550b-a55b:free") -> str:
        try:
            if not messages or not isinstance(messages, list):
                raise ValueError("Messages array is empty or invalid.")

            response = self.client.chat.completions.create(
                model=model,
                messages=messages
            )

            return response.choices[0].message.content or ""

        except APIStatusError as error:
            print("OpenRouter Status:", error.status_code)
            print("OpenRouter Response:", error.response.text)
            print("OpenRouter Headers:", dict(error.response.headers))
            raise

        except Exception as error:
            print("Unexpected Error:", repr(error))
            raise


    # def ask_ai(self, messages: list, model: str = "google/gemma-4-31b-it:free") -> str:
    #     try:
    #         if not messages or not isinstance(messages, list):
    #             raise ValueError("Messages array is empty or invalid.")

    #         response = self.client.chat.completions.create(
    #             model=model,
    #             messages=messages
    #         )

    #         content = response.choices[0].message.content
    #         return content if content is not None else ""

    #     except Exception as error:
    #         print(f"OpenRouter API Error: {error}")
    #         raise

