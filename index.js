import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const arrayUsuarios = [
  {
    username: "a",
    avatar:
      "https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/01-proboscis-monkey-NationalGeographic_2684060.webp?w=1600&h=1067",
  },
  {
    username: "b",
    avatar:
      "https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/01-proboscis-monkey-NationalGeographic_2684060.webp?w=1600&h=1067",
  },
  {
    username: "c",
    avatar:
      "https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/01-proboscis-monkey-NationalGeographic_2684060.webp?w=1600&h=1067",
  },
  {
    username: "d",
    avatar:
      "https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/01-proboscis-monkey-NationalGeographic_2684060.webp?w=1600&h=1067",
  },
];
const serverTweets = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
  const infoUser = req.body;

  if (infoUser.avatar && infoUser.username) {
    arrayUsuarios.push(req.body);
    return res.send("OK");
  }
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

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

  res.send("OK");
});

app.get("/tweets", (req, res) => {
  if (tweets.length >= 10) {
    tweets.slice(-10);
    return res.send(tweets.slice(-10));
  }
  res.send(tweets.slice(-10));
});

app.listen(5000);
