import React, { useState,useEffect } from 'react';
import Bids from  '../../bids/Bids'; // Import Bids component
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
