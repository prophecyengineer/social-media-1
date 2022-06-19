import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link'
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

export default function NavBar() {
    // console.log('session',session.data?.user?.username)
    const router = useRouter();



    return (
        <>
            <Button.Group>
                <Link href='/home'>
                    <Button>Home</Button>
                </Link>
                <Link href='/profile'>
                    <Button>Profile</Button>
                </Link>
                <Link href='/notification'>
                    <Button>Notification</Button>
                </Link>
                <Button onClick={signOut}>Sign Out</Button>
            </Button.Group>
        </>
    )


}