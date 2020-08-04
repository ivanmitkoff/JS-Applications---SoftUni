const appId = 'FF2305E0-4465-B594-FFEF-31B1ADB49000';
const restAPIKey = '1DB3B929-925D-4A23-BFDC-F99338510140';
const token = localStorage.getItem('userToken');
const userId = localStorage.getItem('userId');

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies/'
};

function host(endpoint) {
    return `https://api.backendless.com/${appId}/${restAPIKey}/${endpoint}`;
}

async function register(username, password) {
    const result = await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    return result;
}

async function login(username, password) {
    return (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();
}

function logout() {
    return fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });
}

//Cinema - View all movies
async function getMovies() {
    return (await fetch(host(endpoints.MOVIES), {
        headers: {
            'user-token': token
        }
    })).json();
}

//Movie Details - Get movie by ID
async function getMovieById(id) {
    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json();
}

//Create a movie
async function createMovie(movie) {
    return (await fetch(host(endpoints.MOVIES), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();
}

//Edit a movie
async function updateMovie(id, updatedProps) {
    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();
}

//Delete a movie
async function deleteMovie(id) {
    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();
}

//Get movies by user ID
async function getMovieByOwner(ownerId) {
    return (await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();
}

//Buy a ticket
async function buyTicket(movieId) {

    const newTickets = movie.tickets - 1;
    const movieId = movie.objectId;

    return updateMovie(movieId, {tickets: newTickets});

}
