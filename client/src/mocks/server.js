import { rest } from "msw";
import { setupServer } from "msw/node";

const baseURL = process.env.REACT_APP_BACKEND_API_HOST;

const handlers = [
  /*************** Token ***************/
  rest.get(`${baseURL}auth/obtain/`, (req, res, ctx) => {
    return res(ctx.status(201));
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
            id: 1,
            name: "Can add log entry",
            codename: "add_logentry",
            content_type: 1,
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
            id: 1,
            name: "test",
            permissions: [
              "Can add log entry",
              "Can change log entry",
              "Can delete log entry",
              "Can view log entry",
              "Can add group",
              "Can change group",
              "Can delete group",
              "Can view group",
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
        id: 7,
        name: "test_group",
        permissions: ["Can delete log entry"],
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
            first_name: "Gerardo",
            groups: ["test"],
            id: 1,
            is_active: true,
            is_staff: true,
            last_name: "Villa",
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
        id: 7,
        first_name: "Francisco",
        last_name: "Sepulveda",
        username: "paco",
        email: "pacos@mail.com",
        groups: ["test"],
        is_active: true,
        is_staff: true,
        updated_at: "2021-01-27T05:46:28.056208Z",
        created_at: "2021-01-26T05:24:59.553639Z",
      })
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
