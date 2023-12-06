import { cleanEnv, str } from "envalid";

function validateEnv(): void {
	cleanEnv(process.env, {
		ADMIN_PASSWORD: str(),
		ADMIN_USERNAME: str(),
		GOOGLE_BUCKET_NAME: str(),
		GOOGLE_KEY_FILE_NAME: str(),
		GOOGLE_PROJECT_ID: str(),
		JWT_SECRET: str()
	});
}

export { validateEnv };
