import React, { useState, useEffect } from "react";
import { TextField, FormControl } from "@mui/material";
import { Button } from "@material-tailwind/react";
import image from "../image/image.jpg";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [results, setResults] = useState("");
  const [meaning, setMeaning] = useState(false);
  const [Error, setError] = useState(false);

  const handleLogin = () => {
    setError(false);
    setMeaning(false);
  };

  const handleWordEnter = () => {
    setMeaning(true);
    setError(false);
  };

  async function dictionary() {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchKey}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const onEnterKeyDown = async (e) => {
    {
      e.preventDefault();
      await dictionary();
      console.log("hi");
    }
  };

  useEffect(() => {
    if (results.title === "No Definitions Found") {
      setMeaning(false);
      setError(true);
      console.log("hi");
    } else if (results) {
      handleWordEnter();
    }
  }, [results, results?.title]);

  console.log(meaning);
  console.log(Error);

  return (
    <div>
      {!meaning && !Error ? (
        <div className="flex flex-col items-center bg-white mt-16 text-base">
          <FormControl>
            <TextField
              className="mt-[8px]"
              type="search"
              id="outlined-basic"
              h-10
              variant="outlined"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              label="Searching Something?"
            ></TextField>
            <Button
              className="text-sm font-semibold text-white bg-blue-600   rounded shadow-md border-2 border-blue-600 md:text-base hover:bg-white hover:text-blue-900 mt-5 h-10 justify-center "
              onClick={onEnterKeyDown}
            >
              Search
            </Button>
            <p className="text-left mt-1 items-center">
              {" "}
              <br />
              Type a word and press enter to get meaning pronounication,
              <br />
              examples, synonyms, and more
            </p>{" "}
            <br />
          </FormControl>
          <img className="" width={350} src={image} /> <br />
          <p className="text-sm">Seems kind of empty here!</p>
        </div>
      ) : !meaning && Error ? (
        <div>
          <h1>
            {" "}
            Sorry we couldn't find definitions for the word you were looking
            for. click below to search a new word{" "}
          </h1>

          <Button
            className="text-sm font-semibold text-white bg-blue-600 rounded shadow-md border-2 border-blue-600 md:text-base hover:bg-white hover:text-blue-900 mt-2"
            onClick={handleLogin}
          >
            click here
          </Button>
        </div>
      ) : (
        meaning &&
        !Error &&
        results &&
        results[0]?.word && (
          <div className="flex flex-col justify-center text-left leading-8">
            <FormControl className="flex flex-col items-center bg-white mt-16 text-base">
              <TextField
                className="mt-[8px]"
                type="search"
                id="outlined-basic"
                variant="outlined"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                label="Searching Something?"
              ></TextField>
              <Button
                className="text-sm font-semibold text-white bg-blue-600 rounded shadow-md border-2 border-blue-600 md:text-base hover:bg-white hover:text-blue-900 mt-2"
                onClick={onEnterKeyDown}
              >
                Search
              </Button>
            </FormControl>
            <div className="flex flex-col mt-10 justify-center items-center md:flex-row shadow rounded-xl bg-violet-200  m-2">
              <div className="p-10 mb-auto">
                {<h2>Word: {results[0]?.word}</h2>}
              </div>

              <div className="flex flex-col p-10 mb-auto justify-center mr-10  leading-8">
                <div className="">
                  {results && (
                    <div className="pr-10">
                      <p>Pronunciation: </p>
                      <p>
                        {results[0]?.phonetics.map((x) => {
                          return <li> {x.text}</li>;
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col  justify-center mb-auto pt-10  ">
                <div className="heading">
                  {results && <h2>Part Of Speech</h2>}
                </div>

                <div className="ul">
                  {results[0].meanings.map((x, index) => {
                    return <li key={index}> {x.partOfSpeech}</li>;
                  })}
                </div>
              </div>

              <div className="flex flex-row justify-center p-10 mb-auto leading-8">
                <div className="heading">
                  {results && <h2>Definitions:</h2>}
                </div>

                <div className="ul">
                  {/*how to use map function to fetch from array */}
                  <ul>
                    {results[0].meanings.map((x, index) => {
                      return x.definitions.map((obj, subIndex) => {
                        return <li key={subIndex}>{obj.definition}</li>;
                      });
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Search;
