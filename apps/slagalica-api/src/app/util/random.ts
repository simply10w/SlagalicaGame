import { Model, Document } from 'mongoose';
import { getRandomNumber } from '@slagalica/common';

export function getOneRandomCollectionItem<T extends Document>(
  model: Model<T>
): Promise<T> {
  return new Promise((resolve, reject) => {
    // Get the count of all items
    model.count({}).exec((err, count) => {
      if (err) {
        return reject(err);
      }

      // Get a random entry
      const randomItemEntry = getRandomNumber({ min: 0, max: count });

      // Again query all items but only fetch one offset by our random #
      model
        .findOne()
        .skip(randomItemEntry)
        .exec((err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
    });
  });
}
