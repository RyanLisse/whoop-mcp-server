import axios from 'axios';

const WHOOP_API_URL = 'https://api.prod.whoop.com/developer';

class WhoopService {
  async getUserProfile(authToken) {
    try {
      const response = await axios.get(`${WHOOP_API_URL}/v1/user/profile`, {
        headers: {
          'Authorization': authToken
        }
      });
      return response.data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async getSleepData(authToken, startDate, endDate) {
    try {
      const response = await axios.get(`${WHOOP_API_URL}/v1/cycle/aggregate/sleep`, {
        headers: {
          'Authorization': authToken
        },
        params: {
          start_date: startDate,
          end_date: endDate
        }
      });
      return response.data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async getWorkoutData(authToken, startDate, endDate) {
    try {
      const response = await axios.get(`${WHOOP_API_URL}/v1/cycle/aggregate/workout`, {
        headers: {
          'Authorization': authToken
        },
        params: {
          start_date: startDate,
          end_date: endDate
        }
      });
      return response.data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async getRecoveryData(authToken, startDate, endDate) {
    try {
      const response = await axios.get(`${WHOOP_API_URL}/v1/cycle/aggregate/recovery`, {
        headers: {
          'Authorization': authToken
        },
        params: {
          start_date: startDate,
          end_date: endDate
        }
      });
      return response.data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async getCycleData(authToken, startDate, endDate) {
    try {
      const response = await axios.get(`${WHOOP_API_URL}/v1/cycle`, {
        headers: {
          'Authorization': authToken
        },
        params: {
          start_date: startDate,
          end_date: endDate
        }
      });
      return response.data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  handleApiError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code outside the range of 2xx
      const statusCode = error.response.status;
      const errorData = error.response.data;
      
      throw new Error(`WHOOP API Error (${statusCode}): ${JSON.stringify(errorData)}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from WHOOP API');
    } else {
      // Something happened in setting up the request
      throw new Error(`Error setting up WHOOP API request: ${error.message}`);
    }
  }
}

export const whoopService = new WhoopService();
