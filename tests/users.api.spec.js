const {test, expect}= require('@playwright/test');
const Ajv =require('ajv');
const addFormats = require('ajv-formats');
const schema= require('./schemas/user.schema.json');
const invalidUsers = require('./test-data/invalidUsers.json');
const ajv = new Ajv();
addFormats(ajv);
const validateSchema = ajv.compile(schema);
test.describe.serial('Users API', () => {
  let userId;
//----------POSITIVE tests------------------
test(`POST /api/users - Create user`, async({request})=>{
const response =await request.post('/api/users',{
headers: {
    'Content-Type': 'application/json'
  },
data: {
name: 'Jags',
email: 'jags@test.com'
}
});
expect(response.status()).toBe(201);

const body = await response.json();
userId= body.id;

//Schema validation
//expect(validateSchema(body)).toBeTruthy();
});

test(`GET /api/users/{id} - Get User By ID`, async({request})=>{
const response = await request.get(`/api/users/${userId}`);
expect(response.status()).toBe(200);

const body = await response.json();
expect(validateSchema(body)).toBeTruthy();
});


test(`PUT /api/users/{id} - Update user`, async({request})=>{
const response = await request.put(`/api/users/${userId}`,{
headers: {
    'Content-Type': 'application/json'
  },
  data:{
      name: 'Updated Jags'
  }
});
expect(response.status()).toBe(200);
});

test(`DELETE /api/users/{id} - Delete user`, async({request})=>{
const response= await request.delete(`/api/users/${userId}`,{
headers: {
    'Content-Type': 'application/json'
  },
});
expect(response.status()).toBe(200);
});

//---------------Negative tests-----------------------------------
test(`GET /api/users/{id} -User not found`, async({request})=>{
const response= await request.get(`/api/users/invalid-id`);
expect(response.status()).toBe(404);
})

//Data Driven tests
for (const invalidUser of invalidUsers) {
test(`POST /api/users - Invalid payload: ${JSON.stringify(invalidUser)}`, async({request})=>{
const response = await request.post('/api/users',{
data: invalidUser
});
expect(response.status()).toBe(400);
});
}
});
//let userId; //shared across tests




