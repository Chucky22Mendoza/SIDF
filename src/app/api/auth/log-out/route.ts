import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  return NextResponse.error();
}

export function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('user-login');

  if (!token) {
    return NextResponse.json({
      message: 'Token not found'
    }, {
      status: 404,
    });
  }

  try {
    cookieStore.delete('user-login');
    return NextResponse.json({
      message: 'Successfully logged out'
    }, {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: 'Internal Server Error'
    }, {
      status: 500,
    });
  }
}
