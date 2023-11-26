import { describe, expect, it } from "bun:test";
import Chance from "chance";
import request, { Response } from "supertest";

import { ENV_TESTS } from "../validate_env";

const { API_URL, PASSWORD_CORRECT, USERNAME_CORRECT } = ENV_TESTS;
const chance = Chance();

describe("Auth controller", () => {
	let res: Response;

	describe("/auth/login", () => {
		it("should_return_200_for_valid_data", async () => {
			res = await request(API_URL).post("/auth/login").send({
				username: USERNAME_CORRECT,
				password: PASSWORD_CORRECT,
				rememberMe: true
			});

			console.error(res.body);

			expect(res.statusCode).toBe(200);
		});

		it("should_return_400_for_invalid_credentials", async () => {
			res = await request(API_URL).post("/auth/login").send({
				username: chance.string(),
				password: chance.string(),
				rememberMe: true
			});

			expect(res.statusCode).toBe(400);
		});

		it("should_return_400_for_missing_username", async () => {
			res = await request(API_URL).post("/auth/login").send({
				password: chance.string()
			});

			expect(res.statusCode).toBe(400);
		});

		it("should_return_400_for_missing_password", async () => {
			res = await request(API_URL).post("/auth/login").send({
				username: chance.string()
			});

			expect(res.statusCode).toBe(400);
		});

		it("should_return_400_for_missing_remember_me", async () => {
			res = await request(API_URL).post("/auth/login").send({
				username: USERNAME_CORRECT,
				password: PASSWORD_CORRECT
			});

			expect(res.statusCode).toBe(400);
		});
	});
});
