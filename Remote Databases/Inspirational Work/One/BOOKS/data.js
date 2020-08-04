export class FetchData {
    constructor(url) {
        this.url = url;
    }
    getData() {
        return fetch(this.url()).then((x) => x.json());
    }
    postData(data) {
        return fetch(this.url(), {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data),
        });
    }
    updateData(data) {
        return fetch(this.url(), {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data),
        });
    }
    deleteData() {
        fetch(this.url(), {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
        });
    }
}
export function getUrl(id = '') {
    return `https://api.backendless.com/B0437257-8242-29C9-FF6E-2870E264F600/8C223125-B3FF-4DD5-8663-02512E50F24C/data/books${id}`;
}
