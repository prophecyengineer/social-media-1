import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import styles from './Components.module.css'

export default function NavBar() {
  // console.log('session',session.data?.user?.username)
  const router = useRouter();
  return (
    <>
      <Button.Group className={styles.navbar}>
        <Link href="/home">
          <Button>Home</Button>
        </Link>
        <Link href="/explore">
          <Button>Explore</Button>
        </Link>
        <Link href="/profile">
          <Button>Profile</Button>
        </Link>
        <Link href="/notification">
          <Button>Notification</Button>
        </Link>
    
      </Button.Group>
    </>
  );
}
