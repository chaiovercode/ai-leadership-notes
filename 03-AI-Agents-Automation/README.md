# AI Agents & Automation

> **"If Generative AI is the brain, an AI Agent is the brain with hands."**

In the previous modules, we covered AI that recognizes patterns (Module 1) and AI that creates content (Module 2). This module is about the next evolution: AI that doesn't just think or write—it **acts**.

Chatbots talk. Agents *do*. That's the shift happening right now.

---

## Table of Contents

1. [From Chatbots to Agents](#from-chatbots-to-agents)
   - [What's the Difference?](#whats-the-difference)
   - [Traditional Software vs. AI Agents](#traditional-software-vs-ai-agents)
2. [How Agents Work](#how-agents-work)
   - [The Four Core Components](#the-four-core-components)
   - [The Agent Loop](#the-agent-loop-in-action)
3. [Tools — The Agent's Hands](#tools--the-agents-hands)
   - [What Counts as a Tool?](#what-counts-as-a-tool)
   - [How the AI Chooses Tools](#how-the-ai-chooses-tools)
4. [Memory — How Agents Remember](#memory--how-agents-remember)
   - [Short-Term Memory](#short-term-memory)
   - [Long-Term Memory](#long-term-memory-vector-databases)
5. [Agentic Design Patterns](#agentic-design-patterns)
   - [Reflection](#1-reflection--self-checking)
   - [Planning](#2-planning--think-before-acting)
   - [Multi-Agent Systems](#3-multi-agent-collaboration)
6. [Which Models Make Good Agents?](#which-models-make-good-agents)
7. [Running Models Locally](#running-models-locally-for-privacy)
8. [Frameworks to Build Agents](#frameworks-to-build-agents)
9. [Recommended Deep Dives](#recommended-deep-dives)

---

## From Chatbots to Agents

### What's the Difference?

Let me make this distinction crystal clear, because it's fundamental to understanding why agents matter.

| Chatbot | Agent |
|---------|-------|
| Waits for you to ask something | Takes initiative to complete a goal |
| Gives you information | Takes actions on your behalf |
| Single turn: question → answer | Multi-step: goal → plan → execute → verify |
| "Here's how to book a flight" | *Actually books the flight for you* |

**The core insight:** A chatbot is like calling a knowledgeable friend for advice. An agent is like hiring an assistant who actually does the work.

With a chatbot, you're still the one doing things—the AI just tells you what to do. With an agent, you specify the outcome you want, and the AI figures out the steps and executes them.

> **Real Example — The Difference in Action:**
> 
> **Chatbot interaction:**
> You: "Help me find flights to Tokyo"
> Bot: "Here are some options: JAL has flights for $800, ANA for $750..."
> You: "Book the ANA one"
> Bot: "To book, visit ana.com and enter your details..."
> 
> You still have to visit the site, fill out forms, enter payment info, select seats...
> 
> **Agent interaction:**
> You: "Book me the cheapest flight to Tokyo for next month, window seat, vegetarian meal"
> Agent: *searches flights → compares prices → selects best option → fills out booking form → enters your saved payment info → selects window seat → requests vegetarian meal → confirms booking → sends you the confirmation*
> You: *receive email with boarding pass*

That's the vision. We're not fully there for everything yet—but we're getting remarkably close for many tasks.

---

### Traditional Software vs. AI Agents

This distinction helps you understand what makes agents fundamentally different from the software we've built for decades.

**Traditional Software = Recipe Following**

```
IF user clicks "Submit" THEN validate form
IF email is valid THEN save to database
IF save fails THEN show error message
```

Every possible scenario must be pre-programmed by a developer. The software follows explicit rules created by humans. It's incredibly reliable for known situations, but completely helpless when something unexpected happens.

Think of traditional software like a very obedient but unintelligent employee. It does exactly what you told it to do, nothing more, nothing less. If you didn't write a rule for a situation, it either crashes, shows an error, or does nothing.

**AI Agents = Goal Following**

```
GOAL: "Get this expense report approved"

Agent thinks: "First I need to check if all receipts are attached... 
Missing one for the hotel. Let me email the user for it...
Got it. Now I'll submit to the finance system...
Rejected - exceeded policy limit. Let me flag for manager approval...
Manager approved. Done."
```

The agent has a goal, not a script. It encounters obstacles and reasons through them. It doesn't need every path pre-programmed because it can figure out alternatives.

**Why is this a big deal?**

Traditional software development is essentially the programmer thinking through every possible scenario in advance and coding solutions for each. That's expensive, time-consuming, and impossible for complex real-world situations with millions of edge cases.

Agents can handle situations the developer never explicitly programmed for. They use reasoning (the LLM) to navigate novel situations.

> **Concrete Example:**
> 
> You tell an agent: "Schedule a meeting with Sarah next week."
> 
> **Traditional software would need** explicit instructions for every step:
> - What day? (requires user input)
> - What time? (requires user input)  
> - What calendar platform? (requires configuration)
> - Sarah's email? (requires user to provide)
> - What if she's busy? (requires programmer to handle this case)
> - What if you're both busy? (requires programmer to handle this case)
> 
> **An agent** figures it out:
> 1. Checks your calendar API for your availability
> 2. Looks up Sarah in your contacts
> 3. Checks Sarah's calendar (via calendar API) for her availability
> 4. Finds overlapping free slots
> 5. Picks the most reasonable one (not 6am, not lunch hour)
> 6. Creates the calendar invite
> 7. Sends it
> 8. If Sarah declines, automatically tries another slot
> 
> Nobody programmed step 8. The agent reasons: "The goal was to schedule a meeting. The meeting isn't scheduled yet. What can I try next?"

---

## How Agents Work

Now let's get into the mechanics. What's actually happening inside an agent?

### The Four Core Components

Think of an agent like a person doing a job. A person has a brain (for thinking), hands (for doing), plans (for organizing), and eyes (for seeing results). Agents have the same:

```
┌─────────────────────────────────────────────────────────────────┐
│                        AI AGENT                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   BRAIN (LLM)         →  Reasoning and decision-making      │
│      Claude, GPT-4           "What should I do next?"          │
│                                                                 │
│   TOOLS (Hands)       →  Actions it can take                │
│      APIs, functions         Search web, send email, run code  │
│                                                                 │
│   PLANNING            →  Breaking goals into steps          │
│                              "First X, then Y, then Z"         │
│                                                                 │
│   OBSERVATION         →  Seeing results and adapting        │
│                              "That worked. Now what?"          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Let me explain each:**

**Brain (LLM):** This is the core intelligence—Claude, GPT-4, or another language model. It does the reasoning: understanding what you want, deciding what to do, interpreting results, handling problems. Without the brain, there's no intelligence—just dumb automation.

**Tools (Hands):** The LLM on its own can only generate text. It can't actually search the web, send emails, or query databases. Tools are functions the LLM can call to take real actions. We'll dig deep into this in the next section.

**Planning:** Complex tasks can't be done in one step. Planning is the ability to break a goal into sub-goals, decide on order, and track progress. "To write this report, I first need to gather data, then analyze it, then draft sections, then review."

**Observation:** After each action, the agent needs to see what happened. Did the search return useful results? Did the email send? Did the code run without errors? Observation feeds back into the brain for the next decision.

---

### The Agent Loop in Action

These four components work together in a loop. Let me trace through a real example so you can see exactly what happens:

> **Your request:** "Find the top 3 competitors of Acme Corp and summarize their pricing"

```
┌──────────────────────────────────────────────────────────────────┐
│ STEP 1: THINK                                                    │
│ Brain receives your goal. Reasons: "To find competitors, I      │
│ should search the web. I don't have this information."          │
│                                                                  │
│ Decision: Use web search tool                                   │
├──────────────────────────────────────────────────────────────────┤
│ STEP 2: ACT                                                      │
│ Agent calls: web_search("Acme Corp main competitors")           │
│                                                                  │
│ This actually executes - a real search happens                  │
├──────────────────────────────────────────────────────────────────┤
│ STEP 3: OBSERVE                                                  │
│ Search returns results. Brain reads them:                       │
│ "BetaCo, GammaTech, and DeltaInc appear to be main competitors" │
│                                                                  │
│ Brain updates its understanding of the situation                │
├──────────────────────────────────────────────────────────────────┤
│ STEP 4: THINK                                                    │
│ "I have the competitor names. Now I need pricing. The goal      │
│ was pricing summaries. I should check their websites."          │
│                                                                  │
│ Decision: Scrape pricing pages                                  │
├──────────────────────────────────────────────────────────────────┤
│ STEP 5: ACT                                                      │
│ Agent calls:                                                     │
│   web_scrape("betaco.com/pricing")                              │
│   web_scrape("gammatech.com/pricing")                           │
│   web_scrape("deltainc.com/pricing")                            │
├──────────────────────────────────────────────────────────────────┤
│ STEP 6: OBSERVE                                                  │
│ Results come back:                                               │
│ - BetaCo: Got pricing page content ✓                            │
│ - GammaTech: "Page requires login" ✗                            │
│ - DeltaInc: Got pricing page content ✓                          │
│                                                                  │
│ Brain notices: One failed. Goal not yet complete.               │
├──────────────────────────────────────────────────────────────────┤
│ STEP 7: THINK                                                    │
│ "GammaTech's pricing is gated. I can't log in. But maybe        │
│ I can find their pricing on a review site like G2 or            │
│ Capterra. Let me try that."                                     │
│                                                                  │
│ Decision: Alternative search                                     │
├──────────────────────────────────────────────────────────────────┤
│ STEP 8: ACT                                                      │
│ Agent calls: web_search("GammaTech pricing G2 review")          │
├──────────────────────────────────────────────────────────────────┤
│ STEP 9: OBSERVE                                                  │
│ "Found G2 page with pricing tiers listed!"                      │
│                                                                  │
│ Now have all three competitors' pricing info.                   │
├──────────────────────────────────────────────────────────────────┤
│ STEP 10: THINK                                                   │
│ "I have pricing for all three. The user wanted a summary.       │
│ Let me synthesize this into a clear comparison."                │
├──────────────────────────────────────────────────────────────────┤
│ FINAL: Generate and deliver the summary                          │
│                                                                  │
│ "Here are the top 3 competitors and their pricing:              │
│  BetaCo: $29/mo starter, $99/mo pro, $299/mo enterprise         │
│  GammaTech: $49/mo base, custom enterprise pricing              │
│  DeltaInc: $39/mo all-inclusive, $199/mo team plan              │
│                                                                  │
│ Key differences: BetaCo is cheapest entry point, DeltaInc       │
│ has simplest structure, GammaTech targets enterprise..."        │
└──────────────────────────────────────────────────────────────────┘
```

**The key insight:** Notice step 7. The agent hit an obstacle—a login wall—and it didn't fail. It reasoned through an alternative approach. Nobody programmed "if login wall, try G2." The LLM brain figured that out.

This is the fundamental difference from traditional automation. Traditional automation fails or requires human intervention when unexpected things happen. Agents reason through obstacles.

---

## Tools — The Agent's Hands

Here's a crucial concept: **an LLM by itself can only generate text**. That's it. It can write beautiful prose about how to search the web, but it can't actually search the web.

Tools are what give agents the ability to act in the world.

### What Counts as a Tool?

A tool is any function the AI can call. Technically, it's an API or piece of code that:
1. The agent knows exists (via a description)
2. The agent can invoke with parameters
3. Returns a result the agent can observe

| Tool Type | Examples | What It Does |
|-----------|----------|--------------|
| **Search** | Google, Bing, Perplexity | Find current information on the web |
| **Browse** | Web scraper, URL reader | Read and extract content from websites |
| **Code** | Python executor, terminal | Run calculations, scripts, data processing |
| **Data** | SQL query, API call | Access databases and external services |
| **Communication** | Email, Slack, SMS | Send messages to people |
| **Files** | Read/write docs, PDFs | Handle documents, create/modify files |
| **Custom** | Your company's CRM, ERP | Whatever you build and connect |

**The mental model:** Think of tools like apps on a smartphone. The phone (LLM) is powerful, but without apps (tools), it can't do much useful. Each app gives the phone a new capability. Same with agent tools.

> **Concrete Example:**
> 
> A "Customer Support Agent" might have these tools:
> 
> | Tool | What it does |
> |------|--------------|
> | `search_knowledge_base(query)` | Searches help articles for relevant answers |
> | `get_customer_info(email)` | Pulls up account details from the database |
> | `create_ticket(details)` | Logs an issue in the ticketing system |
> | `send_email(to, subject, body)` | Sends email to the customer |
> | `escalate_to_human(reason)` | Hands off to a human when the agent is stuck |
> 
> When a customer emails with a problem, the agent can: look up their account (tool 2), search for solutions (tool 1), try to resolve it (tool 4), and if it can't, escalate (tool 5). All without human intervention for routine issues.

---

### How the AI Chooses Tools

This is where it gets interesting. The agent reads tool descriptions and decides which one fits the current need. It's doing a form of reasoning about capabilities.

Here's what tool definitions look like (simplified):

```python
tools = [
    {
        "name": "web_search",
        "description": "Search the internet for current information. 
                        Use when you need facts, news, or data you don't have.",
        "parameters": {"query": "string"}
    },
    {
        "name": "calculator", 
        "description": "Perform mathematical calculations. 
                        Use for any math beyond basic arithmetic.",
        "parameters": {"expression": "string"}
    },
    {
        "name": "send_email",
        "description": "Send an email to a recipient. 
                        Use when the user wants to communicate via email.",
        "parameters": {"to": "string", "subject": "string", "body": "string"}
    }
]
```

**What happens when you ask: "What's 15% tip on a $47.50 bill?"**

1. The LLM receives your question
2. It also receives the list of available tools with descriptions
3. It reasons: "This is a math problem. I see there's a calculator tool for math."
4. It decides to call: `calculator(expression="47.50 * 0.15")`
5. Calculator returns: 7.125
6. Agent responds: "A 15% tip on $47.50 would be $7.13"

**The critical insight:** The AI is reading the tool descriptions like a human would read instruction manuals. Good descriptions = correct tool choice. Vague descriptions = confused AI making wrong calls.

**Pro tip for building agents:** Write tool descriptions like you're explaining to a smart but uninformed person when exactly to use each tool. Be specific about use cases and limitations.

Bad: `"Searches the web"`
Good: `"Searches the web for current information. Use when you need facts, news, or real-time data that might have changed after 2024. Do NOT use for general knowledge questions you already know."`

---

## Memory — How Agents Remember

When an agent works on a multi-step task, it needs to remember what it's done. "I already searched for flights. I found 5 options. Now I'm filtering by price." Without memory, the agent would be lost after each step.

There are two types of memory, and they work very differently.

### Short-Term Memory

This is simply the conversation context—everything that's happened in the current session.

**How it works:** Every message you send, every action the agent takes, and every result it observes gets added to the context window (remember this from Module 2). The LLM "remembers" by literally having all that text in its input.

> **Example of short-term memory in action:**
> 
> Step 1: User asks to find flights → Agent searches → Finds 5 options
> Step 2: User says "filter by price under $500" → Agent already knows the 5 options (they're in context) → Filters to 3
> Step 3: User says "which have window seats?" → Agent still knows the 3 remaining options → Checks seat availability → 2 have windows
> Step 4: User says "book the cheaper one" → Agent knows the 2 remaining, compares prices, books the cheaper one
> 
> At each step, the agent has access to everything that happened before—because it's all sitting in the context window.

**The limitation:** Context windows have limits (even the huge 200k token ones). A really long, complex task might overflow. When that happens, the earliest parts of the conversation get pushed out, and the agent "forgets" them.

This is why you sometimes see agents lose track of things mentioned much earlier in long conversations—the information literally isn't in their context anymore.

---

### Long-Term Memory (Vector Databases)

Short-term memory disappears when the conversation ends. But what if you want an agent to remember things across sessions? That's where long-term memory comes in.

**The problem we're solving:** You work with an AI assistant for months. You want it to remember your preferences, past projects, things you've discussed. But each conversation starts fresh—the AI has no memory of previous sessions.

**The solution:** Store information externally, and retrieve it when relevant.

**How vector databases work (the key insight):**

Normal databases store data and let you search by exact matches or keywords. "Find all customers named John." That's great for structured data.

But what if you want to find "that conversation where we discussed the marketing strategy problem"? There's no single keyword to search. You need *semantic* search—finding things by meaning, not exact words.

Vector databases enable this through a process called embedding:

1. **Convert text to numbers:** Take a piece of text ("We discussed expanding to European markets") and run it through an embedding model. This produces a vector—a list of numbers like [0.23, -0.87, 0.45, ...] that mathematically represents the *meaning* of that text.

2. **Store the vectors:** Save these numerical representations in a special database optimized for comparing vectors.

3. **Search by similarity:** When you need to find relevant information, convert your query to a vector and find stored vectors that are mathematically "close" to it. Close vectors = similar meanings.

> **Concrete Example:**
> 
> You've been working with a legal research agent for months. It's analyzed hundreds of cases.
> 
> Now you ask: "Find cases similar to the Johnson v. Smith ruling we looked at last month"
> 
> **What happens:**
> 1. Your query gets converted to a vector
> 2. The system searches the vector database for similar vectors
> 3. It finds the summary of Johnson v. Smith (high similarity score)
> 4. It also finds 5 other cases you analyzed that had similar themes
> 5. This information gets injected into the agent's context
> 6. The agent can now work with this info, even though the original conversation is long gone
> 
> The agent "remembers" by retrieval, not by actually storing memories internally.

**Common vector databases:**

| Database | Best For | Notes |
|----------|----------|-------|
| **Pinecone** | Production workloads | Managed service, scales easily, reliable |
| **Chroma** | Getting started, local dev | Simple setup, great for prototyping |
| **Weaviate** | Self-hosted production | Open-source, run on your own infrastructure |
| **Qdrant** | High performance needs | Built in Rust, very fast |

---

## Agentic Design Patterns

Through trial and error, the AI community has discovered patterns that make agents more reliable. These aren't just nice-to-haves—they often make the difference between an agent that mostly works and one that's actually useful.

### 1. Reflection — Self-Checking

**The problem:** Agents make mistakes. They might write code with bugs, emails with typos, or reports with errors. Without reflection, these mistakes go straight to the user.

**The solution:** Have the agent review its own work before delivering.

**How it works:**

```
Agent's internal process:

[Task: Write an email to reschedule the client meeting]

Step 1: Write the email draft

Step 2: Review (Reflection)
"Let me check my work:
- Did I include all the points the user mentioned? ✓ Yes
- Is the tone appropriate for a client? ✓ Yes
- Did I spell the recipient's name correctly? ✗ No! Wrote 'Micheal' instead of 'Michael'
- Is the call-to-action clear? ✓ Yes
- Did I include proposed alternative times? ✗ No! User wanted new times suggested"

Step 3: Fix the issues

Step 4: Review again

Step 5: If good, deliver to user
```

**Why this works:** It's the same reason proofreading improves writing. A second pass catches errors the first pass missed. The agent is essentially doing its own proofreading.

> **Real Example — Code Generation:**
> 
> Without reflection:
> - Agent writes code
> - Delivers to user
> - Code has a bug
> - User has to debug or ask for fix
> 
> With reflection:
> - Agent writes code
> - Agent runs the code in a sandbox
> - Observes: "Error on line 15: undefined variable"
> - Fixes the bug
> - Runs again
> - Works correctly
> - Delivers working code to user

---

### 2. Planning — Think Before Acting

**The problem:** Complex tasks have many steps. If the agent just starts doing things without a plan, it often goes in circles, misses steps, or does things in the wrong order.

**The solution:** Make the agent create a roadmap before executing.

**Without planning:**
```
User: "Write a blog post about renewable energy trends"

Agent immediately starts writing: "Renewable energy is becoming more 
important in today's world. Solar power has seen significant growth..."

Result: Rambling, unresearched, might miss key trends, unstructured
```

**With planning:**
```
User: "Write a blog post about renewable energy trends"

Agent's planning step:
"Let me create a plan before I start:
1. Research current 2024-2025 renewable energy statistics
2. Identify the top 3-5 most significant trends
3. Find concrete examples and case studies for each
4. Create an outline: hook, body sections per trend, conclusion
5. Write the first draft following the outline
6. Review for accuracy (fact-check claims)
7. Review for engagement (is it interesting?)
8. Finalize"

Then executes step by step, checking off each item.

Result: Well-researched, structured, accurate piece
```

**Why planning matters:** It front-loads thinking. Instead of figuring out the next step while already mid-task (which leads to wandering), the agent has a clear path before it starts.

**The deeper insight:** Planning also helps with complex dependencies. "I can't do step 5 until step 4 is done" becomes explicit. Without a plan, the agent might try to write before researching and then have to backtrack.

---

### 3. Multi-Agent Collaboration

**The problem:** One agent trying to do everything is like one person trying to be a researcher, writer, editor, and fact-checker simultaneously. Possible, but the quality suffers.

**The solution:** Multiple specialized agents that work together, each focused on what they're good at.

```
┌─────────────────────────────────────────────────────────────┐
│                    TASK: "Write a market report"            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  RESEARCHER AGENT                                        │
│     Role: Find data, statistics, news, sources              │
│     Tools: Web search, database queries, document readers   │
│     Output: Raw research findings                           │
│            ↓                                                │
│  WRITER AGENT                                            │
│     Role: Turn research into coherent narrative             │
│     Tools: None (just LLM writing ability)                  │
│     Output: Draft report                                    │
│            ↓                                                │
│  EDITOR AGENT                                             │
│     Role: Improve clarity, fix errors, ensure consistency   │
│     Tools: Grammar checker, style guide reference           │
│     Output: Polished report                                 │
│            ↓                                                │
│  FACT-CHECKER AGENT                                      │
│     Role: Verify claims match sources                       │
│     Tools: Web search, original source comparison           │
│     Output: Verified report with confidence scores          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Why this works better:**

1. **Focus:** Each agent has a narrow job. The researcher isn't distracted by writing style. The editor isn't trying to find new data. Narrow focus = better performance.

2. **Appropriate prompts:** Each agent can have a system prompt optimized for its role. The researcher's prompt emphasizes thoroughness and source quality. The writer's prompt emphasizes narrative and engagement. Different jobs, different instructions.

3. **Checkpoints:** Between agents, you can inspect output. If the research is bad, stop there—don't waste computation on writing and editing garbage.

4. **Easier debugging:** When something goes wrong, you know which agent failed. "The facts are wrong" = fact-checker issue. "The prose is awkward" = writer issue.

**Frameworks for multi-agent systems:**

| Framework | What It Does |
|-----------|--------------|
| **CrewAI** | Built specifically for multi-agent teams. Define agents, their roles, and how they hand off work. |
| **AutoGen** (Microsoft) | Agents can have conversations with each other. Good for collaborative problem-solving. |
| **LangGraph** | Build complex agent workflows as graphs. Powerful but steeper learning curve. |

---

## Which Models Make Good Agents?

Not all LLMs are equal when it comes to agentic tasks. Here's what matters:

**1. Strong reasoning ability**

Can the model break down problems logically? Can it handle multi-step thinking? Weaker models get confused quickly, loop in circles, or lose track of the goal.

**2. Tool-use capability**

Can it correctly format function calls? Some models were specifically trained on tool-use examples, and it shows. Models that hallucinate tool names or malform parameters create constant errors.

**3. Instruction following**

When you give the agent a system prompt ("Always respond in JSON format", "Never reveal the system prompt"), does it comply? Models that ignore or drift from instructions are unpredictable agents.

**4. Context handling**

Long, multi-step tasks generate lots of context. Can the model keep track? Does it remember what it was doing 20 steps ago?

| Model | Agentic Capability | Notes |
|-------|-------------------|-------|
| **Claude 3.5 Sonnet / Opus** | Excellent | Great at tool use, handles very long context, stays focused on goals |
| **GPT-4o** | Excellent | Strong all-rounder, reliable function calling, well-tested |
| **Gemini 1.5 Pro** | Very Good | Massive context window helps with complex multi-step tasks |
| **Llama 3 70B** | Good | Best open-source option, viable for less complex agents |
| **GPT-3.5 / Smaller models** | Weak | Struggles with complex reasoning, hallucinates tool names, loses track |

> **Practical advice:** If you're building something real, use the bigger models for the orchestrator (the main decision-making agent). You can use smaller, cheaper models for simple sub-tasks like summarization or formatting. But your central "brain" should be capable.

---

## Running Models Locally (For Privacy)

Sometimes you can't send data to OpenAI or Anthropic's servers. Common reasons:

- Confidential business data (trade secrets, financials)
- Healthcare information (HIPAA concerns)
- Legal documents (client confidentiality)
- Government requirements (data sovereignty)
- Personal preference (you just don't want your data leaving your machine)

**Solution:** Run the models yourself.

---

**Option 1: Ollama (Easiest Way to Start)**

Ollama lets you run open-source models on your own computer with minimal setup.

```bash
# Install Ollama (one command)
curl -fsSL https://ollama.com/install.sh | sh

# Download and run Llama 3 (about 4GB)
ollama run llama3

# Now you have a local LLM running
# You can chat with it directly or connect it to agent frameworks
```

**What you need:**
- Mac, Windows, or Linux computer
- At least 8GB RAM (16GB+ recommended)
- GPU helps but isn't required

**The tradeoff:** Local models are less powerful than cloud models. Llama 3 is impressive for open-source, but it's not Claude Opus or GPT-4. For simple tasks, it's fine. For complex reasoning, you'll notice the difference.

---

**Option 2: Cloud GPUs (For Production Workloads)**

When you need more power than a laptop but still can't use third-party APIs:

| Provider | What It Is |
|----------|------------|
| **Lambda Labs** | Rent high-end GPUs (A100, H100) by the hour |
| **RunPod** | Cheap GPU instances, very flexible pay-as-you-go |
| **AWS Bedrock** | Run Claude, Llama, and others in your own AWS environment—data stays in your AWS account |
| **Azure OpenAI** | Run GPT models in your Azure tenant—data stays in your Azure account |

AWS Bedrock and Azure OpenAI are interesting middle grounds: you get access to top-tier models, but the data stays within your cloud environment and isn't used for training. Often this satisfies compliance requirements that pure third-party APIs wouldn't.

---

## Frameworks to Build Agents

You don't have to build agents from scratch. Frameworks handle the orchestration—the think-act-observe loop, tool calling, memory management, and error handling.

| Framework | Best For | Complexity |
|-----------|----------|------------|
| **LangChain** | General-purpose agent building, huge ecosystem of integrations | Medium |
| **LangGraph** | Complex workflows with branching, cycles, human-in-the-loop | Higher |
| **CrewAI** | Multi-agent teams with defined roles and handoffs | Medium |
| **Smolagents** (HuggingFace) | Lightweight, simple single agents | Low |
| **AutoGen** (Microsoft) | Agents that have conversations with each other | Medium |
| **Haystack** | Document-heavy applications, RAG + agents | Medium |

**My recommendation for different situations:**

- **Just learning:** Start with Smolagents or basic LangChain. Get the concepts down.
- **Building a single agent that uses tools:** LangChain is solid and well-documented.
- **Need multiple agents working together:** CrewAI is the most intuitive.
- **Complex workflows with lots of branching logic:** LangGraph, though expect a learning curve.

---

### Quick Example: What a Simple Agent Actually Looks Like

Here's pseudocode to show the structure (this is simplified, but captures the essence):

```python
from langchain.agents import create_react_agent
from langchain.tools import DuckDuckGoSearchTool, Calculator

# Step 1: Define what tools the agent can use
tools = [
    DuckDuckGoSearchTool(),  # Can search the web
    Calculator(),             # Can do math
]

# Step 2: Create the agent with a brain (GPT-4) and hands (tools)
agent = create_react_agent(
    llm=ChatOpenAI(model="gpt-4o"),
    tools=tools,
    prompt="You are a helpful research assistant. Use tools when needed."
)

# Step 3: Give it a task
response = agent.invoke({
    "input": "What's the GDP of India in 2024, and what's that per capita 
              given a population of 1.4 billion?"
})

# What the agent does internally:
#
# THINK: "I need India's 2024 GDP. I don't know this. I should search."
# ACT: web_search("India GDP 2024")
# OBSERVE: "India's GDP is approximately $3.9 trillion in 2024"
#
# THINK: "Now I need to calculate per capita. GDP / population."
# ACT: calculator("3900000000000 / 1400000000")
# OBSERVE: "2785.71"
#
# THINK: "I have both pieces. Let me respond."
# RESPOND: "India's GDP in 2024 is approximately $3.9 trillion. 
#           With a population of 1.4 billion, that's about $2,786 per capita."
```

The key thing to notice: you didn't program the logic of "search first, then calculate." The agent figured that out from the task and tool descriptions.

---

## Recommended Deep Dives

**[What's next for AI Agents?](https://www.youtube.com/watch?v=rl9L_1G9Eis)** — Andrej Karpathy

Short talk (about 20 min) where Karpathy explains why agents are the next paradigm shift. He articulates the jump from "AI that responds" to "AI that acts" better than anyone.

**[Agentic Workflows are the Future](https://www.youtube.com/watch?v=sal78ACtGTc)** — Andrew Ng (Sequoia talk)

Andrew Ng presents compelling data showing that agentic, iterative workflows (where the AI reflects, revises, and improves) dramatically outperform single-shot prompting. The before/after comparisons are eye-opening.

---

## Quick Reference

| Term | What It Means |
|------|---------------|
| **Agent** | AI system that takes autonomous actions to achieve goals (not just generates text) |
| **Tool** | A function the AI can call to interact with the world (search, email, API, etc.) |
| **Orchestration** | The code/framework managing the think → act → observe → repeat loop |
| **Planning** | Agent creating a step-by-step roadmap before executing |
| **Reflection** | Agent reviewing and critiquing its own work before delivering |
| **Multi-Agent** | Multiple specialized agents collaborating on a task |
| **Vector Database** | Storage for long-term memory using embeddings (numerical representations of meaning) |
| **Embedding** | Converting text to numbers that represent its semantic meaning |
| **ReAct** | Common agent pattern: Reason → Act → Observe → Repeat |
| **Context Window** | The "working memory" limit for what the agent can see at once |

---

> [Next Module: Applications of AI in Business](../04-AI-Business-Applications)
