# 🧠 BrainBolt — Adaptive Infinite Quiz Platform

BrainBolt is an adaptive infinite quiz platform that dynamically adjusts question difficulty based on user performance. It features streak-based scoring, real-time leaderboards, and a scalable Dockerized full-stack architecture.

## 🎥 Project Demo

<video controls width="800">
  <source src="https://raw.githubusercontent.com/si99hi/brainbolt-adaptive-quiz/main/brainbolt-demo.mp4" type="video/mp4">
</video>



## 🚀 Features
- Adaptive difficulty (increases/decreases based on answers)
- Streak-based scoring with multiplier (capped)
- Real-time score & streak tracking
- Live leaderboards (total score & streak)
- Idempotent answer submission
- Redis caching for fast updates
- Strong consistency for score/streak updates

## 🏗️ Tech Stack
**Frontend:** Next.js, TypeScript, Tailwind  
**Backend:** Node.js, Express  
**Database:** PostgreSQL  
**Cache:** Redis  
**DevOps:** Docker & Docker Compose  

## 🐳 Run Locally (Single Command)
Make sure Docker is installed.

```bash
docker-compose up --build


