import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-me');
export async function createSession(user){return await new SignJWT({id:user.id,email:user.email,role:user.role,fullName:user.full_name}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(secret)}
export async function getSession(){const token=(await cookies()).get('session')?.value;if(!token)return null;try{return (await jwtVerify(token,secret)).payload}catch{return null}}
export async function requireUser(){const s=await getSession();if(!s)throw new Error('UNAUTHORIZED');return s}
export async function requireAdmin(){const s=await requireUser();if(s.role!=='admin')throw new Error('FORBIDDEN');return s}
