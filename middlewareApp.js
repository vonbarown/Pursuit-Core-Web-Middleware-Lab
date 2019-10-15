document.addEventListener('DOMContentLoaded', () => {
    let checkAnimal = document.querySelector('#animalButton')
    checkAnimal.addEventListener('click', animalChecker)


    let randomButton = document.querySelector('#randomButton')
    randomButton.addEventListener('click', getRandomNum)
})


const animalChecker = async () => {
    let animalInput = document.querySelector('#animalInput').value
    let url = `http://localhost:8080/animal/${animalInput}`

    const {
        data
    } = await axios.get(url)
    console.log(data);

    clearScreen()
    let searchResults = document.querySelector('.searchResults')
    let status = document.createElement('p');
    let message = document.createElement('p');

    status.innerText = `Status: ${data.status}`;
    message.innerText = `Message: ${data.message}`;

    searchResults.append(status, message)
}

const getRandomNum = async () => {
    let floor = document.querySelector('#floor').value;
    let ceil = document.querySelector('#ceil').value;


    let url = `http://localhost:8080/random?floor=${floor}&ceil=${ceil}`
    const {
        data
    } = await axios.get(url)
    console.log(data);

    clearScreen()
    let searchResults = document.querySelector('.searchResults')
    let status = document.createElement('p');
    let message = document.createElement('p');

    status.innerText = `Status: ${data.status}`;
    message.innerText = `Message: ${data.message}`;

    searchResults.append(status, message)
}

// const displayToScreen = (data) => {
//     clearScreen()
//     let searchResults = document.querySelector('.searchResults')
//     let status = document.createElement('p');
//     let message = document.createElement('p');

//     status.innerText = `Status: ${data.status}`;
//     message.innerText = `Message: ${data.message}`;

//     searchResults.append(status, message)
// }

const clearScreen = () => {
    let container = document.querySelector('.searchResults');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}