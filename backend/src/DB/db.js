const mongoose=require('mongoose')
function connecttodb(){
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("connected to db");
    
}).catch((err)=>{
    console.error("MongoDB Connection Error: ", err);
    
})
}
module.exports=connecttodb;