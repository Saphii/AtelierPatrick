import axios from "axios";

// Détection automatique de l'URL de l'API
const getApiBaseUrl = () => {
  // Si une variable d'environnement est définie, l'utiliser
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Si on est en développement local
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8000/api';
  }
  
  // En production, utiliser l'URL relative ou l'IP du serveur
  // Essayer d'abord avec l'URL relative (si le frontend et backend sont sur le même domaine)
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  
  // Si le frontend est sur Netlify, utiliser l'URL relative (Netlify proxy)
  // Netlify redirige /api/* vers le backend via netlify.toml
  if (hostname.includes('netlify.app') || hostname.includes('vercel.app')) {
    return '/api';
  }
  
  // Si on accède directement via l'IP, utiliser HTTP
  if (hostname === '217.154.172.35') {
    return 'http://217.154.172.35/api';
  }
  
  // Sinon, utiliser l'URL relative
  return '/api';
};

const getMediaBaseUrl = () => {
  if (process.env.REACT_APP_MEDIA_BASE_URL) {
    return process.env.REACT_APP_MEDIA_BASE_URL;
  }
  
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8000';
  }
  
  const hostname = window.location.hostname;
  
  // Si le frontend est sur Netlify, utiliser l'URL relative (Netlify proxy)
  if (hostname.includes('netlify.app') || hostname.includes('vercel.app')) {
    return '';
  }
  
  // Si on accède directement via l'IP, utiliser HTTP
  if (hostname === '217.154.172.35') {
    return 'http://217.154.172.35';
  }
  
  return '';
};

const API_BASE_URL = getApiBaseUrl();
const MEDIA_BASE_URL = getMediaBaseUrl();

// Configuration d'axios avec le token d'authentification
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 secondes de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Gestion des erreurs réseau
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout: La requête a pris trop de temps');
      return Promise.reject({ error: 'La connexion a pris trop de temps. Vérifiez votre connexion internet.' });
    }
    if (error.message === 'Network Error' || !error.response) {
      console.error('Erreur réseau:', error.message);
      return Promise.reject({ 
        error: 'Erreur de connexion. Vérifiez votre connexion internet et que le serveur est accessible.',
        networkError: true 
      });
    }
    return Promise.reject(error);
  }
);

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
      // Gestion améliorée des erreurs pour mobile
      if (error.networkError || !error.response) {
        throw { 
          error: "Impossible de se connecter au serveur. Vérifiez votre connexion internet.",
          networkError: true 
        };
      }
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

const normalizeBase = (base) => {
  if (!base) return "";
  return base.endsWith("/") ? base.slice(0, -1) : base;
};

const buildMediaUrl = (relativePath) => {
  const cleanRelative = relativePath.replace(/^\/+/, "");
  const base = normalizeBase(MEDIA_BASE_URL);
  if (!base) {
    return `/media/${cleanRelative}`;
  }
  return `${base}/media/${cleanRelative}`;
};

export const resolveImageUrl = (url) => {
  if (!url) return null;
  const mediaMarker = "/media/";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    const mediaIndex = url.indexOf(mediaMarker);
    if (mediaIndex !== -1) {
      const relative = url.substring(mediaIndex + mediaMarker.length);
      return buildMediaUrl(relative);
    }
    return url;
  }

  if (url.startsWith(mediaMarker)) {
    const relative = url.substring(mediaMarker.length);
    return buildMediaUrl(relative);
  }

  return buildMediaUrl(url);
};

export default api;
