require("dotenv").config();
const express = require("express");
const app = express();
const deepai = require("deepai");
const cors = require("cors");
app.use(cors());

app.use(express.json());
deepai.setApiKey(process.env.DEEP_AI_API_KEY);
app.options("*", cors());
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

    return res.json(resp);
  };
  try {
    callApi();
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Express server is listening on PORT: ${process.env.PORT}`);
});
