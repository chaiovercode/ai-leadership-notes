# Generative AI

> "We are entering an era where machines are not just analyzing the world, but creating it."

Traditional AI (Module 1) focused on **prediction** and **classification** (e.g., "Is this a cat?"). Generative AI focuses on **creation** (e.g., "Draw me a cat in the style of Picasso").

---

## 📑 Table of Contents
1.  [Introduction to Generative AI](#1-introduction-to-generative-ai)
2.  [Large Language Models (LLMs)](#2-large-language-models-llms)
3.  [Prompt Engineering](#3-prompt-engineering)
4.  [RAG vs. Fine-tuning](#4-rag-vs-fine-tuning-build-vs-buy)

---

## 1. Introduction to Generative AI

GenAI models learn the underlying patterns of data (text, images, code) and generate *new* data that looks similar.

### The Foundation Models
We no longer build models from scratch. We build on top of massive "Foundation Models" trained by tech giants.

*   **Text:** GPT-4 (OpenAI), Gemini (Google), Claude (Anthropic), Llama (Meta).
*   **Image:** Midjourney, Stable Diffusion, DALL-E 3.
*   **Code:** GitHub Copilot, Cursor.
*   **Video:** Sora, Runway Gen-3.

### Key Shift: The Marginal Cost of Content
GenAI drives the marginal cost of creating text, code, and images to near zero.
*   **Before:** $100 for a marketing blog post.
*   **After:** $0.01 for a draft, $10 for human review.

---

## 2. Large Language Models (LLMs)

### How do they work? (The "Next Token Prediction")
At their core, LLMs are just fancy "autocomplete" engines. They predict the statistically most likely next word (token) in a sequence.

*   **Training:** They read the entire internet (Wikipedia, Reddit, Code, Books).
*   **Reasoning:** Billions of parameters allow them to not just memorize, but "understand" relationships between concepts.
*   **Hallucination:** Because they are probabilistic (guessing the next word), they can confidently state facts that are wrong. They prioritize *plausibility* over *truth*.

---

## 3. Prompt Engineering

Why do some people get amazing results and others get trash? **Context.**

### The Framework of a Perfect Prompt
1.  **Role:** "Act as a Senior Marketing Strategist..."
2.  **Context:** "We are launching a new coffee brand for Gen-Z..."
3.  **Task:** "Write 5 catchy Instagram captions..."
4.  **Constraints:** "Under 20 words, use emojis, no hashtags."
5.  **Output Format:** "Return a bulleted list."

### Advanced Techniques
*   **Few-Shot Prompting:** Giving the AI examples.
    *   *Input:* "Happy -> Sad. Fast -> Slow. Up -> ?"
    *   *AI:* "Down" (It learned the pattern).
*   **Chain of Thought:** Asking the AI to "think step by step" reduces math/logic errors massively.

---

## 4. RAG vs. Fine-tuning (Build vs. Buy)

As a leader, you will face this decision: "How do I use AI with MY private data?"

### Option A: RAG (Retrieval-Augmented Generation) - *The Open Book Exam*
*   **Concept:** You give the AI a "cheat sheet" (your PDFs, emails, docs) just before it answers.
*   **How:** You search your database for relevant info, paste it into the prompt, and say "Answer using only this info."
*   **Pros:** Cheap, accurate, easy to update data, less hallucination.
*   **Best for:** internal search, customer support bots.

### Option B: Fine-tuning - *The Medical Residency*
*   **Concept:** You retrain the model's brain to learn a new behavior or style.
*   **How:** You feed it thousands of examples of "Input -> Ideal Output".
*   **Pros:** Better style matching, faster, cheaper per query (shorter prompts).
*   **Cons:** Expensive to train, hard to update facts (you have to retrain).
*   **Best for:** specialized coding models, specific writing tones (brand voice).

> **Verdict:** Start with RAG. Only Fine-tune if RAG fails.

---

### 🎥 Deep Dive: Best Visual Explanations

*   **[Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g)** (Andrej Karpathy) — **Highly Recommended.** This is the single best 1-hour overview of how LLMs are built and how they "think." Perfect for execs.
*   **[But what is a GPT? Visualizing Transformers](https://www.youtube.com/watch?v=wjZofJX0v4M)** (3blue1brown) — A stunning visual breakdown of the "Attention" mechanism that makes ChatGPT work.

---

> [Next Module: AI Agents & Automation](../03-AI-Agents-Automation)
