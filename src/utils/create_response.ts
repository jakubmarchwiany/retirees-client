import { NextResponse } from "next/server";

export function createResponse(statusCode: number, message: string, body?: unknown): NextResponse {
	return NextResponse.json(
		{ message, data: body },
		{
			status: statusCode
		}
	);
}
