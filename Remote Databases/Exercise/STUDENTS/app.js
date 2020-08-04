let tbody = document.querySelector('tbody');
let form = document.querySelector('form');
let add = form.querySelector('button');
let id = document.querySelector('#id');
let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let number = document.querySelector('#facultyNumber');
let grade = document.querySelector('#grade');

const URL = 'https://api.backendless.com/4229B568-2E3F-C9A8-FF84-86BEA0A6D900/CBBD887A-327F-436C-9B0B-6F48E52CF24E/data/students'
add.addEventListener('click', addHandler)
load();

function load() {
    tbody.textContent = '';
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => a.ID - b.ID).forEach(student => {
                console.log(student);

                let tr = document.createElement('tr');
                let tdId = document.createElement('td');
                tdId.textContent = student.ID;
                let tdFirstName = document.createElement('td');
                tdFirstName.textContent = student.FirstName
                let tdLastName = document.createElement('td');
                tdLastName.textContent = student.LastName;
                let tdNumber = document.createElement('td');
                tdNumber.textContent = student.FacultyNumber;
                let tdGrade = document.createElement('td');
                tdGrade.textContent = student.Grade;

                tr.appendChild(tdId);
                tr.appendChild(tdFirstName);
                tr.appendChild(tdLastName);
                tr.appendChild(tdNumber);
                tr.appendChild(tdGrade);
                tbody.appendChild(tr);

            });


        })
}

async function addHandler(e) {
    e.preventDefault();
    try {
        let newStudent = {
            "ID": Number(id.value),
            "FirstName": firstName.value,
            "LastName": lastName.value,
            "FacultyNumber": number.value,
            "Grade": Number(grade.value)
        };
        console.log(newStudent);


        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStudent),
        })
        id.value = '';
        firstName.value = '';
        lastName.value = '';
        number.value = '';
        grade.value = '';
        load();
    } catch (err) {
        console.error(err);

    }
}