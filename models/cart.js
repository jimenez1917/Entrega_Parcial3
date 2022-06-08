const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
	timestamp: {
		type: Date,
		required: true,
	},
	products: {
		type: Array,
		required: true,
	},
});

const Cart = mongoose.model('Carts',CartSchema);

module.exports = Cart;
