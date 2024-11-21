const db = require('../Model/reviews');

const postData=async  (req, res, next) => {
    const { Companyname, Pros, Cons, Ratingvalue } = req.body;
    try{
      const response=await  db.create({
            Companyname: Companyname, Pros: Pros, Cons: Cons, Ratingvalue: parseInt(Ratingvalue)
        });
        console.log("database created successfully");
        res.status(201).json({reviews:response});
    }catch(err){ 
       console.log("Database cannot be created...",err);
       res.status(500).json({Err:err}); 
    }
}

const getData=async(req,res,next)=>{
    const name=req.params.name;
    try{
       const reviews= await db.findAll({where:{Companyname:name}});

       if (reviews.length==0) {
        return res.json({searchedcompany:null
        });
    }

       let sum=0;
       for(let review of reviews){
        sum+=review.Ratingvalue;
       }
       const avgrating=sum/reviews.length;
       res.status(200).json({
        searchedcompany:name,
        avgrating:avgrating.toFixed(1),
        reviews
       });
    }catch(err){
    console.log("Error in getting company ....");
    res.sendStatus(500).json({
        Error:err
    });
    }
}
module.exports={postData,getData}