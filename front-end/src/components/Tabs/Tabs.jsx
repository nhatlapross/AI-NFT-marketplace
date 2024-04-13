import React from "react";
import { useState } from "react";
import AllNFTs from "../TabComponents/AllNFTs/AllNFTs";
import NFTsForVote from "../TabComponents/NFTsForVote/NFTsForVote";
import NFTsForSale from "../TabComponents/NFTsForSale/NFTsForSale";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };
  const handleTab3 = () => {
    setActiveTab("tab3");
  };


  return (
    <div className="Tabs">
      {/* Tab nav */}
      <ul className="nav">
        <li className={activeTab === "tab1" ? "active" : ""} onClick={handleTab1}>All NFT</li>
        <li className={activeTab === "tab2" ? "active" : ""} onClick={handleTab2}>Vote NFT</li>
        <li className={activeTab === "tab3" ? "active" : ""} onClick={handleTab3}>Sale NFT</li>
      </ul>
      <div className="outlet">
        {activeTab === "tab1" ?   <AllNFTs /> : activeTab === "tab2" ?<NFTsForVote />:<NFTsForSale/>} 
      </div>
    </div>
  );
};
export default Tabs;