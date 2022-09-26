export async function getFetch<T>(
  url: string
): Promise<T & { message: string }> {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        const data = (await response.json()) as T & { message: string };
        if (response.ok) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

export async function postFetch<T>(
  body: object,
  url: string
): Promise<T & { message: string }> {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        const data = (await response.json()) as T & { message: string };
        if (response.ok) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
