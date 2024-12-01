import fs from 'node:fs';
import { faker } from '@faker-js/faker';

const roles = [ 'user', 'admin', 'superuser' ];

function genUser() 
{
    const user_id = crypto.randomUUID();
    const user_name = faker.internet.email();
    const user_password =  faker.animal.petName().toLowerCase();
    const user_role = roles[crypto.getRandomValues(new Uint8Array(1))[0] % roles.length];
    const user = { userid: user_id, login: user_name, password: user_password, role: user_role };
    console.log(user);
    return user;
}

function genUsers(n) 
{
    let users = [];
    for (let i = 0; i < n; i++) {
        users.push(genUser());
    }
    return users;
}

let new_users = genUsers(10);
let new_db = { roles: roles, users: new_users };


fs.writeFile('./data/db.json', JSON.stringify(new_db), err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});
