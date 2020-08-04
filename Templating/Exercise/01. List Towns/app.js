window.addEventListener('load', async () => {
    const stringTemplate = await (await fetch ('./templates/main-template.hbs')).text();
    Handlebars.registerPartial('town', await (await fetch('./templates/towns-template.hbs')).text());

    const functionTemplate = Handlebars.compile(stringTemplate);

    document.querySelector('#btnLoadTowns').addEventListener('click', generateTownsUl);
    const townsInput = document.querySelector('#towns');
    const root = document.querySelector('#root');

    function generateTownsUl(e) {
        e.preventDefault();

        const townsArr = townsInput.value.split(', ');

        const generatedTownsHTML = functionTemplate({ townsArr });

        root.innerHTML = generatedTownsHTML;

    }
});