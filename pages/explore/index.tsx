import type { NextPage, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./Explore.module.css";
import { userInfo } from "os";
import * as React from "react";

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
  

  const session = useSession();
  const userToken = session.data?.user?.userToken;
  const username = session.data?.user?.username;
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
  const appId = process.env.NEXT_PUBLIC_STREAM_APP_ID as string;
  const client = stream.connect(apiKey, userToken, appId);


  // const client = connect(apiKey, appId);

  //what if we getUsers from getstream instead?


 


  return (
    <>
      <div className={styles.container}>
        <NavBar />
        <main className={styles.main}>
          <h1 className={styles.title}> Explore </h1>
         
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
