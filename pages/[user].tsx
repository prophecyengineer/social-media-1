import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";

// we need to get a username in the search url
// shorten / mask that url to be just the username

export default function UserPage({ props }) {
  const { query } = useRouter();
  console.log('heya'props)
  return (
    <div>
      {/* <h1>{props.user.username}s page</h1> */}
      {/* <Link href={`/user?username=${props.username}`}> */}
        {/* <a>{props.username}</a> */}
      {/* </Link> */}
     
    </div>
  );
}

export async function getServerSideProps() {

  const query = 'lottie'
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
     
              where: {
      username: query,
    },
    
  });
  
 



  return {
    props: {
      name: user.name,
      username: user.username
    },
  };
}
