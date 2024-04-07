import React, { useState,useEffect } from 'react'
import './nftMint.css'
import OpenAI from "openai";
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useWallet } from '@suiet/wallet-kit';
import toast, { Toaster } from 'react-hot-toast';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';

const NFTMint = () => {
  const key="api";
  const openai = new OpenAI({ apiKey: key , dangerouslyAllowBrowser: true });
  const [data, setData] = useState(null);
  const [num, setNum] = useState(0);
  const [state, setState] = useState(false);
  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random()
        * (max - min + 1)) + min;
  };
  const wallet = useWallet();
  const packageObjectId = "0x84cd2f10ccc37b0fc959c0df567d21ff24658674dd89de13ca6f06bf2b3b0265";
  const moduleName = "four_future_nft";
  const rpcUrl = getFullnodeUrl('devnet');
  const client = new SuiClient({ url: rpcUrl });

  async function handleclick(){
    setState(true);
    setTimeout(() => {
      const image = async () => { 
        try{
          const a = await openai.images.generate({ prompt: "Creat cute meme or fun meme or fantasy meme" });
          setNum(randomNumberInRange(1, 200));
          CreateImage("AI_NFT"+num,"Image generateted by for future NFT",a.data[0].url);
          //setData(a.data[0].url);
          toast.success('Mint NFT success!');
          setState(false);
        }
        catch{
          setNum(randomNumberInRange(1, 200));
          CreateImage("AI_NFT"+num,"MEME created by for future NFT","https://th.bing.com/th/id/OIP.eFAj7sVAyYiIDJU60PtUVwHaHa?rs=1&pid=ImgDetMain");
          //setData("https://bizweb.dktcdn.net/100/438/408/files/meme-meo-cute-yody-vn-81.jpg?v=1690276185121");
          toast.error('Limmit access mint NFT for Today!');
        }
      }
      image();
    }, 100);
  };

  useEffect(() => {
    if (!wallet.connected) return;
    // console.log('connected wallet name: ', wallet.name)
    // console.log('account address: ', wallet.account?.address)
    // console.log('account publicKey: ', wallet.account?.publicKey)
  }, [wallet.connected])

  async function CreateImage(name,text,url) {
    // let unsubscribe = await client.subscribeEvent({
    //     filter: { Package: packageObjectId },
    //     onMessage: (event) => {
    //         console.log("subscribeEvent", JSON.stringify(event, null, 2))
    //     }
    // });
    // const committeeInfo = await client.call('suix_getOwnedObjects', [wallet.account?.address]);
    // console.log(committeeInfo);
    // setState(false);
    // return

    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${packageObjectId}::${moduleName}::mint_to_sender`,
      arguments: [tx.pure(name),tx.pure(text),tx.pure(url)],
    });
    try{
      const res = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log(res);
      setState(false);
      setData("https://th.bing.com/th/id/OIP.eFAj7sVAyYiIDJU60PtUVwHaHa?rs=1&pid=ImgDetMain");
    }
    catch{
      setState(false);
    }
  }

  async function tryclick(){
    setData(null);
  };


  if(data!= null)
  {
    return(
      <div className='bids section__padding'>
        <div><Toaster position="top-right" reverseOrder={false}/></div>
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
    <div className="container">
      <div className={(state ? 'loader-container' : '')}>

      </div>
      <div className='bids section__padding'>
        <div><Toaster position="top-right" reverseOrder={false}/></div>
        <div className="load-more">
            <div className="bids-container-text">
                <h1>Click Mint button to mint your own NFT</h1>
                <div className="load-more">
                  <button disabled={state} onClick={handleclick}>Mint</button>
                </div>
              </div>
          </div>
      </div>  
    </div>
   
  )
}

export default NFTMint
