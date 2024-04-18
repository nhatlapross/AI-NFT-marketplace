import React, { useState,useEffect } from 'react';
import './BidItem.css'
import creator from '../../assets/seller2.png'
import { useParams } from 'react-router-dom';
import { useWallet } from '@suiet/wallet-kit'
import { TransactionBlock } from '@mysten/sui.js/transactions';
import * as constant from '../../constant/constant';
import toast, { Toaster } from 'react-hot-toast';

const BidItem = () => {
  let id = useParams().id;
  let price = useParams().price;
  let owner = useParams().owner;
  let auctionID = useParams().auctionID;

  const packageObjectId = constant.packageObjectId;
  const moduleMarketName = constant.moduleMarketName;

  const [data, setData] = useState(null);
  const [addressWallet, setAddressWallet] = useState(null);
  const [buttonPage,setButtonPage] = useState(null);
  const [bidInfo,setbidInfo] = useState(null);
  const [priceOfBid,setPriceOfBid] = useState(null);
  const wallet = useWallet();
  


  async function getNFT() {
    const listNFT = [];
    const resData = await constant.client.call('sui_getObject', 
    [auctionID,
    {
        "showType": true,
        "showOwner": true,
        "showPreviousTransaction": true,
        "showContent": true,
    }]);
    console.log(resData);
    if(resData!= null)
    {
      listNFT.push({
        d:resData.data.content.fields.to_sell.fields,
        p:resData.data.content.fields.set_change,
        q:resData.data.content.fields.bid_data,
      })
    }
    setData(listNFT);
    console.log('listNFT',listNFT);
  }

  useEffect(()=>{
      if(data!= null)
      {
        if(data[0].d !== null && data[0].q === null){
          setbidInfo(data[0].p +" of "+data[0].p +" times");
        }
        else if(data[0].d !== null && data[0].q !== null)
        {
          setbidInfo(data[0].q?.fields.change+" of "+data[0].p +" times - Highest price:"+data[0].q?.fields.funds);
        }
        else
        {
          setbidInfo("Bid is expired");
        };
      }


      if(addressWallet == owner){
        setButtonPage( 
                <div className="item-content-buy">
                    <button disabled={true} className="secondary-btn">You are owner of this NFT</button>
                </div>
                )
      }
      else
      {
        setButtonPage( 
          <div className="item-content-buy">
              <input type='text' placeholder="Price of Bid"  value={priceOfBid} onChange={e => setPriceOfBid(e.target.value)}/>
              <button  onClick={() => BidNFT()} disabled={priceOfBid == ""} className={priceOfBid!=""&&priceOfBid!=null? "primary-btn":"secondary-btn"}>Bid NFT</button>
          </div>
          )
      };

  },[data]);

  
  useEffect(() => {
    if(addressWallet == owner){
      setButtonPage( 
              <div className="item-content-buy">
                  <button disabled={true} className="secondary-btn">You are owner of this NFT</button>
              </div>
              )
    }
    else
    {
      setButtonPage( 
        <div className="item-content-buy">
            <input type='text' placeholder="Price of Bid"  value={priceOfBid} onChange={e => setPriceOfBid(e.target.value)}/>
            <button  onClick={() => BidNFT()} disabled={priceOfBid == ""} className={priceOfBid!=""&&priceOfBid!=null? "primary-btn":"secondary-btn"}>Bid NFT</button>
        </div>
        )
    };
  }, [priceOfBid])

  useEffect(() => {
    if (!wallet.connected) return;
    setAddressWallet(wallet.account?.address);
    // console.log('connected wallet name: ', wallet.name)
    // console.log('account address: ', wallet.account?.address)
    // console.log('account publicKey: ', wallet.account?.publicKey)
    getNFT();
  }, [wallet.connected,id])

  async function BidNFT(){
    if(priceOfBid!= null && priceOfBid!="")
    {
      const tx = new TransactionBlock();
      const [coins] = tx.splitCoins(tx.gas, [
        tx.pure(priceOfBid),
      ])
      console.log(priceOfBid);
      tx.moveCall({
        target: `${packageObjectId}::${moduleMarketName}::bid`,
        typeArguments: [constant.typeArgNFT],
        arguments: [coins,tx.pure(auctionID)],
      });
      try{
        const res = await wallet.signAndExecuteTransactionBlock({
          transactionBlock: tx,
        });
        console.log(res);
        toast.success('Bid NFT success!');
        window.location.href = window.location.origin;
      }
      catch{
        toast.error('Bid NFT fail!');
      }
    }
  }

  return (
    <div className='container'>
    <div><Toaster reverseOrder={false}/></div>
    {data?.map((d) => (
      <div className='item section__padding'>
        <div className="item-image">
          <img src={d.d.url} alt="item" />
        </div>
        <div className="item-content">
            <div className="item-content-title">
              <h1>{d.d.name}</h1>
              <p><span>{bidInfo} (bid fee: 1%) </span></p>
            </div>
            <div className="item-content-creator">
              <div><p>Creater</p></div>
              <div>
                <img src={creator} alt="creator" />
                <p>{owner.substring(0,6)+"..."+owner.substring(owner.length-6,owner.length)}</p>
              </div>
            </div>
            <div className="item-content-detail">
              <p>{d.d.description}</p>
            </div>
            {buttonPage}
          </div>
      </div>
    ))}
  </div>
  )
};

export default BidItem;
