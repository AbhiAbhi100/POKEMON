export const fetchClient = async (endpoint, options = {}) => {
  const response = await fetch(endpoint, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};
