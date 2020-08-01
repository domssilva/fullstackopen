import axios from 'axios'

const server = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(server)
    return req.then(response => response.data)
}

const create = (newPerson) => {
    const req = axios.post(server, newPerson)
    return req.then(response => response.data)
}

const update = (id, newObject) => {
    const req = axios.put(`${server}/${id}`, newObject)
    return req.then(response => response.data)
}

const remove = (id) => {
    const req = axios.delete(`${server}/${id}`)
    return req.then(response => {
        return response.data
    })
}

export default {
    getAll,
    create,
    remove,
    update,
}