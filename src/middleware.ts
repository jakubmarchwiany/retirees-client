import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest): NextResponse {
	const token = request.cookies.get("authorization");

	if (token !== undefined) {
		return NextResponse.next();
	} else {
		return NextResponse.redirect(
			new URL("/login?message=Błąd autoryzacji - zaloguj się ponownie", request.url)
		);
	}
}

export const config = {
	matcher: "/admin/:path*"
};
