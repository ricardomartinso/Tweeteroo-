import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const arrayUsuarios = [];
const serverTweets = [];
let tweets = [];

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

app.post("/sign-up", (req, res) => {
  const infoUser = req.body;

  if (
    infoUser.avatar.length > 0 &&
    infoUser.username.length > 0 &&
    isImage(infoUser.avatar)
  ) {
    arrayUsuarios.push(req.body);
    res.status(201).send("OK");
  } else {
    res.status(400).send("Todos os campos são obrigatórios!");
  }
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  if (username.length > 0 && tweet.length > 0) {
    serverTweets.push({
      username,
      tweet,
    });

    tweets = serverTweets.map(({ username, tweet }) => {
      const arrRightUser = arrayUsuarios.filter((usuario) => {
        if (usuario.username === username) {
          return true;
        }
      });
      const avatar = arrRightUser[0].avatar;
      return { username, avatar: avatar, tweet };
    });

    res.status(201).send("OK");
  } else {
    res.status(400).send("Todos os campos são obrigatórios!");
  }
});

app.get("/tweets", (req, res) => {
  res.send(tweets.slice(-10));
});

app.listen(5000);
