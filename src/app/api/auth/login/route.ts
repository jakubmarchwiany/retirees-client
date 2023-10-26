import { validate } from "@/middlewares/validate.middleware";
import { createResponse } from "@/utils/create_response";
import { getErrorMessage } from "@/utils/get_error_message";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { LoginData, loginDataSchema } from "./login_credentials.schema";

const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET } = process.env;

export async function POST(req: Request): Promise<NextResponse> {
	try {
		const { username, password, rememberMe } = await validate<LoginData>(req, loginDataSchema);

		if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
			const expiredAfter = 7 * 24 * 60 * 60 * 1000;

			const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: expiredAfter });

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
