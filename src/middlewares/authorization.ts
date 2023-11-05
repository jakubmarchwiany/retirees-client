import * as jose from "jose";
const { JWT_SECRET } = process.env;

export async function authorization(authorization: string): Promise<boolean> {
	try {
		await jose.jwtVerify(authorization, new TextEncoder().encode(JWT_SECRET));

		return true;
	} catch (error) {
		console.log(error);

		return false; // Token is invalid or expired
	}
}
