const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {

  const msg = req.body.message;

  try {

    const response = await fetch(

      "https://openrouter.ai/api/v1/chat/completions",

      {

        method: "POST",

        headers: {

          "Authorization":
          `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
          "application/json"

        },

        body: JSON.stringify({

          model:
          "openai/gpt-4o-mini",

          max_tokens: 200,

          messages: [
            {
              role: "user",
              content: msg
            }
          ]

        })

      }

    );

    const data = await response.json();

    console.log(data);

    const reply =

      data.choices?.[0]
      ?.message?.content

      || "No response";

    res.json({
      reply: reply
    });

  } catch (err) {

    console.log(err);

    res.json({
      reply: "Server Error"
    });

  }

});

app.listen(3000, () => {

  console.log(
    "ToolKeet AI Running 🚀"
  );

});
