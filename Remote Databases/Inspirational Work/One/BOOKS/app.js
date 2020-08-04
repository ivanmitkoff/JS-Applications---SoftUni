import { FetchData, getUrl } from './data.js';
import { elements } from './dom.js';
import { Methods } from './Functions/functions.js';

(function () {
    const methods = new Methods();
    class Values {
        constructor(title, author, isnb) {
            this.title = title;
            this.author = author;
            this.isnb = isnb;
        }
    }
    const btn = {
        'LOAD ALL BOOKS': () => loadBooks(),
        Submit: () => addNewBook(),
    };
    document.body.addEventListener('click', function (e) {
        e.preventDefault();
        if (typeof btn[e.target.textContent] === 'function') {
            btn[e.target.textContent](e.target);
        }
    });
    function addNewBook() {
        const values = methods.getValues(elements.form());
        if (values.length !== methods.validateInput(values)) {
            return;
        }
        new FetchData(getUrl)
            .postData(new Values(...values))
            .then(methods.inputHandler)
            .catch(methods.inputHandler);

        setTimeout(function () {
            methods.clearInput(elements.form());
        }, 1000);
    }
    function loadBooks() {
        new FetchData(getUrl)
            .getData()
            .then((data) => {
                elements.tableBody().innerHTML = '';
                Object.values(data)
                    .sort((a, b) => a.author.localeCompare(b.author))
                    .forEach(renderPage);
            })
            .catch((e) => alert(e));
    }
    function renderPage(x) {
        const delBtn = createEl('button', 'Delete');
        const editBtn = createEl('button', 'Edit');
        elements.tableBody().appendChild(methods.newElements(createEl, x, delBtn, editBtn));

        delBtn.addEventListener('click', function (e) {
            alert('The Book has been successfully deleted!');
            new FetchData(getUrl.bind(this, `/${x.objectId}`)).deleteData();
            methods.getParent(delBtn).remove();
        });
        editBtn.addEventListener('click', function (e) {
            const saveBtn = createEl('button', 'Save');
            const cancelBtn = createEl('button', 'Cancel');
            const tittle = createEl('input', '', ['value', `${x.title}`]);
            const author = createEl('input', '', ['value', `${x.author}`]);
            const id = createEl('input', '', ['value', `${x.isnb}`]);
            const newInputFields = createEl('tr', [
                createEl('td', [tittle]),
                createEl('td', [author]),
                createEl('td', [id]),
                createEl('td', [saveBtn, cancelBtn]),
            ]);
            methods.getParent(editBtn).parentNode.replaceChild(newInputFields, methods.getParent(editBtn));

            saveBtn.addEventListener('click', function (e) {
                new FetchData(getUrl.bind(this, `/${x.objectId}`))
                    .updateData(new Values(tittle.value, author.value, id.value))
                    .then((x) => {
                        alert('Book successfully updated!');
                        loadBooks();
                    })
                    .catch((x) => alert('Operation failed'));
            });
            cancelBtn.addEventListener('click', function (e) {
                loadBooks();
            });
        });
    }
    function createEl(type, content, attribute) {
        const e = document.createElement(type);
        if (attribute !== undefined) {
            e.setAttribute(attribute[0], attribute[1]);
        }
        Array.isArray(content) ? content.forEach(appendEl) : appendEl(content);
        function appendEl(node) {
            if (typeof node === 'string') {
                node = document.createTextNode(node);
            }
            e.appendChild(node);
        }
        return e;
    }
})();
