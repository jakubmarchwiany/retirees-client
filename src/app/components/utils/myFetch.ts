import toast from "react-hot-toast";

import { authorizationFail } from "./log_out";

const NODE_ENV = process.env.NODE_ENV;

type FetchMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";

export async function myFetch<T>(
	url: string,
	options: {
		method: FetchMethod;
		body?: BodyInit | FormData | null;
		customError?: boolean;
		headers?: { "Content-Type": "application/json" };
	}
): Promise<T & { message: string }> {
	return await new Promise((resolve, reject) => {
		const toastId = toast.loading("Ładowanie...");

		fetch(window.location.origin + "/api" + url, {
			method: options.method,
			credentials: "include",
			headers: options.headers,
			body: options.body
		})
			.then(async (response) => {
				const data = (await response.json()) as T & { message: string };

				if (response.ok) {
					toast.success(data.message, { id: toastId });

					resolve(data);
				} else {
					toast.error(data.message, { id: toastId });

					if (response.status === 401) {
						await authorizationFail();
					}

					if (options.customError !== undefined) {
						reject(data);
					}
				}
			})
			.catch((error) => {
				if (NODE_ENV === "development") {
					console.error(error);
				}

				toast.error("Coś poszło nie tak :(", { id: toastId });

				if (options.customError !== undefined) {
					reject(error);
				}
			});
	});
}
