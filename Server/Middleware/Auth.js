let Checkvalid = (req,res,next)=>{
    if(req.cookies.Eshop || req.cookies.GEshop)
    {
        next();
    }
    else{
        res.status(500).json({ error: 'Your session expired' });
    }
}

module.exports = {Checkvalid};