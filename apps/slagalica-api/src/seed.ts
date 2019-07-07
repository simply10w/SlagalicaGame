import { Logger } from '@slagalica-api/util';
import { connect } from 'mongoose';
import { environment } from './environments/environment';
import { seedAll } from './tools';

connect(
  environment.mongo,
  { useNewUrlParser: true }
).then(() => {
  Logger.info('Connected to mongo.');
  Logger.info('Starting to seed data.');

  seedAll();
});
