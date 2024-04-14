import React, { useState, useEffect } from 'react';
import Bids from  '../../bids/Bids';
import * as constant from '../../../constant/constant';

const NFTsForVote = () => {
  const [bagData,setBagData] = useState(null);
  useEffect(()=> {
     LoadNFT();
  }, [])

  async function LoadNFT(){
    const listResData = [];
    console.log(constant.listAuction);
    for(const au of constant.listAuction){
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

    // const t = await constant.client.call('sui_getObject', 
    // ["0xc8c8fae85a56e1e3120c52f67d953dc3ee21aca6938129992fd064cf84ec6dbc"]);
    // setBagData(t);
    // console.log(bagData);
  }

  return (
    <div className="NFTVoteTab">
      <Bids title="Bid NFT" data={bagData} parentID={""} status={2} />
    </div>
  );
};

export default NFTsForVote;
