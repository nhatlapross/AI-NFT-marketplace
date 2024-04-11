module contract::four_future_nft {
    use std::string;
    use sui::url::{Self, Url};
    use sui::object::{Self, ID, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::event;
    use sui::transfer;

    // Struct represent the NFT item
    struct FourFutureNFT has key, store {
        id: UID,
        /// Name for the token
        name: string::String,
        /// Description of the token
        description: string::String,
        /// URL for the token
        url: Url,
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

    struct NFTBurned has copy, drop {
        // The creator update description
        creator_burned: address,
    }

    // ===== Public view functions =====

    /// Get the NFT's `ID`
    public fun get_id(nft: &FourFutureNFT): &UID {
        &nft.id
    }

    /// Get the NFT's `name`
    public fun get_name(nft: &FourFutureNFT): &string::String {
        &nft.name
    }

    /// Get the NFT's `description`
    public fun get_description(nft: &FourFutureNFT): &string::String {
        &nft.description
    }

    /// Get the NFT's `url`
    public fun get_url(nft: &FourFutureNFT): &Url {
        &nft.url
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
        ctx: &mut TxContext
    ) {
        
        let sender = tx_context::sender(ctx);

        event::emit(NFTBurned {
            creator_burned: sender
        });

        let FourFutureNFT { id, name: _, description: _, url: _ } = nft_burn;
        object::delete(id)
    } 

}