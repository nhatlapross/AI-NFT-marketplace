import React, { useEffect,useState } from 'react'
import './ListItemOwner.css'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { useWallet } from '@suiet/wallet-kit';


const ListItemOwner = () => {
  const wallet = useWallet();
  const rpcUrl = getFullnodeUrl('devnet');
  const client = new SuiClient({ url: rpcUrl });
  const listObjectID = [];
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!wallet.connected) return;
    // console.log('connected wallet name: ', wallet.name)
    // console.log('account address: ', wallet.account?.address)
    // console.log('account publicKey: ', wallet.account?.publicKey)
    getNFT();
  }, [wallet.connected])

  
  async function getNFT() {
    const listNFT = [];
    const committeeInfo = await client.call('suix_getOwnedObjects', [wallet.account?.address]);
    console.log(committeeInfo);
    committeeInfo?.data.forEach(id => {
        listObjectID.push(id.data.objectId);
    });
    console.log(listObjectID);
    for(const id of listObjectID){
      const infoObject = await client.call('sui_getObject', [id,{"showContent": true}]);
      if(infoObject.data.content.fields.name!= null)
      {
        listNFT.push(infoObject.data.content.fields)
      }
    };
    console.log(listNFT);
    setData(listNFT);
  }


  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>List of My NFTs</h1>
        </div>
        <div className="bids-container-card">
          {data?.map((d) => (
            <div className='card-column'>
              <div className="bids-card">
                <div className="bids-card-top">
                  <img className="photo" src={d.url} alt="" />
                  <Link to={`/DetailItemOwner/`+(d.id.id)}>
                    <p className="bids-title">{d.name}</p>
                  </Link>
                </div>
                <div className="bids-card-bottom">
                  <p>{d.description}</p>
                </div>
              </div>
            </div>
            ))}
          </div>
      </div>
    </div>
  )
}

export default ListItemOwner
