const { v4: uuidv4 } =require('uuid');
const users =require('../data/users');
const { emitEvent } = require('../websocket/socketServer');

exports.createUser = (req, res) => {
console.log('REQ BODY:', req.body);
const { name, email } = req.body || {};
const newUser = {
 id:uuidv4(),
 name,
 email
};
users.push(newUser);

//Emit Websocket event
//const wss= req.app.locals.wss;
//if(wss){
//wss.clients.forEach((client) => {
//if(client.readyState===client.OPEN){
//client.send(JSON.stringify({event: 'USER_CREATED',data: newUser}));
//}
//});
//}
emitEvent('USER_CREATED', newUser);

res.status(201).json(newUser);
};

exports.getAllUsers =(req, res) => {
res.status(200).json(users);
};

exports.getUserById = (req, res) => {
const user =users.find(u => u.id=== req.params.id);
if(!user){
return res.status(404).json({message:'User not found'});
}
res.status(200).json(user);
};

exports.updateUser = (req, res) => {
const user = users.find(u=> u.id === req.params.id);
if (!user){
return res.status(404).json({message: 'User not found'})
}
user.name = req.body.name || user.name;
user.email= req.body.email || user.email;

res.status(200).json(user);
};

exports.deleteUser = (req, res) => {
const index = users.findIndex(u=> u.id ===  req.params.id);
if(index===-1){
return res.status(404).json({message:'User not found'});
}
users.splice(index,1);
res.status(200).json({message:'User deleted successfully'})

}
