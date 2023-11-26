import { NextResponse } from "next/server";

export function createResponse(
	statusCode: number,
	message: string,
	body?: unknown
): NextResponse<{ message: string }> {
	return NextResponse.json(
		{ message, data: body },
		{
			status: statusCode
		}
	);
}
