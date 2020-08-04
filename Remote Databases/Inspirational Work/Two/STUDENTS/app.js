import * as api from './data.js';

window.addEventListener('load', () => {
    const newStudentBTN = document.querySelector('.newStudent');
    newStudentBTN.addEventListener('click', newStudent);

    const loadAllStudentsBTN = document.querySelector('.allStudents');
    loadAllStudentsBTN.addEventListener('click', loadAllStudents);

    const tableBody = document.querySelector('tbody');

    async function newStudent(e) {
        const userInput = {
            id: Number(document.querySelector('.id').value),
            firstName: document.querySelector('.firstName').value,
            lastName: document.querySelector('.lastName').value,
            facultyNumber: document.querySelector('.facultyNumber').value,
            grade: Number(document.querySelector('.grade').value)
        }

        const student = await api.createNewStudent(userInput);

        tableBody.append(await createTableElement(student));

        document.querySelector('.id').value = '';
        document.querySelector('.firstName').value = '';
        document.querySelector('.lastName').value = '';
        document.querySelector('.facultyNumber').value = '';
        document.querySelector('.grade').value = '';

        return student;
    }

    async function loadAllStudents(e) {
        const studentList = await api.getAllStudents();

        const sortedList = studentList.sort((a, b) => {
            return a.id - b.id;
        })

        for (let student of sortedList) {
            tableBody.append(await createTableElement(student));
        }
    }

    async function createTableElement(studentData) {
        const mainROW = document.createElement('tr');

        const id = document.createElement('td');
        id.textContent = studentData.id;

        const firstName = document.createElement('td');
        firstName.textContent = studentData.firstName;

        const lastName = document.createElement('td');
        lastName.textContent = studentData.lastName;

        const facultyNumber = document.createElement('td');
        facultyNumber.textContent = studentData.facultyNumber;

        const grade = document.createElement('td');
        grade.textContent = studentData.grade;

        mainROW.appendChild(id);
        mainROW.appendChild(firstName);
        mainROW.appendChild(lastName);
        mainROW.appendChild(facultyNumber);
        mainROW.appendChild(grade);

        return mainROW;
    }
})