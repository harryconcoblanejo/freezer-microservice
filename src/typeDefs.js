import { gql } from "apollo-server-express";
import companyDefs from "./defSchemas/companyDefs";
const typeDefs = gql`
  type Query {
    companies(belong_id: String): [Company]
  }
  ${companyDefs}
`;
export default typeDefs;
