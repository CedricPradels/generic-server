const read = {
  get: {
    tags: ["User"],
    description: "Get user data",
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
        description: "User secure data",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
              },
            },
            example: {
              email: "totoleharicot@hi.net",
            },
          },
        },
      },
      "400": {
        description: "Missing parameters",
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

export default read;
