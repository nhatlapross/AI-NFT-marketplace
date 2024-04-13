import React, { useEffect,useState } from 'react'
import './ListItemOwner.css'
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { useWallet } from '@suiet/wallet-kit';
import Pagination from '../Pagination/Pagination';


const ListItemOwner = () => {
  const wallet = useWallet();
  const rpcUrl = getFullnodeUrl('devnet');
  const client = new SuiClient({ url: rpcUrl });
  var listObjectID = [];
  const [dataObjectID,setDataObjectID] = useState(null);
  const [data, setData] = useState(null);

  const pageNumberLimit = 100;
  const [passengersData, setpassengersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [totalPage, setTotalPage] = useState(pageNumberLimit);

  useEffect(() => {
    if (!wallet.connected) return;
    // console.log('connected wallet name: ', wallet.name)
    // console.log('account address: ', wallet.account?.address)
    // console.log('account publicKey: ', wallet.account?.publicKey)
    getNFT();
  }, [wallet.connected])

  useEffect(async()=>{
    setLoading(true);
    const listNFT = [];
    if(dataObjectID!= null)
    {
      const totalPages = Math.ceil(dataObjectID.length / maxPageLimit);
      setTotalPage(totalPages);
      const startIndex = (currentPage - 1) * maxPageLimit;
      const endIndex = startIndex + maxPageLimit;
      const currentItems = listNFT;// data.slice(startIndex, endIndex);
      setpassengersData(currentItems);
      setLoading(false);
      for(const id of dataObjectID.slice(startIndex, endIndex)){
        const infoObject = await client.call('sui_getObject', [id,{"showContent": true}]);
        if(infoObject.data.content.fields.name!= null)
        {
          listNFT.push(infoObject.data.content.fields)
        }
      };
      //console.log(listNFT);
      setData(listNFT);
    }
  },[currentPage,dataObjectID]);

  const onPageChange= (pageNumber)=>{
    setCurrentPage(pageNumber);
  }
  const onPrevClick = ()=>{
      if((currentPage-1) % pageNumberLimit === 0){
          setMaxPageLimit(maxPageLimit - pageNumberLimit);
          setMinPageLimit(minPageLimit - pageNumberLimit);
      }
      setCurrentPage(prev=> prev-1);
   }

  const onNextClick = ()=>{
       if(currentPage+1 > maxPageLimit){
           setMaxPageLimit(maxPageLimit + pageNumberLimit);
           setMinPageLimit(minPageLimit + pageNumberLimit);
       }
       setCurrentPage(prev=>prev+1);
    }

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    totalPages: totalPage,
    data: passengersData,
    title: "List of My NFTs",
    type:2,
  };
  

  
  async function getNFT() {
    const committeeInfo = await client.call('suix_getOwnedObjects', [wallet.account?.address]);
    committeeInfo?.data.forEach(id => {
        listObjectID.push(id.data.objectId);
    });
    console.log(listObjectID);
    setDataObjectID(listObjectID);
  }


  return (
    <div className='container'>
      {!loading ? <Pagination 
          {...paginationAttributes} 
          onPrevClick={onPrevClick} 
          onNextClick={onNextClick}
          onPageChange={onPageChange}/>
          : <div className='bids-container-text'><h1>Loading...</h1></div>
      }
    </div>
  )
}

export default ListItemOwner
