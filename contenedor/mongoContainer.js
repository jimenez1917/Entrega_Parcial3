// MongoDb
const {mongoose} = require('mongoose');
// const Product = require('../models/product');

// connección a la base de datos
mongoose.connect(
	'mongodb+srv://jimenez1917:dajiru17@cluster0.vfuad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connected to mongoDB');
});

class MongoContainer {
	constructor(model) {
		this.model = model;
	}

	getAll = async () =>{
		return await this.model.find();
	}
	async add(product,cardId) {
		if(cardId){
			await this.model.updateOne({_id:cardId},{timestamp:product.timestamp,products:product.products})
			const cart=await this.model.find({_id:cardId});
			return cart;
		}else{
			return await this.model.create(product);
		}
	}
	async delete(id) {
		return await this.model.deleteOne({_id:id});
	}
	async getById(id){
		return await this.model.find({_id:id});
	}
	async UploadById(id,body){
		return await this.model.update({_id:id},{nombre:body.nombre,descripcion:body.descripcion,codigo:body.codigo,foto_url:body.foto_url,precio:body.precio,stock:body.stock});
	}
	async Update(products,userId){
		return await this.model.updateOne({_id:cartId},{products:products});
	}
}


module.exports = MongoContainer;
