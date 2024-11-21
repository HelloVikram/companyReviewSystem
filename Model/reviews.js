const Sequelize=require('sequelize');
const sequelize=require('../Util/database');

const review=sequelize.define('reviews',{
    id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true  
    },
    Companyname:Sequelize.STRING,
    Pros:Sequelize.STRING,
    Cons:Sequelize.STRING,
    Ratingvalue:Sequelize.INTEGER
});
module.exports=review;