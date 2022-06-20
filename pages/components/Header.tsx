import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Container, Text } from "@nextui-org/react";
import styles from './Components.module.css'
export default function NavBar() {
  // console.log('session',session.data?.user?.username)
  const router = useRouter();

  return (
    <Container className={styles.header}>
     
      <Button.Group>
         <Link href="/">
        <Button>audit.law</Button>
      </Link>
        <Button onClick={signOut}>Sign Out</Button>
      </Button.Group>
    </Container>
  );
}
