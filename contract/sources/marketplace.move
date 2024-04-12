module contract::marketplace {
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::event;
    use contract::auction_lib::{Self, Auction};

    // const EWrongOwner: u64 = 1;

    struct CreateAuction has copy, drop {
        sender: address,
    }

    struct Bid has copy, drop {
        sender: address,
    }

    public entry fun create_auction<T: key + store>(to_sell: T, ctx: &mut TxContext) {
        let auction = auction_lib::create_auction(to_sell, ctx);

        event::emit(CreateAuction {
            sender: tx_context::sender(ctx)
        });

        auction_lib::share_object(auction);
    }

    public entry fun bid<T: key + store>(coin: Coin<SUI>, auction: &mut Auction<T>, ctx: &mut TxContext) {

        event::emit(Bid {
            sender: tx_context::sender(ctx),
        });

        auction_lib::update_auction(
            auction,
            tx_context::sender(ctx),
            coin::into_balance(coin),
            ctx
        );
    }
}