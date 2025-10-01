export async function publicFetch(input: string, init: RequestInit = {}) {
    const url = input.startsWith("http") ? input : input;
    return fetch(url, {
      ...init,
      credentials: "omit",
      headers: { Accept: "application/json", ...(init.headers || {}) },
    });
  }
  