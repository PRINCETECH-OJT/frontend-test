import { ref } from "vue";
import api from "../api";

export function useResource(endpoint) {
  const items = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const fetchItems = async () => {
    try {
      loading.value = true;
      const response = await api.get(endpoint);
      // Standardize data access for Laravel
      items.value = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
    } finally {
      loading.value = false;
    }
  };

  return { items, loading, error, fetchItems };
}
