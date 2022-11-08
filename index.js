require("dotenv").config();
const express = require("express");
const app = express();
const deepai = require("deepai");
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
deepai.setApiKey("d4e4b786-469a-4c43-9d5f-06ea67b0f221");

const callApi = async (prompt) => {
  return await deepai.callStandardApi("text2img", {
    prompt,
  });
};

// app.options("*", cors());
app.post("/image", async (req, res) => {
  if (!req.body.user_prompt) {
    return res.status(400).json({
      message: "you must provide a prompt",
    });
  }
  try {
    const response = await callApi(req.body.user_prompt);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Express server is listening on PORT: ${process.env.PORT}`);
});
