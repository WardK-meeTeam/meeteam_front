export async function publicFetch(input: string, init: RequestInit = {}) {
  const url = input;
  const headers = new Headers({ Accept: "application/json" });
  const provided = init.headers;
  if (provided instanceof Headers) {
    provided.forEach((value, key) => headers.set(key, value));
  } else if (Array.isArray(provided)) {
    provided.forEach(([key, value]) => headers.set(key, value));
  } else if (provided) {
    Object.entries(provided).forEach(([key, value]) => {
      if (value !== undefined) headers.set(key, value as string);
    });
  }
  
  const fetchInit: RequestInit = {
    ...init,
    credentials: "omit",
    headers,
  };
  
  return fetch(url, fetchInit);
}