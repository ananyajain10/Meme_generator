import React, { useState } from "react";
import "../style.css";
function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    memes: "https://i.imgflip.com/8p0a.jpg",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  }
  const [memeData, setMemeData] = useState([]);
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemeData(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * memeData.length);
    const url = memeData[randomNumber].url;
    setMeme((preValue) => ({
      ...preValue,
      memes: url,
    }));
    console.log(url)
  }

  return (
    <div className="container">
      <div className="input-box">
        <input
          className="text"
          type="text"
          placeholder="Top Text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          className="text"
          type="text"
          placeholder="Bottom Text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
      </div>
      <button className="form-button" onClick={getMemeImage}>
        Get New Image
      </button>
      <div className="meme">
        <img className="meme-image" alt="Meme" src={meme.memes} />
         <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2> 
        </div>
    </div>
  );
}
export default Meme;
