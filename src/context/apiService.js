import axios from 'axios';

// src/context/apiService.js
export const fetchLiveMatches = async () => {
  try {
    const response = await axios.get(
      'https://cricket-live-line1.p.rapidapi.com/liveMatches',
      {
        headers: {
          'x-rapidapi-host': 'cricket-live-line1.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
        },
      }
    );
    console.log('API Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchUpcomingMatches = async () => {
  const response = await axios.get(
    'https://cricket-live-line1.p.rapidapi.com/upcomingMatches',
    {
      headers: {
        'x-rapidapi-host': 'cricket-live-line1.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
      },
    }
  );
  return response.data;
};

export const fetchRecentMatches = async () => {
  const response = await axios.get(
    'https://cricket-live-line1.p.rapidapi.com/recentMatches',
    {
      headers: {
        'x-rapidapi-host': 'cricket-live-line1.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
      },
    }
  );
  return response.data;
};

// export const fetchBetOdds = async (token, matchId) => {
//   const response = await axios.get(`${BASE_URL}/cricket/${matchId}/odds`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };
