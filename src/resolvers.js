
const { companyModel } = require("./models/companyModel.js");

const resolvers = {
   
        Query: {
            companies: (_, { },context) => {
              return companyModel.getAll(context);
            }
          }
   
  };

  export default resolvers