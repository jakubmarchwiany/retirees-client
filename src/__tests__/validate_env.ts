import { cleanEnv, num, str } from "envalid";

export const ENV_TESTS = cleanEnv(process.env, {
	NODE_ENV: str({ choices: ["test"] }),

	API_URL: str(),

	USERNAME_CORRECT: str(),
	PASSWORD_CORRECT: str()
});
