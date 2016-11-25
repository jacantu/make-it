module.exports = function Cart(oldCart) {
    /** Properties from last cart to new cart */
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;


    this.add = function(item, id) {

        var storedItem = this.items[id];

        /** Creates an object if the same item was not already in cart */
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        /** Multiplies item * the quantity of the item*/
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;

       /** Updates total quantity and price */
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    /** Stores items objects in an array */
    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};
