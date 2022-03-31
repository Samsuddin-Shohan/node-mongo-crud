const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(cors());
app.use(express.json());
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
      const userCollection = database.collection('userDocuments');
      //get api
      app.get('/users',async(req,res)=>{
          const cursors = userCollection.find({});
          const users = await cursors.toArray();
          res.send(users);
      })
      app.get('/users/:id',async(req,res)=>{
          const id = req.params.id;
          //console.log(id);
          const query = {_id: ObjectId(id)};
          const user =await userCollection.findOne(query);
          //console.log(user);
          res.json(user);

        //   console.log(id);
      })
      //post api
      app.post('/users',async(req,res)=>{
          const newUser = req.body;
          //console.log(newUser);
          const result = await userCollection.insertOne(newUser);
        //   console.log('hitting the post',req.body);
        //   console.log('added in database',result);;
          res.json(result);

      })
      //delete api
      app.delete('/users/:id',async(req,res)=>{
          const id = req.params.id;
          const query = {_id: ObjectId(id)};
          const result = await userCollection.deleteOne(query);
        //   console.log(result);
          res.json(result);


      })
      app.put('/users/:id',async(req,res)=>{
        const id = req.params.id;
        const updatedUser = req.body;
        const filter = { _id: ObjectId(id)};
        const options = { upsert: true };
        //const result = await userCollection.updateOne()

        const updateDoc = {
          $set: {
            name: updatedUser.name,
            email:updatedUser.email
          },
        };
        const result = await userCollection.updateOne(filter, updateDoc, options);
        res.send(result)

      })
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);
app.get('/',(req,res)=>{
    res.send('running my server');
})
app.listen(port,()=>{
    console.log( `Running or port ${port}`); 
})