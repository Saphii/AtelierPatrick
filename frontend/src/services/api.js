import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";

// Configuration d'axios avec le token d'authentification
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Service d'authentification
export const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login/`, {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Erreur de connexion" };
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }
  },

  getUserInfo: async () => {
    try {
      const response = await api.get("/auth/user/");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          error: "Erreur lors de la récupération des informations",
        }
      );
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

// Service pour les créations
export const creationService = {
  getAll: async () => {
    const response = await api.get("/creations/");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/creations/${id}/`);
    return response.data;
  },

  create: async (creationData) => {
    const formData = new FormData();

    // Ajouter tous les champs au FormData
    Object.keys(creationData).forEach((key) => {
      if (creationData[key] !== null && creationData[key] !== undefined) {
        formData.append(key, creationData[key]);
      }
    });

    const response = await api.post("/admin/creations/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  update: async (id, creationData) => {
    const formData = new FormData();

    // Ajouter tous les champs au FormData
    Object.keys(creationData).forEach((key) => {
      if (creationData[key] !== null && creationData[key] !== undefined) {
        formData.append(key, creationData[key]);
      }
    });

    const response = await api.patch(`/admin/creations/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/admin/creations/${id}/`);
    return response.data;
  },

  getAllAdmin: async () => {
    const response = await api.get("/admin/creations/");
    return response.data;
  },
};

export default api;
