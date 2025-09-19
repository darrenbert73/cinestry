export const validateQuery = (query: string): string => {
  const trimmed = query.trim();

  if (!trimmed) {
    throw new Error('Search query cannot be empty.');
  }

  if (trimmed.length > 100) {
    throw new Error('Search query is too long.');
  }

  const safeRegex = /^[a-zA-Z0-9\s\-:,'".!?()]+$/;
  if (!safeRegex.test(trimmed)) {
    throw new Error('Search query contains invalid characters.');
  }

  return trimmed;
};
