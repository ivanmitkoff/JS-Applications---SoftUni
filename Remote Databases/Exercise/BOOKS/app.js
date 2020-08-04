const load = document.querySelector('#loadBooks');
const table = document.querySelector('tbody');
const URL = 'https://api.backendless.com/4229B568-2E3F-C9A8-FF84-86BEA0A6D900/CBBD887A-327F-436C-9B0B-6F48E52CF24E/data/books';

load.addEventListener('click', getBookHandler)

const form = document.querySelector('form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const isbn = document.querySelector('#isbn');

form.addEventListener('click', addBook);

async function getBookHandler(e) {
    table.textContent = '';
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            data.forEach(book => {
                let tr = document.createElement('tr');
                let tdTitle = document.createElement('td');
                tdTitle.textContent = book.title;
                tr.appendChild(tdTitle);
                let tdAuthor = document.createElement('td');
                tdAuthor.textContent = book.author;
                tr.appendChild(tdAuthor);
                let tdISBN = document.createElement('td');
                tdISBN.textContent = book.isbn;
                tr.appendChild(tdISBN);

                let tdButtons = document.createElement('td');
                let buttonEdit = document.createElement('button');
                buttonEdit.textContent = 'Edit';
                buttonEdit.id = book.objectId;
                let buttonDelete = document.createElement('button');
                buttonDelete.textContent = 'Delete';
                buttonDelete.id = book.objectId;
                tdButtons.appendChild(buttonEdit);
                tdButtons.appendChild(buttonDelete);
                buttonEdit.addEventListener('click', editBookHandler);
                buttonDelete.addEventListener('click', deleteBookHandler);
                tr.appendChild(tdButtons);
                table.appendChild(tr);
            });
        })


}

async function addBook(e) {
    e.preventDefault();

    if (e.target.textContent === 'Submit') {
        if (title.value === '' || isbn.value === '' || author.value === '') {
            alert('Please fill in all input fields');
            return;
        }
        let newBook = {
            "title": title.value,
            "isbn": isbn.value,
            "author": author.value
        }
        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
        })
        title.value = '';
        isbn.value = '';
        author.value = '';
        getBookHandler();
    }
    if (e.target.textContent === 'Edit') {
        if (title.value === '' || isbn.value === '' || author.value === '') {
            alert('Please fill in all input fields');
            return;
        }
        let editBook = {
            "title": title.value,
            "isbn": isbn.value,
            "author": author.value
        }
        await fetch(URL + '/' + e.target.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editBook),
        })
        title.value = '';
        isbn.value = '';
        author.value = '';
        getBookHandler();
        form.querySelector('button').textContent = 'Submit';
        form.querySelector('button').removeAttribute('id');
    }

}

async function editBookHandler(e) {
    let id = e.target.id;
    await fetch(URL + '/' + id)
        .then(response => response.json())
        .then(data => {
            title.value = data.title;
            author.value = data.author;
            isbn.value = data.isbn;
            form.querySelector('button').textContent = 'Edit';
            form.querySelector('button').id = data.objectId;
        })

}

async function deleteBookHandler(e) {
    let id = e.target.id;

    await fetch(URL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    getBookHandler();
}