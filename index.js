const express = require('express');
const { MongoClient } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();



// Middelware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xrjhi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
      await client.connect();
      
      const database = client.db("BlackCoffer_Assignment");
      const serviceCollection = database.collection("service_Info");
      // Get All Service to display on the UI
      app.get('/services', async(req,res)=>{
        const result = await serviceCollection.find({}).toArray();
        res.json(result)
      });
    } finally {
        // await client.close();
      }
    }
    run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("I am now in BlackCoffer Server")
  });
app.listen(port, () => {
    console.log("BlackCoffer listening at port ", port);
  
  })