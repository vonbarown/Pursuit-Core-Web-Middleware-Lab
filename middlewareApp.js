document.addEventListener('DOMContentLoaded', () => {
    let checkAnimal = document.querySelector('#animalButton')
    checkAnimal.addEventListener('click', animalChecker)


    let randomButton = document.querySelector('#randomButton')
    randomButton.addEventListener('click', getRandomNum)

    let peek = document.querySelector('#peek')
    peek.addEventListener('click', peekInto)

    let enqueue = document.querySelector('#enqueueButton')
    enqueue.addEventListener('click', enqueueData)

    let dequeue = document.querySelector('#dequeueButton')
    dequeue.addEventListener('click', deQueueData)
})

const getSearchResultsDiv = () => document.querySelector('.searchResults')

const animalChecker = async () => {
    clearSearchResultsDiv()

    let animalInput = document.querySelector('#animalInput').value
    let url = `http://localhost:8080/animal/${animalInput}`

    const {
        data
    } = await axios.get(url)
    console.log(data);


    let container = getSearchResultsDiv()
    let status = document.createElement('p');
    let message = document.createElement('p');

    status.innerText = `Status: ${data.status}`;
    message.innerText = `Message: ${data.message}`;

    container.append(status, message)
}

const getRandomNum = async () => {
    clearSearchResultsDiv()
    let floor = document.querySelector('#floor').value;
    let ceil = document.querySelector('#ceil').value;


    let url = `http://localhost:8080/random?floor=${floor}&ceil=${ceil}`
    const {
        data
    } = await axios.get(url)
    console.log(data);


    let container = getSearchResultsDiv()
    let status = document.createElement('p');
    let range = document.createElement('p');
    let randNum = document.createElement('p');

    status.innerText = `Status: ${data.status}`;
    range.innerText = `Your range is: ${data.range}`;
    randNum.innerText = `The random number is: ${data.randPick}`;

    container.append(status, range, randNum)

    // while (container.firstChild) {
    //     container.removeChild(container.firstChild);
    // }
}

const peekInto = async () => {

    let name = document.querySelector('#inputName').value
    let enqueueUrl = `http://localhost:8080/queue/peek`

    const {
        data
    } = await axios.get(enqueueUrl);
    clearQueueData()

    let results = document.querySelector('.results')
    let status = document.createElement('p');
    let peekData = document.createElement('p');


    status.innerText = `Status: ${data.status}`;
    peekData.innerText = `The last element in your queue is: ${data.data}`;

    results.append(status, peekData)
}

const enqueueData = async () => {
    clearQueueData()
    let inputName = document.querySelector('#inputName').value
    let enqueueUrl = `http://localhost:8080/queue/enqueue?name=${inputName}`

    const {
        data
    } = await axios.get(enqueueUrl);

    let results = document.querySelector('.results')
    let status = document.createElement('p');
    let enqueued = document.createElement('p');
    status.innerText = `Status: ${data.status}`;
    enqueued.innerText = `The name that you added is: ${data.enqueued}`;

    results.append(status, enqueued)
}
const deQueueData = async () => {
    clearQueueData()
    let dequeueUrl = `http://localhost:8080/queue/dequeue`

    const {
        data
    } = await axios.get(dequeueUrl);


    let results = document.querySelector('.results')
    let status = document.createElement('p');
    let dequeuedData = document.createElement('p');


    status.innerText = `Status: ${data.status}`;
    dequeuedData.innerText = `The element removed is: ${data.dequeued}`;

    results.append(status, dequeuedData)
}

const clearQueueData = () => {
    let container = document.querySelector('.results');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

const clearSearchResultsDiv = () => {
    let container = getSearchResultsDiv()
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}