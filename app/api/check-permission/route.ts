// app/api/check-permission/route.ts
import { checkPermission } from '@/providers/access-provider/access-control.server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { role, resource, action } = await req.json();
  
  try {
    const allowed = await checkPermission(role, resource, action);
    return NextResponse.json({ allowed });
  } catch (error) {
    return NextResponse.json(
      { error: 'Permission check failed' },
      { status: 500 }
    );
  }
}