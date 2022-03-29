const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 5000;

//user: mydb
//password: UKdnt9Eptn2XYyfR

const uri = "mongodb+srv://mydb:UKdnt9Eptn2XYyfR@cluster0.clkdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("users").collection("userDocuments");
//   // perform actions on the collection object
//   console.log('hitting the database');
//   const user = {name: 'mira',email:'mira@gmail.com'};
//   collection.insertOne(user)
//   .then(()=>{
//       console.log('insert succes');
//   })
//  // client.close();
// });
async function run() {
    try {
      await client.connect();
      const database = client.db('users');
      const users = database.collection('userDocuments');
      // Query for a movie that has the title 'Back to the Future'
      const user = { name:'specaial',email:'special@gmail.com'};
      const result = await users.insertOne(user);
      console.log(result);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
app.get('/',(req,res)=>{
    res.send('running my server');
})
app.listen(port,()=>{
    console.log( `Running or port ${port}`); 
})