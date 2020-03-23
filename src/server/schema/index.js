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
  }

  type User {
    id: ID!
    username: String!
    pets: [Pet!]
  }

  input PetsInput {
    type: PetType
  }

  type Query {
    user: User!
    pets(input: PetsInput): [Pet]!
    pet(id: ID!): Pet!
  }
`;
