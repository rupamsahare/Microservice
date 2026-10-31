const mongoose = require('mongoose')


function connect(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('database connected successfully')
    }).catch(err=>{console.log('error in database connection =',err)})
}

module.exports = connect