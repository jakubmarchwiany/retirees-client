import { cleanEnv, str } from "envalid";

function validateEnv() {
	cleanEnv(process.env, {
		NEXT_PUBLIC_API_ENDPOINT: str()
	});
}
export default validateEnv;
