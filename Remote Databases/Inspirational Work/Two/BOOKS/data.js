let id = 'CB1692EE-947A-0B51-FF1E-C908D8530100';
let key = '59B71E5C-AF9C-4219-B402-B8051FFAD223';

function table(point) {
    return `https://api.backendless.com/${id}/${key}/data/${point}`;
}

export async function getBooks() {
    const response = await fetch(table('books'));
    const data = await response.json();

    return data;
}

export async function createBook(book) {

    const response = await fetch(table('books'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });

    const data = await response.json();

    return data;
}

const currentBook = {
    title: ``,
    author: ``,
    isbn: ``
};

export function getCurrentBookInfo(title, author, isbn) {
    currentBook.title = title;
    currentBook.author = author;
    currentBook.isbn = isbn;
}

export async function updateBook(e) {
    const response = await fetch(table('books'));
    const data = await response.json();
    
    const book = data.find(element => {
        if (element.title === currentBook.title && element.author === currentBook.author && element.isbn === currentBook.isbn) {
            return element;
        }
    });

    const newBook = {
        title: e.target.parentElement.parentElement.childNodes[0].childNodes[0].value,
        author: e.target.parentElement.parentElement.childNodes[1].childNodes[0].value,
        isbn: e.target.parentElement.parentElement.childNodes[2].childNodes[0].value,
        target: e.target
    }

    const newResponse = await fetch(table(`books/${book.objectId}`), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newBook.title, author: newBook.author, isbn: newBook.isbn})
    })

    return (newBook);
}

export async function deleteBook(data) {
    const response = await fetch(table('books'));
    const rdata = await response.json();
    
    const book = rdata.find(element => {
        if (element.title === data.title && element.author === data.author && element.isbn === data.isbn) {
            return element;
        }
    });

    const newResponse = await fetch(table(`books/${book.objectId}`), {
        method: 'DELETE',
    })
}

