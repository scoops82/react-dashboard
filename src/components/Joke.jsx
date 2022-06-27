import React, { useState, useEffect } from "react";

const API_ENDPOINT = "https://v2.jokeapi.dev/joke/Any?safe-mode";
function Joke() {
  const [fetchState, setFetchState] = useState({
    loaded: false,
    loading: false,
    error: false,
    errorMsg: "",
  });
  const [joke, setJoke] = useState([]);

  const [jokeCounter, setJokeCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setFetchState({ ...fetchState, loading: true });
      //   console.log(fetchState);

      try {
        const response = await fetch(API_ENDPOINT);

        if (!response.ok) {
          throw response;
        }

        const data = await response.json();

        console.log(data);
        formatJoke(data);
      } catch (err) {
        console.log(err);
        setFetchState({ ...fetchState, errorMsg: err, error: true });
      }
      setFetchState({ ...fetchState, loading: false, loaded: true });
    };

    fetchData();
  }, [jokeCounter]);

  const formatJoke = (data) => {
    if (data.type === "single") {
      const oneLiner = data.joke;
      if (oneLiner.includes("\n")) {
        const lines = oneLiner.split("\n");
        setJoke(lines);
      } else {
        setJoke([oneLiner]);
      }
    } else if (data.type === "twopart") {
      const twoParter = [data.setup, data.delivery];
      console.log("two parter:", [data.setup, data.delivery]);
      setJoke(twoParter);
    }
  };

  if (fetchState.loading) return <p>Loading new quote...</p>;

  if (fetchState.error) return <p>{fetchState.errorMsg}</p>;

  console.log(joke);

  return (
    <div>
      <h2>Joke of the Day</h2>
      {joke.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
      <button onClick={() => setJokeCounter(jokeCounter + 1)}>New Joke</button>
    </div>
  );
}

export default Joke;
