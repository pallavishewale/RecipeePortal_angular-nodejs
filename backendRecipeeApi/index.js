const express = require('express');
var cors = require('cors');
const user = require('./userApiFn');
const recp = require('./recipeeApiFn')
const app = express();
app.use(express.json());
const port = 3000;
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, this is the root endpoint!');
});


//************ GET All Users */
//
app.get('/users', async (req, res) => {
    try {
        let key = Object.keys(req.query);
        let value = req.query[key[0]];

        const users = await user.GetAllUsers(key, value);
        console.log("all users : ", users);
        res.status(200).json(users);
    }
    catch (error) {
        console.log("Error: all users :", error);
        res.status(400).json(error);
    }
});


//******************   POST users  */
app.post('/users', async (req, res) => {
  //  console.log("req ,,,,", req);
    // console.log("res ,,,,", res);

    try {
        const userData = req.body;
        console.log("type ...", typeof (userData), "content :", req.body);
        const addStatus = await user.AddUser(userData);
        console.log(" user Added : ", addStatus);
        res.status(200).json(addStatus);
    }
    catch (error) {
        console.log("Error: at adding User :", error);
        res.status(400).json(error);
    }
});

//******* GET Recipess By pegination */
app.get('/recipeespages', async (req, res) => {
    try {
        
       console.log("page no =", req.query.page);
       console.log("pagesize =" , req.query.size);
        const users = await recp.GetRecipeesByPagination(parseInt(req.query.page,10), parseInt(req.query.size),10);
        console.log("all recipees : ", users);
        res.status(200).json(users);
    }
    catch (error) {
        console.log("Error: all recipees :", error);
        res.status(400).json(error);
    }
});


//******* GET All Recipess */
app.get('/recipees', async (req, res) => {
    console.log("Api called");
    try {
        let key = Object.keys(req.query);
        let value = req.query[key[0]];

        const users = await recp.GetAllRecipees(key, value);
        console.log("all recipees : ", users);
        res.status(200).json(users);
    }
    catch (error) {
        console.log("Error: all recipees :", error);
        res.status(400).json(error);
    }
});


//******************   POST Recipees  */
app.post('/recipees', async (req, res) => {
    try {
        const recipeeData = req.body;
        console.log("type ...", typeof (recipeeDataData), "content :", req.body);
        const addStatus = await recp.AddRecipee(recipeeData);
        console.log(" recipee Added : ", addStatus);
        res.status(200).json(addStatus);
    }
    catch (error) {
        console.log("Error: at adding recipee :", error);
        res.status(400).json(error);
    }
});

//******************   PUT Recipees  */
app.put('/recipees', async (req, res) => {
    console.log("put api rout");
    try {
        const recipeeData = req.body;
        console.log("type ...", typeof (recipeeDataData), "content :", req.body);
        const updateStatus = await recp.updateRecipee(req.query.id ,recipeeData);
        console.log(" recipee updated : ", updateStatus);
        res.status(200).json({"result": "updated succesfully"});
    }
    catch (error) {
        console.log("Error: at updating recipee :", error);
        res.status(400).json(error);
    }
});


//*******   DELETE recipees  */
app.delete('/recipees', async(req,res)=>{
    try{
        console.log("in DELETE recipee api");
        const deleteStatus = await recp.deleteRecipee(req.query.id);
        console.log(" recipee deleted : ", deleteStatus);
        res.status(200).json({"result":"Deleted succesfully"});
    }catch(error){
        console.log("Error: at deleting  recipee :", error);
        res.status(400).json(error);
    }
})

//******* GET All Records */
app.get('/recipees/allrecord', async (req, res) => {
    console.log("Api called");
    try {
       

        const users = await recp.GetAllRecord(req.query.id);
        console.log("all records : ", users);
        res.status(200).json(users);
    }
    catch (error) {
        console.log("Error: all records :", error);
        res.status(400).json(error);
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



