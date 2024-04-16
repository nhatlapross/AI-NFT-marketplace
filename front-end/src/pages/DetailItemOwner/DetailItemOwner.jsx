import React, { useState,useEffect } from 'react';
import './DetailItemOwner.css'
import creator from '../../assets/seller2.png'
import { useParams } from 'react-router-dom';
import { useWallet } from '@suiet/wallet-kit'
import { TransactionBlock } from '@mysten/sui.js/transactions';
import * as constant from '../../constant/constant';
import toast, { Toaster } from 'react-hot-toast';

const DetailItemOwner = () => {
  let id = useParams().id;
  const wallet = useWallet();
  const [data, setData] = useState(null);
  const [addressWallet, setAddressWallet] = useState(null);
  const [transferAddress, settransferAddress] = useState('');
  const packageObjectId = constant.packageObjectId;
  const moduleName = constant.moduleName;
  const moduleMarketName = constant.moduleMarketName;
  const [res, setRes] = useState(null);
  const [urlEx, seturlEx] = useState(null);
  const [numAuction,setNumAuction] = useState(null);
  const [NFTPrice,setNFTPrice] = useState(null);

  async function getNFT() {
    const listNFT = [];
    const infoObject = await constant.client.call('sui_getObject', [id,{"showContent": true}]);
    listNFT.push(infoObject.data.content.fields)
    //console.log(infoObject);
    setData(listNFT);
  }

  useEffect(() => {
    if (!wallet.connected) return;
    setAddressWallet(wallet.account?.address);
    // console.log('connected wallet name: ', wallet.name)
    // console.log('account address: ', wallet.account?.address)
    // console.log('account publicKey: ', wallet.account?.publicKey)
    getNFT();

  }, [wallet.connected])

  useEffect(() => {
      getRespond();
  }, [res])

  async function getRespond(){
      const event = await constant.client.call('sui_getEvents', [res.digest]);
      console.log(event);
      const idObj = event[0].parsedJson.object_id;
      seturlEx(constant.suiExploreLink+idObj);
  }

  async function transferTo(){
    console.log("transferTo", id, addressWallet,transferAddress);
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${packageObjectId}::${moduleName}::transfer`,
      arguments: [tx.pure(id),tx.pure(transferAddress)],
    });
    try{
      const respond = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log(respond);
      toast.success('Transfer NFT to'+transferAddress+' success!');
      setRes(respond);
      window.location.href = window.location.origin + "/ItemOwner";
    }
    catch{
      console.log('error');
    }
    return;
  }

  async function BidNFT(){
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${packageObjectId}::${moduleMarketName}::create_auction`,
      typeArguments: [constant.typeArgNFT,constant.suiCoin],
      arguments: [tx.pure(constant.bidMarketID),tx.pure(id),tx.pure(numAuction)],
    });
    try{
      const res = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log(res);
      toast.success('Public to bid success!');
      window.location.href = window.location.origin + "/ItemOwner";
    }
    catch{
      console.log('error');
    }
  }

  async function SaleNFT(){
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${packageObjectId}::${moduleMarketName}::list`,
      typeArguments: [constant.typeArgNFT,constant.suiCoin],
      arguments: [tx.pure(constant.marketID),tx.pure(id),tx.pure(NFTPrice)],
    });
    try{
      const res = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log(res);
      toast.success('Public to sale success!');
      window.location.href = window.location.origin + "/ItemOwner";
    }
    catch{
      console.log('error');
    }
  }

  async function burn(){
    console.log("burn", id, addressWallet);
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${packageObjectId}::${moduleName}::burn`,
      arguments: [tx.pure(id)],
    });
    try{
      const res = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log(res);
      toast.success('Burn NFT success!');
      window.location.href = window.location.origin + "/ItemOwner";
    }
    catch{
      console.log('error');
    }
    return;
  }



  return (
    <div className='container'>
      <div><Toaster position="top-right" reverseOrder={false}/></div>
      {data?.map((d) => (
        <div className='item section__padding'>
          <div className="item-image">
            <img src={d.url} alt="item" />
          </div>
          <div className="item-content">
              <div className="item-content-title">
                <h1>{d.name}</h1>
                <p><span>100 SUI (transfer fee: 1%) </span> ‧ 20 of 25 available</p>
              </div>
              <div className="item-content-creator">
                <div><p>Creater</p></div>
                <div>
                  <img src={creator} alt="creator" />
                  <p>{wallet.account?.address.substring(0,6)+"..."+wallet.account?.address.substring(wallet.account?.address.length-6,wallet.account?.address.length)}</p>
                </div>
              </div>
              <div className="item-content-detail">
                <p>{d.description}</p>
              </div>
              <div className="item-content-buy">
                <input type='text' placeholder="Number of auctions"  value={numAuction} onChange={e => setNumAuction(e.target.value)}/>
                <button  onClick={() => BidNFT()} disabled={numAuction == ""} className={numAuction!=""&&numAuction!=null? "primary-btn":"secondary-btn"}>Bid NFT</button>
              </div>
              <div className="item-content-buy">   
                <input type='text' placeholder="Price of NFT" value={NFTPrice} onChange={e => setNFTPrice(e.target.value)}/>
                <button onClick={() => SaleNFT()} disabled={NFTPrice == ""} className={NFTPrice!=""&&NFTPrice!=null? "primary-btn":"secondary-btn"}>List to the Market</button>
              </div>
              <div className="item-content-buy">
                <input type='text' placeholder="recipient's wallet address" value={transferAddress} onChange={e => settransferAddress(e.target.value)}/>
                <button onClick={transferTo} disabled={transferAddress == ""} className={transferAddress!=""&&transferAddress!=null? "primary-btn":"secondary-btn"}>Transfer</button>
              </div>
              <div className="item-content-buy">
                <button onClick={burn} className="primary-btn">Burn</button>
              </div>
            </div>
        </div>
      ))}
    </div>
  )
};

export default DetailItemOwner;
