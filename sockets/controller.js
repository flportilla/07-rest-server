
const { verifyJWT } = require('../helpers')
const ChatMessages = require('../models/chat-info')

const chatMessages = new ChatMessages();

const socketController = async (socket, io) => {

    const token = socket.handshake.headers['flserv-token']

    const user = await verifyJWT(token);
    if (!user) {
        return socket.disconnect();
    }

    //Add connected user
    chatMessages.connectUser(user);
    io.emit('active-users', chatMessages.usersArr);
    socket.emit('receive-message', chatMessages.last10);

    //Connect the user to a specific room
    socket.join(user.id)

    //Clean disconnected users
    socket.on('disconnect', () => {
        chatMessages.disconnectUser(user.id);
        io.emit('active-users', chatMessages.usersArr);
    })

    socket.on('send-message', ({ uid, msg }) => {
        //private message
        if (uid) {
            socket.to(uid).emit('receive-private-message', { from: user.name, msg })
        }
        chatMessages.sendMessage(user.id, user.name, msg);
        io.emit('receive-message', chatMessages.last10);
    })
}

module.exports = {
    socketController
}