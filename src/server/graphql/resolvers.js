export default {
  Query: {
    users(_, filters, { models }) {
      const allUsers = models.User.getAll();

      if (filters.search) {
        const { id, username } = filters.search;
        return allUsers.filter(user => user.id.toString() === id || user.username.toLowerCase().includes(username?.toLowerCase()));
      }

      return allUsers;
    },

    user(_, filters, { models }) {
      const { id: userId } = filters;
      return models.User.findOne(userId);
    },

    pets(_, filters, { models }) {
      const { search, ownerId } = filters;

      if (search) {
        const { id, name, type } = search;
        return models.Pet.getAll()
          .filter(pet => pet.id.toString() === id ||
            pet.name.toLowerCase().includes(name.toLowerCase()) ||
            pet.type.toLowerCase() === type
          );
      }

      if (ownerId) {
        return models.Pet.getByOwnerId(ownerId);
      }

      return models.Pet.getAll();
    },

    pet(_, filters, { models }) {
      const { id: petId } = filters;
      return models.Pet.findOne(petId);
    },
  },
  Pet: {
    owner(pet, _, { models }) {
      return models.User.findOne(pet.ownerId);
    }
  },
  User: {
    pets(user, _, { models }) {
      return models.Pet.getByOwnerId(user.id);
    },
  },
};
