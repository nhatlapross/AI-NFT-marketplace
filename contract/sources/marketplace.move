module contract::marketplace {
    use sui::dynamic_object_field as ofield;
    use sui::tx_context::{Self, TxContext};
    use sui::object::{Self, ID, UID};
    use sui::coin::{Self, Coin};
    use sui::bag::{Bag, Self};
    use sui::table::{Table, Self};
    use sui::transfer;
    use sui::event;

    /// For when amount paid does not match the expected.
    const EAmountIncorrect: u64 = 0;
    /// For when someone tries to delist without ownership.
    const ENotOwner: u64 = 1;

    const EStateIncorrect: u64 = 1;
    

    /// A shared `Marketplace`. Can be created by anyone using the
    /// `create` function. One instance of `Marketplace` accepts
    /// only one type of Coin - `COIN` for all its listings.
    struct Marketplace<phantom COIN> has key {
        id: UID,
        items: Bag,
        payments: Table<address, Coin<COIN>>
    }

    /// A single listing which contains the listed item and its
    /// price in [`Coin<COIN>`].
    struct Listing has key, store {
        id: UID,
        owner: address,
        state: u64,
        price: u64,
    }

    struct ChangeState has copy, drop {
        sender_change: address,
        state: u64,
    }

    struct ChangePrice has copy, drop {
        sender_change: address,
    }

    /// Create a new shared Marketplace.
    public fun create<COIN>(ctx: &mut TxContext) {
        let id = object::new(ctx);
        let items = bag::new(ctx);
        let payments = table::new<address, Coin<COIN>>(ctx);
        transfer::share_object(Marketplace<COIN> { 
            id, 
            items,
            payments
        })
    }

    /// List an item at the Marketplace.
    public fun list<T: key + store, COIN>(
        marketplace: &mut Marketplace<COIN>,
        item: T,
        price_offer: u64,
        ctx: &mut TxContext
    ) {
        let item_id = object::id(&item);
        let listing = Listing {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            state: 0,
            price: price_offer,
        };

        ofield::add(&mut listing.id, true, item);
        bag::add(&mut marketplace.items, item_id, listing)
    }

    /// Internal function to remove listing and get an item back. Only owner can do that.
    fun delist<T: key + store, COIN>(
        marketplace: &mut Marketplace<COIN>,
        item_id: ID,
        ctx: &TxContext
    ): T {
        let Listing {
            id,
            owner,
            state: _,
            price: _,
        } = bag::remove(&mut marketplace.items, item_id);

        assert!(tx_context::sender(ctx) == owner, ENotOwner);

        let item = ofield::remove(&mut id, true);
        object::delete(id);
        item
    }

    /// Call [`delist`] and transfer item to the sender.
    public fun delist_and_take<T: key + store, COIN>(
        marketplace: &mut Marketplace<COIN>,
        item_id: ID,
        ctx: &mut TxContext
    ) {
        let item = delist<T, COIN>(marketplace, item_id, ctx);
        transfer::public_transfer(item, tx_context::sender(ctx));
    }

    /// Internal function to purchase an item using a known Listing. Payment is done in Coin<C>.
    /// Amount paid must match the requested amount. If conditions are met,
    /// owner of the item gets the payment and buyer receives their item.
    fun buy<T: key + store, COIN>(
        marketplace: &mut Marketplace<COIN>,
        item_id: ID,
        paid: Coin<COIN>,
    ): T {
        let Listing {
            id,
            owner,
            state,
            price,
        } = bag::remove(&mut marketplace.items, item_id);
        
        assert!(state == 2, EStateIncorrect);
        assert!(price == coin::value(&paid), EAmountIncorrect);

        // Check if there's already a Coin hanging and merge `paid` with it.
        // Otherwise attach `paid` to the `Marketplace` under owner's `address`.
        if (table::contains<address, Coin<COIN>>(&marketplace.payments, owner)) {
            coin::join(
                table::borrow_mut<address, Coin<COIN>>(&mut marketplace.payments, owner),
                paid
            )
        } else {
            table::add(&mut marketplace.payments, owner, paid)
        };

        let item = ofield::remove(&mut id, true);
        object::delete(id);
        item
    }

    /// Call [`buy`] and transfer item to the sender.
    public fun buy_and_take<T: key + store, COIN>(
        marketplace: &mut Marketplace<COIN>,
        item_id: ID,
        paid: Coin<COIN>,
        ctx: &mut TxContext
    ) {
        transfer::public_transfer(
            buy<T, COIN>(marketplace, item_id, paid),
            tx_context::sender(ctx)
        )
    }

    /// Internal function to take profits from selling items on the `Marketplace`.
    fun take_profits<COIN>(
        marketplace: &mut Marketplace<COIN>,
        ctx: &TxContext
    ): Coin<COIN> {
        table::remove<address, Coin<COIN>>(&mut marketplace.payments, tx_context::sender(ctx))
    }

    #[lint_allow(self_transfer)]
    /// Call [`take_profits`] and transfer Coin object to the sender.
    public fun take_profits_and_keep<COIN>(
        marketplace: &mut Marketplace<COIN>,
        ctx: &mut TxContext
    ) {
        transfer::public_transfer(
            take_profits(marketplace, ctx),
            tx_context::sender(ctx)
        )
    }

    public fun mutate_state(list: &mut Listing, new_state: u64) {
        assert!(new_state == 1 || new_state == 2, EStateIncorrect);
        list.state = new_state;
    }

    public fun change_state<COIN>(
        marketplace: &mut Marketplace<COIN>, 
        child_name: vector<u8>,
        new_state: u64, 
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        event::emit(ChangeState {
            sender_change: sender,
            state: new_state,
        });

        mutate_state(ofield::borrow_mut<vector<u8>, Listing>(
            &mut marketplace.id,
            child_name,
        ), new_state)
    }

    public fun mutate_price(list: &mut Listing) {
        assert!(list.state == 1, EStateIncorrect);
        list.price = list.price + 1;
    }

    public fun change_price<COIN>(
        marketplace: &mut Marketplace<COIN>,
        child_name: vector<u8>, 
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        event::emit(ChangePrice {
            sender_change: sender,
        });
        
        mutate_price(ofield::borrow_mut<vector<u8>, Listing>(
            &mut marketplace.id,
            child_name,
        ))

    }

}