import express from 'express';
import { whoopService } from '../services/whoopService.js';
import { authenticateApiKey } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication middleware
router.use(authenticateApiKey);

// MCP protocol handler
router.post('/', async (req, res, next) => {
  try {
    const { action, parameters } = req.body;
    
    if (!action) {
      return res.status(400).json({ 
        error: 'Bad Request',
        message: 'Missing action field in request body' 
      });
    }
    
    // Log the action for debugging
    console.log(`MCP Action requested: ${action}`);
    
    // Handle different actions based on the MCP protocol
    switch (action) {
      case 'getUserProfile':
        // Extract auth token from parameters
        const { authToken } = parameters || {};
        if (!authToken) {
          return res.status(400).json({ 
            error: 'Bad Request',
            message: 'Missing authToken in parameters' 
          });
        }
        
        const profile = await whoopService.getUserProfile(authToken);
        return res.json({
          status: 'success',
          data: profile
        });
        
      case 'getSleepData':
        const { authToken: sleepAuthToken, startDate, endDate } = parameters || {};
        if (!sleepAuthToken) {
          return res.status(400).json({ 
            error: 'Bad Request',
            message: 'Missing authToken in parameters' 
          });
        }
        
        const sleepData = await whoopService.getSleepData(sleepAuthToken, startDate, endDate);
        return res.json({
          status: 'success',
          data: sleepData
        });
        
      case 'getWorkoutData':
        const { authToken: workoutAuthToken, startDate: workoutStartDate, endDate: workoutEndDate } = parameters || {};
        if (!workoutAuthToken) {
          return res.status(400).json({ 
            error: 'Bad Request',
            message: 'Missing authToken in parameters' 
          });
        }
        
        const workoutData = await whoopService.getWorkoutData(workoutAuthToken, workoutStartDate, workoutEndDate);
        return res.json({
          status: 'success',
          data: workoutData
        });
        
      case 'getRecoveryData':
        const { authToken: recoveryAuthToken, startDate: recoveryStartDate, endDate: recoveryEndDate } = parameters || {};
        if (!recoveryAuthToken) {
          return res.status(400).json({ 
            error: 'Bad Request',
            message: 'Missing authToken in parameters' 
          });
        }
        
        const recoveryData = await whoopService.getRecoveryData(recoveryAuthToken, recoveryStartDate, recoveryEndDate);
        return res.json({
          status: 'success',
          data: recoveryData
        });
        
      case 'getCycleData':
        const { authToken: cycleAuthToken, startDate: cycleStartDate, endDate: cycleEndDate } = parameters || {};
        if (!cycleAuthToken) {
          return res.status(400).json({ 
            error: 'Bad Request',
            message: 'Missing authToken in parameters' 
          });
        }
        
        const cycleData = await whoopService.getCycleData(cycleAuthToken, cycleStartDate, cycleEndDate);
        return res.json({
          status: 'success',
          data: cycleData
        });
      
      // Add more actions as needed
        
      default:
        return res.status(400).json({
          error: 'Bad Request',
          message: `Unknown action: ${action}`
        });
    }
  } catch (error) {
    next(error);
  }
});

// MCP JSON Schema - Provides information about the available actions
router.get('/schema', (req, res) => {
  const schema = {
    name: 'WHOOP MCP Server',
    version: '1.0.0',
    description: 'MCP server for accessing WHOOP fitness data',
    actions: {
      getUserProfile: {
        description: 'Get user profile information',
        parameters: {
          authToken: {
            type: 'string',
            description: 'WHOOP API authorization token'
          }
        }
      },
      getSleepData: {
        description: 'Get sleep data for a date range',
        parameters: {
          authToken: {
            type: 'string',
            description: 'WHOOP API authorization token'
          },
          startDate: {
            type: 'string',
            description: 'Start date in YYYY-MM-DD format'
          },
          endDate: {
            type: 'string',
            description: 'End date in YYYY-MM-DD format'
          }
        }
      },
      getWorkoutData: {
        description: 'Get workout data for a date range',
        parameters: {
          authToken: {
            type: 'string',
            description: 'WHOOP API authorization token'
          },
          startDate: {
            type: 'string',
            description: 'Start date in YYYY-MM-DD format'
          },
          endDate: {
            type: 'string',
            description: 'End date in YYYY-MM-DD format'
          }
        }
      },
      getRecoveryData: {
        description: 'Get recovery data for a date range',
        parameters: {
          authToken: {
            type: 'string',
            description: 'WHOOP API authorization token'
          },
          startDate: {
            type: 'string',
            description: 'Start date in YYYY-MM-DD format'
          },
          endDate: {
            type: 'string',
            description: 'End date in YYYY-MM-DD format'
          }
        }
      },
      getCycleData: {
        description: 'Get cycle data for a date range',
        parameters: {
          authToken: {
            type: 'string',
            description: 'WHOOP API authorization token'
          },
          startDate: {
            type: 'string',
            description: 'Start date in YYYY-MM-DD format'
          },
          endDate: {
            type: 'string',
            description: 'End date in YYYY-MM-DD format'
          }
        }
      }
    }
  };
  
  res.json(schema);
});

export { router };
