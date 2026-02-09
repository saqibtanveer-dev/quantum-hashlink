import { enrollmentSchema } from '../../../lib/enrollmentValidator';
import clientPromise from '../../../lib/mongodb';
import { apiLimiter } from '../../../lib/rateLimit';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';

    try {
      await apiLimiter.check(5, ip);
    } catch {
      return Response.json(
        { status: false, message: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    const data = await req.json();
    const parseResult = enrollmentSchema.safeParse(data);
    if (!parseResult.success) {
      return Response.json(
        { status: false, message: 'Validation failed', errors: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('enrollment');
    const collection = db.collection('enrollment-forms');

    await collection.insertOne({ ...parseResult.data, createdAt: new Date() });

    return Response.json({ status: true, message: 'You Are Done!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving registration:', error);
    return Response.json(
      { status: false, message: 'Something Went Wrong!' },
      { status: 500 }
    );
  }
}
