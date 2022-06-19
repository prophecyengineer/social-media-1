import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
import { connect } from "getstream";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const apiSecret = process.env.REACT_APP_STREAM_APP_SECRET as string;
const appId = process.env.NEXT_PUBLIC_STREAM_APP_ID as string;
//     process.env.REACT_APP_STREAM_APP_SECRET,
//     process.env.REACT_APP_STREAM_APP_ID,
//     { location: 'us-east' },

// const client = connect(apiKey, appId, apiSecret);

let stream = require('getstream');

// connect to the us-east region
const client = stream.connect(apiKey, apiSecret, { 'location': 'dublin' });

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === "POST") {
    const { name, username, email, password } = req.body;

    try {
      // makes a user feed in getstream

      //needed for getting user_id string for next step
      // const userToken = client.createUserToken(username);

      //this one is wrong
      let userToken = client.createUserToken(username)
      console.log("make a stream token with", username, userToken);

      //make a feed for user, add activity to that feed
      let Userfeed = client.feed('user', username);
      // let Timelinefeed = client.feed('timeline', username);
      // let Notifyfeed = client.feed('notification', username);
      Userfeed.addActivity({
        'actor': client.user(username).ref(),
        'verb': 'post',
        'object': 'I love this picture',
        'attachments': {
          'og': {
            'title': 'A kitten',
            'description': 'Download this photo in Italy by Lorenzo Spoleti',
            'url': 'http://placekitten.com/200/300',
            'images': [
              {
                'image': 'http://placekitten.com/200/300'
              }
            ]
          }
        }
      })

      console.log('made feed for', username, Userfeed.token)

      // const userToken = Userfeed.token

      // console.log('user Tkoen', userToken)




      // console.log('heres the notification one', Notifyfeed)
      // console.log('heres the Timeline one', Timelinefeed)


      const hash = await bcrypt.hash(password, 0);




      await prisma.users.create({
        data: {
          name: name,
          username: username,
          email: email,
          password: hash,
          userToken: userToken,
        },
      });

      return res.status(200).end();
    } catch (err) {
      return res.status(503).json({ err: err.toString() });
    }
  } else {
    return res
      .status(405)
      .json({ error: "This request only supports POST requests" });
  }
};
