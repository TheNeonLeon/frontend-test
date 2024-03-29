import Head from "next/head";
import ProfileList from "../components/profileList/ProfileList";

export default function Profile() {

      return (
        <>
        <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <main>
             <ProfileList />
          </main>
        </>
      )
}