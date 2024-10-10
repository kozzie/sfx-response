const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://michael:michaelTest1@cluster0.bo0ma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 

async function deleteUser(email) { // Removed type annotation for now
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('test'); 
    const usersCollection = db.collection('users');

    const deleteResult = await usersCollection.deleteOne({ email: email }); 
    console.log(`Deleted user count: ${deleteResult.deletedCount}`);

  } catch (error) {
    console.error(error);
  } finally {
    if (typeof myVariable !== 'undefined') {
      await client.close();
    }
  }
}

// Call the function with the email address
deleteUser('tester@test.com'); 