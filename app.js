const express= require("express");
const bodyParser =require("body-parser");
const regconnect=require('./mongodb');
const app=express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));





app.get("/",function(req,res){
    res.render("index");
})
app.get("/index",function(req,res){
    res.render("index");
});

app.get("/booking",async function(req,res){
    
    if(req.query.b1!=null)
    {
        let cid = parseInt(req.query.cid);
        let fname = req.query.fname;
        let lname = req.query.lname;
        let email= req.query.email;
        let password=req.query.password;

        




        let collection= await regconnect();
        let data= await collection.findOne({"cid":cid});
        console.log(data);

        if(data.acknowledged == true)
        {
            console.log("user already present");

        }
        else{

            
        let r= await collection.insertOne({'cid':cid,'fname':fname,'lname':lname,'email':email,'password':password});
        if(r.acknowledged==true)
        {
            console.log("register success");
            res.render("booking");
        }
        else{
            console.log("unsucessful attempt");
            res.render("booking");
        }
        }
        
        
        
    }
    else
    {
        res.render("booking");
    }
    

});

app.get("/contact",function(req,res){
    res.render("contact");
});

app.get("/service",function(req,res){
    res.render("service");
});
app.get("/menu",function(req,res){
    res.render("menu");
});
app.get("/team",function(req,res){
    res.render("team");
});
app.get("/about",function(req,res){
    res.render("about");
});
app.get("/signin",function(req,res){
    res.render("signin");
});


app.get("/testimonials",function(req,res){
    res.render("testimonials");
});


app.listen(3000,()=>{console.log("running")});
