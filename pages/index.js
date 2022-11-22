
import React from "react";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First Meetup",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "Some Street",
    description: "This a first meet up",
  },
  {
    id: "m2",
    title: "Second Meetup",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "Some Street",
    description: "This a first meet up",
  },
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// *sever side props regeneration (rerendering)
// export async function getServerSideProps() {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

// *Client side props regeneration (rerendering)*
export async function getStaticProps() {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 1,
  };
}

export default HomePage;
