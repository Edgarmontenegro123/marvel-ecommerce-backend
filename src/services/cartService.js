import Cart from '../models/cart.js'

export default class CartService {
    async addToCart ({userId, marvel_id, name, thumbnail, price = 0}) {
        return await Cart.addItem({
            userId,
            marvelId: marvel_id,
            name,
            thumbnail,
            price
        });
    }

    async getCart(userId) {
        return await Cart.getItems(userId);
    }

    async updateQuantity(id, userId, quantity) {
        return await Cart.updateQuantity({
            id: Number(id),
            userId: Number(userId),
            quantity: Number(quantity)
        });
    }

    async getItemById(id, userId) {
        return await Cart.getItemById(id, userId);
    }

    async removeFromCart(id, userId) {
        return await Cart.removeItem({
            id: Number(id),
            userId: Number(userId)
        });
    }

    async decreaseQuantity(id, userId) {
        return await Cart.decreaseQuantity({
            id: Number(id),
            userId: Number(userId)
        });
    }
}
