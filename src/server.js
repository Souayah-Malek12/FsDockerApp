const express = require("express");
//const mongoose = require("mongoose")
const {createClient} = require("redis")
const {Client} =require('pg');


const app = express();
const PORT = 4001;

//connect to mongo
//const db_user = 'swayahmalek6';
//const db_pwd = 'bacscience2021';
//const port = 27017;
//const host = 'mongo'
//const URI = `mongodb://${db_user}:${db_pwd}@${host}:${port}`;
//mongoose.connect(URI)
//.then(()=>{
//    console.log(`Connect to db port :${port}`)
//})
//.catch((err)=>{
//    console.log("Error : ", err);
//});

//connect to postgres 
const DB_USER = 'root';
const DB_PASSWORD = 'root';
const DB_PORT = 5432;
const DB_HOST = 'postgres';

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

const client = new Client({
    connectionString : URI,
})
client
.connect()
.then(()=>{
    console.log(`Connect to db port postgres:${port}`)
})
.catch((err)=>{
    console.log("Error : ", err);
});


//connect to redis
const REDIS_HOST= 'redis'
const REDIS_PORT=6379
const redisClient = createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('err',(error)=>{console.log("Error while conntecting to redis",error)});
redisClient.on('connect',()=>{console.log(`Connected to Redis ${REDIS_PORT}`)});


redisClient.connect();




app.listen(PORT, ()=> { console.log(`App is running on port ${PORT} `)});

app.get('/', (req, res)=> {
    redisClient.set("name", "Malek Souayah hhhh")
    res.send('<h1>Hello Docker Malek Souayah 2001 </h1>')}
)

app.get('/data', async(req, res)=> {
    const name = await redisClient.get("name")
    
    res.send(`<h1>${name}`)}
)
