const express = require("express");
const app = express();
const path = require("path");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");
const connectDB = require("./config/database");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Enable CORS for client origin only
const cors = require('cors')
const corsOptions = {
   origin : ['https://mern-template-g1ny.onrender.com', 'https://localhost:3000'],
}
app.use(cors(corsOptions))

//middleware
//Body Parsing

// any reqs that comes in and it looks like it has body to it , we're sending to the server and if it does and then attach it to the reqest object so we can access it in req handler
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Render React as View
app.use(express.static(path.join(__dirname, "..", "client", "build")));


// Setup Routes For Which The Server Is Listening
// when we fire request to this route right here I want you to use these routes 
app.use('/api/products', productRoutes)
app.use('/api/user', userRoutes)


// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error", stack } = err;
  console.log(stack);
  res.status(status).json({ message });
});

// connect to mongodb
connectDB().then(() => {
    // Server Running
    app.listen(process.env.PORT, () => {
      console.log("Server is running, you better catch it!");
    });

    })
    .catch((error) => {
      console.log(error)
    })




// mongoose us known as odm which stands for object data modeling and it basically wraps mongodb with an extra layer that allows us to use methods to read and write database documents and it also gives us a way to declare models and schemas to esnure a more strict data structure. It adds an extra layer of structure like adding requirements that a document must have a title, body, author 