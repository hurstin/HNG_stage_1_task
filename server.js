import express from 'express';
import stringsRouter from './routes/strings.js';
import naturalLanguageRouter from './routes/naturalLanguageFilter.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/strings', stringsRouter);
app.use('/strings/filter-by-natural-language', naturalLanguageRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler - FIXED: Use a proper catch-all route
app.use('/:unmatched', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export default app;
