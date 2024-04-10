module contract::four_future_nft {
    use sui::url::{Self, Url};
    use std::string;
    use std::string::{utf8}; 
    use sui::object::{Self, ID, UID};
    use sui::event;
    use sui::transfer;
    use sui::tx_context::{sender, TxContext};
    use sui::package; // For publishing NFT
    use sui::display; // For displaying NFT image

    
    // Struct represent the NFT item
    struct FourFutureNFT has key, store {
        id: UID,
        /// Name for the token
        name: string::String,
        /// Description of the token
        description: string::String,
        /// URL for the token
        url: Url,
        /// State field with values 0, 1, 2
        state: u8,
        /// Price for the token
        price: u64,
    }
    
    struct NFTMinted has copy, drop {
        // The Object ID of the NFT
        object_id: ID,
        // The creator of the NFT
        creator: address,
        // The name of the NFT
        name: string::String,
        // The description of the NFT
        description: string::String,
        // The url of the NFT
        url: Url,
    }

    struct NFTTransfered has copy, drop {
        // The Object ID of the NFT
        object_id: ID,
        // The sender of the NFT
        sender_nft: address,
        // The receive of the NFT
        receive: address,
    }

    struct NFTLiked has copy, drop {
        price_updated: u64
    }

    struct NFTDescriptionUpdated has copy, drop {
        // The Object ID of the NFT
        object_id: ID,
        // The creator update description
        creator_updated: address,
        // The new description updated
        new_description_updated: string::String,
    }

    struct NFTBurned has copy,drop {
        object_id: ID,
        creator_burned: address,
    }

    // ===== Public view functions =====

    /// Get the NFT's `ID`
    public fun id(nft: &FourFutureNFT): &UID {
        &nft.id
    }

    /// Get the NFT's `name`
    public fun name(nft: &FourFutureNFT): &string::String {
        &nft.name
    }

    /// Get the NFT's `description`
    public fun description(nft: &FourFutureNFT): &string::String {
        &nft.description
    }

    /// Get the NFT's `url`
    public fun url(nft: &FourFutureNFT): &Url {
        &nft.url
    }

    /// Get the NFT's `state`
    public fun state(nft: &FourFutureNFT): &u8 {
        &nft.state
    }

    /// Get the NFT's `price`
    public fun price(nft: &FourFutureNFT): &u64 {
        &nft.price
    }

    // ===== Entrypoints =====

    /// Create a new fourfuture_nft
    public fun mint_to_sender(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        ctx: &mut TxContext,
    ) {

        let sender = sender(ctx);
        let nft = FourFutureNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
            state: 0,
            price: 0
        };

        event::emit(NFTMinted {
            object_id: object::id(&nft),
            creator: sender,
            name: nft.name,
            description: nft.description,
            url: nft.url,
        });

        transfer::public_transfer(nft, sender);
    }

    /// Transfer `nft` to `recipient`
    public fun transfer(
        nft: FourFutureNFT, 
        recipient: address, 
        ctx: &mut TxContext
    ) {

        let sender = sender(ctx);

        event::emit(NFTTransfered {
            object_id: object::id(&nft),
            sender_nft: sender,
            receive: recipient,
        });

        transfer::public_transfer(nft, recipient)
    }

    /// Like NFT increase one to price  
    public fun like_nft(nft: &mut FourFutureNFT) {
        nft.price = nft.price + 1;

        event::emit(NFTLiked {
            price_updated: nft.price
        });
    }

    /// Change the state of an NFT
    public fun change_state(nft: &mut FourFutureNFT, new_state: u8) {
        // Ensure the new state is valid (0, 1, or 2)
        assert!(new_state == 0 || new_state == 1 || new_state == 2, 0);

        // Change the state of the NFT
        nft.state = new_state;
    }

    // For displaying NFT image
    struct NFT_PRESS has drop {}
    
    // Publish NFT
    public fun publish_nft(otw: NFT_PRESS, ctx: &mut TxContext) {
        let keys = vector[
            utf8(b"name"),
            utf8(b"description"),
            utf8(b"url"),
            utf8(b"state"),
            utf8(b"price"),
        ];

        let values = vector[
            utf8(b"name"),
            utf8(b"description"),
            utf8(b"url"),
            utf8(b"state"),
            utf8(b"price"),
        ];

        // Claim the publisher
        let publisher = package::claim(otw, ctx);

        let display = display::new_with_fields<FourFutureNFT>(
            &publisher, keys, values, ctx 
        );

        display::update_version(&mut display);

        // Publish the NFT
        transfer::public_transfer(publisher, sender(ctx));
        transfer::public_transfer(display, sender(ctx));
    }
    
    // Publish NFT and change to state 1 or 2
    public fun change_state_publish_nft(
        otw: NFT_PRESS, 
        ctx: &mut TxContext, 
        nft: &mut FourFutureNFT, 
        new_state: u8
    ) {
       
        // Ensure the new state is valid (1, or 2)
        assert!(new_state == 1 || new_state == 2, 0);

        // Change the state of the NFT
        nft.state = new_state;

        let keys = vector[
            utf8(b"name"),
            utf8(b"description"),
            utf8(b"url"),
            utf8(b"state"),
            utf8(b"price"),
        ];

        let values = vector[
            utf8(b"name"),
            utf8(b"description"),
            utf8(b"url"),
            utf8(b"state"),
            utf8(b"price"),
        ];

        // Claim the publisher
        let publisher = package::claim(otw, ctx);

        let display = display::new_with_fields<FourFutureNFT>(
            &publisher, keys, values, ctx 
        );

        display::update_version(&mut display);

        // Publish the NFT
        transfer::public_transfer(publisher, sender(ctx));
        transfer::public_transfer(display, sender(ctx));
    }

    /// Update the `description` of `nft` to `new_description`
    public fun update_description(
        nft: &mut FourFutureNFT,
        new_description: vector<u8>,
        ctx: &mut TxContext
    ) {

        let sender = sender(ctx);

        event::emit(NFTDescriptionUpdated {
            object_id: object::id(nft),
            creator_updated: sender,
            new_description_updated: string::utf8(new_description)
        });

        nft.description = string::utf8(new_description)
    }

     /// Permanently delete `nft`
    public fun burn(
        nft: &mut FourFutureNFT, 
        nft_burn: FourFutureNFT, 
        ctx: &mut TxContext
    ) {

        let sender = sender(ctx);

        event::emit(NFTBurned {
            object_id: object::id(nft),
            creator_burned: sender
        });

        let FourFutureNFT { id, name: _, description: _, url: _ , state: _, price: _} = nft_burn;
        object::delete(id)
    } 

}