require("dotenv").config();
const express = require("express");
const app = express();
const deepai = require("deepai");
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
deepai.setApiKey("d4e4b786-469a-4c43-9d5f-06ea67b0f221");
// app.options("*", cors());
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

    return res.json({ resp });
  };
  try {
    callApi();
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Express server is listening on PORT: ${process.env.PORT}`);
});
