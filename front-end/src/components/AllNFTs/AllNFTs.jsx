import React from 'react';
import { Bids } from './Bid'; // Import Bids component

const AllNFTs = () => {
  return (
    <div className="all-nfts-content">
      {/* Filter data based on status (1 and 2) */}
      <Bids title="Tất cả NFT (Trạng thái 1 và 2)" data={ /* filtered data */} />
    </div>
  );
};

export default AllNFTs;
