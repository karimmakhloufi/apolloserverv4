import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import WilderModel from "./models/Wilder";

mongoose
  .connect("mongodb://localhost:27017/wilderdb", {
    family: 4,
    autoIndex: true,
  })
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch((err) => console.log(err + " ❌"));

// typeDefs is a string that contains the schema definition
const typeDefs = `#graphql
  type Skill {
    title: String
    votes: Int
  }
  type Wilder {
    name: String
    city: String
    skills: [Skill]
  }
  # The "Query" type is the root of all GraphQL queries.
  type Query {
    getAllWilders: [Wilder]
  }
`;

const resolvers = {
  Query: {
    getAllWilders: () => {
      return WilderModel.find()
        .then((dbRes) => dbRes)
        .catch((err) => err);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
