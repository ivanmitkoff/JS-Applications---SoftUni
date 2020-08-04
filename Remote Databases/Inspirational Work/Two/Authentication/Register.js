//Function to register as many users as we want

async function register(email, password) {
    const url = 'https://api.backendless.com/CB1692EE-947A-0B51-FF1E-C908D8530100/59B71E5C-AF9C-4219-B402-B8051FFAD223/users/register';

    const userInput = {
        email: email,
        password: password
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
    });

    const data = await response.json();

    return (data);
}