const express= require("express");
const bodyParser =require("body-parser");
const regconnect=require('./mongodb');

const app=express();

var currentUserID =0;
var userStatus ="";
var status="Order Now!";




app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/",function(req,res){
    res.render("index",{userStatus,status});
})
app.get("/index",function(req,res){
    res.render("index",{userStatus,status});
});

app.get("/booking",async function(req,res){

    status="Order Now!";
    
    if(req.query.b1!=null)
    {
        let cid = parseInt(req.query.cid);
        let fname = req.query.fname;
        let lname = req.query.lname;
        let email= req.query.email;
        let password=req.query.password;

        

        let collection= await regconnect();
        let data= await collection.countDocuments({"cid":cid});
        console.log(data);

        if(data>0)
        {
            console.log("user already present");
            userStatus = "Present";
            res.render("booking",{userStatus,status});

        }
        else{

            
        let r= await collection.insertOne({'cid':cid,'fname':fname,'lname':lname,'email':email,'password':password});
        console.log(r);
        if(r.acknowledged==true)
        {
            console.log("register success");
            currentUserID = cid;
            
            res.render("Menu");
        }
        else{
            console.log("unsucessful attempt");
            res.render("booking",{userStatus,status});
        }
        }

        
    }
    else
    {
        res.render("booking",{userStatus,status});
    }
    

});

app.get("/contact",function(req,res){
    res.render("contact",{userStatus,status});
});

app.get("/service",function(req,res){
    res.render("service",{userStatus,status});
});
app.get("/menu",function(req,res){
    res.render("menu",{userStatus,status});

    
});

app.get("/about",function(req,res){
    res.render("about",{userStatus,status});
});
app.get("/signin",async function(req,res){


    if(req.query.b1!=null)
        {
            
        let cid = parseInt(req.query.cid); 
        let password=req.query.password;
        let collection= await regconnect();
        const data= await collection.find({"cid":cid,"password":password}).toArray();
      
        console.log(data.length);

        if(data.length>0){

            console.log("login successful");
            currentUserID = cid;
            status=cid;
            res.render("menu",{status});


        }else{

            console.log("user not found");
            userStatus="user not found";
            res.render("signin",{userStatus,status});

        }
    
        }else{
    
            res.render("signin",{status});

        }


});




app.get("/testimonials",function(req,res){
    res.render("testimonials",{userStatus,status});
});


app.listen(3000,()=>{console.log("running")});
