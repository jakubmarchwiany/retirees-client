import { NextResponse } from "next/server";

import { sleep } from "../components/utils/sleep";

export async function GET(): Promise<any> {
	try {
		await sleep(500);

		return NextResponse.json({ string: "working" });
	} catch (error) {
		return NextResponse.json({ string: "fail" });
	}
}
