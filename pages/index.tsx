import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function Home(props) {
  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const handleLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();

    signIn("credentials", {
      username,
      password,
      callbackUrl: `${window.location.origin}/home`,
      redirect: false,
    }).then(function (result) {
      if (result.error !== null) {
        if (result.status === 401) {
          setLoginError(
            "Your username/password combination was incorrect. Please try again"
          );
        } else {
          setLoginError(result.error);
        }
      } else {
        router.push(result.url);
      }
    });
  };

  return (
    <form onSubmit={handleLogin}>
      {loginError}

      <label>
        Username:{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Submit login</button>

      <Link href="/register">Register</Link>
    </form>
  );
}
