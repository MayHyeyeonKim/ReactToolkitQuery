const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB 연결
mongoose.connect("mongodb://localhost:27017/counter", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const countSchema = new mongoose.Schema({ count: Number });
const Count = mongoose.model("Count", countSchema);

// GET 요청: 현재 카운트 가져오기
app.get("/count", async (req, res) => {
  const count = await Count.findOne();
  res.json(count || { count: 0 });
});

// POST 요청: 카운트 업데이트
app.post("/count", async (req, res) => {
  const { count } = req.body;
  let countDoc = await Count.findOne();
  if (countDoc) {
    countDoc.count = count;
    await countDoc.save();
  } else {
    countDoc = new Count({ count });
    await countDoc.save();
  }
  res.json(countDoc);
});

// 서버 실행
app.listen(5005, () => {
  console.log("Server running on http://localhost:5005");
});
