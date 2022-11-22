// @ts-nocheck
import React from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const password = process.env.PASSWORD;
const mongodbURL = `mongodb+srv://agenttango:${password}@places.54eqipc.mongodb.net/?retryWrites=true&w=majority`;



function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}


// *Client side props regeneration (rerendering)*
export async function getStaticProps() {
  const client = await MongoClient.connect(mongodbURL);
  const db = client.db();
  const meetupsCollection = db.collection("places");
  const meetups = await meetupsCollection.find().toArray();

  // meetups.map((meetup) => {
  //   console.log(meetup._id, meetup.data);
  // });

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
