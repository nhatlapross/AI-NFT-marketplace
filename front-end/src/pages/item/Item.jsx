import React, { useState } from "react";
import "./item.css";
import creator from "../../assets/seller2.png";
import { useParams } from "react-router-dom";
import { useWallet } from "@suiet/wallet-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";

const mapping = {
  0: {
    kioskId: "",
    address: "",
    targetId: "0",
    type: "moveObject",
    name: "Abstract Smoke Red",
    description: "",
    imgAddress:
      "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids1.png?raw=true",
    price: 0,
  },
  1: {
    kioskId: "",
    address: "",
    targetId: "1",
    type: "moveObject",
    name: "Mountain Landscape",
    description: "",
    imgAddress:
      "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids2.png?raw=true",
    price: 0,
  },
  2: {
    kioskId: "",
    address: "",
    targetId: "2",
    type: "moveObject",
    name: "Paint Colour on Wall",
    description: "",
    imgAddress:
      "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids3.png?raw=true",
    price: 0,
  },
  3: {
    kioskId: "",
    address: "",
    targetId: "3",
    type: "moveObject",
    name: "Abstract Pattern",
    description: "",
    imgAddress:
      "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids4.png?raw=true",
    price: 0,
  },
  4: {
    kioskId: "",
    address: "",
    targetId: "4",
    type: "moveObject",
    name: "White Line Grafiti",
    description: "",
    imgAddress:
      "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids5.png?raw=true",
    price: 0,
  },
  5: {
    kioskId: "",
    address: "",
    targetId: "5",
    type: "moveObject",
    name: "Abstract Triangle",
    description: "",
    imgAddress:
      "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids6.png?raw=true",
    price: 0,
  },
  6: {
    kioskId: "",
    address: "",
    targetId: "6",
    type: "moveObject",
    name: "Lake Landscape",
    description: "",
    imgAddress:
      "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids7.png?raw=true",
    price: 0,
  },
  7: {
    kioskId: "",
    address: "",
    targetId: "7",
    type: "moveObject",
    name: "Blue Red Art",
    description: "",
    imgAddress:
      "https://github.com/kasim393/NFT-Marketplace-UI/blob/main/src/assets/bids8.png?raw=true",
    price: 0,
  },
};
const Item = () => {
  let id = useParams().id;
  console.log("id", id);
  const wallet = useWallet();
  console.log("wallet status", wallet.status);
  console.log("connected wallet name", wallet.name);
  console.log("connected account info", wallet.account);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const disableButton = () => {
    setButtonDisabled(true);
    console.log("state", isButtonDisabled);
  };

  const enableButton = () => {
    setButtonDisabled(false);
  };

  const handleOnClick = () => {
    let targetId = mapping[id].targetId;
    let address = wallet.account ? wallet.account.address : "";
    let type = mapping[id].type;
    let name = mapping[id].name;
    let description = mapping[id].description;
    let url = mapping[id].url;
    let price = mapping[id].price;
    console.log("buying", targetId, address);

    let tx = new TransactionBlock();
    // let kioskArg = tx.object('<ID>');
    let addressArg = tx.object(`${address}`);
    let itemType = `${type}`;
    let itemId = tx.pure.id(`${targetId}`);
    let itemName = tx.pure.string(`${name}`);
    let itemDescription = tx.pure.string(`${description}`);
    let itemUrl = tx.pure.string(`${url}`);
    let itemPrice = tx.pure.u64(`${price}`);

    //delist(tx, itemType, kioskArg, capArg, itemId);

    tx.moveCall({
      target: "0x2::kiosk::list",
      arguments: [addressArg, itemId, itemName, itemDescription, itemUrl, itemPrice],
      typeArguments: [itemType]
    });

    disableButton();
    return;
  };
  return (
    <div className="item section__padding">
      <div className="item-image">
        <img src={mapping[id].imgAddress} alt="item" />
      </div>
      <div className="item-content">
        <div className="item-content-title">
          <h1>{mapping[id].name}</h1>
          <p>
            <span>100 SUI (transfer fee: 1%) </span> ‧ 20 of 25 available
          </p>
        </div>
        <div className="item-content-creator">
          <div>
            <p>Creater</p>
          </div>
          <div>
            <img src={creator} alt="creator" />
            <p>Rian Leon </p>
          </div>
        </div>
        <div className="item-content-detail">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </p>
        </div>
        <div className="item-content-buy">
          {isButtonDisabled && (
            <button
              style={{ color: "black" }}
              onClick={handleOnClick}
              className="primary-btn"
            >
              Bought!
            </button>
          )}
          {!isButtonDisabled && (
            <button
              style={{ color: "white" }}
              onClick={handleOnClick}
              className="primary-btn"
            >
              Buy For 100 SUI
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
