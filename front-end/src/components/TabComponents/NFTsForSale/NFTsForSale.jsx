import React, { useState,useEffect } from 'react';
import Bids from  '../../bids/Bids'; // Import Bids component
<<<<<<< HEAD
import bids1 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids1.png'
import bids2 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids2.png'
import bids3 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids3.png'
import bids4 from '/home/thuanvo/Projects/Web3-Projects/AI-NFT-marketplace/front-end/src/assets/bids4.png'
=======
>>>>>>> main
import * as constant from '../../../constant/constant';

const NFTsForSale = () => {
  useEffect(async() => {
    await LoadNFT();
  }, [])

const [parentID,setParentID] = useState(null);
const [bagData,setBagData] = useState(null);
const [items,setItems] = useState(null);

useEffect(async() => {
  setTimeout(() => {
    if(bagData !== null)
    {
      setParentID(bagData.data.content.fields.items.fields.id.id);
    }
  }, 100);
  
}, [bagData])

useEffect(async() => {
  setTimeout(async() => {
    if(parentID !== null)
    {
        const BagItem = await constant.client.call('suix_getDynamicFields',[parentID]);
        setItems(BagItem.data);
    }
  }, 100);

}, [parentID])

  
async function LoadNFT(){
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
  setBagData(bagData);
}

return (
    <div className="NFTSaleTab">
      <Bids title="SHOP NFT" data={items} parentID={parentID} status={1} />
    </div>
  );
};

export default NFTsForSale;
