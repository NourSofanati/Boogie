const express=require('express');
let port=550;
const app=express();
app.use(express.static('public'));
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});