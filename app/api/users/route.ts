import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI; // Your MongoDB connection string (environment variable)
const client = new MongoClient(MONGODB_URI);

export async function GET(req: NextRequest) {
    try {
        await client.connect();
        const db = client.db('test'); 
        const usersCollection = db.collection('users');

        const users = await usersCollection.find({}).toArray(); 

        return NextResponse.json(users); 
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function POST(req: NextRequest) {
    try {
        await client.connect(); 

        const db = client.db('test'); 
        const usersCollection = db.collection('users'); 

        const { username, email, firstName, lastName } = await req.json();

        // Validation 
        if (!username || !email || !firstName || !lastName) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        // Check if username or email already exists
        const existingUser = await usersCollection.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return NextResponse.json({ message: 'Username or email already exists' }, { status: 409 });
        }

        // Insert the new user 
        const result = await usersCollection.insertOne({
            username,
            email,
            firstName,
            lastName,
            // ...other fields...
        });

        const newUser = { ...req.body, _id: result.insertedId };

        return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
    } finally {
        await client.close(); 
    }
}