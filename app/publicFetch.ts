export async function publicFetch(input: string, init: RequestInit = {}) {
    const res = await fetch(input, {
      ...init,
      credentials: "omit",
      headers: { Accept: "application/json", ...(init.headers || {}) },
    });
    return res;
  }
  