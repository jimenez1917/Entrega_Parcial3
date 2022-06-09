const express= require('express');
const router=express.Router();
const {productDao}=require('../daos');
const admin=require('../Admin/admin')
const AdminService = new admin();


let idAdmin=1;
// Poner idAdmin en 1 para true; en 0 para false;
const Admin = (req, res, next) => {
    AdminService.admin(idAdmin).then(result=>{
        if(result){
            next();
        }else{
            res.status(404).send({error:-1,description: "ruta no autrizada", message: 'No estas logeado admin'})
        }
    })
}
router.post('/',Admin,async (req,res) =>{
    let body =req.body;
    const product = await productDao.add(body);
    res.json({
        product,
        message: 'post success',
    })
});
router.get('/', async (req,res) =>{
    const products = await productDao.getAll().then(products => res.render('productos',{products:products}));
    // res.render('productos',products);

	// res.json({
	// 	product,
	// 	message: 'success',
	// });
    // res.render('productos',products);
});
router.delete('/:id',Admin, async (req,res) =>{
    const product = await productDao.delete(req.params.id);
	res.json({
		product,
		message: 'deleted product',
	});
});
router.get('/:id',async (req, res)=>{
    //seguridad de parametros
    const product = await productDao.getById(req.params.id);
    res.json({
		product,
		message: 'success',
	});
})
router.put('/:id',async(req, res)=>{
    let bodi=req.body;
    const product = await productDao.UploadById(req.params.id,bodi);
    res.json({
		product,
		message: 'Updated product',
	});
})
module.exports=router;