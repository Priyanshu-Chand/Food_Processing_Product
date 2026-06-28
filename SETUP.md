# HimShakti Food Processing Platform

This repo now includes a Vite frontend and an Express backend with in-memory data for Week 4.

## Run locally

Frontend:

```bash
npm run dev
```

Backend:

```bash
cd backend
npm install
npm run dev
```

Environment files:

- Frontend example: `.env.example`
- Backend example: `backend/.env.example`

## API overview

Core product endpoints:

- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products/search?q=juice`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

Supporting endpoints:

- `GET /api/dashboard`
- `GET /api/inventory`
- `GET /api/inventory/raw-materials`
- `POST /api/inventory/raw-materials`
- `PUT /api/inventory/raw-materials/:id`
- `DELETE /api/inventory/raw-materials/:id`
- `GET /api/inventory/finished-goods`
- `POST /api/inventory/finished-goods`
- `PUT /api/inventory/finished-goods/:id`
- `DELETE /api/inventory/finished-goods/:id`
- `GET /api/packaging`
- `GET /api/ai-samples`

## API collection

Postman collection export:

- `backend/postman/HimShakti_API.postman_collection.json`
