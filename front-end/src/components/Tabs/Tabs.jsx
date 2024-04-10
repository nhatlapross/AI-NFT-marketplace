import React, { useState } from 'react';
import { Nav, NavItem, NavLink } from 'react-bootstrap'; // Import Bootstrap components
import AllNFTs from './AllNFTs'; // Import tab content components
import NFTsForVote from './NFTsForVote';
import NFTsForSale from './NFTsForSale';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('all'); // Initial active tab

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'all':
        return <AllNFTs />;
      case 'vote':
        return <NFTsForVote />;
      case 'sale':
        return <NFTsForSale />;
      default:
        return null;
    }
  };

  return (
    <div className="tabs-container">
      <Nav variant="tabs" defaultActiveKey="all">
        <NavItem>
          <NavLink eventKey="all" onSelect={() => handleTabChange('all')}>
            Tất cả NFT
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink eventKey="vote" onSelect={() => handleTabChange('vote')}>
            NFT for Vote
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink eventKey="sale" onSelect={() => handleTabChange('sale')}>
            NFT for Sale
          </NavLink>
        </NavItem>
      </Nav>
      <div className="tab-content">{renderActiveContent()}</div>
    </div>
  );
};

export default Tabs;
