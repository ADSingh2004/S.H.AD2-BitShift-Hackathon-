import os
import google.generativeai as genai
import chromadb
import textwrap
from pathlib import Path

# --- Configuration ---
# Paths relative to the test folder
DB_PATH = str(Path(__file__).parent.parent / "vector_db")
COLLECTION_NAME = "fitness_knowledge"
GENERATION_MODEL = "models/gemini-2.5-flash"  # Updated to use available model
GEMINI_API_KEY = "AIzaSyDMcQeqPU7DnA-7GN7wneAwHeDEU8-blp8"

def initialize_models():
    """
    Initialize and configure Gemini models and ChromaDB client.
    """
    # 1. Setup Gemini API Key
    try:
        api_key = os.environ.get("GEMINI_API_KEY", GEMINI_API_KEY)
        genai.configure(api_key=api_key)
        print("✅ Gemini API key configured.")
    except Exception as e:
        print(f"❌ FATAL: Failed to configure Gemini API key: {e}")
        return None, None
    
    # 2. Setup ChromaDB
    try:
        client = chromadb.PersistentClient(path=DB_PATH)
        collection = client.get_collection(name=COLLECTION_NAME)
        print(f"✅ ChromaDB collection '{COLLECTION_NAME}' loaded with {collection.count()} documents.")
    except Exception as e:
        print(f"❌ FATAL: Could not load ChromaDB collection.")
        print(f"Error: {e}")
        print(f"Please make sure '{DB_PATH}' exists and ingestion was successful.")
        return None, None

    # 3. Initialize Generative Model for chat
    # Try different model names in order of preference
    model_names = [
        "models/gemini-2.5-flash",
        "models/gemini-flash-latest",
        "models/gemini-2.0-flash",
        "models/gemini-pro-latest"
    ]
    
    generation_model = None
    for model_name in model_names:
        try:
            generation_model = genai.GenerativeModel(model_name)
            # Test the model with a simple generation
            test_response = generation_model.generate_content("Hello")
            print(f"✅ Using Gemini model: {model_name}")
            break
        except Exception as e:
            print(f"⚠️  Model '{model_name}' not available: {str(e)[:60]}...")
            continue
    
    if not generation_model:
        print("❌ FATAL: No compatible Gemini model found.")
        return None, None
    
    return collection, generation_model

def get_rag_response(query, collection, generation_model, k=5):
    """
    Performs the full RAG pipeline: Retrieve, Augment, Generate.
    Note: ChromaDB with SentenceTransformer handles embeddings automatically.
    """
    
    # 1. RETRIEVE: Query ChromaDB for k nearest neighbors
    # ChromaDB will automatically embed the query using the same model from ingestion
    print(f"\n🔍 Searching for: '{query[:50]}...'")
    
    results = collection.query(
        query_texts=[query],  # ChromaDB will embed this automatically
        n_results=k
    )
    
    retrieved_docs = results["documents"][0]
    retrieved_metadata = results["metadatas"][0]
    
    # Prepare context for the prompt
    context = "\n---\n".join(retrieved_docs)
    
    # Print what was retrieved (good for debugging)
    print("\n--- 📚 Retrieved Context ---")
    for i, meta in enumerate(retrieved_metadata):
        print(f"  {i+1}. {meta['title']} ({meta['level']})")
        print(f"     Body Part: {meta['body_part']}, Equipment: {meta['equipment']}")
    print("-" * 50)

    # 2. AUGMENT: Create the prompt
    prompt = f"""
You are an expert AI Fitness Coach named FitGenie.
Your task is to answer the user's question based *only* on the "Verified Exercises" provided below.
Do not use any other knowledge outside of these exercises.

If the provided exercises do not directly answer the question, provide the most relevant exercises and explain how they relate to the user's query.

**User's Question:**
{query}

**Verified Exercises from Database:**
{context}

**Your Answer (be concise, helpful, and encouraging):**
"""
    
    # 3. GENERATE: Get the final answer from the LLM
    print("💬 Generating answer...")
    try:
        response = generation_model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"❌ Error during generation: {e}")
        return "I'm sorry, I encountered an error while generating a response."

def main():
    """
    Main chat loop for the terminal.
    """
    print("\n" + "=" * 60)
    print("🤖 FitGenie AI Fitness Coach (Terminal Test)")
    print("=" * 60)
    
    collection, generation_model = initialize_models()
    
    if not collection:
        return  # Exit if setup failed

    print("\n💪 Ask me about exercises from the megaGym database!")
    print("   (Type 'q' or 'quit' to exit)")
    print("-" * 60)

    while True:
        try:
            user_query = input("\n👤 You: ")
            
            if user_query.lower() in ['q', 'quit', 'exit']:
                print("\n👋 Goodbye! Keep crushing those fitness goals!")
                break
            
            if not user_query.strip():
                continue
                
            # Get the RAG response
            answer = get_rag_response(user_query, collection, generation_model)
            
            # Print the formatted answer
            print(f"\n🤖 FitGenie:")
            print(textwrap.fill(answer, width=80, initial_indent="   ", subsequent_indent="   "))
            
        except (KeyboardInterrupt, EOFError):
            print("\n\n👋 Goodbye! Keep crushing those fitness goals!")
            break
        except Exception as e:
            print(f"\n❌ Error: {e}")
            continue

if __name__ == "__main__":
    main()
