import createUserModel from './createUserModel'
import createPetModel from './createPetModel'
import * as db from './db.json';

const models = {
  User: createUserModel(db),
  Pet: createPetModel(db),
};

export {
  db,
  models,
};
