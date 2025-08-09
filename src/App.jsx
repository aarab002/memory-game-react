import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [Poke, setPoke] = useState([]);
  const [Count, setCount] = useState(0);
  const [Clicked, setClicked] = useState([]);

  function Randomiser() {
    const shuffle = [...Poke].sort(() => Math.random() - 0.5);
    setPoke(shuffle);
  }

  function Counter(val) {
    if (Clicked.includes(val)) {
      setClicked([]);
      setCount(0);
    } else {
      setClicked([...Clicked, val]);
      setCount(Count + 1);
    }
  }

  useEffect(() => {
    let isMounted = true; // prevent state update if component unmounts

    let count = 9;
    for (let i = 0; i < count; i++) {
      const randomPoke = Math.floor(Math.random() * 1025) + 1;

      (async () => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomPoke}`
        );
        const data = await res.json();
        const New = { name: data.name, img: data.sprites.front_default };

        if (isMounted) {
          setPoke((prev) => {
            if (prev.length < count) return [...prev, New];
            else return prev;
          });
        }
      })();
    }

    return () => {
      isMounted = false; // cleanup to avoid memory leaks
    };
  }, []);

  return (
    <>
      <div>
        <h1>Memory Game</h1>
        <h4>Pick all images without clicking one image twice</h4>
        <h3>Score is: {Count}</h3>
      </div>

      <div
        className="grid grid-cols-3 gap-4 p-6 bg-gray-50 rounded-2xl border-4 border-gray-200 shadow-xl w-fit mx-auto
"
      >
        {Poke.map((poke, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-blue-500 text-lg font-semibold rounded-xl shadow-md p-4 border-2 border-white hover:scale-105 transition-transform duration-200 space-y-2
"
            onClick={() => {
              Randomiser();
              Counter(poke.name);
            }}
          >
            <img
              src={poke.img}
              alt={poke.name}
              style={{ width: "200px", height: "200px" }}
            />
            <p>{poke.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
