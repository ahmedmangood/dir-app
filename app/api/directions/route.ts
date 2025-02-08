import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Direction from "../../../models/Direction";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const choiceId = searchParams.get("choiceId");

  if (!choiceId) {
    return NextResponse.json({ error: "Missing choiceId" }, { status: 400 });
  }

  const directions = await Direction.find({ choiceId }).populate("choiceId");
  return NextResponse.json(directions);
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();

  if (!body.choiceId || !body.steps || !Array.isArray(body.steps)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const direction = new Direction(body);
  await direction.save();
  return NextResponse.json(direction, { status: 201 });
}
