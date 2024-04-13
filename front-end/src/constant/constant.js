import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
export const packageObjectId = "0xcd1d8b1488145a44ae4e5e67c9549204712c7509e5ee86697ad1a08aac8373d8";
export const moduleName = "four_future_nft";
export const moduleMarketName = "marketplace";
export const OpenAIKey="";//"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";//api key open AI
export const defaultImgURL = "https://th.bing.com/th/id/OIP.eFAj7sVAyYiIDJU60PtUVwHaHa?rs=1&pid=ImgDetMain";
export const suiExploreLink = "https://suiscan.xyz/devnet/object/";
export const suiCoin = "0x2::sui::SUI";
export const marketID = "0x57ea15ed039034ac64b9c8e6b8c3007c5308e287fd5f80a2c6eddebaa2ddb3c8";
export const bagID ="0x54871166e0386660c694cb888ea5c48f863652fd9c0b3601bfdd0ace12a8452b";
export const typeArgNFT = packageObjectId+"::"+ moduleName+"::"+"FourFutureNFT";
export const rpcUrl = getFullnodeUrl('devnet');
export const client = new SuiClient({ url: rpcUrl });