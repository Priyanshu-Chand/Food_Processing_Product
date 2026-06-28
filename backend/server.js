import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import {
  addFinishedGood,
  addProduct,
  addRawMaterial,
  getAiSamples,
  getDashboard,
  getFinishedGoods,
  getInventory,
  getPackagingBriefs,
  getProductById,
  getProducts,
  getRawMaterials,
  removeFinishedGood,
  removeProduct,
  removeRawMaterial,
  searchProducts,
  updateFinishedGood,
  updateProduct,
  updateRawMaterial,
} from './data/store.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

const createHttpError = (statusCode, message, details) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;
  return error;
};

const sendSuccess = (res, data, statusCode = 200, meta = {}) =>
  res.status(statusCode).json({
    success: true,
    data,
    meta,
  });

const validateProductPayload = (payload, { partial = false } = {}) => {
  const requiredFields = [
    'name',
    'shortLabel',
    'category',
    'origin',
    'weight',
    'priceValue',
    'tagline',
    'highlights',
    'tone',
    'imageGradient',
    'description',
  ];

  const missingFields = requiredFields.filter((field) => {
    if (partial && !(field in payload)) {
      return false;
    }

    if (field === 'highlights') {
      return !Array.isArray(payload[field]) || payload[field].length === 0;
    }

    return payload[field] === undefined || payload[field] === null || payload[field] === '';
  });

  if (missingFields.length) {
    throw createHttpError(400, 'Invalid product payload.', {
      missingFields,
    });
  }

  if ('priceValue' in payload && Number.isNaN(Number(payload.priceValue))) {
    throw createHttpError(400, 'Product priceValue must be numeric.');
  }
};

const validateRawMaterialPayload = (payload, { partial = false } = {}) => {
  const requiredFields = ['batch', 'item', 'entryDate', 'expiryDate', 'quantity'];
  const missingFields = requiredFields.filter((field) => {
    if (partial && !(field in payload)) {
      return false;
    }

    return payload[field] === undefined || payload[field] === null || payload[field] === '';
  });

  if (missingFields.length) {
    throw createHttpError(400, 'Invalid raw material payload.', {
      missingFields,
    });
  }
};

const validateFinishedGoodsPayload = (payload, { partial = false } = {}) => {
  const requiredFields = ['product', 'productionDate', 'shelfLifeDays', 'stock'];
  const missingFields = requiredFields.filter((field) => {
    if (partial && !(field in payload)) {
      return false;
    }

    return payload[field] === undefined || payload[field] === null || payload[field] === '';
  });

  if (missingFields.length) {
    throw createHttpError(400, 'Invalid finished goods payload.', {
      missingFields,
    });
  }

  if ('shelfLifeDays' in payload && Number.isNaN(Number(payload.shelfLifeDays))) {
    throw createHttpError(400, 'Finished good shelfLifeDays must be numeric.');
  }
};

app.get('/', (_req, res) => {
  sendSuccess(
    res,
    {
      message: 'HimShakti backend is running.',
      endpoints: [
        '/api/products',
        '/api/products/search?q=juice',
        '/api/dashboard',
        '/api/inventory',
        '/api/inventory/raw-materials',
        '/api/inventory/finished-goods',
        '/api/packaging',
        '/api/ai-samples',
      ],
    },
    200,
  );
});

app.get('/api/health', (_req, res) => {
  sendSuccess(res, { status: 'ok', port, timestamp: new Date().toISOString() });
});

app.get('/api/products', (_req, res) => {
  const products = getProducts();
  sendSuccess(res, products, 200, {
    total: products.length,
    currency: 'INR',
    version: 'v1',
  });
});

app.get('/api/products/search', (req, res) => {
  const query = String(req.query.q ?? '').trim();
  if (!query) {
    throw createHttpError(400, 'Search query `q` is required.');
  }

  const results = searchProducts(query);
  sendSuccess(res, results, 200, {
    total: results.length,
    query,
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) {
    throw createHttpError(404, 'Product not found.');
  }

  sendSuccess(res, product);
});

app.post('/api/products', (req, res) => {
  validateProductPayload(req.body);
  const product = addProduct(req.body);
  sendSuccess(res, product, 201);
});

app.put('/api/products/:id', (req, res) => {
  validateProductPayload(req.body, { partial: true });
  const product = updateProduct(req.params.id, req.body);
  if (!product) {
    throw createHttpError(404, 'Product not found.');
  }

  sendSuccess(res, product);
});

app.delete('/api/products/:id', (req, res) => {
  const removed = removeProduct(req.params.id);
  if (!removed) {
    throw createHttpError(404, 'Product not found.');
  }

  res.status(204).send();
});

app.get('/api/dashboard', (_req, res) => {
  sendSuccess(res, getDashboard(), 200, {
    generatedAt: new Date().toISOString(),
  });
});

app.get('/api/inventory', (_req, res) => {
  sendSuccess(res, getInventory(), 200, {
    warehouse: 'Haldwani Unit',
    refreshable: true,
  });
});

app.get('/api/inventory/raw-materials', (_req, res) => {
  const entries = getRawMaterials();
  sendSuccess(res, entries, 200, {
    total: entries.length,
  });
});

app.post('/api/inventory/raw-materials', (req, res) => {
  validateRawMaterialPayload(req.body);
  const entry = addRawMaterial(req.body);
  sendSuccess(res, entry, 201);
});

app.put('/api/inventory/raw-materials/:id', (req, res) => {
  validateRawMaterialPayload(req.body, { partial: true });
  const entry = updateRawMaterial(req.params.id, req.body);
  if (!entry) {
    throw createHttpError(404, 'Raw material entry not found.');
  }

  sendSuccess(res, entry);
});

app.delete('/api/inventory/raw-materials/:id', (req, res) => {
  const removed = removeRawMaterial(req.params.id);
  if (!removed) {
    throw createHttpError(404, 'Raw material entry not found.');
  }

  res.status(204).send();
});

app.get('/api/inventory/finished-goods', (_req, res) => {
  const entries = getFinishedGoods();
  sendSuccess(res, entries, 200, {
    total: entries.length,
  });
});

app.post('/api/inventory/finished-goods', (req, res) => {
  validateFinishedGoodsPayload(req.body);
  const entry = addFinishedGood(req.body);
  sendSuccess(res, entry, 201);
});

app.put('/api/inventory/finished-goods/:id', (req, res) => {
  validateFinishedGoodsPayload(req.body, { partial: true });
  const entry = updateFinishedGood(req.params.id, req.body);
  if (!entry) {
    throw createHttpError(404, 'Finished goods entry not found.');
  }

  sendSuccess(res, entry);
});

app.delete('/api/inventory/finished-goods/:id', (req, res) => {
  const removed = removeFinishedGood(req.params.id);
  if (!removed) {
    throw createHttpError(404, 'Finished goods entry not found.');
  }

  res.status(204).send();
});

app.get('/api/packaging', (_req, res) => {
  const packagingBriefs = getPackagingBriefs();
  sendSuccess(res, packagingBriefs, 200, {
    total: packagingBriefs.length,
  });
});

app.get('/api/ai-samples', (_req, res) => {
  const samples = getAiSamples();
  sendSuccess(res, samples, 200, {
    total: samples.length,
  });
});

app.use((_req, _res, next) => {
  next(createHttpError(404, 'Route not found.'));
});

app.use((error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal server error.';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      details: error.details ?? null,
    },
  });
});

app.listen(port, () => {
  console.log(`HimShakti API listening on http://localhost:${port}`);
});
