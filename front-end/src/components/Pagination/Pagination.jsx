import React from 'react';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import './Pagination.css'

const Pagination = (props)=>{
    const { currentPage, maxPageLimit, minPageLimit} = props;
    const totalPages = props.totalPages-1;
    const data = props.data;
    const title = props.title;
    const pages = [];
    for(let i=1 ; i<=totalPages; i++){
        pages.push(i);
    }

    
    const handlePrevClick = ()=>{
        props.onPrevClick();
    }
    const handleNextClick = ()=>{
        props.onNextClick();
    }
    const handlePageClick = (e)=>{
        props.onPageChange(Number(e.target.id));
    }
    
    const pageNumbers = pages.map(page => {
        if(page <= maxPageLimit  && page > minPageLimit) {
            return(
                <li key={page} id={page} onClick={handlePageClick} 
                    className={currentPage===page ? 'active' : ''}>
                    {page}
                </li>
                    );
                }else{
                    return null;
                }
    });

    let pageIncrementEllipses = null;
    if(pages.length > maxPageLimit){
        pageIncrementEllipses = <li className='mid' onClick={handleNextClick}>&hellip;</li>
    }
    let pageDecremenEllipses = null;
    if(minPageLimit >=1){
        pageDecremenEllipses = <li className='mid' onClick={handlePrevClick}>&hellip;</li> 
    }
    // console.log(props.data);
    const renderData = (data)=>{
        if(props.type ==1)
        {
            return(
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
                                <img className="photo" src={d.d.url} alt="" />
                                <Link to={`/item/`+(d.d.id.id)+`/`+(d.p.ask)+`/`+(d.p.owner)+`/`+(props.type)}>
                                  <p className="bids-title">{d.d.name}</p>
                                </Link>
                              </div>
                              <div className="bids-card-bottom">
                                <p>{d.p.ask} <span>SUI</span></p>
                              </div>
                            </div>
                          </div>
                          ))}
                        </div>
                    </div>
                  </div>
                )
        }
        else if(props.type ==2)
        {
            return(
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
                                <img className="photo" src={d.d.url} alt="" />
                                <Link to={`/BidItem/`+(d.d.id.id)+`/`+(d.p.ask)+`/`+(d.p.owner)+`/`+(d.p.autionID)}>
                                  <p className="bids-title">{d.d.name}</p>
                                </Link>
                              </div>
                              <div className="bids-card-bottom">
                                <p>{d.q==null? d.p.ask:d.q.fields.change} <span>auction times</span></p>
                                <p>{d.q==null? "":"Higest price:"+d.q.fields.funds+" SUI"}</p>
                              </div>
                            </div>
                          </div>
                          ))}
                        </div>
                    </div>
                  </div>
                )
        }
        else
        {
            return(
                <div className='bids section__padding'>
                <div className="bids-container">
                  <div className="bids-container-text">
                    <h1>{title}</h1>
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
     
        
    }



    return(
        <div className="main">
            <div className="mainData">
                {renderData(data)}
            </div>
            <ul className="pageNumbers"> 
                <li className='first-child'>
                    <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>Prev</button>
                </li>
                {pageDecremenEllipses}
                    {pageNumbers}
                {pageIncrementEllipses}
                <li className='last-child'>
                    <button onClick={handleNextClick} disabled={currentPage === pages[pages.length-1]}>Next</button>
                </li>
            </ul>
        </div>
    )
}
export default Pagination;