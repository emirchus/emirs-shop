import { useSession } from '@/hooks/use-session';
import { User } from '@/interfaces/user';
import { BASE_URL } from '@/lib';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const session = await useSession();

  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = (await response.json()) as {
      access_token: string;
      refresh_token: string;
    };

    const profileRespones = await fetch(`${BASE_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${data.access_token}`
      }
    });

    const profile = (await profileRespones.json()) as User;

    session.user = profile;
    session.access_token = data.access_token;

    await session.save();

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Invalid credentials'
      },
      { status: 401 }
    );
  }
}

export async function GET() {
  const session = await useSession();

  if (session.user) {
    return NextResponse.json({ user: session.user }, { status: 200 });
  }

  return NextResponse.json({ message: 'Not logged in' }, { status: 401 });
}

export async function PUT() {
  const session = await useSession();

  if (session.user) {
    const profileRespones = await fetch(`${BASE_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    });

    const profile = (await profileRespones.json()) as User;

    session.user = profile;

    await session.save();

    return NextResponse.json(profile, { status: 200 });
  }

  return NextResponse.json({ message: 'Not logged in' }, { status: 401 });
}

export async function DELETE() {
  const session = await useSession();

  session.destroy();

  return NextResponse.json({ message: 'Logged out' }, { status: 200 });
}
