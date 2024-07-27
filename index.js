const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const client = require('./redisconn')
const PORT = 3004
const EXPIRTATION = 30*24*60*60
const TOTAL_LAYOUT = 3

const app = express();
app.use(bodyParser.json())
app.use(cors())

cors


app.get('/health' , (req, res) => {
    res.status(200).json({message: 'ready'});
})



app.post('/ping' , async(req, res) => {
    res.status(200).json({message: req.body});
})


const roundRobin = async() => {

    getLayout1  =  await client.get('layout1');
    if(!getLayout1){
        return 1
    }
    getLayout2  =  await client.get('layout2');
    if(!getLayout2){
        return 2
    }
    getLayout3  =  await client.get('layout3');
    if(!getLayout3){
        return 3
    }
    if(getLayout1 < getLayout2 && getLayout1 < getLayout2){
        return 1
    }
    if(getLayout2 < getLayout1 && getLayout2 < getLayout3){
        return 2
    }
    if(getLayout3 < getLayout1 && getLayout3 < getLayout2){
        return 3
    }
}

app.post('/getLayout', async(req, res) => {

    let getLayout;
    
   
    try{
        const { userIdentifier } = req.body;
        const key = `userID-${userIdentifier}`;
        getLayout  =  await client.get(key);

        if(getLayout){
            res.status(200).json({templateId: getLayout});
            return
        }

        // Additional solution after discussion:  we could have roundrobin counter for all three layout and decide which one shoule have it
        let layoutIndex = await roundRobin()
        //let layoutIndex = userIdentifier % TOTAL_LAYOUT; // hashing as during the live coding
        let serverKey = 'layout' + layoutIndex;
        let resultIncrement = await client.incr(serverKey);
        let result = await client.set(key, layoutIndex, {EX: EXPIRTATION});
        console.log(result, resultIncrement);
        res.status(200).json({templateId: layoutIndex});
    }catch(err){
        console.log(err);
        res.status(400).json({templateId: 'NotFound'});
    }
})



app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})