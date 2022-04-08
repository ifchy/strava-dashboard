// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const FetchData = () => {
//   const [rides, setRides] = useState([]);
//   const config = {
//     method: "get",
//     url: "https://www.strava.com/api/v3/athlete/activities?access_token=8b23ff6c62081735f1d5b20b723edfa8191dd9aa&per_page=50",
//     headers: {
//       Cookie: "_strava4_session=3gqjghe8q5s2i0i2vck7vqs06jca5vd9",
//     },
//   };

//   const getRides = async () => {
//     const response = await fetch(config.url);
//     const jsonData = await response.json();
//     const rendered = jsonData.map((ride, index) => {
//       //   <>
//       //     <div className="workout" key={index}>
//       //       <div>{ride.name}</div>
//       //       <div>{ride.start_date}</div>
//       //       <div>{ride.type}</div>
//       //       <div>{ride.elapsed_time}</div>
//       //       <div>{ride.distance}</div>
//       //       <div>{ride.average_heartrate}</div>
//       //     </div>
//       //   </>
//       const {
//         name,
//         start_date,
//         type,
//         elapsed_time,
//         distance,
//         average_heartrate,
//       } = ride;

//       return {
//         name,
//         start_date,
//         type,
//         elapsed_time,
//         distance,
//         average_heartrate,
//       };
//     });
//     setRides(rendered);
//   };

//   useEffect(() => {
//     getRides();
//     console.log(rides);
//   }, []);

//   return <div>{}</div>;
// };

// export default FetchData;
