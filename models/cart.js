module.exports = function Cart(oldCart) {
    /*Assigns items in cart to properties*/
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        /*Gives an id to items objects*/
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        /*Adds individual items*/
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;

       /*Adds to all items in the cart*/
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};
