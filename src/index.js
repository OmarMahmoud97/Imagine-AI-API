require("dotenv").config();
const express = require("express");
const app = express();
const deepai = require("deepai");
const cors = require("cors");

app.use(express.json());
app.use(cors());
deepai.setApiKey(process.env.DEEP_AI_API_KEY);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.post("/image", (req, res) => {
  if (!req.body.user_prompt) {
    return res.status(400).json({
      message: "you must provide a prompt",
    });
  }

  const callApi = async () => {
    const resp = await deepai.callStandardApi("text2img", {
      text: req.body.user_prompt,
    });

    res.json(resp);
  };

  callApi();
});

app.listen(process.env.PORT, () => {
  console.log(`Express server is listening on PORT: ${process.env.PORT}`);
});
