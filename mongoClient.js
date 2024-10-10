const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://michael:michaelTest1@cluster0.bo0ma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const admin = client.db().admin(); // Get the admin database
    
        // List databases
        const databases = await admin.listDatabases();
        console.log("Databases:", databases.databases);
    
        // List collections in a specific database (replace 'your-database-name')
        const collections = await client.db('test').listCollections().toArray();
        console.log("Collections:", collections);
    
        const usersCollection = client.db('test').collection('users');
        const allDocuments = await usersCollection.find({}).toArray();
        console.log("Documents:", allDocuments);

  } finally {
    await client.close();
  }
}

run().catch(console.error);