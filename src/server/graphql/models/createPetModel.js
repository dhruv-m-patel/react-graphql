export default function createPetModel(db) {
  return {
    getAll() {
      return db.pets;
    },

    getByOwnerId(ownerId) {
      return db.pets.filter(pet => pet.ownerId === ownerId);
    },

    find(id) {
      return db.pets.findOne(pet => pet.id === id);
    },
  }
}
