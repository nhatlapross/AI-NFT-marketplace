import React, { useState,useEffect } from 'react'
import './nftMint.css'
import OpenAI from "openai";
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useWallet } from '@suiet/wallet-kit';
import toast, { Toaster } from 'react-hot-toast';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import * as moment from 'moment';
import * as constant from '../../constant/constant';

const NFTMint = () => {
  const key=constant.OpenAIKey;
  const openai = new OpenAI({ apiKey: key , dangerouslyAllowBrowser: true });
  const [data, setData] = useState(null);
  const [num, setNum] = useState(0);
  const [state, setState] = useState(false);
  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random()
        * (max - min + 1)) + min;
  };
  const wallet = useWallet();
  const packageObjectId = constant.packageObjectId;
  const moduleName = constant.moduleName;

  const rpcUrl = getFullnodeUrl('devnet');
  const client = new SuiClient({ url: rpcUrl });
  const [res, setRes] = useState(null);
  const [name, setName] = useState(null);
  const [urlEx, seturlEx] = useState(null);

  async function handleclick(){
    let time = new Date();
    let formattedDate = (moment(time)).format('YYYYMMDDHHmmss')

    setState(true);
    setTimeout(() => {
      const image = async () => { 
        try{
          const a = await openai.images.generate({ prompt: "Creat cute meme or fun meme or fantasy meme" });
          setNum(randomNumberInRange(1, 200));
          CreateImage("AI_NFT#"+formattedDate,"Image generateted by for future NFT",a.data[0].url);
          setName("AI_NFT#"+formattedDate);
          //setData(a.data[0].url);
          toast.success('Mint NFT success!');
          setState(false);
        }
        catch{
          setNum(randomNumberInRange(1, 200));
          CreateImage("AI_NFT#"+formattedDate,"MEME created by for future NFT",constant.defaultImgURL);
          //setData(constant.defaultImgURL);
          setName("AI_NFT#"+formattedDate);
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
    if(!res){
      getRespond();
    }

  }, [wallet.connected])

  useEffect(() => {
      getRespond();
  }, [res])

  async function getRespond(){
      const event = await client.call('sui_getEvents', [res.digest]);
      console.log(event);
      const idObj = event[0].parsedJson.object_id;
      seturlEx(constant.suiExploreLink+idObj);
  }

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
      const respond = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log(respond);
      setRes(respond);
      setState(false);
      setData(constant.defaultImgURL);
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
            <div className="bids-container-text"><h6>{name}</h6></div>
            <div className="bids-container-text"><a target='_blank' href={urlEx?urlEx:"https://suiscan.xyz/devnet/object/0xf77cf966a6bdef76960535b5bed9bda035808df68ee404ddfdab68ff4ac4030a"}><h6>Click to see NFT in SUI Explore</h6></a></div>
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
