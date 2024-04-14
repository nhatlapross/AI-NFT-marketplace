import React, { useState,useEffect } from 'react'
import './nftMint.css'
import OpenAI from "openai";
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useWallet } from '@suiet/wallet-kit';
import toast, { Toaster } from 'react-hot-toast';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import * as moment from 'moment';
import * as constant from '../../constant/constant';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import domtoimage from 'dom-to-image';

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
  const [nameNFT, setName] = useState(null);
  const [urlEx, seturlEx] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [text, setText] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [openAIRes, setopenAIRes] = useState("");

  async function handleclick(){
    let time = new Date();
    setImgUrl(null);
    let formattedDate = (moment(time)).format('YYYYMMDDHHmmss')

    setState(true);
    setTimeout(() => {
      const image = async () => { 
        try{
          const a = await openai.images.generate({ prompt: "Creat cute meme or fun meme or fantasy meme",size:"256x256", n: 1, });
          setName("AI_NFT#"+formattedDate);
          let urlImage = a.data[0].url;
          if(urlImage == null) urlImage = constant.defaultImgURL;
          //setData(urlImage);
          CreateImage("AI_NFT#"+formattedDate,"Image generateted by for future NFT",urlImage);
          toast.success('Mint NFT success!');
        }
        catch{
          //setData(constant.defaultImgURL);
          setName("AI_NFT#"+formattedDate);
          CreateImage("AI_NFT#"+formattedDate,"MEME created by for future NFT",constant.defaultImgURL);
          //setData(constant.defaultImgURL);
          toast.error('Limmit access mint NFT for Today!');
        }
      }
      image();
    }, 100);
  };

  async function convertUrlToBase64(imageUrl) {
    if(imageUrl != null){
      var img = document.getElementById("myImage");
      console.log(img);
      domtoimage.toJpeg(document.getElementById('myImage'), { quality: 0.95 })
      .then(function (dataUrl) {
          console.log(dataUrl);
      });
    }
  }

  async function uploadFireBase(fileName,rootImgURL){
    try {
      //const base64Data = await convertUrlToBase64(rootImgURL);
      // console.log(base64Data);
      // let typeimg = base64Data.split('/')[1].split(';')[0];
      // console.log(typeimg);
      // console.log(base64Data.replace('data:image/'+typeimg+';base64,',''));
      // const storageRef = ref(constant.storage, `files/${fileName+"."+typeimg}`);
      // const uploadTask = uploadBytesResumable(storageRef,Buffer.from(base64Data.replace('data:image/'+typeimg+';base64,',''), "base64") );

      // uploadTask.on("state_changed",
      //   (snapshot) => {
      //     const progress =
      //       Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      //     setProgresspercent(progress);
      //   },
      //   (error) => {
      //     alert(error);
      //   },
      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //       setImgUrl(downloadURL)
      //     });
      //   }
      // );
      setImgUrl(rootImgURL);
    } catch (error) {
      console.log(error.message)
      //setError(error.message);
    }
  }

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
    setText(text);
    setName(name);
    await uploadFireBase(name,url);

  }

  useEffect(async()=>{
    if(imgUrl!=null && state)
    {
      console.log(nameNFT,imgUrl,text);
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${packageObjectId}::${moduleName}::mint_to_sender`,
        arguments: [tx.pure(nameNFT),tx.pure(text),tx.pure(imgUrl)],
      });
      try{
        const respond = await wallet.signAndExecuteTransactionBlock({
          transactionBlock: tx,
        });
        setRes(respond);
        setState(false);
        setData(imgUrl);
      }
      catch{
        setState(false);
      }
    }
  },[imgUrl])

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
                  <img className="photo" id="myImage" width="20" height="20" src={data} alt=""/>
                </div>
              </div>
            </div>
            <div className="bids-container-text"><h6>{nameNFT}</h6></div>
            <div className="bids-container-text"><a target='_blank' href={urlEx?urlEx:"https://suiscan.xyz/devnet/object/0xcd1d8b1488145a44ae4e5e67c9549204712c7509e5ee86697ad1a08aac8373d8/txs"}><h6 color='pink'>Click to see NFT in SUI Explore</h6></a></div>
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
