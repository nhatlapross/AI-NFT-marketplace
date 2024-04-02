import React, { useState } from 'react'
import './bids.css'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import bids1 from '../../assets/bids1.png'
import bids2 from '../../assets/bids2.png'
import bids3 from '../../assets/bids3.png'
import bids4 from '../../assets/bids4.png'
import bids5 from '../../assets/bids5.png'
import bids6 from '../../assets/bids6.png'
import bids7 from '../../assets/bids7.png'
import bids8 from '../../assets/bids8.png'
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

const data = [
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

const Bids = ({ title }) => {
  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        <div className="bids-container-card">
          {data.map((d) => (
            <div className='card-column'>
              <div className="bids-card">
                <div className="bids-card-top">
                  <img className="photo" src={d.img} alt="" />
                  <Link to={d.link}>
                    <p className="bids-title">{d.name}</p>
                  </Link>
                </div>
                <div className="bids-card-bottom">
                  <p>{d.price} <span>SUI</span></p>
                  <p> <AiFillHeart /> {d.like}</p>
                </div>
              </div>
            </div>
            ))}
          </div>
      </div>
      <div className="load-more">
        <button>Load More</button>
      </div>
    </div>
  )
}

export default Bids
