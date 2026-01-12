# Image Generators (Frontend)

This repository contains the Next.js frontend for the Image Generators app.
It provides the user interface for browsing models, composing prompts, launching
image generation jobs, and viewing results. The backend is not included here and
must be run separately.

The UI is built around a simple workflow: users pick a model, enter a prompt,
start a generation job, and the app polls for status updates until the image is
ready. When the job completes, the UI fetches the final image and presents it
alongside the prompt and metadata. This keeps the frontend responsive while the
heavy lifting happens elsewhere.

Typical use cases include:
- Rapid exploration of creative prompts with different models
- Building a lightweight UI on top of an external image generation backend
- Showing a gallery of generated results for demos or internal teams
- Frontend-only development while the backend evolves independently

## Features
- Model browsing and details
- Prompt input and image generation flow
- Polling job status and fetching generated images via API routes

## Prerequisites
- Node.js 18+
- A running backend service (not included in this repo)

## Setup
1) Install dependencies:
```bash
npm install
```

2) Create `.env.local` and set any keys you use (see `.env.example`).
At minimum, if your backend is not at `http://127.0.0.1:9001`, set:
```
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:9001
```

3) Run the dev server:
```bash
npm run dev
```

Open http://localhost:3000

## Backend note
This repo does not include the backend API.
The frontend expects backend routes such as:
- `/generate/image`
- `/generate/get_status/{token}`
- `/generate/get_image/{token}`
- `/generate/fetch_generated_images/`

If those endpoints live elsewhere, update your backend URL in `.env.local`.

## Scripts
- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - start production server
- `npm run lint` - lint
