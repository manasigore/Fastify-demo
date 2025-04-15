let items = require('../Items')
const {v4:uuid4} = require('uuid')

const getItems = (req, res) => {
    res.send(items)
}

const getItem = (req, res) => {
    const { id } = req.params
    const item = items.find(item => item.id === parseInt(id))
    res.send(item)
}

const addItem = (req, res) => {
    const {name, description} = req.body

    const item = {
        id: uuid4(),
        name,
        description
    }
    items = [...items, item]

    res.code(201).send(item)
}

const deleteItem = (req, res) => {
    const { id } = req.params
    items = items.filter(item => item.id !== id)
    res.code(200).send({ message: `Item ${id} has been deleted.` })
}

const updateItem = (req, res) => {
    const { id } = req.params

    const { name, description } = req.body

    items = items.map(item => {
        if (item.id === id) {
            return {
                ...item,
                name,
                description
            }
        }
        return item
    })
    const item = items.find(item => item.id === id)
    res.code(200).send(item)
}

module.exports = {
    getItems,
    getItem,
    addItem,
    deleteItem,
    updateItem
}
