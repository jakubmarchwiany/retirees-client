import { validate } from "@/app/api/middlewares/validate.middleware";
import * as jose from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createResponse } from "../../utils/create_response";
import { getErrorMessage } from "../../utils/get_error_message";
import { LoginData, loginDataSchema } from "./login_credentials.schema";

const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET } = process.env;

export async function POST(req: Request): Promise<NextResponse> {
	try {
		const { username, password, rememberMe } = await validate<LoginData>(req, loginDataSchema);

		if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
			const expiredAfter = 7 * 24 * 60 * 60 * 1000;

			const token = await new jose.SignJWT({ username })
				.setExpirationTime(Date.now() + expiredAfter)
				.setProtectedHeader({ alg: "HS256" })
				.sign(new TextEncoder().encode(JWT_SECRET));

			cookies().set("authorization", token, {
				expires: rememberMe ? Date.now() + expiredAfter : undefined
			});

			return createResponse(200, "Udało się zalogować");
		} else {
			return createResponse(400, "Błędne dane logowania");
		}
	} catch (error) {
		return createResponse(400, getErrorMessage(error));
	}
}
