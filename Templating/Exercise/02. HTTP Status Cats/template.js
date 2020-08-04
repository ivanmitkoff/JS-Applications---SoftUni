(async () => {
    const catTemplate = await fetch('./templates/cat-template.hbs');
    const catTemplateString = await catTemplate.text();

    const catsListTemplate = await fetch('./templates/cat-list-template.hbs');
    const catsListTemplateString = await catsListTemplate.text();

    Handlebars.registerPartial('cat', catTemplateString);
    
    const htmlTemplate = Handlebars.compile(catsListTemplateString);

    renderCatTemplate();

    function renderCatTemplate() {
        const allCats = document.getElementById('allCats');
        allCats.innerHTML = htmlTemplate({ cats });

        allCats.addEventListener('click', (e) => {
        
            if (e.target.tagName !== 'BUTTON') {
                return;
            }

            const statusDiv = e.target.parentNode.querySelector('.status');

            if (statusDiv.style.display === 'none') {
                statusDiv.style.display = '';
                e.target.textContent = 'Hide status code';
            } else {
                statusDiv.style.display = 'none';
                e.target.textContent = 'Show status code';
            }
        });
    }
})();