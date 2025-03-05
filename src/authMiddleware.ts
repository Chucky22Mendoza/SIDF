import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_JWT_KEY || "S1DF_1p@2");

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload; // Datos decodificados
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

export async function authMiddleware(request: NextRequest): Promise<NextResponse | undefined> {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Unauthorized: Missing or invalid Authorization header' },
      { status: 401 }
    );
  }

  const token = authHeader.split(' ')[1];
  try {
    await verifyToken(token);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Unauthorized: Invalid or expired token' },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export async function adminPagesMiddleware(request: NextRequest): Promise<NextResponse | undefined> {
  const { get, delete: deleteCookie } = cookies();
  const jwt = get('user-login');

  if (jwt) {
    if (request.nextUrl.pathname === '/login') {
      try {
        const verified = await jwtVerify(jwt.value, SECRET_KEY);

        if (verified) {
          if (verified.payload.email && verified.payload.id) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
          }
          deleteCookie('user-login');
        }
        return NextResponse.next();
      } catch (error) {
        return NextResponse.next();
      }
    }

    try {
      const verified = await jwtVerify(jwt.value, SECRET_KEY);

      if (!verified.payload.email || !verified.payload.id) {
        throw new Error('Unauthorized');
      }

      if (request.nextUrl.pathname === '/admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

// Middleware para registrar las solicitudes (logging)
export function loggingMiddleware(request: NextRequest): void {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
}
