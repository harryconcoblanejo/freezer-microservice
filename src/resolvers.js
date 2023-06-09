
const { companyModel } = require("./models/companyModel.js");
// const resolvers = {
//     Query: {
//       hello: () => '¡Hola desde el microservicio con Apollo Server!',
//     },
     
//   };

const resolvers = {
   
        Query: {
            companies: (_, { },context) => {
              return companyModel.getAll(context);
            }
          }
   
  };

  export default resolvers