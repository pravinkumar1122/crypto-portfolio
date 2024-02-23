const mongoose= require('mongoose')

const uri = 'mongodb://localhost:27017/portfolio';

const connectToDB=async()=>{

    try{
    const conn = await mongoose.connect(uri) 
    console.log("DB is Connected");
    }catch(err){
        console.log(err);
        process.exit(1)
    }
}
module.exports = connectToDB



