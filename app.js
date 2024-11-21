const express=require('express');
const app=express();

const parser=require('body-parser');
app.use(parser.urlencoded({extended:false}));

app.use(express.json());

const cors=require('cors');
app.use(cors());

const reviewRoutes=require('./Routes/review');
app.use(reviewRoutes);

const sequelize=require('./Util/database');
sequelize.sync()
.then(res=>{
    app.listen(3000,()=>{
        console.log("Server is listening at port 3000......");
    })
}).catch(err=>{
    console.log(err);
})
