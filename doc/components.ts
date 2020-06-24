const components = {
  securitySchemes: {
    bearerToken: {
      type: "http",
      description: "Token use for certain operations",
      in: "header",
      scheme: "bearer",
    },
  },
};

export default components;
