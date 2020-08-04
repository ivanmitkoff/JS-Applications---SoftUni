//Function to logout as many users as we want
//Since it was requested on a sepparate file, we have to log in the user first and then log him out
//Additionally an empty response is returned from the Backendless server, so the function doesnt return anything

import login from './Login.js';

async function logout(email, password) {
    const url = 'https://api.backendless.com/CB1692EE-947A-0B51-FF1E-C908D8530100/59B71E5C-AF9C-4219-B402-B8051FFAD223/users/logout';

    const user = await login(email, password);
    const token = user['user-token'];

    await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
    });
    
    return console.log('Successfully logged out!');
}

logout();