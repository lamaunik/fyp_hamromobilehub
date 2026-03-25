const API_URL = "http://localhost:5000/api";

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Something went wrong");
    error.data = data;
    throw error;
  }

  return data;
};

export const api = {
  get: (endpoint, options) => request(endpoint, { method: "GET", ...options }),
  post: (endpoint, body, options) => request(endpoint, { method: "POST", body: JSON.stringify(body), ...options }),
  put: (endpoint, body, options) => request(endpoint, { method: "PUT", body: JSON.stringify(body), ...options }),
  delete: (endpoint, options) => request(endpoint, { method: "DELETE", ...options }),
};
