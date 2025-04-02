import express from 'express';
import { whoopService } from '../services/whoopService.js';

const router = express.Router();

// Route to get user profile
router.get('/profile', async (req, res, next) => {
  try {
    const profile = await whoopService.getUserProfile(req.headers.authorization);
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

// Route to get sleep data
router.get('/sleep', async (req, res, next) => {
  try {
    const { start_date, end_date } = req.query;
    const sleepData = await whoopService.getSleepData(req.headers.authorization, start_date, end_date);
    res.json(sleepData);
  } catch (error) {
    next(error);
  }
});

// Route to get workout data
router.get('/workouts', async (req, res, next) => {
  try {
    const { start_date, end_date } = req.query;
    const workoutData = await whoopService.getWorkoutData(req.headers.authorization, start_date, end_date);
    res.json(workoutData);
  } catch (error) {
    next(error);
  }
});

// Route to get recovery data
router.get('/recovery', async (req, res, next) => {
  try {
    const { start_date, end_date } = req.query;
    const recoveryData = await whoopService.getRecoveryData(req.headers.authorization, start_date, end_date);
    res.json(recoveryData);
  } catch (error) {
    next(error);
  }
});

// Route to get cycle data
router.get('/cycles', async (req, res, next) => {
  try {
    const { start_date, end_date } = req.query;
    const cycleData = await whoopService.getCycleData(req.headers.authorization, start_date, end_date);
    res.json(cycleData);
  } catch (error) {
    next(error);
  }
});

export { router };
