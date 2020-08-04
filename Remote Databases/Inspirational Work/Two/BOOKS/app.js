import * as api from './data.js';

//Went a long way to implement the "Update" function
//All things considered, its most likely not the most optimall way
//So please dont criticize it too much ^_^ :D. Thank you!

window.addEventListener('load', () => {

    const loadBooks = document.querySelector('#loadBooks');
    loadBooks.addEventListener('click', showBooks);

    const submitBook = document.querySelector('form > button');
    submitBook.addEventListener('click', newBook);

    function createBookElement(data) {
        const tableRow = document.createElement('tr');

        const title = document.createElement('td');
        title.textContent = data.title;

        const author = document.createElement('td');
        author.textContent = data.author;

        const isbn = document.createElement('td');
        isbn.textContent = data.isbn;

        const buttonTD = document.createElement('td');

        const editBTN = document.createElement('button');
        editBTN.textContent = 'Edit';
        editBTN.addEventListener('click', editBook);

        const deleteBTN = document.createElement('button');
        deleteBTN.textContent = 'Delete';
        deleteBTN.addEventListener('click', removeBook);

        buttonTD.appendChild(editBTN);
        buttonTD.appendChild(deleteBTN);

        tableRow.appendChild(title);
        tableRow.appendChild(author);
        tableRow.appendChild(isbn);
        tableRow.appendChild(buttonTD);

        return tableRow;
    }

    async function showBooks() {

        const table = document.querySelector('table > tbody');
        table.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';
        const allBooks = await api.getBooks();
        table.innerHTML = '';

        allBooks.forEach(book => {
            const currentBook = createBookElement(book);

            table.appendChild(currentBook);
        })

    }

    async function newBook(e) {
        e.preventDefault();

        const title = document.querySelector('#title');
        const author = document.querySelector('#author');
        const isbn = document.querySelector('#isbn');

        const book = {
            title: title.value,
            author: author.value,
            isbn: isbn.value
        }

        const newBook = await api.createBook(book);

        document.querySelector('table > tbody').appendChild(createBookElement(book));
        title.value = ''; author.value = ''; isbn.value = '';
    }

    async function editBook(e) {
        const currentBookNode = e.target.parentNode.parentNode;

        const [currentTitle, currentAuthor, currentIsbn, currentButtons] = currentBookNode.childNodes;

        api.getCurrentBookInfo(currentTitle.textContent, currentAuthor.textContent, currentIsbn.textContent);

        const titleEdit = document.createElement('td');
        titleEdit.innerHTML = `<input type="text" value="${currentBookNode.childNodes[0].textContent}">`;

        const authorEdit = document.createElement('td');
        authorEdit.innerHTML = `<input type="text" value="${currentBookNode.childNodes[1].textContent}">`;

        const isbnEdit = document.createElement('td');
        isbnEdit.innerHTML = `<input type="text" value="${currentBookNode.childNodes[2].textContent}">`;

        const editButtons = document.createElement('td');

        const updateBTN = document.createElement('button');
        updateBTN.textContent = 'Update';
        updateBTN.addEventListener('click', afterUpdateElement);

        const cancelBTN = document.createElement('button');
        cancelBTN.textContent = 'Cancel';
        cancelBTN.addEventListener('click', cancelUpdate);

        editButtons.appendChild(updateBTN); editButtons.appendChild(cancelBTN);

        currentBookNode.innerHTML = '';

        currentBookNode.appendChild(titleEdit); currentBookNode.appendChild(authorEdit);
        currentBookNode.appendChild(isbnEdit); currentBookNode.appendChild(editButtons);

        function cancelUpdate() {
            currentBookNode.innerHTML = '';
            currentBookNode.appendChild(currentTitle); currentBookNode.appendChild(currentAuthor)
            currentBookNode.appendChild(currentIsbn); currentBookNode.appendChild(currentButtons);
        }
    }

    async function afterUpdateElement(е) {
        const newBook = await api.updateBook(е);

        const currentRow = newBook.target.parentElement.parentElement;
        currentRow.innerHTML = '';
        
        const title = document.createElement('td');
        title.textContent = newBook.title;

        const author = document.createElement('td');
        author.textContent = newBook.author;

        const isbn = document.createElement('td');
        isbn.textContent = newBook.isbn;

        const buttonTD = document.createElement('td');

        const editBTN = document.createElement('button');
        editBTN.textContent = 'Edit';
        editBTN.addEventListener('click', editBook);

        const deleteBTN = document.createElement('button');
        deleteBTN.textContent = 'Delete';
        deleteBTN.addEventListener('click', removeBook);

        buttonTD.appendChild(editBTN);
        buttonTD.appendChild(deleteBTN);

        currentRow.appendChild(title);
        currentRow.appendChild(author);
        currentRow.appendChild(isbn);
        currentRow.appendChild(buttonTD);
    }

    async function removeBook(d) {
        const currentBook = {
            title: d.target.parentNode.parentNode.childNodes[0].textContent,
            author: d.target.parentNode.parentNode.childNodes[1].textContent,
            isbn: d.target.parentNode.parentNode.childNodes[2].textContent
        }
        
        await api.deleteBook(currentBook);

        d.target.parentNode.parentNode.remove();
    }
});