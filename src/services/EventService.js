import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default {
  getEvents(perPage = 10, page = 1) {
    return apiClient.get("/events?_page=" + page + "&_limit=" + perPage);
  },
  postEvent(event) {
    return apiClient.post("/events/", event);
  },
  getEvent(id) {
    return apiClient.get("/events/" + id);
  }
};
