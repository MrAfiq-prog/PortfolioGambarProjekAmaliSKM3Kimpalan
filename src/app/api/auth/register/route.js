import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { createSession } from '@/lib/auth';

export async function POST(req) {
  try {
    const b = await req.json();

    const hash = await bcrypt.hash(b.password, 10);

    const r = await db().execute({
      sql: 'INSERT INTO users (full_name,ic_number,batch_no,email,password_hash,role) VALUES (?,?,?,?,?,?) RETURNING *',
      args: [
        b.fullName,
        b.icNumber,
        b.batchNo,
        b.email.toLowerCase(),
        hash,
        'student'
      ]
    });

    const user = r.rows[0];
    const token = await createSession(user);

    (await cookies()).set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return Response.json({ ok: true, role: user.role });
  } catch (e) {
    return Response.json(
      { error: 'Email atau IC sudah digunakan.' },
      { status: 400 }
    );
  }
}
