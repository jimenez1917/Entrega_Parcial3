const {createTransport} = require('nodemailer');

const TEST_MAIL = 'chad.reynolds79@ethereal.email'

const transporter =createTransport({
    host:'smtp.ethereal.email',
    port : 587,
    auth: {
        user: TEST_MAIL,
        pass: 'MG9RpBM9ZDDXbcUp53'
    }
})

module.exports=transporter;