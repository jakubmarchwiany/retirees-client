import { validateEnv } from "./validate_env";

export function register(): void {
	validateEnv();
}
