# Generative AI

> **"Traditional AI was a better librarian; Generative AI is a better writer."**

In Module 1, we covered how AI recognizes patterns, classification, prediction, sorting things into buckets. This module is about something fundamentally different: AI using those patterns to **create something that didn't exist before**.

That shift—from recognition to creation—is why everyone's losing their minds right now.

---

## Table of Contents

1. [What is Generative AI?](#1-what-is-generative-ai)
2. [Large Language Models (LLMs)](#2-large-language-models-llms)
   - [2.1 The Modern Training Recipe (2025)](#21-the-modern-training-recipe-2025)
   - [2.2 The Evolution — From Dumb to Scary Smart](#22-the-evolution--from-dumb-to-scary-smart)
   - [2.3 The Major Players Right Now](#23-the-major-players-right-now)
   - [2.4 How LLMs Are Priced](#24-how-llms-are-priced)
   - [2.5 How to Compare LLMs (Benchmarks)](#25-how-to-compare-llms-benchmarks)
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

See the difference? One is classification, sorting inputs into predefined categories. The other is creation producing novel outputs from scratch.

Traditional AI is like a judge at a dog show: "That's a poodle. That's a labrador. That one's disqualified." Generative AI is like a breeder who creates entirely new dogs you have never seen before.

---

### 1.1 How It Actually Works

Here's where it gets wild and honestly, a bit philosophically weird.

Generative AI is basically just **prediction on steroids**.

Let me show you what I mean. When you type "The capital of France is..." the AI doesn't actually "know" that Paris is the capital of France. It doesn't have a database of facts it looks up. Instead, it calculates:

*"Based on every piece of text I have ever been trained on, what word has the highest probability of coming next in this sequence?"*

And because it's seen "The capital of France is Paris" millions of times across Wikipedia, textbooks, news articles, and random web pages, the word "Paris" gets assigned a very high probability.

**Let me walk you through the actual mechanics:**

1. The model takes your input text and converts it into numbers (we will cover tokenization later)
2. Those numbers flow through billions of mathematical operations (the neural network)
3. The output is a probability distribution over every possible next word
4. The model picks a word (usually the highest probability, but not always. More on that in Temperature)
5. That word becomes part of the input, and the process repeats

So when you ask ChatGPT to write a poem, it's not "thinking about poetry." It's playing an insanely sophisticated game of "what word comes next?" over and over again, hundreds of times per response.

**Here's a concrete example:**

When you ask an LLM to write Python code like `def calculate_tax(`, it's not reasoning about programming logic or tax law. It's predicting: "Based on the millions of Python files I have seen, what characters typically follow `def calculate_tax(`?"

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
| Creating a presentation outline: 45 minutes of staring at blank slides | "Give me a 10-slide outline for a Q3 sales review". Done in 10 seconds |
| Drafting a legal contract from scratch: billable hours | AI generates a starting template, lawyer refines |

**The key insight:** The work didn't disappear. It shifted.

Before: Most time spent on *creation* (staring at blank pages, writing first drafts)
After: Most time spent on *curation and editing* (selecting, refining, fact-checking)

This is like the shift from hand-copying manuscripts to printing presses. The scribes didn't disappear, they became editors, typesetters, and publishers. The value moved up the chain.

If your job is "producing first drafts," you are in trouble. If your job is "knowing what good looks like and making things better," you are more valuable than ever.

---

## 2. Large Language Models (LLMs)

LLMs are the engines behind ChatGPT, Claude, Gemini, and friends. They are neural networks trained specifically on text, and they have gotten absurdly good absurdly fast.

Let me explain what makes them "large" and why that matters.

**The "Large" in Large Language Models** refers to the number of parameters, the adjustable numbers inside the neural network that determine how it processes information. In late 2025, we are no longer just making models "bigger", we are making them "smarter" through more efficient architectures.

- **GPT-2 (2019):** 1.5 billion parameters. (Now considered tiny).
- **GPT-4 (2023):** ~1.8 trillion parameters. This was the first major "Mixture of Experts" model.
- **DeepSeek V3 (Early 2025):** 671 billion parameters. Proved efficiency beats raw size.
- **Llama 4 Behemoth (Late 2025):** 2 trillion total parameters; the open-source powerhouse.
- **GPT-5.2 (Late 2025):** Estimated 3.5+ trillion parameters, the largest known general-purpose model.

### The Breakthrough: Total vs. Active Parameters
As models crossed the trillion-parameter mark, they became too "heavy" to run all at once. The solution? **Mixture of Experts (MoE).**

Think of a traditional model (Dense) like a **General Practitioner**. If you ask them a medical question, they use their entire brain to answer.

Think of an MoE model like a **Hospital Floor**. The floor has 2 trillion parameters (Total), but when you ask a coding question, only the "Coding Specialists" wake up. The "French Poets" and "Biologists" stay asleep. 
- **Total Parameters:** All the knowledge the model has stored (e.g., 2 trillion).
- **Active Parameters:** The specific subset of "experts" used for *your* specific prompt (e.g., 200 billion).

This allows models like **Llama 4** to have the IQ of a 2-trillion parameter model while running as fast as a much smaller one.

### 2.1.1 RAG vs. Fine-tuning (The Textbook vs. Med School)
One of the most common confusions for leaders is how to "teach" an AI about their business. There are two main ways:

**1. Fine-tuning (Med School)**
- **What it is:** Retraining the model's brain. You update the weights.
- **Analogy:** Sending a student to medical school. They learn the vocabulary, the style of thinking, and the deep patterns of medicine.
- **Use for:** Teaching a new *behavior*, *style*, or *format*. (e.g., "Write like our brand voice," or "Speak medical French").
- **Does NOT fix:** It does not teach new *facts*. If you fine-tune on today's stock price, it will forget it tomorrow.

**2. RAG (The Textbook)**
- **What it is:** Retrieval-Augmented Generation. Giving the model access to your documents.
- **Analogy:** Giving a student a textbook during an open-book exam.
- **Use for:** Teaching new *facts* and *knowledge*. (e.g., "What is our Q3 revenue?").
- **Why it wins:** It is cheaper, faster, and reduces hallucinations because the model must cite its sources.

**Leadership Rule of Thumb:** 90% of business use cases need RAG, not Fine-tuning.

### 2.2 The Modern Training Recipe (2025)
Leading labs no longer just throw more data at a model. They follow a specific, four-stage recipe to create a production-grade AI:

1.  **Pretraining (The Foundation):** The model reads the entire internet. It learns language, facts, and patterns. This is where the core "intelligence" is born.
2.  **Supervised Fine-Tuning or SFT (The Teacher):** Humans show the model thousands of examples of good questions and answers. It learns how to format its thoughts and follow instructions.
3.  **RLHF (The Vibe Check):** Humans rank different AI responses. The model learns to be helpful, harmless, and polite. It learns the "human vibe."
4.  **RLVR (The Logic Boss):** This is the **2025 breakthrough**. The model is trained against **Verifiable Rewards** (math problems or code puzzles). If the model gets the math right, it gets a "point." Through millions of these trials, the model spontaneously learns to "reason," double-check its work, and correct its own mistakes.

**The shift:** Most of the progress in 2025 didn't come from making models bigger, but from **spending** months running **RLVR** (Logic Boss) training to turn existing intelligence into deep reasoning.

---

### 2.2 The Evolution — From Dumb to Scary Smart

Understanding the history helps you understand why things are moving so fast and why the current moment feels unprecedented.

| Era | What Happened | Vibe Check |
|-----|---------------|------------|
| **GPT-1 (2018)** | Proof of concept. Could finish sentences, kinda. | Like autocomplete, but worse. Often incoherent. |
| **GPT-3 (2020)** | The breakthrough. Proved "bigger = smarter" at scale. | Could write essays, code, have conversations. |
| **ChatGPT (Nov 2022)** | GPT-3.5 with chat fine-tuning and RLHF | The "holy crap" moment for the public. 100M users in 2 months. |
| **GPT-4 / Claude 3 (2023-24)** | Multimodal (text + images), way smarter, fewer hallucinations | Can pass the bar exam, debug complex code, analyze images. |
| **Early 2025** | Reasoning Models (o1/o3) & DeepSeek | AI that thinks before it speaks. Solves PhD-level STEM problems. |
| **Late 2025** | Gemini 3 & Claude 4.5 | Almost indistinguishable reasoning from humans for complex logic. |
| **Dec 11, 2025**| **GPT-5.2** Release | The final "frontier" release of 2025; massive logic and agency jump. |
| **Now (Dec 2025)**| Full Agency & Synthetic Data | AI that manages its own tasks and trains on simulated worlds. |

**The "Intelligence Ceiling":** In 2023, the Bar Exam was the gold standard (GPT-4 hit the 90th percentile). By late 2025, that test is considered "solved." The new frontier is **Humanity's Last Exam (HLE)**—2,500 PhD-level questions designed to be impossible for AI.
- **GPT-4:** Scored near 0% on HLE.
- **Claude 4.5 / GPT-5.2:** Are currently fighting to break the **50%** barrier. 

Each jump isn't just "more facts"; it's higher-order reasoning across disciplines that even human experts find difficult.

---

### 2.3 The Major Players Right Now

The AI landscape moves fast, but here's where things stand:

| Company | Model | Known For |
|---------|-------|-----------|
| **Anthropic** | Claude 4.5 Opus | The "IQ King." Best at programming logic, creative writing, and human nuance. |
| **OpenAI** | GPT-5.2 | The powerhouse generalist. Best native multimodal "voice" and planning. |
| **Google** | Gemini 3 Pro | The "Video King." Handles 3M+ tokens and explains hours of footage instantly. |
| **Meta** | Llama 4 | The Open-Source standard. Allows businesses to host top-tier AI locally. |
| **xAI** | Grok 4.1 | Real-time mastery. Fastest access to X data and high-speed reasoning. |
| **DeepSeek** | DeepSeek-V3.2 | Efficiency breakthrough. GPT-5 level logic at 1/15th the operational cost. |

**The important insight:** No single model is "best" at everything.

Claude tends to be better at nuanced writing, following complex instructions, and coding. GPT-4 is a strong generalist with the biggest ecosystem. Gemini handles massive documents better than anyone. Llama lets you run AI locally without sending data to a company.

You pick based on the job. It's like asking "what's the best vehicle?" Depends on the job, are you hauling furniture, racing, or driving kids to school?

---

### 2.4 How LLMs Are Priced

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

A typical back-and-forth chat message now costs less than **$0.00001** for "Flash-tier" models (like Gemini 3 Flash) and **$0.003 - $0.008** for frontier thinking models like Claude 4.5 or GPT-5.2. 2023-era models like GPT-3.5 are now essentially free or retired.

### 2.4.1 CAPEX vs. OPEX (The CFO Conversation)
- **Training is CAPEX:** It requires a massive upfront investment in GPUs and electricity (Capital Expenditure). This is for the Googles and OpenAIs of the world.
- **Inference is OPEX:** "Running" the model costs money every time you ask a question (Operating Expenditure).
- **The Trap:** Inference costs scale linearly with usage. If your product goes viral, your API bill explodes. You must forecast usage carefully.

---

### 2.5 How to Compare LLMs (Benchmarks)

Marketing claims are useless. Every company says their model is "the most advanced" or "state-of-the-art." So how do you actually compare?

Standardized benchmarks. These are like SAT scores for AI—everyone takes the same test, so you can compare apples to apples.

| Benchmark | What It Tests | State of the Art (Late 2025) |
|-----------|---------------|----------------|
| **Humanity's Last Exam (HLE)** | PhD-level reasoning (The new "SAT") | **50.7%** (Grok 4 Heavy) |
| **SWE-bench (Verified)** | Real-world software engineering | **81%** (Claude 4.5 Opus) |
| **GPQA Diamond** | Deep expert knowledge (Physics/Bio) | **93%** (GPT-5.2 Thinking) |
| **ARC-AGI-2** | Fluid intelligence (Novel puzzles) | **53%** (GPT-5.2 Thinking) |
| **LMSYS Arena** | Human preference (Double-blind) | **Claude 4.5 Opus** (Current Leader) |

**Why benchmarks matter—and why they don't:**

### The 2025 Warning: RLVR & "Gaming" the System
By late 2025, benchmarks became less reliable than ever. This is due to a new training stage called **Reinforcement Learning from Verifiable Rewards (RLVR)**.

In the old days (2022-2023), AI was trained by humans voting on which answer they liked (RLHF). Now, labs train AI against **objective rewards** (like a math problem with a single right answer or code that must pass a test). 
- **The Result:** AI "spontaneously" develops extreme reasoning and backtracking strategies to win the game. It isn't just "predicting the next word"; it's searching for the winning answer.
- **The Downside:** AI can learn to "game" the specific structure of a test without becoming smarter at general tasks. As [Andrej Karpathy](https://karpathy.bearblog.dev/year-in-review-2025/) noted, RLVR turns benchmarks into a high-stakes video game for models, occasionally inflating their "perceived" IQ.

### The New Scaling Law: Test-Time Compute
If you see a model score 90% on a test, you now have to ask: **How long did it think?**
Starting with OpenAI's **o3** and the **DeepSeek R1** breakthroughs in early 2025, we discovered a new knob for intelligence: **Test-Time Compute.** 
- Instead of just building a "bigger" model, we let the existing model "think longer" (generate thousands of hidden reasoning steps) before it gives an answer.
- The more time you give it to "reason," the higher the score—even for the exact same model.

**The real test:** Because of this "benchmarking game," don't trust a spreadsheet. Try it on **YOUR** specific use case. Benchmarks are now just the screening interview; your proprietary data is the job trial.

### 2.5.1 Hallucinations & Grounding
AI lies. We call it "hallucinating" to be polite, but it generates false information confidently.
- **Why:** Remember, it is just predicting the next word. Sometimes the most probable next word is a lie that sounds plausible.
- **The Fix (Grounding):** Force the AI to cite its sources. "Answer this question using ONLY the provided document." If it cannot find the answer in the document, it must say "I do not know."
- **Leadership Takeaway:** Never use a raw LLM for factual queries (e.g., "What is the law in Texas?"). Always use a Grounded system (RAG) that points to the specific statute.

### 2.5.2 Open vs. Closed Source Strategy
**Closed Models (OpenAI, Google, Anthropic):**
- **Pros:** Smartest models, easiest to use, managed security.
- **Cons:** You send your data to them. You are dependent on their pricing.

**Open Models (Llama, Mistral):**
- **Pros:** You control the data. You can run it on your own servers (privacy). No vendor lock-in.
- **Cons:** You need an engineering team to manage it. Slightly dumber than the top closed models.

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

Instead, tokenizers use a technique called "subword tokenization." They build a vocabulary of common chunks—maybe 50,000-100,000 tokens, that can combine to represent any text.

Common words like "the," "is," and "and" are single tokens. Less common words get split into recognizable pieces. The word "tokenization" might become ["token", "ization"]. This means even words the model has never seen can be processed—it just breaks them into familiar subparts.

![Tokenization](assets/tokens.png)

**Practical rules of thumb:**

- 1 token ≈ 4 characters in English
- 1 token ≈ ¾ of a word
- 1,000 tokens ≈ 750 words ≈ 1.5 pages of text
- 100,000 tokens ≈ a full novel

**Why this matters to you:**

Token limits determine how much you can send AND receive. If a model has a 4,000 token limit and your prompt uses 3,500 tokens, you only have 500 tokens left for the response. That's maybe 375 words which is about a page. Ask for a detailed analysis and you will get cut off mid-sentence.

Also: code is token-heavy. All those brackets, semicolons, and special characters each consume tokens. A 100 line Python script might use more tokens than a 500-word essay.

---

### 3.2 Context Windows — The AI's Short-Term Memory

The context window is everything the AI can "see" at once during a single conversation turn.

Think of it like working memory. When you are solving a math problem, you can only hold so many numbers in your head at once. The AI has a similar limitation except it's measured in tokens.

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

You are analyzing a 50-page legal contract. 50 pages ≈ 37,500 words ≈ 50,000 tokens.

You are analyzing a massive project folder containing 500 files, or several 1,000-page regulatory documents.

- **With an 8k context window (Legacy):** You literally can't fit the data. You'd need to chunk it into sections, analyze each separately, and somehow synthesize the findings. Error-prone and tedious.

- **With a 250k+ context window (Claude 4.5 / GPT-5):** Paste the entire set of documents. Ask "Find every conflict between these three 500-page contracts." Get a coherent answer is seconds.

- **With a 3M+ context window (Gemini 3):** Upload 4 hours of raw 8K video from a security camera. Ask "At what time did the delivery truck arrive, and what was the license plate?" The AI "watches" the whole video at once to find the answer.

**The 2025 Challenge: Context Drift**

While models can now "read" millions of tokens without forgetting (near 100% recall), they suffer from **Context Drift**. This means that by the middle of a massive project, the AI's "reasoning" might get lazy or distracted, even if it technically remembers the facts.

**Practical implication:** Put your most critical instructions at the very end of your prompt ("The Postscript Rule") to ensure the model's focus is freshest when it starts generating your answer.

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
| **GPT-5.2** | Model | Next-gen generalist; massive logic and multimodal performance jump. | **400k+** context; **93%+** GPQA score. | Strategic planning, high-end content creation. |
| **GPT-3** | Model | The model that proved scaling works. | 175 billion parameters. | Historical milestone in LLM development. |
| **Claude 4.5 Opus** | Model | Unmatched at coding and structured reasoning; very natural "human" voice. | **400k** context; **81%+** SWE-bench. | Engineering, creative writing, and data extraction. |
| **Gemini 3 Pro** | Model | Deeply integrated into productivity tools; massive reasoning jump. | **3M+** token context window. | Research, video analysis, and large-codebase management. |
| **Grok 4.1** | Model | High-speed model with real-time access to X data. | **2M** context window. | News analysis, customer service, and real-time monitoring. |
| **DeepSeek V3.2** | Model | Proved efficiency can match scale. | **671B** total / **37B** active parameters. | High-performance cost optimization. |
| **Llama 4** | Model | The powerhouse of open-weights. | **2T** total / **288B** active parameters. | Local hosting and privacy-critical apps. |
| **Tokens** | Mechanic | The basic unit of currency in LLMs (chunks of ~4 chars). | 1,000 tokens $\approx$ 750 words. | Budgeting and understanding model constraints. |
| **Context Window** | Mechanic | The AI's working memory for a single conversation. | Up to 3M+ (Gemini 3). | Analyzing books, hours of video, or entire project directories. |
| **Temperature** | Setting | Controls the "creativity" or randomness of output. | Scale: 0.0 (factual) to 1.0+ (random). | Balancing precision vs. brainstorming. |
| **o-series (o1/o3/o4)** | Model Type | Reasoning models that "think" before generating an answer. | Internal Chain of Thought & RL. | Complex math, science, and multi-step logic. |
| **Sora / Veo 3.1** | Modal | High-fidelity generative video; landmark **Disney/Marvel** licensing deal. | 60s+ 4K video generation. | Marketing, creative prototyping, and immersive content. |

---

> [Next Module: AI Agents Automation →](../03-AI-Agents-Automation)

