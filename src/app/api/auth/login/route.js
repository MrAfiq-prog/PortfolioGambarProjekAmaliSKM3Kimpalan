import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { createSession } from '@/lib/auth';

export async function POST(req) {
  const b = await req.json();
  let user;

  if (b.email === process.env.ADMIN_EMAIL && b.password === process.env.ADMIN_PASSWORD) {
    user = {
      id: 0,
      email: b.email,
      role: 'admin',
      full_name: 'Admin KAMS',
      batch_no: '-',
      ic_number: '-'
    };
  } else {
    const r = await db.execute({
      sql: 'SELECT * FROM users WHERE email=?',
      args: [b.email.toLowerCase()]
    });

    user = r.rows[0];

    if (!user || !(await bcrypt.compare(b.password, user.password_hash))) {
      return Response.json(
        { error: 'Email atau password salah.' },
        { status: 401 }
      );
    }
  }

  const token = await createSession(user);

  (await cookies()).set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  return Response.json({ ok: true, role: user.role });
}
