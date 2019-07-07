import * as faker from 'faker';
import { Logger } from '@slagalica-api/util';
import { UserModel } from '@slagalica-api/models';

const ADMIN = {
  type: 'admin',
  accepted: true,
  firstName: 'Petar',
  lastName: 'Djordjevic',
  userName: 'admin',
  email: 'pdjordjevic+admin@spark451.com',
  dateOfBirth: faker.date.past(20),
  gender: 'male',
  profileImgUrl: 'bg-img-business.jpg',
  password: 'P4ssword!'
};

const SUPER = {
  type: 'supervizor',
  accepted: true,
  firstName: 'Petar',
  lastName: 'Djordjevic',
  userName: 'super',
  email: 'pdjordjevic+super@spark451.com',
  dateOfBirth: faker.date.past(20),
  gender: 'male',
  profileImgUrl: 'bg-img-business.jpg',
  password: 'P4ssword!'
};

const IGRAC1 = {
  type: 'igrac',
  accepted: true,
  firstName: 'Petar',
  lastName: 'Djordjevic',
  userName: 'igrac1',
  email: 'pdjordjevic+igrac1@spark451.com',
  dateOfBirth: faker.date.past(20),
  gender: 'male',
  profileImgUrl: 'bg-img-business.jpg',
  password: 'P4ssword!'
};

const IGRAC2 = {
  type: 'igrac',
  accepted: true,
  firstName: 'Petar',
  lastName: 'Djordjevic',
  userName: 'igrac2',
  email: 'pdjordjevic+igrac2@spark451.com',
  dateOfBirth: faker.date.past(20),
  gender: 'male',
  profileImgUrl: 'bg-img-business.jpg',
  password: 'P4ssword!'
};

const IGRAC3 = {
  type: 'igrac',
  accepted: true,
  firstName: 'Petar',
  lastName: 'Djordjevic',
  userName: 'igrac3',
  email: 'pdjordjevic+igrac3@spark451.com',
  dateOfBirth: faker.date.past(20),
  gender: 'male',
  profileImgUrl: 'bg-img-business.jpg',
  password: 'P4ssword!'
};

const IGRAC4 = {
  type: 'igrac',
  accepted: true,
  firstName: 'Petar',
  lastName: 'Djordjevic',
  userName: 'igrac4',
  email: 'pdjordjevic+igrac4@spark451.com',
  dateOfBirth: faker.date.past(20),
  gender: 'male',
  profileImgUrl: 'bg-img-business.jpg',
  password: 'P4ssword!'
};

const IGRAC5 = {
  type: 'igrac',
  accepted: true,
  firstName: 'Petar',
  lastName: 'Djordjevic',
  userName: 'igrac5',
  email: 'pdjordjevic+igrac5@spark451.com',
  dateOfBirth: faker.date.past(20),
  gender: 'male',
  profileImgUrl: 'bg-img-business.jpg',
  password: 'P4ssword!'
};

const users: any[] = [ADMIN, SUPER, IGRAC1, IGRAC2, IGRAC3, IGRAC4, IGRAC5];
for (let i = 0; i < 50; i++) {
  users.push({
    type: 'igrac',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    dateOfBirth: faker.date.past(20),
    gender: faker.random.arrayElement(['female', 'male']),
    profileImgUrl: faker.random.image(),
    password: 'P4ssword!'
  });
}

export function seedUsers() {
  UserModel.remove({})
    .then(() => users.map(user => new UserModel(user)))
    .then(docs => docs.forEach(doc => doc.save()))
    .then(() => {
      Logger.info('SUCCESSFULLY ADDED USERS');
    })
    .catch(error => Logger.error('Something went wrong.', error));
}
