import axios from "axios";

const api_key = import.meta.env.VITE_APP_API_KEY;

export default axios.create({
  baseURL: "https://quotes15.p.rapidapi.com",
  params: {
    language_code: "en",
  },
  headers: {
    "x-rapidapi-key": api_key,
    "x-rapidapi-host": "quotes15.p.rapidapi.com",
  },
});
