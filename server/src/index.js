import SocketServer from './socket.js';
import Event from 'events';
import Controller from './controller.js';
import { constants } from './constants.js';

const eventEmitter = new Event();

const port = process.env.PORT || 9898;

const socketServer = new SocketServer({ port });

const server = await socketServer.initialize(eventEmitter);

const controller = new Controller({ socketServer });
eventEmitter.on(constants.EVENTS.NEW_USER_CONNECTED, controller.onNewConnection.bind(controller));

console.log(`Socket server is running at [${server.address().port}]`);

// eventEmitter.on(constants.EVENTS.NEW_USER_CONNECTED, (socket) => {
//     console.log('New connection: ', socket.id);
//     socket.on('data', (data) => {
//         console.log('Server received: ', data.toString());
//         socket.write('World ');
//     });
// });
