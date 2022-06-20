import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Container } from "@nextui-org/react";
import styles from "./Components.module.css";
import { Home, Discovery, User, Notification, Setting } from "react-iconly";

export default function NavBar() {
  // console.log('session',session.data?.user?.username)
  const router = useRouter();
  return (
    <>
      <Container className={styles.navbar}>
        <Button.Group color="gradient" bordered size="lg">
          <Link href="/home">
            <Button>
              <Home set="bulk" primaryColor="blueviolet" />
            </Button>
          </Link>
          <Link href="/explore">
            <Button>
              <Discovery set="bulk" primaryColor="blueviolet" />
            </Button>
          </Link>

          <Link href="/profile">
            <Button>
              <User set="bulk" primaryColor="blueviolet" />
            </Button>
          </Link>
          <Link href="/notification">
            <Button>
              <Notification set="bulk" primaryColor="blueviolet" />
            </Button>
          </Link>
          <Link href="/">
            <Button>
              <Setting set="bulk" primaryColor="blueviolet" />
            </Button>
          </Link>
        </Button.Group>
      </Container>
    </>
  );
}
