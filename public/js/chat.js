//HTML References
const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulUsers = document.querySelector('#ulUsers');
const ulMessages = document.querySelector('#ulMessages');
const btnExit = document.querySelector('#btnExit');

let user = null;
let socket = null;

const urlLocal = 'http://localhost:3030/api/auth/';

//validate token from localstorage
const validateJWT = async () => {

    const token = localStorage.getItem('token') || '';
    if (token.length <= 10) {

        window.location = 'index.html';
        throw new Error('Token is missing')
    };

    const response = await fetch(urlLocal, {
        headers: { 'flserv-token': token }
    });

    const { user: userDB, token: tokenDb } = await response.json()
    localStorage.setItem('token', tokenDb);
    user = userDB
    document.title = user.name

    await connectSocket();
}

const connectSocket = async () => {
    socket = io({
        'extraHeaders': {
            'flserv-token': localStorage.getItem('token')
        }
    });

    // socket.on('connect', () => {
    //     console.log('Sockets online')
    // });

    // socket.on('disconnect', () => {
    //     console.log('Sockets offline')
    // });

    socket.on('receive-message', drawMessages);
    socket.on('active-users', drawUsers)

    socket.on('receive-private-message', (payload) => {
        console.log(payload)
    });

}


const drawUsers = (users = []) => {
    let usersHtml = '';
    users.forEach(user => {
        usersHtml += `
        <li>
            <p>
                <h5 class="text-success"> ${user.name}</h5>
                <span class="fs-6 text-muted">${user.uid}</span>
            </p>
        </li>
        `
        ulUsers.innerHTML = usersHtml
    })
}
const drawMessages = (payload = []) => {
    let messagesHtml = '';

    payload.forEach(payload => {
        messagesHtml += `
        <li>
            <p>
                <span class="text-primary"> ${payload.name}:</span>
                <span class="fs-6 text-muted">${payload.message}:</span>
            </p>
        </li>
        `
        ulMessages.innerHTML = messagesHtml;
    })
}



txtMessage.addEventListener('keyup', ({ keyCode }) => {

    const msg = txtMessage.value;
    const uid = txtUid.value;

    if (keyCode !== 13) { return }
    if (msg.length === 0) { return }

    socket.emit('send-message', { msg, uid });
    txtMessage.value = '';
})

const main = async () => {

    await validateJWT();

}

main()



