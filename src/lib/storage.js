import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
export const s3 = new S3Client({ region: process.env.B2_REGION, endpoint: process.env.B2_ENDPOINT, credentials: { accessKeyId: process.env.B2_APPLICATION_KEY_ID, secretAccessKey: process.env.B2_APPLICATION_KEY }});
export async function putFile(key, body, contentType){await s3.send(new PutObjectCommand({Bucket:process.env.B2_BUCKET_NAME,Key:key,Body:body,ContentType:contentType}))}
export async function signedUrl(key){return await getSignedUrl(s3,new GetObjectCommand({Bucket:process.env.B2_BUCKET_NAME,Key:key}),{expiresIn:3600})}
