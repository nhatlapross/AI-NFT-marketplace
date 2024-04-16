import React, { useState, useEffect } from 'react';
import Bids from  '../../bids/Bids';
import * as constant from '../../../constant/constant';

const NFTsForVote = () => {
  const [bagData,setBagData] = useState(null);
  const [auctions,setAuctions] = useState(null);
  useEffect(()=> {
     LoadNFT();
  }, [])

  useEffect(async()=> {
    const listResData = [];
    for(const au of auctions){
      console.log(au);
      const data = await constant.client.call('sui_getObject', 
      [au,
      {
          "showType": true,
          "showOwner": true,
          "showPreviousTransaction": true,
          "showContent": true,
      }]);
      listResData.push(data);
    }
    setBagData(listResData);
    console.log(bagData)

 }, [auctions])

  async function LoadNFT(){
    const listAuction = [];
    const listAu = await constant.client.call('suix_getDynamicFields',[constant.bidMarketBagID]);
    console.log(listAu);
    for(const au of listAu.data){
      listAuction.push(au.name.value);
      console.log(au);
    }
    setAuctions(listAuction);
  }


  return (
    <div className="NFTVoteTab">
      <Bids title="Bid NFT" data={bagData} parentID={""} status={2} />
    </div>
  );
};

export default NFTsForVote;
