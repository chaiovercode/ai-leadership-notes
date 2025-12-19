# Generative AI

> **"Traditional AI was a better librarian; Generative AI is a better writer."**

Module 1 was about AI recognizing patterns. This one's about AI using those patterns to **create something new**. That's the game-changer.

---

## 📑 Table of Contents

1. [What is Generative AI?](#what-is-generative-ai)
   - [How It Actually Works](#how-it-actually-works)
   - [Why This Changes Everything](#why-this-changes-everything)
2. [Large Language Models (LLMs)](#large-language-models-llms)
   - [The Evolution — From Dumb to Scary Smart](#the-evolution--from-dumb-to-scary-smart)
   - [The Major Players](#the-major-players-right-now)
   - [How LLMs Are Priced](#how-llms-are-priced)
   - [How to Compare LLMs (Benchmarks)](#how-to-compare-llms-benchmarks)
3. [Tokens & Context Windows](#tokens--context-windows)
   - [What Are Tokens?](#what-are-tokens)
   - [Context Windows Explained](#context-windows--the-ais-short-term-memory)
4. [Prompt Engineering](#prompt-engineering)
   - [The Perfect Prompt Formula](#the-perfect-prompt-formula)
   - [Prompting Strategies](#prompting-strategies)
   - [Temperature & Other Settings](#temperature--other-settings)
5. [Recommended Deep Dives](#recommended-deep-dives)

---

## What is Generative AI?

Traditional AI answers questions. Generative AI creates things.

| Traditional AI | Generative AI |
|----------------|---------------|
| "Is this email spam?" → Yes/No | "Write me an email to reschedule the meeting" |
| "What's in this photo?" → "A dog" | "Create a photo of a dog wearing a business suit" |
| "Translate this sentence" | "Write a poem in the style of Shakespeare" |

See the difference? One classifies, the other creates.

---

### How It Actually Works

Here's the wild part — it's basically just prediction on steroids.

When you type "The capital of France is..." the AI doesn't "know" Paris. It calculates: *based on everything I've read, what word has the highest probability of coming next?*

It's been trained on basically the entire internet — books, Wikipedia, code repositories, Reddit threads, academic papers. It learned patterns from all of it.

> **Real Example:** When you ask ChatGPT to write Python code, it's not "thinking" about programming logic. It's predicting: "Based on millions of code examples I've seen, what tokens typically follow `def calculate_tax(`?"

The crazy thing? This prediction approach somehow produces genuinely useful, creative output. Nobody fully understands why it works as well as it does.

---

### Why This Changes Everything

The first draft of *anything* now costs basically zero.

| Before GenAI | After GenAI |
|--------------|-------------|
| Hiring a copywriter for product descriptions: $50-200 each | Generate 100 drafts in 5 minutes, edit the best one |
| Developer writes boilerplate code: 2 hours | AI generates it: 30 seconds, developer reviews |
| Creating a presentation outline: 45 minutes of staring at blank slides | "Give me a 10-slide outline for a Q3 sales review" — done in 10 seconds |

The work didn't disappear — it shifted from *creation* to *curation and editing*.

---

## Large Language Models (LLMs)

LLMs are the engines behind ChatGPT, Claude, Gemini, and friends. They're neural networks trained specifically on text, and they've gotten absurdly good absurdly fast.

---

### The Evolution — From Dumb to Scary Smart

| Era | What Happened | Vibe Check |
|-----|---------------|------------|
| **GPT-1 (2018)** | Could finish sentences, kinda | Like autocomplete, but worse |
| **GPT-2 (2019)** | Could write paragraphs that made sense | OpenAI was scared to release it (lol in hindsight) |
| **GPT-3 (2020)** | The breakthrough. Proved "bigger = smarter" | Could write essays, code, have conversations |
| **ChatGPT (2022)** | GPT-3.5 with chat fine-tuning | The "holy crap" moment for the public |
| **GPT-4 / Claude 3 / Gemini (2023-24)** | Multimodal, way smarter, fewer hallucinations | Can pass the bar exam, debug complex code |
| **Now (2025)** | Agents, reasoning models, tool use | AI that can actually *do* things, not just *say* things |

The jump from GPT-3 to GPT-4 was roughly: "Can pass high school exams" → "Can pass medical licensing exams."

---

### The Major Players Right Now

| Company | Model | Known For |
|---------|-------|-----------|
| **OpenAI** | GPT-4o, o1 | The household name. Strong all-rounder. |
| **Anthropic** | Claude 3.5 Sonnet / Opus | Excellent at coding, long documents, sounds more natural |
| **Google** | Gemini 1.5 Pro | Massive context window (can read entire books at once) |
| **Meta** | Llama 3 | Open-source king — free to use and modify |
| **Mistral** | Mistral Large | European alternative, surprisingly good for the size |
| **xAI** | Grok | Built into X/Twitter, real-time info access |

No single model is "best" at everything. Claude tends to be better at writing and coding. GPT-4 is a strong generalist. Gemini handles huge documents. You pick based on the job.

---

### How LLMs Are Priced

You don't pay per word. You pay per **token**.

```
┌─────────────────────────────────────────────────────────┐
│  Your prompt (input tokens)    →  Cheaper               │
│  AI's response (output tokens) →  More expensive        │
└─────────────────────────────────────────────────────────┘
```

**Why the difference?** Input tokens just need to be read. Output tokens require the AI to "think" and generate in real-time — that's computationally expensive.

> **Real Example Pricing (GPT-4o as of late 2024):**
> - Input: ~$2.50 per 1 million tokens
> - Output: ~$10 per 1 million tokens
> 
> A typical back-and-forth chat message might cost $0.001-0.01. You'd need to have thousands of conversations to rack up serious costs.

**Pro tip:** If you're building something with AI, keep your prompts concise. That long system prompt you copy-paste every time? It's costing you on every single request.

---

### How to Compare LLMs (Benchmarks)

Marketing claims are useless. "Our model is the most advanced!" — yeah, they all say that.

Look at these standardized benchmarks instead:

| Benchmark | What It Tests | Why It Matters |
|-----------|---------------|----------------|
| **MMLU** | General knowledge across 57 subjects | The "SAT score" of AI — broad intelligence measure |
| **HumanEval** | Code generation (write functions that pass tests) | Can it actually code, or just talk about coding? |
| **GSM8K** | Grade-school math word problems | Surprisingly hard for AI. Tests reasoning, not just pattern matching. |
| **GPQA** | PhD-level science questions | For when you need serious technical depth |
| **LMSYS Chatbot Arena** | Real humans vote on which response is better | The only "vibes-based" benchmark — and honestly the most useful |

> **Real Example:** A model might score 90% on MMLU but still give you nonsense when you ask it to plan a road trip. Benchmarks help, but they're not everything. Test it yourself on YOUR use case.

---

## Tokens & Context Windows

Two concepts you'll hear constantly. Let's demystify them.

---

### What Are Tokens?

LLMs don't read words — they read tokens. Think of tokens as chunks of text, usually 3-4 characters.

```
"ChatGPT is amazing" → ["Chat", "G", "PT", " is", " amazing"]
                        (5 tokens)

"Hello" → ["Hello"]
          (1 token)

"Supercalifragilisticexpialidocious" → ["Super", "c", "alif", "rag", "ilis", "tic", "exp", "ial", "id", "ocious"]
                                        (10 tokens)
```

**Rule of thumb:** 1,000 tokens ≈ 750 words ≈ 1.5 pages of text

Common words like "the" or "and" are single tokens. Rare words get split into pieces. Code often uses more tokens than prose because of special characters.

> **Why this matters:** Token limits determine how much you can send AND receive. If a model has a 4k token limit and your prompt is 3.5k tokens, you only have 500 tokens left for the response.

---

### Context Windows — The AI's Short-Term Memory

The context window is everything the AI can "see" at once — your current message, the conversation history, any documents you've pasted in, and the system prompt.

| Model | Context Window | What That Means |
|-------|----------------|-----------------|
| GPT-3.5 | 4,096 tokens | About 3 pages. Forgets earlier parts of long chats. |
| GPT-4 | 128k tokens | A full novel (~300 pages) |
| Claude 3 | 200k tokens | Multiple novels. Can analyze entire codebases. |
| Gemini 1.5 | 1M+ tokens | Absurd. Can process hours of video transcripts. |

> **Real Example:** You're analyzing a 50-page legal contract.
> - With 4k context: You'd need to chunk it into sections and analyze piece by piece
> - With 128k context: Paste the whole thing and ask "What are the termination clauses?"

**The catch:** Just because a model CAN handle 200k tokens doesn't mean it's equally good at attending to all of them. Information in the middle often gets less attention than the beginning and end ("lost in the middle" problem).

---

## Prompt Engineering

The difference between a useless AI response and a brilliant one is often just how you asked.

---

### The Perfect Prompt Formula

Three ingredients:

```
┌──────────────────────────────────────────────────────────────┐
│  ROLE     →  Who should the AI pretend to be?                │
│  CONTEXT  →  What's the situation? What do you already know? │
│  TASK     →  What exactly do you want? In what format?       │
└──────────────────────────────────────────────────────────────┘
```

**Bad prompt:**
> "Help me with my resume"

**Good prompt:**
> "Act as a senior tech recruiter at a FAANG company. I'm a software engineer with 5 years of Python experience applying for senior roles. Review my resume bullet points and rewrite them using strong action verbs and quantified achievements. Here are my current bullets: [paste bullets]"

Same request. Wildly different results.

---

### Prompting Strategies

**Zero-Shot** — Just ask directly, no examples.
> "Translate 'Good morning' to Japanese"

Works for simple, unambiguous tasks.

---

**Few-Shot** — Give examples first, then your actual request.

> "Convert these to past tense:
> - I eat → I ate
> - I run → I ran
> - I swim → I swam
> 
> Now convert: I write → ?"

The AI picks up the pattern from your examples. This dramatically improves accuracy for nuanced tasks.

---

**Chain of Thought** — Tell the AI to think step-by-step before answering.

> "A bat and ball cost $1.10 together. The bat costs $1 more than the ball. How much does the ball cost? Think through this step by step before giving your answer."

Without "think step by step," most models blurt out "$0.10" (wrong). With it, they work through the algebra and get "$0.05" (correct).

This works because it forces the model to show its reasoning, which makes it actually reason instead of pattern-matching to a common wrong answer.

---

### Temperature & Other Settings

When you use AI tools like the OpenAI Playground or Claude's API, you can tweak these:

**Temperature (0.0 to 1.0+)**

This controls randomness.

| Setting | Behavior | Best For |
|---------|----------|----------|
| **0.0** | Deterministic — same input = same output | Code, math, factual answers |
| **0.3-0.5** | Slightly creative but still focused | Business writing, summaries |
| **0.7-0.9** | More variety and creativity | Brainstorming, creative writing |
| **1.0+** | Wild. Occasionally brilliant, often nonsense. | When you want weird ideas |

> **Real Example:** Ask for a poem at temperature 0.2 — you'll get something competent but predictable. At 0.9 — you might get something genuinely surprising (or completely unhinged).

**Top-P (Nucleus Sampling)**

Another randomness control. If you're adjusting temperature, leave this at 1.0. Changing both gets messy.

**Max Tokens**

Hard limit on response length. Set this to prevent the AI from rambling when you need a short answer.

**Stop Sequences**

Tell the AI where to stop. Useful for structured outputs.

> Example: If you want the AI to generate exactly 3 bullet points and stop, set "4." as a stop sequence.

---

## Recommended Deep Dives

If you want to go deeper, these are genuinely excellent:

**[Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g)** — Andrej Karpathy (1 hour)

The single best explainer on how LLMs work under the hood. Karpathy was a founding member of OpenAI and Tesla's AI director. He explains things clearly without dumbing them down. Watch this one.

**[But what is a GPT? Visual Intro to Transformers](https://www.youtube.com/watch?v=wjZofJX0v4M)** — 3Blue1Brown (27 min)

If you've ever wondered what "attention" means when people talk about transformers, this video visualizes it beautifully. The animations make abstract math intuitive.

---

## Quick Reference

| Term | Plain English |
|------|---------------|
| **Generative AI** | AI that creates new content (text, images, code) |
| **LLM** | Large Language Model — the text-based AI engines |
| **Token** | A chunk of text (~4 characters). How AI "sees" language. |
| **Context Window** | How much text the AI can consider at once |
| **Temperature** | Creativity dial. Low = focused, High = random |
| **Zero-shot** | Asking without examples |
| **Few-shot** | Giving examples first to show the pattern you want |
| **Chain of Thought** | Making the AI "think out loud" for better reasoning |
| **Hallucination** | When AI confidently makes stuff up |

---

*Next up: AI Agents & Automation — When AI Stops Just Talking and Starts Actually Doing Things*