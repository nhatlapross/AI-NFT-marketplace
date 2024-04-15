import React, { useState } from 'react';
import Bids from  '../../bids/Bids';
import bids1 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids1.png'
import bids2 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids2.png'
import bids3 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids3.png'
import bids4 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids4.png'
import bids5 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids5.png'
import bids6 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids6.png'
import bids7 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids7.png'
import bids8 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids8.png'

const data = [
  {name:"Mountain Landscape",price:50,like:100,img:bids2,link:`/item/1`},
  {name:"Paint Color on Wall",price:60,like:102,img:bids3,link:`/item/2`},
  {name:"Abstract Patern",price:70,like:75,img:bids4,link:`/item/3`},
  {name:"White Line Grafiti",price:80,like:60,img:bids5,link:`/item/4`},
  {name:"Abstract Triangle",price:90,like:5,img:bids6,link:`/item/5`},
  {name:"Lake Landscape",price:53,like:52,img:bids7,link:`/item/6`},
  {name:"Blue Red Art",price:51,like:51,img:bids8,link:`/item/7`},
]

const NFTsForVote = () => {
  // const [dataWithVote, setdataWithVote] = useState( null );
  // setdataWithVote(data);
  return (
    <div className="NFTVoteTab">
      <Bids title="LIKE NFT" data={data} />
    </div>
  );
};

export default NFTsForVote;
