import type { NextPage, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./Explore.module.css";
import { userInfo } from "os";
import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Card, Button, Grid, Text } from "@nextui-org/react";
import { PrismaClient } from "@prisma/client";
import "react-activity-feed/dist/index.css";
import {
  StreamApp,
  UserBar,
  NotificationDropdown,
  FlatFeed,
  LikeButton,
  Activity,
  CommentList,
  CommentField,
  StatusUpdateForm,
  FollowButton,
} from "react-activity-feed";
import stream from "getstream";
import { signOut, useSession } from "next-auth/react";
import NavBar from "../components/NavBar";
import { connect } from "getstream";



const Explore: NextPage = ({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const stream = require('getstream');
  const [followingListState, setFollowingListState] = useState([])

  const session = useSession();
  const userToken = session.data?.user?.userToken;
  const username = session.data?.user?.username;
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
  const appId = process.env.NEXT_PUBLIC_STREAM_APP_ID as string;
  const client = stream.connect(apiKey, userToken, appId);


  // const client = connect(apiKey, appId);

  //what if we getUsers from getstream instead?


  // loading activities and following stats from getStream.io
  useEffect(() => {
    // Activities()
    UserFollowing()
    // UserFollowers()
  }, []);

  const UserFollowing = () => {
    //got the current user info from getstream
    const userOne = client.feed('home', client.userId);
    userOne.following().then((res) => {

      let List = []
      for (let i = 0; i < res.results.length; i++) {
        const user = res.results[i].target_id.slice(5);
        List.push(user)
      }
      console.log('following list', List)

      setFollowingListState(List)

    }).catch((err) => {
      console.error(err)
    })
  }

  // function to follow a user from the main activity in middle of page
  const followerUser = (userToFollow) => {
    const userOne = client.feed('home', client.userId);
    userOne.follow('user', userToFollow)
    UserFollowing()
    // UserFollowers()
    // Activities()
  }

  const unfollowerUser = (userToUnFollow) => {
    const userOne = client.feed('home', client.userId);
    userOne.unfollow('user', userToUnFollow, { keepHistory: true })
    UserFollowing()
    // UserFollowers()
    // Activities()
  }

  const FollowingComponent = () => {
    return <Grid >
      <Grid>
        <Grid >

          <Text >
            Following {followingListState.length}
          </Text>
         

        </Grid>
      </Grid>
      <Grid >
        {followingListState.slice(0, 10).map((follower) => (
          <Grid >
            <Container>
              <Grid >
                <Grid >
                <UserBar
              key={follower}
              username={follower}
              onClickUser={console.log}
              avatar="https://i.pinimg.com/originals/4f/a1/41/4fa141173a1b04470bb2f850bc5da13b.png"
                
              timestamp="2022-04-19T07:44:11+00:00"
              subtitle="a user you're following"
                  />
                   <Button size='xs' onClick={() => unfollowerUser(follower)} >
                    unfollow?
                  </Button>
             
                </Grid>
               
              </Grid>
            </Container>
          </ Grid >
        ))}

      </Grid>
    </Grid>

  }



  return (
    <>
      <div className={styles.container}>
        <NavBar />
        <main className={styles.main}>
          <h1 className={styles.title}> Explore </h1>
          <FollowingComponent />
         
          <ul>
            {users.map((user) => (
              <li className={styles.title} key={user.username}>
                {user.username} {user.userToken}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
};

export async function getServerSideProps() {




  const prisma = new PrismaClient();

  const users = await prisma.users.findMany();
  // const users = await res.json()


  return {
    props: {
      users: users.map(
        (user: user) =>
        ({
          ...user,
          username: user.username.toString(),
          name: user.name.toString(),
          email: user.email.toString(),
          registeredAt: user.registeredAt.toISOString(),
        } as unknown as user)
      ),
    },
  };
}

export default Explore;
