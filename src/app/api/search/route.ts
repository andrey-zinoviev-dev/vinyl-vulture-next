import { search } from "@/features/search/search.api";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    if (!q) {
        return NextResponse.json([]);
    }
    const releases = await search(q);
    return NextResponse.json(releases);
}