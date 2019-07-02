import { Schema } from 'colyseus.js';
import { keys } from 'lodash';

export function serializeState(stateSchema: Schema): object {
  if (!stateSchema) return {};

  const json = stateSchema.toJSON();
  keys(json).forEach(key => {
    if (json[key] && !!json[key].toJSON) {
      json[key] = serializeState(json[key]);
    }
  });
  return Object.assign({}, json);
}
