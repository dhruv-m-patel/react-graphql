export default {
  Query: {
    user(_, args, { models }) {
      return models.User.getAll()
    },

    pets(_, args, { models }) {
      return models.Pet.getAll()
    },

    pet(_, args, { models }) {
      return models.Pet.find(args.id)
    },
  },
  Pet: {

  },
  User: {

  },
};
