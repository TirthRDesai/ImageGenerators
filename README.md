<p align="center">
  <img src="https://raw.githubusercontent.com/your-org/your-repo/main/assets/banner.png" alt="AI Image Generator Banner" width="100%" />
</p>

<h1 align="center">🖼️ AI Image Generation Platform</h1>

<p align="center">
  <strong>A scalable, real-time, self-hosted AI image generation system</strong><br/>
  FastAPI · Next.js · Stable Diffusion · Cloudflare · GPU-Accelerated
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/status-active-success.svg"/></a>
  <a href="#"><img src="https://img.shields.io/badge/backend-FastAPI-009688.svg"/></a>
  <a href="#"><img src="https://img.shields.io/badge/frontend-Next.js-black.svg"/></a>
  <a href="#"><img src="https://img.shields.io/badge/database-PostgreSQL-336791.svg"/></a>
  <a href="#"><img src="https://img.shields.io/badge/AI-Stable%20Diffusion-blueviolet.svg"/></a>
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-green.svg"/></a>
</p>

---

## ✨ Overview

**AI Image Generation Platform** is a production-grade full-stack system that enables users to generate high-quality AI images, receive results in real time, and manage generated assets efficiently.

Designed for:
- 🔥 Local GPU servers  
- ☁️ Cloudflare tunnel deployments  
- ⚡ Real-time WebSocket updates  
- 🧠 Modern diffusion pipelines  

This is **not a demo**—it’s an infrastructure-ready platform.

---

## 🚀 Key Features

### 🎨 Image Generation
- Text-to-Image via Stable Diffusion / SDXL
- Prompt & negative prompt support
- Seed, CFG, steps, sampler control
- High-resolution outputs
- Custom models & LoRA support

### ⚡ Real-Time Updates
- WebSocket-based live feed
- Images appear instantly after generation
- No refresh, no polling
- Scalable room-based socket design

### 🧠 Backend (FastAPI)
- Fully async FastAPI backend
- Background image generation tasks
- PostgreSQL for metadata & logs
- Clean service-layer architecture
- CORS & auth-ready

### 🎨 Frontend (Next.js)
- App Router architecture
- Smooth UI animations
- Progressive image loading (blur-in)
- Responsive & performance-optimized

### ☁️ Infrastructure Ready
- Local gateway → public domain routing
- Cloudflare Tunnel (HTTPS + WSS)
- Docker-optional (runs natively)
- Reverse-proxy compatible

---

## 🏗️ System Architecture

```text
┌──────────────┐
│   Browser    │
│ (Next.js UI) │
└──────┬───────┘
       │ HTTPS / WSS
       ▼
┌────────────────────┐
│ Cloudflare Tunnel  │
└──────┬─────────────┘
       ▼
┌────────────────────┐
│ FastAPI Backend    │
│  • REST API        │
│  • WebSockets      │
│  • Background Jobs │
└──────┬─────────────┘
       ▼
┌────────────────────┐
│ GPU Image Engine   │
│ Stable Diffusion   │
└──────┬─────────────┘
       ▼
┌────────────────────┐
│ PostgreSQL DB      │
│ Image Metadata     │
└────────────────────┘
