import { cleanEnv, num, str } from "envalid";

export const ENV_TESTS = cleanEnv(process.env, {
	API_URL: str(),

	NODE_ENV: str({ choices: ["test"] }),

	PASSWORD_CORRECT: str(),
	USERNAME_CORRECT: str()
});
