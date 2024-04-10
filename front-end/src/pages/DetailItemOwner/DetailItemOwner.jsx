import React, { useState,useEffect } from 'react';
import './DetailItemOwner.css'
import creator from '../../assets/seller2.png'
import { useParams } from 'react-router-dom';
import { useWallet } from '@suiet/wallet-kit'
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import * as constant from '../../constant/constant';
import toast, { Toaster } from 'react-hot-toast';

const DetailItemOwner = () => {
  let id = useParams().id;
  const wallet = useWallet();
  const rpcUrl = getFullnodeUrl('devnet');
  const client = new SuiClient({ url: rpcUrl });
  const [data, setData] = useState(null);
  const [addressWallet, setAddressWallet] = useState(null);
  const [transferAddress, settransferAddress] = useState('');
  const packageObjectId = constant.packageObjectId;
  const moduleName = constant.moduleName;
  const [res, setRes] = useState(null);
  const [urlEx, seturlEx] = useState(null);

  async function getNFT() {
    const listNFT = [];
    const infoObject = await client.call('sui_getObject', [id,{"showContent": true}]);
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
      const event = await client.call('sui_getEvents', [res.digest]);
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
      // window.location.href = window.location.origin + "/ItemOwner";
    }
    catch{
      console.log('error');
    }
    return;
  }

  async function publicNFT(state){
    // const event = await client.call('suix_getDynamicFieldObject', 
    // ['0x162039778306ce510f29e9897c94eac3214b263781089f9ce6f0256a88f9379a',
    // { "type" : "0x2::dynamic_object_field::Wrapper<bool>",
    //   "value" : {
    //     "name":true,
    // }}]);
    // console.log(event);

    const event = await client.call('sui_getObject', 
    ['0x453ba414c6c9c72296bfb5bf93e5e6087e9c3589455cf508d38cd0d5bc0c7bb7',
    {
        "showType": true,
        "showOwner": true,
        "showPreviousTransaction": true,
        "showDisplay": true,
        "showContent": true,
        "showBcs": true,
        "showStorageRebate": true 
    }]);
    console.log(event);


    // console.log("publicForVote", id, addressWallet,state);
    // const tx = new TransactionBlock();
    // tx.moveCall({
    //   target: `${packageObjectId}::${moduleName}::change_state_publish_nft`,
    //   arguments: [tx.pure(id),tx.pure(state)],
    // });
    // try{
    //   const res = await wallet.signAndExecuteTransactionBlock({
    //     transactionBlock: tx,
    //   });
    //   console.log(res);
    //   toast.success('Public NFT success!');
    //   window.location.href = window.location.origin + "/ItemOwner";
    // }
    // catch{
    //   console.log('error');
    // }
    return;
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
                <button style={{ color: 'white' }}  onClick={() => publicNFT(1)} className="primary-btn">Publish for Vote</button>
                <button style={{ color: 'white' }}  onClick={() => publicNFT(2)} className="primary-btn">Publish for Sale</button>
              </div>
              <div className="item-content-buy">
                <input type='text' placeholder="recipient's wallet address"  
                  value={transferAddress}
                  onChange={e => settransferAddress(e.target.value)}/>
                <button onClick={transferTo} className="secondary-btn">Transfer</button>
                <button style={{ color: 'white' }} onClick={burn} className="primary-btn">Burn</button>
              </div>
            </div>
        </div>
      ))}
    </div>
  )
};

export default DetailItemOwner;
