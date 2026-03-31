const API_URL = "http://localhost:5000/api";

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const isFormData = options.body instanceof FormData;
  
  const headers = {
    ...options.headers,
  };

  // Only set application/json if we're not sending FormData
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
    // Don't stringify if it's FormData
    body: isFormData ? options.body : JSON.stringify(options.body),
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
  post: (endpoint, body, options) => request(endpoint, { method: "POST", body, ...options }),
  put: (endpoint, body, options) => request(endpoint, { method: "PUT", body, ...options }),
  delete: (endpoint, options) => request(endpoint, { method: "DELETE", ...options }),
};
