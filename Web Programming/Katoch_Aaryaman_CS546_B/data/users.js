
const mongoCollections = require('../config/mongoCollections');
const userCollection = mongoCollections.user_collection;
const helpers = require('../helpers');
const bcrypt = require('bcrypt');
const saltRounds = 16;
const createUser = async (
  username, password
) => { 
username=username.trim()
username=username.toLowerCase()
await helpers.checkisproperusername(username)
await helpers.checkisproperpassword(password)
const hash = await bcrypt.hash(password, saltRounds);
const usercollection = await userCollection();
const userList = await usercollection.find({}).toArray();
for(i=0;i<userList.length;i++){
  curuser=userList[i]
  if(curuser.username==username){
  throw "there is already a user with that username"
}}

let user1={
  username:username,
  password:hash
}
const insertInfo = await usercollection.insertOne(user1);
if (insertInfo.acknowledged || insertInfo.insertedId)
return({insertedUser: true})

else
throw 'Could not add user';

};



const checkUser = async (username, password) => {
username=username.trim()
username=username.toLowerCase()
await helpers.checkisproperusername(username)
await helpers.checkisproperpassword(password)
const usercollection = await userCollection();
const userList = await usercollection.find({}).toArray();
for(i=0;i<userList.length;i++){
  curuser=userList[i]
  if(curuser.username==username){
    const match = await bcrypt.compare(password,curuser.password);
    if(match==true)
    return ({authenticatedUser: true})
    else
    throw "Either the username or password is invalid"
} 
}throw "Either the username or password is invalid"
};

module.exports = {createUser,checkUser};
