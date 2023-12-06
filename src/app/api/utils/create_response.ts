import { NextResponse } from "next/server";

export function createResponse(
	statusCode: number,
	message: string,
	body?: unknown
): NextResponse<{ message: string }> {
	return NextResponse.json(
		{ data: body, message },
		{
			status: statusCode
		}
	);
}
