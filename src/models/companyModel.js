//query de prueba

export const companyModel = {
  getAll: async (context) => {
    console.log("BUSCANDO...");

    try {
      return await context.db.collection("companies").find().toArray();
    } catch (e) {
      console.log(e);
    }
  },
};
