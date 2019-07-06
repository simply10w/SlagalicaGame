import { Schema } from 'colyseus.js';
import { keys, isArray } from 'lodash';

export function serializeState(stateSchema: Schema): object {
  if (!stateSchema) return {};

  const json = stateSchema.toJSON();

  if (isArray(json)) {
    console.log('HOLA!');
  }

  keys(json).forEach(key => {
    if (json[key] && !!json[key].toJSON) {
      json[key] = serializeState(json[key]);
    }
  });
  return Object.assign({}, json);
}
