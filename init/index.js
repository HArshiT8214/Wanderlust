const mongoose = require("mongoose"); 
const initdata = require("./data.js");

const Listing = require("../models/listing.js");

main()
.then(() => {
    console.log("connected yo the db");
})
.catch(err => {
    console.log(err);
});

async function main() {
await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};


const initDB = async()=>{

    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"65c3cd3f16c407a48d86bb7e"}));
    await Listing.insertMany(initdata.data);
    console.log("data was initisalized");
}

initDB();