import { NextRequest, NextResponse } from "next/server";

import { authorization } from "./app/api/middlewares/authorization";

export async function middleware(request: NextRequest): Promise<NextResponse> {
	if (request.nextUrl.pathname.includes("admin")) {
		const token = request.cookies.get("authorization");

		if (token !== undefined && (await authorization(token.value))) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(
				new URL("/login?message=Błąd autoryzacji - zaloguj się ponownie", request.url)
			);
		}
	} else {
		return NextResponse.next();
	}
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
