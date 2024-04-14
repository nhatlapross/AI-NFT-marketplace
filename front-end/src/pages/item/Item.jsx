import React, { useState,useEffect } from 'react';
import './item.css'
import creator from '../../assets/seller2.png'
import { useParams } from 'react-router-dom';
import { useWallet } from '@suiet/wallet-kit'
import { TransactionBlock } from '@mysten/sui.js/transactions';
import * as constant from '../../constant/constant';
import toast, { Toaster } from 'react-hot-toast';

const mapping = {
  0: { targetId: "0", name: "Abstract Smoke Red", imgAddress: "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids1.png?raw=true" },
  1: { targetId: "1", name: "Mountain Landscape", imgAddress: "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids2.png?raw=true" },
  2: { targetId: "2", name: "Paint Colour on Wall", imgAddress: "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids3.png?raw=true" },
  3: { targetId: "3", name: "Abstract Pattern", imgAddress: "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids4.png?raw=true" },
  4: { targetId: "4", name: "White Line Grafiti", imgAddress: "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids5.png?raw=true" },
  5: { targetId: "5", name: "Abstract Triangle", imgAddress: "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids6.png?raw=true" },
  6: { targetId: "6", name: "Lake Landscape", imgAddress: "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids7.png?raw=true" },
  7: { targetId: "7", name: "Blue Red Art", imgAddress: "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids8.png?raw=true" },
};


const Item = () => {
  let id = useParams().id;
  let price = useParams().price;
  let owner = useParams().owner;
  let type = useParams().type;
  

  const packageObjectId = constant.packageObjectId;
  const moduleMarketName = constant.moduleMarketName;

  const [data, setData] = useState(null);
  const [addressWallet, setAddressWallet] = useState(null);
  const [buttonPage,setButtonPage] = useState(null);

  const wallet = useWallet();
  


  async function getNFT() {
    const listNFT = [];
    const infoObject = await constant.client.call('sui_getObject', [id,{"showContent": true,"showOwner": true,}]);
    console.log(infoObject);
    listNFT.push(infoObject.data.content.fields)
    setData(listNFT);

  }

  useEffect(()=>{
      console.log("addressWallet",addressWallet)
      console.log("owner",owner)
      if(wallet.account?.address == owner){
        setButtonPage( 
                <div className="item-content-buy">
                  <button  onClick={() => unList()} className="primary-btn" >Unlist</button>
                </div>
               )
      }
      else
      {
        setButtonPage( 
          <div className="item-content-buy">
            <button  onClick={() => buy()} className="primary-btn">Buy for {price} SUI</button>
          </div>
         )
      }
  },[data])

  useEffect(() => {
    if (!wallet.connected) return;
    setAddressWallet(wallet.account?.address);
    // console.log('connected wallet name: ', wallet.name)
    // console.log('account address: ', wallet.account?.address)
    // console.log('account publicKey: ', wallet.account?.publicKey)
    getNFT();

  }, [wallet.connected,id])


  async function unList(){
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${packageObjectId}::${moduleMarketName}::delist_and_take`,
      typeArguments: [constant.typeArgNFT,constant.suiCoin],
      arguments: [tx.pure(constant.marketID),tx.pure(id)],
    });
    try{
      const res = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log(res);
      toast.success('Reback NFT success!');
      window.location.href = window.location.origin;
    }
    catch{
      toast.error('Reback NFT fail!');
    }
  }

  async function buy(){
    const tx = new TransactionBlock();
    const value = price;
    const [coins] = tx.splitCoins(tx.gas, [
      tx.pure(value),
    ])

    tx.moveCall({
      target: `${packageObjectId}::${moduleMarketName}::buy_and_take`,
      typeArguments: [constant.typeArgNFT,constant.suiCoin],
      arguments: [tx.pure(constant.marketID),tx.pure(id),coins],
    });
    try{
      const res = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log(res);
      toast.success('Buy NFT success!');
      window.location.href = window.location.origin;
    }
    catch{
      toast.error('Buy NFT fail!');
    }
  }

  return (
    <div className='container'>
    <div><Toaster reverseOrder={false}/></div>
    {data?.map((d) => (
      <div className='item section__padding'>
        <div className="item-image">
          <img src={d.url} alt="item" />
        </div>
        <div className="item-content">
            <div className="item-content-title">
              <h1>{d.name}</h1>
              <p><span>{price} SUI (transfer fee: 1%) </span></p>
            </div>
            <div className="item-content-creator">
              <div><p>Creater</p></div>
              <div>
                <img src={creator} alt="creator" />
                <p>{owner.substring(0,6)+"..."+owner.substring(owner.length-6,owner.length)}</p>
              </div>
            </div>
            <div className="item-content-detail">
              <p>{d.description}</p>
            </div>
            {buttonPage}
          </div>
      </div>
    ))}
  </div>
  )
};

export default Item;
