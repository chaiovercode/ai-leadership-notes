# Introduction to AI & Machine Learning

This module provides the foundation for the entire course. It breaks down the jargon, history, and core concepts needed to talk intelligently about AI.

---

## 📑 Table of Contents
1.  **AI Fundamentals**
    *   [What is AI?](#11-what-is-ai)
    *   [AI vs. Machine Learning vs. Deep Learning](#12-ai-vs-machine-learning-vs-deep-learning)
    *   [History and Evolution of AI](#13-history-and-evolution-of-ai)
    *   [AI in Business Today](#14-ai-in-business-today)
2.  **[Types of Machine Learning](#2-types-of-machine-learning)**
3.  **[Deep Learning Basics](#3-deep-learning-basics)**
4.  **[Deep Learning Architectures](#4-deep-learning-architectures)**

---

## 1. AI Fundamentals

### 1.1 What is AI?
**Definition:** AI is the science of making computers do things that require intelligence when done by humans. It is not magic; it is **math + data + compute**.
*   **Narrow AI (ANI):** Good at one thing (Chess, Spam filters). This is what we have today.
*   **General AI (AGI):** Good at everything (Human level). We are not there yet.

### 1.2 AI vs. Machine Learning vs. Deep Learning
Think of it as a Russian Doll (Matryoshka):

*   **Artificial Intelligence (The Box):** Any technique that enables computers to mimic human behavior. Includes simple "If-Then" rules.
*   **Machine Learning (The Inner Doll):** A subset of AI where machines *learn* from data without being explicitly programmed. "Here are 1000 cat photos, figure out the pattern."
*   **Deep Learning (The Core):** A subset of ML that uses **Neural Networks** (inspired by the brain) to solve complex problems like vision and language.

### 1.3 History and Evolution of AI
*   **1956:** "AI" coined at Dartmouth.
*   **1950s-80s (Symbolic AI):** Logic-based. Great at chess, failed at real-world messiness. (The "AI Winters" occurred when hype > reality).
*   **1990s-2000s (Statistical ML):** Probability-based. Spam filters, Search engines.
*   **2012 (Deep Learning Boom):** AlexNet. GPUs made neural nets viable.
*   **2017 (Transformers):** "Attention Is All You Need" paper. The birth of modern LLMs.
*   **Now (GenAI):** AI that creates.

### 1.4 AI in Business Today
*   **Democratization:** APIs allow any company to use Google/OpenAI's $100M models.
*   **Prediction vs. Judgment:** AI lowers the cost of *prediction*. Humans provide the *judgment*.
*   **The "Jagged Frontier":** AI is erratic—brilliant at code, bad at simple math. Leaders must verify capabilities experimentally.

---

## 2. Types of Machine Learning

Three ways machines learn:

1.  **Supervised Learning:** Learning with a teacher.
    *   *Input:* Data + Labels ("This specific image is a cat").
    *   *Use:* Predicting house prices, Fraud detection.
2.  **Unsupervised Learning:** Learning without a teacher.
    *   *Input:* Raw data ("Here is customer data, find patterns").
    *   *Use:* Customer segmentation, Recommendation engines.
3.  **Reinforcement Learning:** Learning by trial and error.
4.  **Data Processing and Model Evaluation**
    *   **Data Processing:** "Garbage In, Garbage Out." AI finds patterns in data. If the data is biased or messy, the AI will be too.
    *   **Train/Test Split:** You split your data into Training (80%) and Testing (20%). You never test the model on data it has already seen.
    *   **Evaluation:** Accuracy isn't everything. In fraud detection, 99.9% accuracy is useless if you miss every single fraud case (because fraud is rare). We use metrics like **Precision** and **Recall**.

---

## 3. Deep Learning Basics

### 3.1 What is Deep Learning?
Deep Learning is a specialized form of Machine Learning inspired by the structure of the human brain.
*   **Core Difference:** In traditional ML, a human must manually define features (e.g., "look for ears"). In Deep Learning, the model figures out the features itself.
*   **Why now?** It requires massive data and massive compute (GPUs), which only became available recently.

### 3.2 Neural Networks Architecture
*   **The Neuron:** A mathematical function that takes inputs, weights them, and produces an output.
*   **The Layer:**
    *   **Input Layer:** Raw data (pixels).
    *   **Hidden Layers:** The "black box" layers that extract patterns (edges -> shapes -> objects).
    *   **Output Layer:** The final prediction (Cat vs. Dog).
*   **Deep:** "Deep" just means "many hidden layers" (often 100+).

### 3.3 Deep Learning – Use Cases
*   **Computer Vision:** FaceID, Medical Imaging (detecting tumors), Self-driving cars.
*   **NLP (Language):** Google Translate, Sentiment Analysis, Chatbots.
*   **Audio:** Speech-to-text (Siri/Alexa), Music generation.

---

## 4. Deep Learning Architectures

*   **CNN (Convolutional Neural Networks):** Good for **Images/Video**. (Spatial patterns).
*   **RNN (Recurrent Neural Networks):** Good for **Sequence data**. (Time-series, old speech rec).
*   **Transformers:** Good for **Language/Context**. (The standard for GenAI).

---

> [Next Module: Generative AI](../02-Generative-AI)
