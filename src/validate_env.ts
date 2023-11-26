import { cleanEnv, str } from "envalid";

function validateEnv(): void {
	cleanEnv(process.env, {
		JWT_SECRET: str(),
		ADMIN_USERNAME: str(),
		ADMIN_PASSWORD: str(),
		GOOGLE_PROJECT_ID: str(),
		GOOGLE_KEY_FILE_NAME: str(),
		GOOGLE_BUCKET_NAME: str()
	});
}

export { validateEnv };
