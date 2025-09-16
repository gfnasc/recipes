import { useFetch } from '#app';

type useFetchType = typeof useFetch;

const BASE_URL = 'https://dummyjson.com';

export const useApiFetch: useFetchType = (path, options = {}) => {
  options.baseURL = BASE_URL;

  return useFetch(path, options);
};
