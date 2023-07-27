const mongoose = require('mongoose');

//const MONGODB_URI = process.env.DISTECNOMUNDO_MONGODB_URI;MjQLycmuu1t0fDQb
const MONGODB_URI =
    'mongodb+srv://Dist:MjQLycmuu1t0fDQb@tecno.onjv3om.mongodb.net/?retryWrites=true&w=majority';

//Conectando base de datos
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    //useCreateIndex: true,
});

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri =
//     'mongodb+srv://Dist:MjQLycmuu1t0fDQb@tecno.onjv3om.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     },
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db('admin').command({ ping: 1 });
//         console.log(
//             'Pinged your deployment. You successfully connected to MongoDB!'
//         );
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);
