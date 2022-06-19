import { connect } from "getstream";

/* eslint-disable import/no-anonymous-default-export */
// const streamString ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibG90dGllIn0.1GfqRl6bJFhK-oQdsbHM-GVBvDLhROxp0Gi1N1qLC40";
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const appId = process.env.NEXT_PUBLIC_STREAM_APP_ID as string;
const apiSecret = process.env.REACT_APP_STREAM_APP_SECRET as string;

let stream = require("getstream");

const client = connect(apiKey, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia2F5YSJ9.yBStiSdcIHoZLy8DC8D5PnIPeRUofbUPbRe2YseM9BY', appId);


export default async () => {
    // make a notification feed for the user didnt work



    // const userStreamToken = client.feed('user', 'devil', userToken);

    await client.setUser({
        name: 'The Devil',
        occupation: 'Human',
        gender: 'female'
    });

    // const userHomeToken = client.feed("timeline", 'molly')

    // const userNotifyFeed = client.feed("notifications", 'molly');
    // console.log("userHomeToken", userHomeToken);

    //userNotifyFeed StreamFeed {
    // client: <ref *1> StreamClient {
    //     baseUrl: 'https://api.stream-io-api.com/api/',
    //     baseAnalyticsUrl: 'https://analytics.stream-io-api.com/analytics/',
    //     apiKey: 'ahz2eg2sn9na',
    //     appId: '892xf3z7npytxgusfgjnen9j5d9qrkbgtzcq7tdzbqt239q9sa8fmewysyu6zchv',
    //     usingApiSecret: true,
    //     apiSecret: '1193290',
    //     userToken: null,
    //     enrichByDefault: false,
    //     options: {},
    //     userId: undefined,
    //     authPayload: undefined,
    //     version: 'v1.0',
    //     fayeUrl: 'https://faye-us-east.stream-io-api.com/faye',
    //     group: 'unspecified',
    //     expireTokens: false,
    //     location: undefined,
    //     fayeClient: null,
    //     browser: false,
    //     node: true,
    // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6IioiLCJhY3Rpb24iOiIqIiwiZmVlZF9pZCI6IioifQ.lhbzeBICYoO6clzy-MjHCr96x_azw1yPJLStZmS806o',

    // const userFeed = client.feed("user", "molly");
    // console.log("userFeed", userFeed);


    //     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6IioiLCJhY3Rpb24iOiIqIiwiZmVlZF9pZCI6Im5vdGlmaWNhdGlvbnNhbGV4In0.IAhcBtpLF1pLH_pqwmjN8ox8tvFWq6-exxQXpRxmDgI',
    //   id: 'notifications:alex',
    //   slug: 'notifications',
    //   userId: 'alex',
    //   feedUrl: 'notifications/alex',



    // forcing a make feed
    // const exploreFeed = client.feed("explore", "globalUser");
    // console.log('explore', exploreFeed);
    //   const globalToken = client.createUserToken("globalUser");
    //   console.log("globalToken", globalToken);
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZ2xvYmFsVXNlciJ9.dfPAws7TBPp7YnDoSp57TttWzVyyW9KpG4074elpJTA;
};