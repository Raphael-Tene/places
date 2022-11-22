import React, { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetId() {
  return (
    <Fragment>
      <MeetupDetail
        img="https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510"
        title="First Meetup"
        address="Some Address"
        description="First Meetup"
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  //TODO fetch data from an API
  const meetupId = context.params.meetupId;
  return {
    props: {
      meetupData: {
        img: "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
        id: meetupId,
        title: "First Meetup",
        address: "Some Address",
        description: "First Meetup",
      },
    },
  };
}

export default MeetId;
