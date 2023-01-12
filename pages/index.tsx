import Head from "next/head";
import { Inter } from "@next/font/google";
import Form from "../components/form/Form";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  return (
    <>
      <Head>
        <title>Create Person</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Form />
        </div>
      </main>
    </>
  );
}

export default Home;
