function attachEvents() {
    const elements = {
        person() { return document.querySelector('input#person') },
        phone() { return document.querySelector('input#phone') },
        createContact() { return document.querySelector('button#btnCreate') },
        loadContacts() { return document.querySelector('button#btnLoad') },
        phoneBook() { return document.querySelector('ul#phonebook')}
    };
    
    let contacts = [];

    const baseUrl = 'http://localhost:3000/contacts';

    elements.createContact().addEventListener('click', () => {

        const { value: person } = elements.person();
        const { value: phone } = elements.phone();

        fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify({ person, phone })
        })
            .then((response) => response.json())
            .then((response) => 
                contacts.push(response));
                elements.person().value = '';
                elements.phone().value = '';
    });

    elements.loadContacts().addEventListener('click', () => {
        elements.phoneBook().innerHTML = '';
        contacts.forEach((contact) => {
            let listItem = document.createElement('li');
            const key = Object.keys(contact)[0];
            console.log(key);            
            listItem.textContent = `${contact[key].person} - ${contact[key].phone}`;
            elements.phoneBook().appendChild(listItem);
        });
    })
}

attachEvents();