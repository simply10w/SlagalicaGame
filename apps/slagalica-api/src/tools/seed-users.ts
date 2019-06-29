import * as faker from 'faker';
import { Logger } from '../app/util';
import { UserModel } from '../app/models';

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
  password: '123123'
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
  password: '123123'
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
  password: '123123'
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
  password: '123123'
};

const users: any[] = [ADMIN, SUPER, IGRAC1, IGRAC2];
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
    password: faker.internet.password()
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
