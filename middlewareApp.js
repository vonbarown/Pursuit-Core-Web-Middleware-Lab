document.addEventListener('DOMContentLoaded', () => {
    let checkAnimal = document.querySelector('#animalButton')
    checkAnimal.addEventListener('click', animalChecker)


    let randomButton = document.querySelector('#randomButton')
    randomButton.addEventListener('click', getRandomNum)

    let peek = document.querySelector('#peek')
    peek.addEventListener('click', getRandomNum)
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
    let randomResults = document.querySelector('.randomResults')
    let status = document.createElement('p');
    let range = document.createElement('p');
    let randNum = document.createElement('p');

    status.innerText = `Status: ${data.status}`;
    range.innerText = `Your range is: ${data.range}`;
    randNum.innerText = `The random number is: ${data.randPick}`;

    randomResults.append(status, range, randPick)
}

const peek = async () => {

    let queueButton = document.querySelector('#queueInput').value
    let name = document.querySelector('#inputName').value
    let enqueueUrl = `http://localhost:8080/queue/peek`

    const {
        data
    } = await axios.get(enqueueUrl);
    clearScreen()

    let results = document.querySelector('.results')
    let status = document.createElement('p');
    let peekData = document.createElement('p');


    status.innerText = `Status: ${data.status}`;
    peekData.innerText = `Your range is: ${data.data}`;

    results.append(status, peekData)
}

const enqueue = async () => {

    let name = document.querySelector('#inputName').value
    let enqueueUrl = `http://localhost:8080/queue/ls?name=${name}`

    const {
        data
    } = await axios.get(enqueueUrl);
    clearScreen()

    let results = document.querySelector('.results')
    let status = document.createElement('p');
    let enqueued = document.createElement('p');


    status.innerText = `Status: ${data.status}`;
    enqueued.innerText = `Your range is: ${data.enqueued}`;

    results.append(status, enqueued)
}

const clearScreen = () => {
    let container = document.querySelector('.searchResults');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}