import { NextRequest, NextResponse } from 'next/server';

import { appRouter } from '~/server/api/root';
import { createTRPCContext } from '~/server/api/trpc';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, company, status } = body;

    const headers = new Headers();
    req.headers.forEach((value, key) => {
      headers.append(key, value);
    });

    const ctx = await createTRPCContext({ headers });
    const caller = appRouter.createCaller(ctx);

    const job = await caller.job.create({
      title,
      company,
      status,
    });
    return NextResponse.json({ message: 'Job added successfully!', job });
  } catch (error) {
    console.error('Error adding job:', error);
    return NextResponse.json({ error: 'Failed to add job. Please try again.' }, { status: 500 });
  }
}
