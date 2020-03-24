import { gql } from 'apollo-server';

export default gql`
  enum PetType {
    cat
    dog
    lizard
  }

  type Pet {
    id: ID!
    type: PetType!
    name: String!
    createdAt: String!
    ownerId: String!
    owner: User
  }

  type User {
    id: ID!
    username: String!
    pets: [Pet]
  }

  input SearchInput {
    id: String
    username: String
    name: String
    type: String
    createdAt: String
  }

  type Query {
    users(search: SearchInput): [User]!
    user(id: ID!): User!
    pets(search: SearchInput): [Pet]!
    pet(id: ID!): Pet!
  }
`;
