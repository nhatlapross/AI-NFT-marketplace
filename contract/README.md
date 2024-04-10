# Contract Docs

## Request Test Token (DevNet)
```
curl --location --request POST 'https://faucet.devnet.sui.io/gas' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "<YOUR SUI ADDRESS>"
    }
}'
```

## Publish Contract (DevNet)
```
sui client publish --gas-budget 500000000 --skip-dependency-verification
``` 

## Call Function Mint NFT
```
sui client call --package <YOUR_PACKAGE_ID> --module four_future_nft --function mint_to_sender --args <ARG_ONE> <ARG_TWO> <ARG_THREE> --gas-budget 500000000 
```

## Call Function Create MarketPlace
```
sui client call --package <YOUR_PACKAGE_ID> --module marketplace --function create --type-args 0x2::sui::SUI --gas-budget 500000000
```
