const express = 
require("express");

const app = express();
app.use(express.json());

const VERIFY_TOKEN = 
process.env.VERIFY_TOKEN ||
  "troque-este-token";

app.get("/webhook", (req, res) =>
  {
    const mode =
      req.query["heb.mode"];
    const token =
      req.query["hub.verify_token"];
    const challenge = 
    req.query["hub.challenge"];

        if (mode === "subscribe" && 
            token === VERIFY_TOKEN) {
          console.log("webhook verificado!");
          return
          res.status(200).send(challenge);
        }

        return res.sendStatus(403);
  });
app.post("/webhook", (req, res) => 
  {
    console.log("Mensagem recebida:",
                JSON.stringify(req.body));
    res.sendStatus(200);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
