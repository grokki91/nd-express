const getCounter = (id) => {
    try {
        fetch(`http://127.0.0.1:3001/counter/${id}`)
            .then(response => response.json())
            .then(response => response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = getCounter