import { validateEnv } from "./utils/validate_env";

export function register(): void {
	validateEnv();
}
