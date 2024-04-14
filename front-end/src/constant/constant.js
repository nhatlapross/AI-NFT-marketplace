import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const packageObjectId = "0xcd1d8b1488145a44ae4e5e67c9549204712c7509e5ee86697ad1a08aac8373d8";
export const moduleName = "four_future_nft";
export const moduleMarketName = "marketplace";
export const OpenAIKey="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";//"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";//api key open AI
export const defaultImgURL = "https://th.bing.com/th/id/OIP.eFAj7sVAyYiIDJU60PtUVwHaHa?rs=1&pid=ImgDetMain";
export const suiExploreLink = "https://suiscan.xyz/devnet/object/";
export const suiCoin = "0x2::sui::SUI";
export const marketID = "0x57ea15ed039034ac64b9c8e6b8c3007c5308e287fd5f80a2c6eddebaa2ddb3c8";
export const bagID ="0x54871166e0386660c694cb888ea5c48f863652fd9c0b3601bfdd0ace12a8452b";
export const typeArgNFT = packageObjectId+"::"+ moduleName+"::"+"FourFutureNFT";
export const rpcUrl = getFullnodeUrl('devnet');
export const client = new SuiClient({ url: rpcUrl });
export const listAuction = ["0xc8c8fae85a56e1e3120c52f67d953dc3ee21aca6938129992fd064cf84ec6dbc",
                            "0x36f2fdedd3a23f2583035fc7efb94033257d32dfd5681741974eea5749b8ffe5",
                            "0x6791b88628d45ca22a69f5dd917af5674f979607eb2878e3adf9f5ba2d7d9ca0",
                        "0x2f7b62dcb83889abe76b84b3f83c3ca22371ed813dcc4a3c559ba8411d8d779f",
                    "0xc4d8069915c526802df7d85c9cd60541f657a803ca28bcd313c54f51ed5687f3",
                "0x142979fc492562dfc15229520c4745fa8f9be5303e410eb494ce394171172fc1",
            "0xe6cd7345bcac42208bc1e6d4d01210eb5626398cf6c21b68025f33b6f7f3de92",
        "0x8cdbc404bc5ebade0f32a2156e5cfef38249b09336ab69c6643013f79d20273d",
    "0x929bec8359e18db01f02651f01f029cf329c99cfa4cb49ed9275957434e9422a"]

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCSzOYVdOdgL0DZnDWqRydWRjTwoxAnghY",
    authDomain: "angular14-ab088.firebaseapp.com",
    projectId: "angular14-ab088",
    storageBucket: "angular14-ab088.appspot.com",
    messagingSenderId: "56427262623",
    appId: "1:56427262623:web:b6cd01412c0e014e20e8aa"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);