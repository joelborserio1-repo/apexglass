import { NextResponse } from "next/server";
import { listProjects } from "@/lib/projects";
export async function GET(){ return NextResponse.json(await listProjects(false)); }
