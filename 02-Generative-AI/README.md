# Generative AI

> **"Traditional AI was a better librarian; Generative AI is a better writer."**

In Module 1, we covered how AI recognizes patterns—classification, prediction, sorting things into buckets. This module is about something fundamentally different: AI using those patterns to **create something that didn't exist before**.

That shift—from recognition to creation—is why everyone's losing their minds right now.

---

## Table of Contents

1. [What is Generative AI?](#1-what-is-generative-ai)
2. [Large Language Models (LLMs)](#2-large-language-models-llms)
3. [Tokens & Context Windows](#3-tokens--context-windows)
4. [Prompt Engineering](#4-prompt-engineering)
5. [Recommended Deep Dives](#5-recommended-deep-dives)
6. [Quick Reference](#6-quick-reference)

---

## 1. What is Generative AI?

![Generative AI Overview](./assets/gen-ai.png)

Let's start with what makes generative AI fundamentally different from the AI we discussed in Module 1.

Traditional AI answers questions by picking from existing options. Generative AI creates things that never existed before.

| Traditional AI | Generative AI |
|----------------|---------------|
| "Is this email spam?" → Yes/No | "Write me an email to reschedule the meeting" |
| "What's in this photo?" → "A dog" | "Create a photo of a dog wearing a business suit" |
| "Translate this sentence" | "Write a poem in the style of Shakespeare" |

See the difference? One is classification—sorting inputs into predefined categories. The other is creation—producing novel outputs from scratch.

Traditional AI is like a judge at a dog show: "That's a poodle. That's a labrador. That one's disqualified." Generative AI is like a breeder who creates entirely new dogs you've never seen before.

---

### 1.1 How It Actually Works

Here's where it gets wild—and honestly, a bit philosophically weird.

Generative AI is basically just **prediction on steroids**.

Let me show you what I mean. When you type "The capital of France is..." the AI doesn't actually "know" that Paris is the capital of France. It doesn't have a database of facts it looks up. Instead, it calculates:

*"Based on every piece of text I've ever been trained on, what word has the highest probability of coming next in this sequence?"*

And because it's seen "The capital of France is Paris" millions of times across Wikipedia, textbooks, news articles, and random web pages, the word "Paris" gets assigned a very high probability.

**Let me walk you through the actual mechanics:**

1. The model takes your input text and converts it into numbers (we'll cover tokenization later)
2. Those numbers flow through billions of mathematical operations (the neural network)
3. The output is a probability distribution over every possible next word
4. The model picks a word (usually the highest probability, but not always—more on that in Temperature)
5. That word becomes part of the input, and the process repeats

So when you ask ChatGPT to write a poem, it's not "thinking about poetry." It's playing an insanely sophisticated game of "what word comes next?" over and over again, hundreds of times per response.

**Here's a concrete example:**

When you ask an LLM to write Python code like `def calculate_tax(`, it's not reasoning about programming logic or tax law. It's predicting: "Based on the millions of Python files I've seen, what characters typically follow `def calculate_tax(`?"

It's seen enough code that it "knows" a function definition needs parameters, then a colon, then an indented body. It's seen enough tax-related functions to know what variables and calculations are common.

**The profound weirdness:** This prediction approach somehow produces genuinely useful, creative, coherent output. It writes code that runs. It produces essays that make arguments. It generates images that look like photographs.

Nobody fully understands why it works as well as it does. We know the mechanics (transformer architecture, attention mechanisms, gradient descent), but *why* predicting the next word leads to something that feels like understanding... that's still an open question in AI research.

---

### 1.2 Why This Changes Everything

Here's the economic insight that matters most:

**The first draft of *anything* now costs basically zero.**

Think about what that means:

| Before GenAI | After GenAI |
|--------------|-------------|
| Hiring a copywriter for product descriptions: $50-200 each | Generate 100 drafts in 5 minutes, edit the best one |
| Developer writes boilerplate code: 2 hours | AI generates it: 30 seconds, developer reviews |
| Creating a presentation outline: 45 minutes of staring at blank slides | "Give me a 10-slide outline for a Q3 sales review" — done in 10 seconds |
| Drafting a legal contract from scratch: billable hours | AI generates a starting template, lawyer refines |

**The key insight:** The work didn't disappear. It shifted.

Before: Most time spent on *creation* (staring at blank pages, writing first drafts)
After: Most time spent on *curation and editing* (selecting, refining, fact-checking)

This is like the shift from hand-copying manuscripts to printing presses. The scribes didn't disappear—they became editors, typesetters, and publishers. The value moved up the chain.

If your job is "producing first drafts," you're in trouble. If your job is "knowing what good looks like and making things better," you're more valuable than ever.

---

## 2. Large Language Models (LLMs)

LLMs are the engines behind ChatGPT, Claude, Gemini, and friends. They're neural networks trained specifically on text, and they've gotten absurdly good absurdly fast.

Let me explain what makes them "large" and why that matters.

**The "Large" in Large Language Models** refers to the number of parameters—the adjustable numbers inside the neural network that get tuned during training. More parameters = more capacity to learn patterns.

- GPT-2 (2019): 1.5 billion parameters
- GPT-3 (2020): 175 billion parameters  
- GPT-4 (2023): rumored to be over 1 trillion parameters

Why does size matter? Think of parameters like memory capacity. A model with more parameters can store more nuanced patterns. It can remember that "bank" means something different in "river bank" vs. "bank account" vs. "bank shot in pool." Smaller models might conflate these; larger models keep them distinct.

But there's more to it than just size. Training data matters enormously. A small model trained on high-quality data can outperform a larger model trained on garbage. The architecture (how the network is structured) matters. The training process (how you adjust those parameters) matters.

Still, as a general rule: more parameters + more training data + better architecture = smarter model.

---

### 2.1 The Evolution — From Dumb to Scary Smart

Understanding the history helps you understand why things are moving so fast—and why the current moment feels unprecedented.

| Era | What Happened | Vibe Check |
|-----|---------------|------------|
| **GPT-1 (2018)** | Proof of concept. Could finish sentences, kinda. | Like autocomplete, but worse. Often incoherent. |
| **GPT-3 (2020)** | The breakthrough. Proved "bigger = smarter" at scale. | Could write essays, code, have conversations. |
| **ChatGPT (Nov 2022)** | GPT-3.5 with chat fine-tuning and RLHF | The "holy crap" moment for the public. 100M users in 2 months. |
| **GPT-4 / Claude 3 (2023-24)** | Multimodal (text + images), way smarter, fewer hallucinations | Can pass the bar exam, debug complex code, analyze images. |
| **Early 2025** | Reasoning Models (o1/o3) & DeepSeek | AI that thinks before it speaks. Solves PhD-level STEM problems. |
| **Late 2025** | Gemini 3 & Claude 4.5 | Almost indistinguishable reasoning from humans for complex logic. |
| **Now (Dec 2025)** | Full Agency & Synthetic Data | AI that manages its own tasks and trains on simulated worlds. |

**The key pattern to notice:** Each generation wasn't just incrementally better—it crossed capability thresholds that opened entirely new use cases.

GPT-2 could write a paragraph. GPT-3 could write a coherent essay. GPT-4 could pass professional licensing exams. Each jump wasn't 10% better—it was "can now do things it literally couldn't do before."

**A concrete comparison:** GPT-3 scored around the 10th percentile on the bar exam (basically failing). GPT-4 scores around the 90th percentile (passing comfortably). Same test, same prompting approach—just a smarter model.

---

### 2.2 The Major Players Right Now

The AI landscape moves fast, but here's where things stand:

| Company | Model | Known For |
|---------|-------|-----------|
| **Anthropic** | Claude 4.5 Opus | The "IQ King." Best at programming logic, creative writing, and human nuance. |
| **OpenAI** | GPT-5.2 | The powerhouse generalist. Best native multimodal "voice" and planning. |
| **Google** | Gemini 3 Pro | The "Video King." Handles 3M+ tokens and explains hours of footage instantly. |
| **Meta** | Llama 4 | The Open-Source standard. Allows businesses to host top-tier AI locally. |
| **xAI** | Grok 4.1 | Real-time mastery. Fastest access to X data and high-speed reasoning. |
| **DeepSeek** | DeepSeek-V3 | Efficiency breakthrough. World-class performance at 1/15th the cost. |

**The important insight:** No single model is "best" at everything.

Claude tends to be better at nuanced writing, following complex instructions, and coding. GPT-4 is a strong generalist with the biggest ecosystem. Gemini handles massive documents better than anyone. Llama lets you run AI locally without sending data to a company.

You pick based on the job. It's like asking "what's the best vehicle?" Depends—are you hauling furniture, racing, or driving kids to school?

---

### 2.3 How LLMs Are Priced

When you use LLMs via API (building them into products), you pay per **token**, not per word or per request.

```
┌─────────────────────────────────────────────────────────┐
│  Your prompt (input tokens)    →  Cheaper               │
│  AI's response (output tokens) →  More expensive        │
└─────────────────────────────────────────────────────────┘
```

**Why the price difference?** This comes down to computational cost.

**Input tokens** just need to be *processed*—the model reads them, updates its internal state, and that's it. One pass through the network.

**Output tokens** require the model to *generate*—which means running the full network for every single token produced. The model generates "The", then runs again to generate "capital", then runs again for "of"... hundreds of times for a single response. Each word requires a full forward pass through billions of parameters.

Generation is 4x+ more computationally expensive than reading. Hence the price difference.

A typical back-and-forth chat message now costs less than **$0.00001** for lightweight models (like Gemini 3 Flash) and **$0.003 - $0.008** for frontier thinking models like Claude 4.5 or GPT-5.2.

**Practical implication:** If you're building something with AI, keep your prompts concise. That long system prompt you copy-paste every time? It gets charged on every single request. A 2,000-token system prompt that runs 10,000 times = 20 million tokens = $50 just for the prompt, before any responses.

---

### 2.4 How to Compare LLMs (Benchmarks)

Marketing claims are useless. Every company says their model is "the most advanced" or "state-of-the-art." So how do you actually compare?

Standardized benchmarks. These are like SAT scores for AI—everyone takes the same test, so you can compare apples to apples.

| Benchmark | What It Tests | State of the Art (Late 2025) |
|-----------|---------------|----------------|
| **SWE-bench (Verified)** | Real-world software engineering | **81%** (Claude 4.5 Opus) |
| **GPQA Diamond** | PhD-level expert knowledge | **93%** (GPT-5.2 Pro / Gemini 3) |
| **MMLU Pro** | High-level general intelligence | **90%** (Gemini 3 Pro) |
| **ARC-AGI-2** | Fluid intelligence & novel reasoning | **53%** (GPT-5.2 Thinking) |
| **LMSYS Arena** | Human preference (Double-blind) | Varies, but Claude 4.5 holds the lead. |

**Why benchmarks matter—and why they don't:**

Benchmarks give you a baseline. If Model A scores 90% on MMLU and Model B scores 75%, Model A is probably smarter in a general sense.

But benchmarks don't tell you everything. A model might ace MMLU but give terrible advice when you ask it to plan a road trip. It might score 95% on coding benchmarks but struggle with your specific codebase.

**The real test:** Try it on YOUR use case. Benchmarks are the screening interview; actual performance on your tasks is the job trial.

---

## 3. Tokens & Context Windows

These two concepts come up constantly. Let me demystify them properly.

---

### 3.1 What Are Tokens?

LLMs don't read words—they read **tokens**. This is a fundamental architectural choice that has real consequences for how you use these tools.

**What is a token?** A token is a chunk of text, typically 3-4 characters on average, that the model treats as a single unit.

```
"ChatGPT is amazing" → ["Chat", "G", "PT", " is", " amazing"]
                        (5 tokens)

"Hello" → ["Hello"]
          (1 token)

"Supercalifragilisticexpialidocious" → ["Super", "c", "alif", "rag", "ilis", "tic", "exp", "ial", "id", "ocious"]
                                        (10 tokens)
```

**Why tokens instead of words?**

There are roughly 170,000 words in English. Add technical terms, names, slang, other languages, code syntax... you'd need millions of entries in your vocabulary. That's computationally unwieldy.

Instead, tokenizers use a technique called "subword tokenization." They build a vocabulary of common chunks—maybe 50,000-100,000 tokens—that can combine to represent any text.

Common words like "the," "is," and "and" are single tokens. Less common words get split into recognizable pieces. The word "tokenization" might become ["token", "ization"]. This means even words the model has never seen can be processed—it just breaks them into familiar subparts.

**Practical rules of thumb:**

- 1 token ≈ 4 characters in English
- 1 token ≈ ¾ of a word
- 1,000 tokens ≈ 750 words ≈ 1.5 pages of text
- 100,000 tokens ≈ a full novel

**Why this matters to you:**

Token limits determine how much you can send AND receive. If a model has a 4,000 token limit and your prompt uses 3,500 tokens, you only have 500 tokens left for the response. That's maybe 375 words—about a page. Ask for a detailed analysis and you'll get cut off mid-sentence.

Also: code is token-heavy. All those brackets, semicolons, and special characters each consume tokens. A 100-line Python script might use more tokens than a 500-word essay.

---

### 3.2 Context Windows — The AI's Short-Term Memory

The context window is everything the AI can "see" at once during a single conversation turn.

Think of it like working memory. When you're solving a math problem, you can only hold so many numbers in your head at once. The AI has a similar limitation—except it's measured in tokens.

**What's inside the context window:**
- Your current message
- The entire conversation history (all previous messages back and forth)
- Any documents or text you've pasted in
- The system prompt (hidden instructions that shape behavior)
- The AI's own response as it generates it

All of this has to fit within the limit.

| Model | Context Window | What That Means In Practice |
|-------|----------------|-----------------|
| **Legacy Models** | 8,000 tokens | About 6 pages. AI "forgets" your name mid-conversation. |
| **Frontier (GPT-5.2 / Claude 4.5)** | 400,000+ tokens | Multiple dense books. Can analyze entire legal cases or small codebases. |
| **Gemini 3 Pro** | 3,000,000+ tokens | Hours of 8K video, years of sensor data, or thousands of PDFs. |

**A concrete example:**

You're analyzing a 50-page legal contract. 50 pages ≈ 37,500 words ≈ 50,000 tokens.

You're analyzing a massive project folder containing 500 files, or several 1,000-page regulatory documents.

- **With an 8k context window (Legacy):** You literally can't fit the data. You'd need to chunk it into sections, analyze each separately, and somehow synthesize the findings. Error-prone and tedious.

- **With a 250k+ context window (Claude 4.5 / GPT-5):** Paste the entire set of documents. Ask "Find every conflict between these three 500-page contracts." Get a coherent answer is seconds.

- **With a 3M+ context window (Gemini 3):** Upload 4 hours of raw 8K video from a security camera. Ask "At what time did the delivery truck arrive, and what was the license plate?" The AI "watches" the whole video at once to find the answer.

**The catch (and it's important):**

Just because a model *can* handle 200k tokens doesn't mean it's equally good at attending to all of them.

Research has found a "lost in the middle" problem: information at the very beginning and very end of the context gets processed better than information in the middle. If you paste a 100-page document and the key fact is on page 47, the model might miss it while catching facts from pages 1-5 and 95-100.

**Practical implication:** Put your most important information at the beginning or end of your prompt. Don't bury the key question in the middle of a wall of text.

---

## 4. Prompt Engineering

Here's where theory meets practice. The difference between a useless AI response and a brilliant one is often just **how you asked**.

Prompt engineering is the skill of crafting inputs that get the outputs you want. It's part art, part science, and 100% learnable.

---

### 4.1 The Perfect Prompt Formula

Every great prompt has three ingredients:

```
┌──────────────────────────────────────────────────────────────┐
│  ROLE     →  Who should the AI pretend to be?                │
│  CONTEXT  →  What's the situation? What do you already know? │
│  TASK     →  What exactly do you want? In what format?       │
└──────────────────────────────────────────────────────────────┘
```

**Why these three elements work:**

**ROLE** activates relevant patterns. When you say "Act as a senior tax accountant," the model shifts toward vocabulary, frameworks, and reasoning patterns from financial/tax content in its training data. It's like method acting—the persona shapes the output.

**CONTEXT** eliminates ambiguity. The model doesn't know your situation unless you tell it. Are you a beginner or expert? Is this for a formal report or casual email? What constraints exist? The more context you provide, the less the model has to guess.

**TASK** defines success. Vague asks get vague answers. "Help me with my resume" could mean a hundred things. "Rewrite these bullet points using action verbs and quantified results" is unambiguous.

**Let's see this in action:**

**Bad prompt:**
> "Help me with my resume"

What does "help" mean? Review it? Rewrite it? Format it? The AI has to guess, and it'll probably guess wrong.

**Good prompt:**
> "Act as a senior tech recruiter at a FAANG company with 10 years of experience screening engineering candidates. I'm a software engineer with 5 years of Python experience applying for senior backend roles. Review my resume bullet points and rewrite them using strong action verbs and quantified achievements. Focus on impact and scope. Here are my current bullets: [paste bullets]"

Same underlying request. Wildly different results. The good prompt:
- Establishes expertise lens (FAANG recruiter knows what impresses)
- Provides your context (experience level, target role)
- Specifies exactly what to do (rewrite with action verbs + quantified achievements)
- Clarifies format/focus (impact and scope)

---

### 4.2 Prompting Strategies

Different tasks benefit from different approaches. Here are the big three:

---

**Zero-Shot — Just Ask Directly**

No examples, no elaborate setup. Just state what you want.

> "Translate 'Good morning' to Japanese"

> "What's the capital of Thailand?"

> "Explain photosynthesis in one paragraph"

**When to use it:** Simple, unambiguous tasks where there's an obvious "right answer" or standard format. The model has seen millions of translations, definitions, and explanations—it knows what these look like.

**When it fails:** Nuanced tasks where your expected output format or style isn't obvious. If the model has to guess what you want, it might guess wrong.

---

**Few-Shot — Show Examples First**

Provide examples of input→output pairs, then give your actual input.

> "Convert these sentences to past tense:
> - I eat → I ate
> - I run → I ran  
> - I swim → I swam
> 
> Now convert: I write → ?"

The AI sees the pattern (present tense → past tense) and applies it.

**Why this works so well:**

Remember, LLMs are pattern-completion machines. When you show examples, you're essentially demonstrating the pattern you want. The model thinks: "Given these input/output pairs, what's the function that transforms inputs to outputs? Let me apply that function to the new input."

The more examples you give, the clearer the pattern. One example might be ambiguous (maybe you wanted irregular verbs specifically?). Three examples make the pattern unmistakable.

**When to use it:** Any task where the format, style, or transformation isn't obvious from a simple instruction. Classification tasks, formatting conversions, style transfer, structured extraction.

**Pro tip:** Choose diverse examples that cover edge cases. If all your examples are simple cases, the model might fail on complex ones.

---

**Chain of Thought — Think Step by Step**

Tell the AI to reason through the problem before giving an answer.

> "A bat and ball cost $1.10 together. The bat costs $1 more than the ball. How much does the ball cost? Think through this step by step before giving your answer."

**Without Chain of Thought**, most models instantly respond "$0.10" — the intuitive but wrong answer.

**With Chain of Thought**, the model works through it:
> "Let's call the ball's price x. The bat costs $1 more, so the bat is x + $1. Together they cost $1.10, so: x + (x + 1) = 1.10. That gives us 2x + 1 = 1.10, so 2x = 0.10, and x = 0.05. The ball costs $0.05."

**Why this works:**

LLMs generate text left-to-right. Each token influences the next. When a model just blurts out an answer, it's doing single-step pattern matching—"I've seen this type of question, the answer is usually..."

When you force it to show work, each reasoning step becomes part of the context that influences the next step. The model can't jump to a wrong conclusion because it has to justify each move. It's like the difference between a student guessing on a test vs. showing their work—the process of articulating reasoning actually produces better reasoning.

**When to use it:** Math problems, logic puzzles, multi-step analysis, anything requiring actual reasoning rather than recall.

---

### 4.3 Temperature & Other Settings

When you use AI through APIs or playgrounds (not just chat interfaces), you can tune these parameters:

---

**Temperature (0.0 to 1.0+)**

This controls randomness in token selection.

Here's what's actually happening: When the model generates each token, it produces probabilities for every possible next token. Temperature affects how those probabilities influence selection.

- **Temperature 0.0:** Always pick the highest probability token. Deterministic—same input always produces same output.
- **Temperature 0.5:** Mostly pick high-probability tokens, but occasionally sample lower-probability options.
- **Temperature 1.0:** Sample proportionally to probabilities. A token with 20% probability gets picked 20% of the time.
- **Temperature >1.0:** Flatten the distribution—make unlikely tokens more likely to be selected.

**In practice:**

| Setting | Behavior | Best For |
|---------|----------|----------|
| **0.0** | Deterministic, focused, repetitive | Code, math, factual answers, anything with a "correct" answer |
| **0.3-0.5** | Slightly varied but still coherent | Business writing, summaries, professional communication |
| **0.7-0.9** | Noticeably creative, more varied | Brainstorming, creative writing, exploring alternatives |
| **1.0+** | Wild. Occasionally brilliant, often incoherent. | When you explicitly want weird/unexpected ideas |

> **Concrete example:** Ask for a poem about autumn at temperature 0.2—you'll get something competent but predictable ("leaves falling, colors changing..."). At temperature 0.9—you might get surprising metaphors and unexpected imagery. At 1.5—you might get beautiful nonsense or accidental brilliance.

**The intuition:** Low temperature = playing it safe, picking the "obvious" word. High temperature = taking creative risks, sometimes hitting, sometimes missing wildly.

---

**Top-P (Nucleus Sampling)**

Another way to control randomness. Instead of adjusting probabilities (temperature), top-p limits *which tokens are even considered*.

Top-p 0.9 means: "Only consider tokens that collectively make up 90% of the probability mass. Ignore the long tail of unlikely tokens."

**Practical advice:** If you're adjusting temperature, leave top-p at 1.0. Changing both gets confusing and unpredictable. Pick one control and stick with it.

---

**Max Tokens**

A hard limit on response length.

If you set max_tokens to 100, the model stops after 100 tokens regardless of whether it finished its thought. Useful for preventing rambling when you need concise answers.

Be careful: setting this too low can cut off responses mid-sentence. The model doesn't know to wrap up—it just stops.

---

**Stop Sequences**

Custom strings that tell the model to stop generating.

> Example: You want the model to generate exactly 3 bullet points. Set "4." as a stop sequence. When the model starts writing the fourth bullet ("4. ..."), it stops immediately.

Useful for structured outputs where you know exactly what the end should look like.

---

## 5. Recommended Deep Dives

These are genuinely excellent resources if you want to go deeper:

**[Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g)** — Andrej Karpathy (1 hour)

Karpathy was a founding member of OpenAI and Tesla's AI director. This talk explains how LLMs work under the hood—tokenization, training, fine-tuning, the works—without dumbing it down. He explains like you're smart but not a specialist. If you watch one thing, watch this.

**[But what is a GPT? Visual Intro to Transformers](https://www.youtube.com/watch?v=wjZofJX0v4M)** — 3Blue1Brown (27 min)

When people talk about "attention" in transformers, what do they actually mean? This video visualizes the mathematics with 3Blue1Brown's signature animations. Abstract concepts become intuitive. You'll actually understand what's happening when the model "attends" to different parts of the input.

---

## 6. Quick Reference

| AI Concept or Model | Category | Key Features and Characteristics | Technical Specifications or Metrics | Primary Use Case or Significance |
| :--- | :--- | :--- | :--- | :--- |
| **GPT-5.2** | Model | Next-gen generalist; massive logic and multimodal performance jump. | Multi-thousand context; improved factual accuracy. | Strategic planning, high-end content creation. |
| **GPT-3** | Model | The model that proved scaling works. | 175 billion parameters. | Historical milestone in LLM development. |
| **Claude 4.5 Opus** | Model | Unmatched at coding and structured reasoning; very natural "human" voice. | 250k-400k context window. | Engineering, creative writing, and data extraction. |
| **Gemini 3 Pro** | Model | Deeply integrated into productivity tools; massive reasoning jump. | 3M+ token context window. | Research, video analysis, and large-codebase management. |
| **Grok 4.1** | Model | High-speed model with real-time access to X data. | 2M context window. | News analysis, customer service, and real-time monitoring. |
| **DeepSeek V3** | Model | Proved efficiency can match scale. | 1/15th training cost vs frontier. | High-performance cost optimization. |
| **Llama 4** | Model | The powerhouse of open-weights. | Competitive with GPT-5 class models. | Local hosting and privacy-critical apps. |
| **Tokens** | Mechanic | The basic unit of currency in LLMs (chunks of ~4 chars). | 1,000 tokens $\approx$ 750 words. | Budgeting and understanding model constraints. |
| **Context Window** | Mechanic | The AI's working memory for a single conversation. | Up to 3M+ (Gemini 3). | Analyzing books, hours of video, or entire project directories. |
| **Temperature** | Setting | Controls the "creativity" or randomness of output. | Scale: 0.0 (factual) to 1.0+ (random). | Balancing precision vs. brainstorming. |
| **o1 / o3** | Model Type | Reasoning models that "think" before generating an answer. | Utilizes "Chain of Thought" internally. | Complex math, science, and multi-step logic. |
| **Sora / Veo** | Modal | High-fidelity generative video from text/image prompts. | 60s+ 4K video generation. | Marketing, concept art, and rapid video prototyping. |

---

> [Next Module: AI Agents Automation →](../03-AI-Agents-Automation)