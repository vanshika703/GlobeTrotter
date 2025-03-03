import { NextResponse } from 'next/server';
import { destinations } from '@/data/destinations';

export async function GET() {
  return NextResponse.json(destinations);
}
