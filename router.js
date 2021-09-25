const SendOtp=require('sendotp');
const sendOtp=new SendOtp(process.env.MSG91_API_KEY,YOUR_MESSAGE_TEMPLATE);// REPLACE WITH YOUR KEY AND MESSAGE TEMPLATE
const otp_generator=require('otp-generator');

function getOtp(){
    let otp=otp_generator.generate(6,{
        alphabets:false,
        upperCase:false,
        specialChars:false,
    });
    return otp;
}
exports.login=(req,res,next)=>{
try {
    const otp=getOtp();
    sendOtp.send(req.body.phone, process.env.MSG91_ID,otp,function(err,data){
        if(err){
           return res.status(500).send(err);
        }
        res.status(200).json(data);
    }); 
} catch (error) {
    return next(error);
}
}
exports.verify=async(req,res,next)=>{
    try {
        const {phone,otp}=req.body;
       sendOtp.verify(phone,otp,(err,data)=>{
           if(err){
             return  res.status(500).json(err);
           }
           res.status(200).json(data);
       })
    } catch (error) {
        return next(error)
    }
}