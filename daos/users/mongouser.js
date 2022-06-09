const res = require('express/lib/response');
const MongoContainer = require('../../contenedor/mongoContainer');
const User = require('../../models/user');

class UserDao {
    userManager = new MongoContainer(User);

    getBy = async (user) => {
        return await this.userManager.getById(user);
    }
    UploadById = async (array,user) => {
        console.log('user',user)
        console.log('array',array)
        return await this.userManager.Update(array,user);
    }
}
module.exports = UserDao;