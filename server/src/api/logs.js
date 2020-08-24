const { Router } = require('express');
const LogEntry = require('../models/LogEntry');
const { authMiddleware } = require('../middlewares');

const router = Router();

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const entries = await LogEntry.find({ user: req.user });
    res.json({
      entries,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:title', authMiddleware, async (req, res, next) => {
  try {
    const entries = await LogEntry.find({ user: req.user, title: req.params.title });
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    logEntry.user = req.user;
    const createdLog = await logEntry.save();
    res.json(createdLog);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const logEntry = await LogEntry.findById(req.params.id);
    logEntry.remove();
    res.json(logEntry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
