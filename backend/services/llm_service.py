import os
import json
from groq import Groq
from duckduckgo_search import DDGS
from dotenv import load_dotenv

load_dotenv()

# Initialize Groq Client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def search_web(query):
    """
    Performs a free web search using DuckDuckGo to get context.
    """
    try:
        # The library works, just ignore the warning or run: pip install -U duckduckgo-search
        with DDGS() as ddgs:
            # Get top 3 search results
            results = list(ddgs.text(query, max_results=3))
            if not results:
                return "No search results found."

            # Format results into a context string
            context_str = "Search Results:\n"
            for res in results:
                context_str += f"- Title: {res.get('title', 'No Title')}\n  Link: {res.get('href', '#')}\n  Snippet: {res.get('body', '')}\n\n"
            return context_str
    except Exception as e:
        print(f"Search Error: {e}")
        return "Search functionality unavailable."


def generate_grounded_content(query: str, url_context: str = None):
    search_context = search_web(query)

    prompt = f"""
    You are an expert SEO Content Writer.

    CONTEXT FROM WEB SEARCH:
    {search_context}

    USER PROVIDED URL CONTEXT:
    {url_context if url_context else "None provided"}

    TASK:
    Write a detailed article about: "{query}".

    OUTPUT FORMAT (Strict JSON):
    {{
        "article_html": "<h1>Title</h1><p>Content...</p>",
        "article_json": {{ "title": "...", "content": "..." }},
        "seo_metadata": {{
            "meta_title": "Concise, clickable title (max 60 chars)",
            "description": "Engaging summary for search results (max 160 chars)",
            "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"] 
        }}
    }}

    IMPORTANT for Keywords: Return a JSON LIST of 5-8 distinct short phrases. Do not return a single string.
    """

    try:
        # 3. Call Groq with a CURRENTLY SUPPORTED model
        # Replaced 'llama3-8b-8192' with 'llama-3.3-70b-versatile'
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that outputs strictly JSON."
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.3-70b-versatile",  # <--- UPDATED MODEL HERE
            temperature=0.7,
            response_format={"type": "json_object"},  # Enforces JSON structure
        )

        # 4. Parse and return
        response_content = chat_completion.choices[0].message.content
        return json.loads(response_content)

    except Exception as e:
        print(f"Groq/Llama Error: {e}")
        # Return a fallback error JSON so frontend doesn't crash
        raise Exception(f"Generation failed: {str(e)}")