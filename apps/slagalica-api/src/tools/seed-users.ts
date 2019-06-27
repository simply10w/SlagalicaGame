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

const users: any[] = [ADMIN, SUPER];
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
    .then(() => UserModel.insertMany(users))
    .then(added => {
      Logger.logSuccess('SUCCESSFULLY ADDED', added.length);
    })
    .catch(error => Logger.logError('Something went wrong.', error));
}
