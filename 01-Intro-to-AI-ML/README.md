# Intro to AI & Machine Learning

> **"AI is not about building a brain. It's about building a machine that can recognize patterns in data better and faster than any human ever could."**

Alright, let's talk AI. And I mean *actually* talk about it—not throw jargon at you and hope something sticks. This guide is for people who need to understand what's happening under the hood without becoming a computer scientist overnight.

By the end of this, you won't just *know* what AI is—you'll understand *why* it works the way it does. That's the goal. Let's go.

---

## Table of Contents

1. [What Even Is AI?](#what-even-is-ai) — Breaking the hype.
2. [AI vs. ML vs. DL](#ai-vs-machine-learning-vs-deep-learning) — The Russian Doll analogy.
3. [A Quick History](#a-quick-history-the-cliff-notes-version) — How we got here.
4. [How Machines Actually Learn](#how-machines-actually-learn) — The 3 main methods.
5. [The Golden Rule: Data](#the-golden-rule-garbage-in-garbage-out) — Why your AI is only as good as your data.
6. [Deep Learning — The Magic Sauce](#deep-learning--why-things-got-so-good) — Why things suddenly got so good.
7. [The Architectures (CNN vs RNN)](#neural-network-architectures-the-right-tool-for-the-job) — Eyes vs. Memory.
8. [AI in Business — The Reality Check](#ai-in-business--the-reality-check) — Prediction vs. Judgment.
9. [Quick Reference Card](#quick-reference-card) — The "Cheat Sheet."

---

## What Even Is AI?

Here's the thing most people get wrong: AI isn't some mystical force. It's literally just **math + data + computing power**. That's the whole recipe. No consciousness, no "thinking" in the way you and I think. Just really, *really* good pattern matching.

Let me unpack that, because understanding this foundation changes everything.

### The Core Insight: Pattern Recognition

You know how you can spot a cat instantly? You've seen thousands of cats in your life—fluffy ones, grumpy ones, weird hairless ones. Your brain built a mental model of "cat-ness" without you even trying. Now when you see a new cat you've never encountered before, your brain goes "yep, that matches the pattern."

Here's what actually happened in your head: Your brain noticed that cats tend to have pointy ears, whiskers, a certain body shape, particular eye shapes. You never sat down and wrote a checklist—your brain just absorbed these patterns through exposure.

**AI does the exact same thing.** Except:

- It needs way more examples (like a million photos instead of a few thousand)
- Instead of neurons, it uses math equations
- Instead of "just knowing," it calculates probabilities

The "learning" is literally just the computer adjusting those equations until it stops making mistakes. When an AI looks at a photo and says "cat," what it's really saying is "based on all the patterns I've seen, this image has a 97% probability of matching the 'cat' pattern."

That's it. That's AI. Pattern matching at scale.

### The Two Flavors of AI

Now here's a crucial distinction that'll save you from a lot of sci-fi nonsense:

| Type | What It Means | Real Example |
|------|---------------|--------------|
| **Narrow AI** | Brilliant at **ONE** specific task. Can't do anything else. | Spotify knowing you'll love that obscure indie track. Your email's spam filter. FaceID unlocking your phone. |
| **General AI (AGI)** | Human-level intelligence across **ANY** task. Can learn new things the way we do. | Doesn't exist. Not even close. Think Jarvis from Iron Man—pure fiction (for now). |

Why does this matter? Because every headline screaming "AI will take over!" is conflating these two very different things.

Your spam filter is AI. It's incredibly good at one thing: spotting junk email. But ask it to play chess? Write a poem? Recognize your face? It has literally zero capability. It's a one-trick pony—a really, really good one-trick pony, but still.

> **Bottom Line:** Every single AI you've ever used—ChatGPT, Siri, Tesla Autopilot, all of it—is **Narrow AI**. It's a tool that's insanely good at specific things. It's not a person. It's not going to "wake up." It's a very fancy calculator that learned patterns instead of being programmed with rules.

---

## AI vs. Machine Learning vs. Deep Learning

People use these three terms like they mean the same thing. They don't. Think of them like Russian nesting dolls—each one fits inside the bigger one.

Let me walk you through this from the outside in, because understanding the distinction helps you understand what any given product is actually doing.

### Artificial Intelligence (The Big Umbrella)

This is the broadest term. It just means "a computer doing something that seems smart." That's it. A thermostat that turns on heat when it's cold? Technically AI. A chess program from 1995? AI. It's almost a philosophical term at this point.

The key idea: if a computer is making a decision that would require some level of intelligence from a human, it's AI.

### Machine Learning (The Game-Changer)

Here's where it gets interesting. Machine Learning is a *subset* of AI with one critical difference: **the system improves itself by looking at data.** You don't program every rule by hand—the machine figures out the rules from examples.

Let me show you why this matters with a concrete example.

**The Old Way (Rule-Based AI):**
Imagine writing a spam filter in 1995. You'd have to manually code rules:
- "If email contains 'Nigerian prince,' mark as spam"
- "If email contains 'FREE MONEY,' mark as spam"
- "If sender is unknown AND email has attachments, mark as spam"

The problem? Spammers adapt. They start writing "N1gerian pr1nce" or "FR33 M0NEY." Every new trick requires you to write a new rule. You're playing whack-a-mole forever.

**The ML Way:**
Instead of writing rules, you show the system 10,000 spam emails and 10,000 legitimate emails. You say "figure out what makes them different."

The ML system notices patterns you'd never think to code:
- Spam emails tend to have certain formatting quirks
- They use particular sentence structures
- They come from domains with specific characteristics
- They have unusual ratios of images to text

Now when a new spam technique emerges, the system often catches it automatically—because it learned the *pattern of spamminess*, not just specific keywords.

**The fundamental shift:** Traditional programming is "human writes rules → computer follows rules." Machine learning is "human provides examples → computer discovers rules."

### Deep Learning (ML on Steroids)

Deep Learning is a specific *type* of Machine Learning that uses something called "neural networks" (we'll dig into these later). It's what powers the stuff that feels magical: FaceID knowing it's you even with new glasses, ChatGPT writing essays, cars identifying pedestrians.

Why is it called "deep"? Because these neural networks have many layers—sometimes hundreds. Each layer learns increasingly abstract patterns. More depth = more nuance = better results (usually).

**The breakthrough insight:** Traditional ML still needed humans to tell the computer *what features to look for*. Deep Learning figures out the important features on its own. This was huge—it meant we could tackle problems that were previously impossible because humans couldn't even articulate what made something recognizable.

---

## A Quick History (The Cliff Notes Version)

Understanding where we came from explains why things are exploding *now* and not 30 years ago.

**1956: The Birth**
Some researchers coin the term "Artificial Intelligence" at a conference at Dartmouth. Everyone gets hyped. People predict human-level AI within 20 years. (Spoiler: they were very wrong.)

**1970s-90s: The AI Winters**
Reality check. Turns out, the ideas were ahead of the hardware. Computers were too slow. Data was too scarce. Funding dried up. These periods are called "AI Winters"—long stretches where everyone basically gave up because nothing worked as promised.

**2012: The Big Bang Moment**
A team enters an image recognition competition called ImageNet and absolutely destroys everyone else. Their error rate was nearly half of the second-place finisher. The secret? They realized that GPUs—the chips designed for video games—were accidentally perfect for the math AI needs.

Here's why that mattered: Training an AI requires doing the same calculation billions of times in parallel. CPUs (regular computer chips) are like having one really smart person doing calculations sequentially. GPUs are like having thousands of average people all calculating simultaneously. For AI math, the second approach is *way* faster.

Suddenly, computers could process data thousands of times faster than before.

**2017: The Transformer Revolution**
Google publishes a paper called "Attention Is All You Need" introducing the **Transformer** architecture. This single paper is the foundation for ChatGPT, Claude, Gemini—basically everything that's changing the world right now.

What did Transformers solve? Previous systems processed language word by word, like reading with a magnifying glass. Transformers could look at entire sentences (or paragraphs) at once and understand how every word relates to every other word. This let AI actually *understand context* in a way that felt human.

**So why is AI everywhere now when people have been promising it since the '50s?**

Three things finally lined up simultaneously:
1. **Compute:** GPUs (and later specialized AI chips) fast enough to crunch the numbers
2. **Data:** The internet gave us billions of images, documents, and examples to learn from
3. **Algorithms:** Transformers and other breakthroughs figured out *how* to learn effectively

The ideas weren't new—we just finally had the horsepower and raw material to make them real.

---

## How Machines Actually Learn

![How Machines Learn](./assets/how-machines-learn.png)

Alright, here's where it gets really interesting. There are three fundamentally different approaches to training an AI, and understanding them helps you understand what any AI product is actually doing under the hood.

### 1. Supervised Learning (The Teacher Method)

This is the most common approach. You give the machine data **AND** the correct answers. Then it learns to connect the two.

**The Analogy:** Teaching a kid with flashcards. You show them a picture of a cat and say "cat." Picture of a dog, say "dog." After hundreds of cards, the kid can identify animals they've never seen before—because they learned the *pattern*, not just memorized specific photos.

**What Actually Happens (The Logic):**

1. You feed the AI an example: "Here's a photo. The correct answer is 'cat.'"
2. The AI makes a guess using its current math equations: "I think... dog?"
3. You tell it how wrong it was: "Nope, that was way off."
4. The AI adjusts its internal equations slightly to be less wrong next time.
5. Repeat this millions of times.

The key insight: Each time the AI gets feedback, it tweaks its internal math to reduce errors. Over millions of examples, those tiny adjustments accumulate into something that seems intelligent.

It's like learning to throw darts. Your first throw might hit the wall. But after thousands of throws with feedback ("too far left," "too high"), you get closer and closer to the bullseye. The AI is doing the same thing, just with math instead of muscle memory.

**Business Examples:**
- Predicting loan defaults (train on 10,000 past loans where you know the outcome)
- Diagnosing diseases from X-rays (train on thousands of labeled scans)
- Spam filtering (train on millions of emails labeled "spam" or "not spam")

**The Catch:** You need labeled data. Someone has to tell the AI what the right answers are, and getting high-quality labels is often expensive and time-consuming.

### 2. Unsupervised Learning (The Explorer Method)

This one's trickier. You give the AI data but **NO answers**. No labels. No "right" results. You're basically saying "here's a pile of stuff—find me something interesting."

**The Analogy:** Dump 1,000 LEGO pieces on the floor and tell someone to group them. You don't say "by color" or "by shape" or "by size." They have to figure out what groupings make sense on their own.

**What Actually Happens (The Logic):**

The algorithm looks for natural structure in the data. Things that are similar get grouped together. Things that are different get separated.

For example, feed it data on all your customers—purchase history, browsing behavior, demographics. It might discover:
- Cluster A: Buy expensive items, browse on weekends, rarely return products
- Cluster B: Buy only during sales, check prices obsessively, high return rate
- Cluster C: Subscribed to newsletter, buy once quarterly, very brand loyal

You never told it these groups existed. It found them by noticing that certain behaviors tend to cluster together.

**Why This Is Valuable:**

Sometimes you don't know what you're looking for. Supervised learning requires you to define the question upfront ("Will this loan default?"). Unsupervised learning is for when you're asking "What patterns exist that I don't even know about?"

Humans can't analyze 10 million customer records and spot subtle patterns. Unsupervised learning can.

**Business Examples:**
- Customer segmentation (discovering buyer personas you didn't know existed)
- Anomaly detection (finding the weird transactions that don't fit any normal pattern)
- Market basket analysis (discovering that people who buy X also tend to buy Y)

### 3. Reinforcement Learning (The Trial & Error Method)

This one's fundamentally different from both approaches above. You don't give the AI data in the traditional sense. You give it a **goal** and a **reward system**, then let it figure out how to win.

**The Analogy:** Training a dog. The dog tries random stuff. When it sits on command, it gets a treat (positive reward). When it barks at guests, no treat (no reward or negative reward). Over time, it learns which behaviors lead to rewards.

**What Actually Happens (The Logic):**

1. The AI takes an action in some environment
2. The environment responds (new state + reward signal)
3. The AI learns: "That action in that situation gave me +10 points"
4. Over thousands of attempts, it builds a map: "In situation X, action Y tends to give the best rewards"

This is how DeepMind's AlphaGo beat the world champion at Go—a game so complex that you can't just show it examples of "good moves." Instead, it played millions of games against itself, slowly figuring out which strategies led to winning.

**The Key Difference:**
- Supervised learning: Learn from correct answers
- Unsupervised learning: Find patterns without answers
- Reinforcement learning: Learn from outcomes of actions

**Business Examples:**
- Optimizing warehouse robot movements
- Trading algorithms that learn profitable strategies
- Recommendation systems that learn what keeps users engaged
- Self-driving cars learning to navigate

---

## The Golden Rule: Garbage In, Garbage Out

This might be the most important section in this entire guide.

AI doesn't "know" anything. It doesn't have common sense. It doesn't have judgment. **It just repeats patterns it saw in the data.** If those patterns are flawed, the AI will be flawed—confidently and at scale.

### The Risk: Bias Amplification

Let's make this concrete. Say you're a company building an AI to screen job applications. You train it on 10 years of hiring data.

Sounds reasonable, right? Historical data on who got hired and who succeeded should teach the AI what to look for.

**The problem:** If your company (consciously or unconsciously) hired mostly men for the past 10 years, the AI learns that "being male" is a predictor of getting hired. It's not malicious—it's just pattern matching. The pattern in your data is "successful candidates tend to be male," so the AI weights maleness positively.

Now your AI is systematically disadvantaging female applicants, and it's doing it invisibly, at scale, with a veneer of "objectivity."

This isn't hypothetical. Amazon built exactly this system and had to scrap it when they discovered the bias.

### The Fix: Test on Data You Didn't Train On

Here's the standard practice and *why* it works:

**The 80/20 Split:**
1. Take your dataset
2. Use 80% to train the AI (the "training set")
3. Hide the remaining 20% from the AI completely (the "test set")
4. After training, test the AI on that hidden 20%

**Why this matters:** If an AI just memorizes its training data, it'll perform terribly on new data it's never seen. Testing on held-out data reveals whether the AI actually *learned patterns* or just *memorized examples*.

This is like the difference between a student who understands algebra and a student who memorized the answer key. Both might ace the homework, but only one will handle the final exam.

### Other Data Pitfalls to Watch For:

- **Selection bias:** Your data might not represent the real world (e.g., training a driving AI only on sunny California roads)
- **Historical bias:** Past decisions encoded into data might reflect prejudices you don't want to perpetuate
- **Measurement bias:** The way you collected data might systematically miss certain groups
- **Feedback loops:** The AI's predictions affect future data, which trains future models (e.g., predictive policing → more police in certain areas → more arrests there → data "confirms" those areas need more police)

---

## Deep Learning — Why Things Got So Good

Traditional machine learning had a ceiling. Here's why—and why deep learning broke through it.

### The Old Problem: Feature Engineering

Remember, ML learns from patterns in data. But *which* patterns? In traditional ML, humans had to specify what features the algorithm should pay attention to.

For image recognition, you'd have to tell the system: "Look at edge detection, color histograms, texture patterns, etc." This is called "feature engineering," and it's hard. It requires deep domain expertise, and you might miss important features you don't think to include.

**Deep Learning's breakthrough:** It figures out the important features automatically.

You feed it raw pixels. It discovers on its own that edges matter, then shapes, then objects. No human needed to specify "look for edges." The network learned that edges are useful for the task at hand.

### How Neural Networks Work (The Intuition)

A neural network is structured in layers. Let's trace what happens when you show it a photo of a cat.

![Neural Network Architecture](./assets/neural_network.png)

**Input Layer: Raw Data**
The photo enters as raw numbers—millions of pixels, each with red, green, and blue values. No meaning, just numbers. A 1000x1000 pixel image is 3 million numbers.

**Hidden Layers: The Magic**
This is where patterns emerge, and it happens hierarchically:

- **Layer 1** learns to detect simple things: edges, color gradients, basic contrasts. It notices "there's a sharp change from dark to light here."

- **Layer 2** combines those edges into shapes: "These edges form a curve," "These edges make a corner."

- **Layer 3** combines shapes into parts: "This curve with these features looks like an ear," "This combination looks like an eye."

- **Layer 4** combines parts into objects: "An ear plus two eyes plus whiskers in this arrangement... that's a cat."

Each layer builds on the previous one. The "deep" in deep learning refers to having many layers, which allows learning increasingly abstract concepts.

**The Key Insight:** Nobody programmed these layers to look for ears or eyes. The network discovered, through training, that these features are useful for distinguishing cats from dogs. It might even find features that humans wouldn't think of.

**Output Layer: The Prediction**
After all that processing, the final layer produces probabilities: "Cat: 97%, Dog: 2%, Other: 1%."

### Why This Was Revolutionary

Before deep learning, a team building an image recognizer would spend months doing feature engineering—manually defining what the algorithm should look for. Different experts might pick different features, and results varied wildly.

Deep learning commoditized this process. You define the architecture, provide the data, and the network figures out the features. This meant:
- Faster development
- Better results (networks found features humans missed)
- Transferability (features learned for cats often help recognize dogs)

> 📺 **Must Watch:** 3blue1brown's video [**But what is a neural network?**](https://www.youtube.com/watch?v=aircAruvnKk) is the single best visual explanation ever made. 20 minutes that'll change how you see this stuff.

---

## Neural Network Architectures (The Right Tool for the Job)

Not all neural networks are the same. Different architectures are optimized for different types of problems. Think of it like tools in a toolbox—you wouldn't use a hammer on a screw.

### CNNs (Convolutional Neural Networks): Built for Vision

**What they're good at:** Anything involving images or spatial patterns.

**The intuition:** When you look at a photo, you don't examine each pixel independently. You look at regions—a cluster of pixels that form an eye, a patch that looks like fur. CNNs work the same way.

They slide a small "window" across the image, looking at local patterns. "Is there an edge here? A curve there?" Then they combine those local findings into bigger patterns.

**Why this matters:** A cat's eye looks like a cat's eye whether it's in the top-left or bottom-right of the photo. CNNs learn patterns that are *position-independent*, which is exactly what you want for visual recognition.

**Real-world examples:**
- Tesla's cameras identifying stop signs, pedestrians, lane lines
- Medical imaging (detecting tumors in X-rays)
- Facial recognition systems
- Quality control in manufacturing (spotting defects)

### RNNs (Recurrent Neural Networks): Built for Sequences

**What they're good at:** Anything where order matters—text, time series, audio.

**The intuition:** When reading a sentence, each word's meaning depends on what came before. "Bank" means something different after "river" than after "savings." RNNs have "memory"—they carry information from earlier in the sequence forward.

**How it works:** Unlike feedforward networks where information flows one direction, RNNs loop back. The output at step 5 influences the processing at step 6. This creates a form of short-term memory.

**The limitation:** Traditional RNNs struggle with long sequences. By the time you're at word 500, information from word 1 has largely faded. It's like trying to remember the beginning of a novel when you're near the end.

**Real-world examples:**
- Predicting the next word as you type
- Speech recognition
- Machine translation (older systems)
- Stock price prediction

### Transformers: The New King

**What they're good at:** Language, and increasingly everything else.

**The breakthrough:** Transformers solved the memory problem of RNNs with something called "attention."

**The intuition:** Instead of processing a sentence word by word (remembering less and less of the beginning), Transformers look at the *entire sequence at once* and figure out which parts relate to which other parts.

When processing "The cat sat on the mat because it was tired," a Transformer directly connects "it" to "cat"—even though they're separated by several words. It's asking "when I see 'it,' what earlier word should I pay attention to?"

**Why this changed everything:** This architecture scales beautifully. You can train Transformers on massive datasets, and they keep getting better. GPT-3 has 175 billion parameters. GPT-4 is rumored to be much larger. Claude, Gemini, and every major language model uses this architecture.

**Real-world examples:**
- ChatGPT, Claude, Gemini (language understanding and generation)
- DALL-E, Midjourney (image generation, using modified Transformer architectures)
- Code completion (GitHub Copilot)
- Document summarization, translation, writing assistance

---

## AI in Business — The Reality Check

Okay, you understand how AI works now. But what does this mean for your organization? Two key insights:

### 1. The API Revolution

Here's the most important shift: **You don't need a PhD to use AI anymore.** You don't need a team of ML engineers. You don't need to train your own models.

You need an API key.

Companies like OpenAI, Anthropic, and Google have spent billions training massive models. They rent access to these models for fractions of pennies per request. You can "borrow" the smartest AI systems in the world the same way you'd use a cloud database.

This is like the difference between building your own power plant versus plugging into the electrical grid. The grid democratized access to electricity. APIs are democratizing access to AI.

**What this means practically:**
- A startup can add ChatGPT-level capabilities to their product in a weekend
- A small business can automate customer service without hiring an ML team
- Prototyping AI features went from months to hours

### 2. Prediction vs. Judgment

This is the framework that helps you understand what AI changes and what it doesn't.

**AI dramatically lowers the cost of PREDICTION.**

What is prediction? It's guessing what will happen based on available information:
- Will this customer churn?
- Is this transaction fraudulent?
- What product will this user want to see next?
- Will this loan default?

These used to require expensive human expertise or were simply impossible at scale. Now they're cheap. You can predict things you never could before, at a scale that was unimaginable.

**But humans still own JUDGMENT.**

Judgment is deciding *what to do* about a prediction:
- The AI predicts this customer will churn. Do we offer them a discount? Change our product? Let them go?
- The AI flags this transaction as potentially fraudulent. Do we block it, flag it for review, or let it through?
- The AI predicts this patient might have cancer. Do we recommend surgery, wait for more tests, or get a second opinion?

Prediction tells you the probabilities. Judgment decides the response.

> 🔎 **Thought Exercise:** If AI makes prediction essentially free, what becomes more valuable in your organization?

**The answer:** The people who know which predictions to ask for, and the people who can make wise judgments about what to do with those predictions. The strategists. The decision-makers. The people who understand context, ethics, and second-order effects.

AI doesn't replace judgment. It makes judgment more powerful—and more important.

---

## Quick Reference Card

When you need a fast reminder, here's your cheat sheet:

| AI Subfield/Approach | Primary Learning Method | Analogy | Business Examples | Key Architecture or Mechanism | Strengths & Limitations |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Artificial Intelligence** | Rule-based or Pattern Matching | A thermostat or a chess program from 1995. | Thermostats adjusting heat; early chess software. | Human-written rules or broad decision-making logic. | Broadest term; can be as simple as a thermostat but lacks self-improvement from data. |
| **Machine Learning (ML)** | Pattern discovery from data | Human provides examples $\rightarrow$ computer discovers rules. | Spam filtering (learning patterns of 'spamminess'). | Statistical models that improve by looking at data examples. | Solves the 'whack-a-mole' problem of manual rules; requires high-quality labeled data. |
| **Deep Learning (DL)** | Hierarchical pattern recognition | Russian nesting dolls (it is a specific type of ML). | FaceID; autonomous vehicles; ChatGPT. | Neural networks with many layers (Deep). | Figures out important features automatically; requires massive compute and data. |
| **Supervised Learning** | The Teacher Method (Labeled data) | Teaching a kid with flashcards. | Loan default prediction; diagnosing diseases from X-rays. | Feedback loop: feeding examples with correct answers and adjusting math to reduce error. | Highly accurate for specific tasks; getting high-quality labels is expensive and time-consuming. |
| **Unsupervised Learning** | The Explorer Method (Unlabeled data) | Grouping 1,000 random LEGO pieces without instructions. | Customer segmentation; anomaly detection; market basket analysis. | Clustering and finding natural structures in data without predefined labels. | Finds unknown patterns; difficult to measure success compared to supervised learning. |
| **Reinforcement Learning** | The Trial & Error Method | Training a dog with treats and rewards. | Warehouse robot movements; trading algorithms; self-driving cars. | Agent takes action in an environment to maximize a reward signal. | Excellent for complex goal-oriented tasks; can be difficult to define the reward system correctly. |
| **Convolutional Neural Networks (CNNs)** | Spatial pattern recognition | Sliding a small 'window' across an image to see local patterns. | Tesla cameras; medical imaging; manufacturing quality control. | Convolutional layers that learn position-independent visual features. | Best for vision/images; optimized for spatial patterns. |
| **Recurrent Neural Networks (RNNs)** | Sequential processing with memory | Reading a sentence where each word depends on the one before it. | Next-word prediction; speech recognition; stock price prediction. | Feedback loops that carry information from earlier in a sequence forward. | Good for sequences; struggles with long-term memory (fades over long sequences). |
| **Transformers** | Attention-based sequence processing | Looking at an entire paragraph at once instead of through a magnifying glass. | ChatGPT; Claude; GitHub Copilot; document summarization. | Attention mechanism that relates all parts of a sequence simultaneously. | Scales beautifully and understands long-range context; extremely compute-intensive. |

---

## Deep Dive: Best Visual Explanations

If you want to go further, these are the gold standards:

- **[But what is a Neural Network?](https://www.youtube.com/watch?v=aircAruvnKk)** (3blue1brown) — 20 mins. The single best visualization of how neural networks actually work mathematically. If you watch one thing, watch this.

- **[AI For Everyone](https://www.coursera.org/learn/ai-for-everyone)** (Andrew Ng) — A full course designed for non-technical professionals. Covers what AI can and can't do, how to spot opportunities, and how to work with AI teams.

---

> [Next Module: Generative AI →](../02-Generative-AI)