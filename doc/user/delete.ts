const deleteUser = {
  delete: {
    tags: ["User"],
    description: "Delete user",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "User id",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    security: [{ bearerToken: [] }],
    responses: {
      "200": {
        description: "New user registered",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                id: { type: "string" },
                token: { type: "string" },
              },
            },
            example: {
              email: "totoleharicot@danslepot.fr",
              id: "1234567890",
              token: "0987654321",
            },
          },
        },
      },
      "400": {
        description: "Error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "string" },
                statusCode: { type: "number" },
                message: { type: "string" },
              },
            },
            example: {
              message: "Missing email",
              statusCode: 400,
              status: "failed",
            },
          },
        },
      },
    },
  },
};

export default deleteUser;
