import axios from "axios";

// Define the API key and base URL
const API_KEY = "fc9fb186b2f64a51840a59a66508fe6d";

const BASE_URL = "https://newsapi.org/v2/everything";

// Fetch articles from News API
export const fetchArticlesFromAPI = async (query = "technology") => {
  if (!query) {
    query = "general"; // Set default query if none provided
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query, // Required parameter
        apiKey: API_KEY, // Your API key
      },
    });
    return response.data.articles; // Return the articles array
  } catch (error) {
    console.error("Error fetching articles:", error.response?.data?.message || error.message);
    throw new Error("Failed to fetch articles. Please check your query or API key limit execeded.");
  }
};
;
