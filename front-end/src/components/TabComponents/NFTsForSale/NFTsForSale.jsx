import React, { useState,useEffect } from 'react';
import Bids from  '../../bids/Bids'; // Import Bids component
import bids1 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids1.png'
import bids2 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids2.png'
import bids3 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids3.png'
import bids4 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids4.png'
import * as constant from '../../../constant/constant';

const data = [
  {name:"Abstact Smoke Red",price:100,like:90,img:bids1,link:`/item/0`},
  {name:"Paint Color on Wall",price:60,like:102,img:bids3,link:`/item/2`},
  {name:"Abstract Patern",price:70,like:75,img:bids4,link:`/item/3`},
  {name:"Mountain Landscape",price:50,like:100,img:bids2,link:`/item/1`},
  {name:"Paint Color on Wall",price:60,like:102,img:bids3,link:`/item/2`},
  {name:"Abstract Patern",price:70,like:75,img:bids4,link:`/item/3`},
  {name:"Paint Color on Wall",price:60,like:102,img:bids3,link:`/item/2`},
  {name:"Abstract Patern",price:70,like:75,img:bids4,link:`/item/3`},
  {name:"Paint Color on Wall",price:60,like:102,img:bids3,link:`/item/2`},
  {name:"Abstract Patern",price:70,like:75,img:bids4,link:`/item/3`},
  {name:"Paint Color on Wall",price:60,like:102,img:bids3,link:`/item/2`},
  {name:"Abstract Patern",price:70,like:75,img:bids4,link:`/item/3`},
  {name:"Paint Color on Wall",price:60,like:102,img:bids3,link:`/item/2`},
  {name:"Abstract Patern",price:70,like:75,img:bids4,link:`/item/3`},
]


const NFTsForSale = () => {
  useEffect(() => {
    LoadNFT();
  }, [])

const [parentID,setParentID] = useState(null);
const [bagData,setBagData] = useState(null);
const [items,setItems] = useState(null);

useEffect(() => {
  if(bagData !== null)
  {
    setParentID(bagData.data.content.fields.items.fields.id.id);
    console.log("parentID:",parentID);
  }
}, [bagData])

useEffect(async() => {
  if(parentID !== null)
  {
      const BagItem = await constant.client.call('suix_getDynamicFields',[parentID]);
      setItems(BagItem.data);
      console.log(BagItem);
  }
}, [parentID])

useEffect(() => {
  if(items !== null)
  {
    const listNFT = [];
    items.forEach(item => {
      listNFT.push(item.name.value);
    });
    console.log("listNFT:",listNFT);
  }
}, [items])

  
async function LoadNFT(){
  // const event = await client.call('suix_getDynamicFieldObject', 
  // ['0x162039778306ce510f29e9897c94eac3214b263781089f9ce6f0256a88f9379a',
  // { "type" : "0x2::dynamic_object_field::Wrapper<bool>",
  //   "value" : {
  //     "name":true,
  // }}]);
  // console.log(event);

  const bagData = await constant.client.call('sui_getObject', 
  [constant.marketID,
  {
      "showType": true,
      "showOwner": true,
      "showPreviousTransaction": true,
      "showDisplay": true,
      "showContent": true,
      "showBcs": true,
      "showStorageRebate": true 
  }]);
  console.log(bagData);
  setBagData(bagData);


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

return (
    <div className="NFTSaleTab">
      <Bids title="SHOP NFT" data={data}/>
    </div>
  );
};

export default NFTsForSale;
