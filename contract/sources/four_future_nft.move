module contract::four_future_nft {
    use std::string;
    use sui::url::{Self, Url};
    use sui::object::{Self, ID, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::event;
    use sui::transfer;

    const ENotStateOne: u64 = 1;

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
        state: u64,
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

    struct NFTDescriptionUpdated has copy, drop {
        // The Object ID of the NFT
        object_id: ID,
        // The creator update description
        creator_updated: address,
        // The new description updated
        new_description_updated: string::String,
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
    public fun state(nft: &FourFutureNFT): &u64 {
        &nft.state
    }

    // ===== Entrypoints =====

    /// Create a new fourfuture_nft
    public fun mint_to_sender(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        ctx: &mut TxContext,
    ) {

        let sender = tx_context::sender(ctx);
        let nft = FourFutureNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
            state: 0,
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

        let sender = tx_context::sender(ctx);

        event::emit(NFTTransfered {
            object_id: object::id(&nft),
            sender_nft: sender,
            receive: recipient,
        });

        transfer::public_transfer(nft, recipient)
    }

    public fun check_state_one(nft: &mut FourFutureNFT) {
        assert!(nft.state == 1, ENotStateOne);
    }

    /// Change the state of an NFT
    public fun change_state(nft: &mut FourFutureNFT, new_state: u64) {
        // Ensure the new state is valid (0, 1, or 2)
        assert!(new_state == 0 || new_state == 1 || new_state == 2, 1);

        // Change the state of the NFT
        nft.state = new_state;
    }

    /// Update the `description` of `nft` to `new_description`
    public fun update_description(
        nft: &mut FourFutureNFT,
        new_description: vector<u8>,
        ctx: &mut TxContext
    ) {

        let sender = tx_context::sender(ctx);

        event::emit(NFTDescriptionUpdated {
            object_id: object::id(nft),
            creator_updated: sender,
            new_description_updated: string::utf8(new_description)
        });

        nft.description = string::utf8(new_description)
    }

     /// Permanently delete `nft`
    public fun burn(
        nft_burn: FourFutureNFT, 
        _: &mut TxContext
    ) {

        let FourFutureNFT { id, name: _, description: _, url: _ , state: _} = nft_burn;
        object::delete(id)
    } 

}