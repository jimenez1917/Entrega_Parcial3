const MongoProductDao = require('./products/mongoProductDao.js');
const MongoUser = require('./users/mongouser');

const dbToUse = 'mongo';

let productDao ;
let cartDao;

switch (dbToUse) {
    case 'mongo':
        productDao = new MongoProductDao();
        userDao= new MongoUser();
        break;
    default:
        break;
}

module.exports = {productDao,cartDao};
