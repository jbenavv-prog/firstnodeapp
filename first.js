const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
let db;

app.get("/api/1", async (req, res) => {
  const result = await db
    .collection("listingsAndReviews")
    .find({
      bathrooms: { $gte: 2 },
    })
    .limit(10)
    .toArray();
  res.send(result);
});

app.get("/api/2", async (req, res) => {
  const number = req.query.price;
  console.log(number);
  const result = await db
    .collection("listingsAndReviews")
    .find({ price: { $lte: 300 } })
    .sort({ price: -1 })
    .limit(50)
    .toArray();
  res.send(result);
});

app.get("/api/3", async (req, res) => {
  try {
    const result = await db
      .collection("listingsAndReviews")
      .find({ house_rules: { $regex: "no smoking" } })
      .limit(10)
      .toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(400).json({
      ok: false,
      message: error.message,
    });
  }
});

mongoose
  .connect(
    "mongodb+srv://root:toor@cluster0.dyvadcq.mongodb.net/sample_airbnb?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Mongo DB Connected!");
    db = mongoose.connection.db;
  })
  .catch(() => {
    console.log("Connection Failed!");
  });
// .finally(()=>{
//   console.log("Request finished!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});