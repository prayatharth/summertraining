const {MongoClient}= require('mongodb');
const client=new MongoClient("mongodb://127.0.0.1:27017");

async function regconnect(){
    const con = await client.connect();
    const db= con.db('can');
    return db.collection('reg');

};
module.exports=regconnect;


async function odconnect(){
    const con = await client.connect();
    const db= con.db('can');
    return db.collection('order');

};
module.exports=odconnect;