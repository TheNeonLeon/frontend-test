import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { deleteUser, getUsers, updateUser } from "../utils/userApi";
import db from "../firebase/firebaseConfig";
import { addUser } from "../utils/userApi";
import Form from "../components/form/Form";
import Router, { useRouter } from "next/router";
import { GetStaticProps } from "next";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  getUsers(db).then((response) => console.log(response));

  const router = useRouter();
  const toCompanyPage = (e: any) => {
    e.preventDefault();
    router.push("/company");
  };
  const toProfilePage = (e: any) => {
    e.preventDefault();
    router.push("/profile");
  };
  return (
    <>
      <Head>
        <title>Create Person</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Form />
        <button onClick={toCompanyPage}>Company page</button>
        <button onClick={toProfilePage}>Profile page</button>
        <button onClick={updateUser}>remove from company</button>
        <button onClick={deleteUser}>delete</button>
      </main>
    </>
  );
}

export default Home;
