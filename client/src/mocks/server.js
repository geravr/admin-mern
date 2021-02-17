import { rest } from "msw";
import { setupServer } from "msw/node";

const baseURL = process.env.REACT_APP_BACKEND_API_HOST;

const handlers = [
  /*************** Token ***************/
  rest.post(`${baseURL}auth/obtain/`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({
      id: "6029d587d6b2b9002bf08c2b",
      isAdmin: false,
      token: {
        access: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      },
      username: "demo"
    }));
  }),
  /*************** Permissions ***************/
  rest.get(`${baseURL}permissions/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count: 1,
        totalPages: 1,
        results: [
          {
            id: "6029d50dd6b2b9002bf08c20",
            name: "Can add - Users",
          },
        ],
      })
    );
  }),

  /*************** Groups ***************/
  rest.get(`${baseURL}groups/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count: 1,
        totalPages: 1,
        results: [
          {
            id: "6029d50dd6b2b9002bf08c28",
            name: "test",
            permissions: [
              { name: "Can read - Groups", id: "6029d50dd6b2b9002bf08c21" },
              { name: "Can read - Users", id: "6029d50dd6b2b9002bf08c25" }
            ],
          },
        ],
      })
    );
  }),
  rest.get(`${baseURL}groups/:id/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: [{
          id: "6029d50dd6b2b9002bf08c28",
          name: "testGroup",
          permissions: ["Can delete log entry"],
        }]
      })
    );
  }),
  rest.post(`${baseURL}groups/`, (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.patch(`${baseURL}groups/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete(`${baseURL}groups/:id`, (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  /*************** Users ***************/
  rest.get(`${baseURL}users/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count: 1,
        totalPages: 1,
        results: [
          {
            firstName: "Gerardo",
            groups: [{
              id: "6029d50dd6b2b9002bf08c29",
              name: "editor"
            }],
            id: "6029d587d6b2b9002bf08c2b",
            isActive: true,
            isAdmin: false,
            lastName: "Villa",
            username: "gerardo",
          },
        ],
      })
    );
  }),
  rest.get(`${baseURL}users/:id/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: [
          {
            id: "6029d587d6b2b9002bf08c2b",
            firstName: "Francisco",
            lastName: "Sepulveda",
            username: "paco",
            email: "pacos@mail.com",
            groups: ["6029d50dd6b2b9002bf08c29"],
            isActive: true,
            isAdmin: true,
          }
        ]
      }
      )
    );
  }),
  rest.post(`${baseURL}users/`, (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.patch(`${baseURL}users/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete(`${baseURL}users/:id`, (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers);

export { server, rest };
