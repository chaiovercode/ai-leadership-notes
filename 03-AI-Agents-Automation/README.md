# AI Agents & Automation

> "The future isn't just chatting with AI; it's about AI doing work for you."

We are moving from **Chatbots** (which just talk) to **Agents** (which can take action). This is the shift from "Human-in-the-loop" to "Human-on-the-loop."

---

## 📑 Table of Contents
1.  [Understanding Agentic Systems](#1-understanding-ai-agentic-systems)
2.  [The Agent Architecture](#2-tools-models-orchestration--memory)
3.  [Agentic Design Patterns](#3-agentic-design-patterns)
4.  [Running Open-Source Models](#4-running-open-source-models)
5.  [Hands-on Business Examples](#5-hands-on-examples)

---

## 1. Understanding AI Agentic Systems

### Chatbot vs. Agent
*   **Chatbot (ChatGPT):** Input -> Answer. It’s passive. It relies entirely on its training data.
*   **Agent:** Perception -> Reasoning -> **Action** -> Observation -> Reasoning -> Action.
    *   An agent has "hands" (tools).
    *   It can browse the web, query a database, write to a file, or send an email.

### The Autonomy Spectrum
1.  **Copilot:** Human initiates, AI assists (e.g., GitHub Copilot).
2.  **Autopilot:** Human sets a goal, AI executes a specific workflow (e.g., "Summarize these 50 PDFs").
3.  **Agent:** Human gives a vague goal ("Book me a vacation"), AI figures out the steps, tool usage, and handles errors.

---

## 2. Tools, Models, Orchestration & Memory

An agent isn't just a model; it's a system (often called a "Compound AI System").

### The Brain (The Model)
Ideally a smart model (GPT-4o, Claude 3.5 Sonnet) that handles the logic and planning.

### The Hands (Tools)
APIs that the model can "call".
*   Google Search
*   Slack API
*   Your internal SQL Database
*   Calculator

### The Memory (Context)
*   **Short-term Memory:** The current conversation history.
*   **Long-term Memory:** A Vector Database (like Pinecone or ChromaDB) where the agent stores facts to recall weeks later.

### The Orchestrator
Frameworks that glue this together.
*   **LangChain / LangGraph:** The industry standard for building custom chains.
*   **CrewAI / AutoGen:** Frameworks for *Multi-Agent* systems (where one agent is the "Researcher" and another is the "Writer").

---

## 3. Agentic Design Patterns

How do agents "think"?

### A. ReAct (Reason + Act)
The model forces itself to write out a thought process before acting.
*   *Thought:* "The user asked for the weather. I need to use the weather tool."
*   *Action:* `get_weather("New York")`
*   *Observation:* "20°C and sunny."
*   *Final Answer:* "It's 20 degrees in New York."

### B. Planning
Breaking a complex goal ("Write a market report") into steps *before* executing any of them.
1. Search specifically for competitors.
2. Read the top 3 PDFs.
3. Extract financial data.
4. Write summary.

### C. Reflection / Self-Correction
The agent reviews its own output.
*   *Draft:* "Here is the code..."
*   *Critique:* "Wait, this code has a bug on line 5."
*   *Revision:* "Here is the fixed code."

---

## 4. Running Open-Source Models

For sensitive business data, you might not want to send everything to OpenAI.

*   **Llama 3 (Meta):** State-of-the-art open model.
*   **Ollama:** A tool to run Llama 3 locally on your laptop (Mac/Windows) with zero setup.
*   **Benefits:** Privacy (data never leaves the device), Cost (free), Customization.

---

## 5. Hands-on Examples

### Use Case 1: The "24/7 SDR" (Sales Dev Rep)
*   **Trigger:** New lead fills out a form.
*   **Agent:**
    1.  Scrapes the lead's LinkedIn profile.
    2.  Reads their company's latest news.
    3.  Drafts a highly personalized email.
    4.  Saves draft to CRM.
*   **Human Role:** Just approves the draft.

### Use Case 2: The "Contract Reviewer"
*   **Trigger:** New PDF uploaded to legal folder.
*   **Agent:**
    1.  Reads PDF.
    2.  Checks against a "Risky Clauses" playbook (Memory).
    3.  Highlights 3 dangerous terms.
    4.  Slacks the Legal Counsel.

---

> [Next Module: Applications of AI in Business](../04-AI-Business-Applications)
