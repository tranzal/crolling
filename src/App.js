import React, { useEffect, useState } from "react";
import axios from "axios";
import Map from './map';

const App = () => {
  const [movie, setMovie] = useState(null);
  const [rank, setRank] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      await axios.get("http://localhost:4000/")
          .then(a =>setMovie(a.data))
          .catch();

    };
    const getRank = async () => {
      await axios.get("http://localhost:4000/rank")
          .then(a =>setRank(a.data))
          .catch();
    };
    getMovie();
    getRank();
  }, []);



  if (movie === null || rank===null) {
    return <div>Load..</div>;
  } else {
    // console.log(movie);
    // console.log(rank);
    // console.log(total);
    return (
        <div>

            <Map movie={movie} rank={rank}/>


        </div>
    );
  }
};

export default App;