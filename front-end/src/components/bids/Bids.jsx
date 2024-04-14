import React, { useState,useEffect } from 'react'
import './bids.css'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Pagination from '../Pagination/Pagination';
import * as constant from '../../constant/constant';

const Bids = ({ title,data,parentID,status }) => {

  const pageNumberLimit = 100;
  const [passengersData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [totalPage, setTotalPage] = useState(pageNumberLimit);

  useEffect(async()=>{
    setTimeout(async() => {
      setLoading(true);
      console.log(data);
      const listResData = [];
      if(data != null && data.length>0){
        const startIndex = (currentPage - 1) * maxPageLimit;
        const endIndex = startIndex + maxPageLimit;
        const totalPages = Math.ceil(data.length / maxPageLimit);
        setTotalPage(totalPages);
        for(const d of data.slice(startIndex, endIndex)){
          if(status == 1)
          {
            const listDetailNFT = await constant.client.call('sui_getObject', [d.name.value,{"showContent": true}]);
            const price = await constant.client.call('suix_getDynamicFieldObject',[parentID,d.name]);
            listResData.push({
              d:listDetailNFT.data.content.fields,
              p:price.data.content.fields.value.fields
            });
          }
          else
          {
            if(d!=null && d.data.content.fields.to_sell != null)
            {
              console.log(d);
              const listDetailNFT = d.data.content.fields.to_sell.fields;              ;
              listResData.push({
                d:listDetailNFT,
                p:{
                  ask: d.data.content.fields.set_change,
                  owner: d.data.content.fields.owner,
                  autionID: d.data.objectId
                },
                q:d.data.content.fields.bid_data
              });
            }
           
          }
        };
        setData(listResData);
        setLoading(false);
      }
    }, 100);
   
  },[currentPage,data,parentID]);

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
