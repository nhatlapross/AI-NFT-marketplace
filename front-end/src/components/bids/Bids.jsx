import React, { useState,useEffect } from 'react'
import './bids.css'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Pagination from '../Pagination/Pagination';

const dataTest = [
  {name:"Abstact Smoke Red",price:100,like:90,img:bids1,link:`/item/0`},
  {name:"Mountain Landscape",price:50,like:100,img:bids2,link:`/item/1`},
  {name:"Paint Color on Wall",price:60,like:102,img:bids3,link:`/item/2`},
  {name:"Abstract Patern",price:70,like:75,img:bids4,link:`/item/3`},
  {name:"White Line Grafiti",price:80,like:60,img:bids5,link:`/item/4`},
  {name:"Abstract Triangle",price:90,like:5,img:bids6,link:`/item/5`},
  {name:"Abstract Triangle",price:90,like:5,img:bids6,link:`/item/5`},
  {name:"Lake Landscape",price:53,like:52,img:bids7,link:`/item/6`},
  {name:"Blue Red Art",price:51,like:51,img:bids8,link:`/item/7`},
  {name:"Abstact Smoke Red",price:100,like:90,img:bids1,link:`/item/0`},
  {name:"Mountain Landscape",price:50,like:100,img:bids2,link:`/item/1`},
  {name:"Paint Color on Wall",price:60,like:102,img:bids3,link:`/item/2`},
  {name:"Abstract Patern",price:70,like:75,img:bids4,link:`/item/3`},
  {name:"Abstract Triangle",price:90,like:5,img:bids6,link:`/item/5`},
  {name:"Lake Landscape",price:53,like:52,img:bids7,link:`/item/6`},
  {name:"Blue Red Art",price:51,like:51,img:bids8,link:`/item/7`},
  {name:"Lake Landscape",price:53,like:52,img:bids7,link:`/item/6`},
  {name:"Blue Red Art",price:51,like:51,img:bids8,link:`/item/7`},
  {name:"Abstact Smoke Red",price:100,like:90,img:bids1,link:`/item/0`},
  {name:"Mountain Landscape",price:50,like:100,img:bids2,link:`/item/1`},
  {name:"Paint Color on Wall",price:60,like:102,img:bids3,link:`/item/2`},
  {name:"Abstract Patern",price:70,like:75,img:bids4,link:`/item/3`},
  {name:"White Line Grafiti",price:80,like:60,img:bids5,link:`/item/4`},
  {name:"Abstract Triangle",price:90,like:5,img:bids6,link:`/item/5`},
  {name:"Lake Landscape",price:53,like:52,img:bids7,link:`/item/6`},
  {name:"Blue Red Art",price:51,like:51,img:bids8,link:`/item/7`},
  {name:"Abstact Smoke Red",price:100,like:90,img:bids1,link:`/item/0`},
  {name:"Mountain Landscape",price:50,like:100,img:bids2,link:`/item/1`},
  {name:"Paint Color on Wall",price:60,like:102,img:bids3,link:`/item/2`},
  {name:"Abstract Patern",price:70,like:75,img:bids4,link:`/item/3`},
  {name:"White Line Grafiti",price:80,like:60,img:bids5,link:`/item/4`},
  {name:"Abstract Triangle",price:90,like:5,img:bids6,link:`/item/5`},
  {name:"Lake Landscape",price:53,like:52,img:bids7,link:`/item/6`},
  {name:"Blue Red Art",price:51,like:51,img:bids8,link:`/item/7`},
  {name:"Abstact Smoke Red",price:100,like:90,img:bids1,link:`/item/0`},
  {name:"Mountain Landscape",price:50,like:100,img:bids2,link:`/item/1`},
  {name:"Paint Color on Wall",price:60,like:102,img:bids3,link:`/item/2`},
  {name:"Abstract Patern",price:70,like:75,img:bids4,link:`/item/3`},
  {name:"Abstract Triangle",price:90,like:5,img:bids6,link:`/item/5`},
  {name:"Lake Landscape",price:53,like:52,img:bids7,link:`/item/6`},
  {name:"Blue Red Art",price:51,like:51,img:bids8,link:`/item/7`},
  {name:"Abstact Smoke Red",price:100,like:90,img:bids1,link:`/item/0`},
  {name:"Mountain Landscape",price:50,like:100,img:bids2,link:`/item/1`},
  {name:"Paint Color on Wall",price:60,like:102,img:bids3,link:`/item/2`},
  {name:"Abstract Patern",price:70,like:75,img:bids4,link:`/item/3`},
  {name:"White Line Grafiti",price:80,like:60,img:bids5,link:`/item/4`},
  {name:"Abstract Triangle",price:90,like:5,img:bids6,link:`/item/5`},
  {name:"White Line Grafiti",price:80,like:60,img:bids5,link:`/item/4`},
  {name:"Abstract Triangle",price:90,like:5,img:bids6,link:`/item/5`},
  {name:"Lake Landscape",price:53,like:52,img:bids7,link:`/item/6`},
  {name:"Blue Red Art",price:51,like:51,img:bids8,link:`/item/7`},
   {name:"Abstact Smoke Red",price:100,like:90,img:bids1,link:`/item/0`},
  {name:"Mountain Landscape",price:50,like:100,img:bids2,link:`/item/1`},
  {name:"Paint Color on Wall",price:60,like:102,img:bids3,link:`/item/2`},
  {name:"Abstract Patern",price:70,like:75,img:bids4,link:`/item/3`},
  {name:"White Line Grafiti",price:80,like:60,img:bids5,link:`/item/4`},
  {name:"Abstract Triangle",price:90,like:5,img:bids6,link:`/item/5`},
  {name:"Lake Landscape",price:53,like:52,img:bids7,link:`/item/6`},
  {name:"Blue Red Art",price:51,like:51,img:bids8,link:`/item/7`},
  {name:"Abstact Smoke Red",price:100,like:90,img:bids1,link:`/item/0`},
  {name:"Mountain Landscape",price:50,like:100,img:bids2,link:`/item/1`},
  {name:"Paint Color on Wall",price:60,like:102,img:bids3,link:`/item/2`},
  {name:"Abstract Patern",price:70,like:75,img:bids4,link:`/item/3`},
  {name:"White Line Grafiti",price:80,like:60,img:bids5,link:`/item/4`},
  {name:"Abstract Triangle",price:90,like:5,img:bids6,link:`/item/5`},
  {name:"Lake Landscape",price:53,like:52,img:bids7,link:`/item/6`},
  {name:"Blue Red Art",price:51,like:51,img:bids8,link:`/item/7`},
]

const Bids = ({ title,data }) => {

  const pageNumberLimit = 100;
  const [passengersData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [totalPage, setTotalPage] = useState(pageNumberLimit);

  useEffect(()=>{
    setLoading(true);
    const totalPages = Math.ceil(data.length / maxPageLimit);
    setTotalPage(totalPages);
    const startIndex = (currentPage - 1) * maxPageLimit;
    const endIndex = startIndex + maxPageLimit;
    const currentItems = data.slice(startIndex, endIndex);
    setData(currentItems);
    setLoading(false);
  },[currentPage]);

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
    title: title,
    type:status,
  };

  async function LoadNFT() {
    const auctionData = await constant.client.call('sui_getObject', 
    [
       constant.auctionID, 
       {
        "showType": true,
        "showOwner": true,
        "showPreviousTransaction": true,
        "showContent": true,
       }
    ])
    console.log(auctionData);
  }

  return (
    <container>
      {!loading ? <Pagination 
          {...paginationAttributes} 
          onPrevClick={onPrevClick} 
          onNextClick={onNextClick}
          onPageChange={onPageChange}/>
          : <div className='bids-container-text'><h1>Loading...</h1></div>
      }
    </container>
  )
}

export default Bids
