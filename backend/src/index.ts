import { app } from './app';

const PORT = 8080;
const SERVER_MESSAGE = `server is up and running on port ${PORT}`;

// tslint:disable-next-line: no-console
app.listen(PORT, () => console.log(SERVER_MESSAGE));