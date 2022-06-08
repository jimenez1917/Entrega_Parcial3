const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	descripcion: {
		type: String,
		required: true,
	},
	codigo: {
		type: Number,
		required: true,
	},
	foto_url: {
		type: String,
		required: true,
	},
	precio: {
		type: Number,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
});

const Product = mongoose.model('Product', ProductsSchema);

module.exports = Product;
