import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const packageObjectId = "0xd16182140b562ada0e47ce65ee753fb5b8e810f580cec8bf1dddad036b920423";
export const moduleName = "four_future_nft";
export const moduleMarketName = "marketplace";
export const OpenAIKey="";//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";//"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";//api key open AI
export const defaultImgURL = "https://th.bing.com/th/id/OIP.eFAj7sVAyYiIDJU60PtUVwHaHa?rs=1&pid=ImgDetMain";
export const suiExploreLink = "https://suiscan.xyz/devnet/object/";
export const suiCoin = "0x2::sui::SUI";
export const marketID = "0xe65f96fe5f343936c3c6fb3ec2536c982d485a1e7533d7276b70a34ea6fa71f6";
export const bagID ="0xc61940851ca41571fbc72ac143d964410875d08ab707da992616a91c6b7f1c78";
export const typeArgNFT = packageObjectId+"::"+ moduleName+"::"+"FourFutureNFT";
export const rpcUrl = getFullnodeUrl('devnet');
export const client = new SuiClient({ url: rpcUrl });
export const bidMarketID = "0xad41455286f1bbd2b41a9d8ae1d75fe3b993300faf2d7f05e682c13d19b2cb58";
export const bidMarketBagID = "0xa2fb8149ae2072eff690395688604bdbc1d49ce46f8a368173e4229cb3b848f9";

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