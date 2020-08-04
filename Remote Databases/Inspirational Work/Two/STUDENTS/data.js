const dataBaseUrl = `https://api.backendless.com/CB1692EE-947A-0B51-FF1E-C908D8530100/59B71E5C-AF9C-4219-B402-B8051FFAD223/data/students`;

export async function getAllStudents() {
    const response = await fetch(dataBaseUrl);
    const data = await response.json();

    return data;
}

export async function createNewStudent(studentObj) {
    const response = await fetch(dataBaseUrl, {
        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(studentObj)
    })

    const data = await response.json();

    return data;
}