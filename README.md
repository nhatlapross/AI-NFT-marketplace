# AI-NFT-marketplace
AI art NFT marketplace with SUI 
# Note for team member
1. Nghiên cứu zkLogin
2. smart contract run in Sui blockchain
   - mint NFT (build success)
   - mua bán đấu giá NFT
3. Chat GPT API tạo tác phẩm nghệ thuật đưa lên IPFS
4. Hoàn thiện Front-end
# Run Front-end
- cd front-end
- npm install
- npm start
# Request faucet sui
Explain
curl --location --request POST 'https://faucet.devnet.sui.io/gas' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "0xf064667386cc04c513fffcbb89ad00c75935931e3d385c1580e8e7f771628123"
    }
}'
# Deploy contract
- sui client publish --gas-budget 500000000 --skip-dependency-verification 
# Call contract function
- sui mint nft
sui client call --package 0x84cd2f10ccc37b0fc959c0df567d21ff24658674dd89de13ca6f06bf2b3b0265 --module four_future_nft --function mint_to_sender --args "meme01" "this is my first meme NFT" "https://media.istockphoto.com/id/538665020/vi/anh/meme-internet-t%E1%BA%A1i-sao-b%E1%BA%A1n-kh%C3%B4ng-h%C3%ACnh-minh-h%E1%BB%8Da-khu%C3%B4n-m%E1%BA%B7t-gi%E1%BA%ADn-d%E1%BB%AF-3d.jpg?s=1024x1024&w=is&k=20&c=qGypVnK46IEEqyLEgCC2ECQUubrInqSlj5m01eq8M7o=" --gas-budget 500000000

- sui transfer nft
sui client call --package 0x6d0789d49c77d321a9c07ee881eae608b1b710e9b14c691b8aa044118d4f0ad6 --module four_future_nft --function transfer --args 0xd3093e97245117a6dd586b8d8a56cef2ae64ce3906939803d0c1ed414f77d992 0xb021e9236da30c1564771893349d7fc4b83007e108636235bd3b89c893d313cb --gas-budget 500000000
