export default function createPetModel(db) {
  return {
    getAll() {
      return db.pets;
    },

    find(id) {
      return db.pets.findOne(pet => pet.id === id);
    },
  }
}
