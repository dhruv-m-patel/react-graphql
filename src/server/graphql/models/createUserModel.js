export default function createUserModel(db) {
  return {
    getAll() {
      return db.users;
    },

    findOne(id) {
      return db.users.find(user => user.id === id);
    },
  }
}
