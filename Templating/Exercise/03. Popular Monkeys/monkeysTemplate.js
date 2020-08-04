(async () => {
    const monkeyTemplate = await fetch('./templates/monkey-template.hbs');
    const monkeyTemplateString = await monkeyTemplate.text();

    const monkeyListTemplate = await fetch('./templates/monkey-list-template.hbs');
    const monkeyListTemplateString = await monkeyListTemplate.text();

    Handlebars.registerPartial('monkey', monkeyTemplateString);
    const htmlTemplate = Handlebars.compile(monkeyListTemplateString);

    const section = document.querySelector('section');

    section.innerHTML = htmlTemplate({ monkeys });

    section.addEventListener('click', (e) => {
        const target = e.target;

        if (target.tagName !== 'BUTTON') {
            return;
        }

        const paragraph = target.parentNode.querySelector('p');

        if (paragraph.style.display === 'none') {
            paragraph.style.display = '';
        } else {
            paragraph.style.display = 'none';
        }

    });
})();