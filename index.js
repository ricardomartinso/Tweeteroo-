import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const arrayUsuario = [
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
const arrayTweets = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
  const infoUser = req.body;

  if (infoUser.avatar && infoUser.username) {
    arrayUsuario.push(req.body);
    return res.send("OK");
  }
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  arrayTweets.push({
    username,
    tweet,
  });

  tweets = arrayTweets.map(({ username, tweet }) => {
    const arrRightUser = arrayUsuario.filter((usuario) => {
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
  res.send(tweets);
});

app.listen(5000);
