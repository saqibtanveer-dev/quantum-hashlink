import { enrollmentSchema } from '../../../lib/enrollmentValidator';
import clientPromise from '../../../lib/mongodb';

export async function POST(req: Request) {
  try {
    console.log("got a request")
    const data = await req.json();
    console.log("data is: ", data)
    const parseResult = enrollmentSchema.safeParse(data);
    if (!parseResult.success) {
      return Response.json({ message: 'Validation failed', errors: parseResult.error.flatten().fieldErrors }, {status: 400});
    }

    const client = await clientPromise;
    const db = client.db('enrollment');
    const collection = db.collection('enrollment-forms');

    await collection.insertOne({ ...data ,createdAt: new Date() });

    return Response.json({ message: 'Registration saved!' }, {
      status: 200
    });
  } catch (error) {
    console.error('Error saving registration:', error);
    return Response.json({ message: 'Server error' }, {
      status: 500
    });
  }
}
