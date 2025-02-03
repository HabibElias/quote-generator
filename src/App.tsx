import { useEffect, useState } from "react";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { FaTwitter, FaTumblr } from "react-icons/fa";
import axios from "axios";
import "./App.css";
import Quote from "./Entities/Quote";
import apiClient from "./services/api-client";

function App() {
  const colors = [
    "#B8860B", // Dark Goldenrod
    "#A9A9A9", // Dark Gray
    "#BDB76B", // Dark Khaki
    "#778899", // Light Slate Gray
    "#8B4513", // Saddle Brown
    "#A0522D", // Sienna
    "#CD853F", // Peru
    "#D2691E", // Chocolate
    "#8B0000", // Dark Red
    "#A52A2A", // Brown
    "#B22222", // Firebrick
    "#8B008B", // Dark Magenta
    "#556B2F", // Dark Olive Green
    "#6B8E23", // Olive Drab
    "#2F4F4F", // Dark Slate Gray
    "#4682B4", // Steel Blue
    "#5F9EA0", // Cadet Blue
    "#8B4513", // Saddle Brown
    "#A0522D", // Sienna
    "#6A5ACD", // Slate Blue
    "#483D8B", // Dark Slate Blue
    "#4B0082", // Indigo
    "#800080", // Purple
    "#8A2BE2", // Blue Violet
    "#9400D3", // Dark Violet
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const [color, useColor] = useState(getRandomColor);

  const [quote, setQuote] = useState({
    author: "Jamie Paolinetti",
    content:
      "Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.",
  });

  useEffect(() => {
    apiClient
      .get<Quote>("/quotes/random/")
      .then((res) => {
        setQuote({
          author: res.data.originator.name,
          content: res.data.content,
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          console.error("Error fetching quote", err);
        }
      });
  }, [color]);

  return (
    <>
      <div id="container" style={{ backgroundColor: color }}>
        <div id="quote-box" style={{ color: color }}>
          <BiSolidQuoteLeft size={27} />
          <h2 id="text">{quote.content}</h2>
          <p id="author">- {quote.author}</p>
          <div className="links">
            <div>
              <a
                style={{ backgroundColor: color }}
                href="https://twitter.com/intent/tweet"
                id="tweet-quote"
              >
                <FaTwitter />
              </a>
              <a
                style={{ backgroundColor: color }}
                href="https://timber.com/"
                id="timber-quote"
              >
                <FaTumblr />
              </a>
            </div>
            <button
              style={{ backgroundColor: color }}
              id="new-quote"
              onClick={() => useColor(getRandomColor)}
            >
              New-quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
