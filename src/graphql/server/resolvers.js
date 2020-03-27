export default {
  Query: {
    users(_, filters, { models }) {
      const allUsers = models.User.getAll();

      if (filters.search) {
        const { id, username } = filters.search;
        return allUsers.filter(user => (id && user.id?.toString() === id) ||
          (username && user.username.toLowerCase().includes(username?.toLowerCase()))
        );
      }

      return allUsers;
    },

    user(_, filters, { models }) {
      const { id: userId } = filters;
      return models.User.findOne(Number(userId));
    },

    pets(_, filters, { models }) {
      const { search, ownerId } = filters;

      if (search) {
        const { id, name, type } = search;
        return models.Pet.getAll()
          .filter(pet => (id && pet.id?.toString() === id) ||
            (name && pet.name.toLowerCase().includes(name?.toLowerCase())) ||
            (type && pet.type?.toLowerCase() === type)
          );
      }

      if (ownerId) {
        return models.Pet.getByOwnerId(Number(ownerId));
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
