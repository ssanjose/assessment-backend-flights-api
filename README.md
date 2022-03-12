# Flights Backend API

A Backend API to store tickets/seats, flights, and dates, and relays that data to the user.

This API uses JavaScript and an Express Server to deliver its contents. The server is is composed of the api routes for tickets/flights `/api/[tickets|flights]`.

The API follow a Service-Controller pattern and the routing is set on src/api/routes/routes.js. The tests can be found on the each directory inside the test folder.

## URIs include

- POST /api/tickets
- GET /api/flights

## Scripts
### `npm run dev`

Starts the server in dev mode

### `npm test`

Test the API using mocha
