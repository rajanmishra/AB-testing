const  { createClient } =  require('redis');


const client  = createClient();

const initlization = async() => {
    await client
   .on('error', err => console.log('Redis Client Error', err))
   .connect();
}

initlization();


module.exports = client;