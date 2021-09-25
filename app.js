const express=require('express');
const app=express();
const router=require('./router');
const port=process.env.PORT || 3000;
app.use(express.json())
app.post('/login',router.login);
app.post('/verify',router.verify)
app.use('/',(req,res,next)=>{
    res.status(200).json('Well come');
})
app.listen(port,()=>{
    console.log('App is running well and accepting requests');
})
