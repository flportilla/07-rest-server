
const loginForm = document.querySelector('form');



// const url = (window.location.hostname.includes('localhost'))
//     ? 'http://localhost:3030/api/auth/'
//     : 'https://flportilla-server.herokuapp.com/api/auth/'

// const url = 'http://localhost:3030/api/auth/'
const url = 'https://flportilla-server.herokuapp.com/api/auth/'

loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {}

    for (let elem of loginForm.elements) {
        if (elem.name.length > 0) {
            formData[elem.name] = elem.value
        }
    }

    fetch(url + 'login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(data => {
            if (data.msg) {
                return console.error(data.msg)
            }
            localStorage.setItem('token', data.token)
            window.location = 'chat.html'
        })
        .catch(err => {
            console.log(err)
        })
})



function handleCredentialResponse(response) {
    //Google Token: ID_TOKEN
    // console.log('id token', response.credential);
    const body = { id_token: response.credential }
    console.log(url)
    fetch(url + 'google', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(res => {
            window.localStorage.setItem('token', res.token)
            window.localStorage.setItem('email', res.user.email);
            window.location = 'chat.html'

        })
        .catch(console.warn)
}

const button = document.getElementById('google_sign_out');
button.addEventListener('click', googleSignOut)

function googleSignOut() {
    google.accounts.id.disableAutoSelect()
    google.accounts.id.revoke(window.localStorage.getItem('email'), done => {
        window.localStorage.clear();
        window.location.reload();

    })
}
