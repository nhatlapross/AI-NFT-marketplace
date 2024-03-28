import React, { useState } from 'react'
import './nftMint.css'
import OpenAI from "openai";

const NFTMint = ({ title }) => {
  var state  = false;
  var url = "";
  const key= "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";
  const openai = new OpenAI({ apiKey: key , dangerouslyAllowBrowser: true });
  const [data, setData] = useState(null);
  async function handleclick(){
    //state = true;
    const image = async () => { 
      const a = await openai.images.generate({ prompt: "Creat cute meme or fun meme or fantasy meme" });
      setData(a.data[0].url)
    }
    image();
  };

  async function tryclick(){
    setData(null);
  };

  if(data!= null)
  {
    return(
      <div className='bids section__padding'>
        <div className="bids-container-text">
          <h1>Congratulations! This is your NFT!</h1>
        </div>
        <div className="bids-container-card">
            <div className='card-row-container'>
              <div className="bids-card">
                <div className="bids-card-top">
                  <img className="photo" src={data} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="load-more">
              <button disabled={state} onClick={tryclick}>Try Again</button>
          </div>
      </div>
    );
  }

  return (
    <div className='bids section__padding'>
      <div className="load-more">
          <button disabled={state} onClick={handleclick}>Mint</button>
      </div>
    </div>  
  )
}

export default NFTMint
