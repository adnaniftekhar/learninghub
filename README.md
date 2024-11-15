# Learning Agents Platform

A collaborative learning platform that uses AI to generate personalized learning experiences.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Add your OpenAI API key to the `.env` file:
   ```
   VITE_OPENAI_API_KEY=your-api-key-here
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key (required for generating learning journeys)

## Features

- Create and manage learning agents with different roles and preferences
- Generate personalized learning journeys using AI
- Collaborative learning experience design
- Real-time agent interactions
- Resource curation and validation