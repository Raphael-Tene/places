// @ts-nocheck
import React, { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const password = process.env.PASSWORD;
const mongodbURL = `mongodb+srv://agenttango:${password}@places.54eqipc.mongodb.net/?retryWrites=true&w=majority`;

function MeetId(props) {
  return (
    <Fragment>
      <MeetupDetail
        img={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(mongodbURL);
  const db = client.db();
  const meetupsCollection = db.collection("places");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(mongodbURL);
  const db = client.db();
  const meetupsCollection = db.collection("places");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.data.image,
        title: selectedMeetup.data.title,
        address: selectedMeetup.data.address,
        description: selectedMeetup.data.description,
      },
    },
  };
}

export default MeetId;
