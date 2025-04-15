const {getItems, getItem, addItem, deleteItem, updateItem } = require('../controllers/items')

const ITEM = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' }
    }
}

const getItemsOpts = {
    schema: {
        operationId: 'getItems',
        summary: 'Get all items',
        tags: ['items'],
        response: {
            200: {
                description: 'Successful response',
                type: 'array',
                items: ITEM
            }
        }
    },
    handler: getItems
}

const getItemOpts = {
    schema: {
        operationId: 'getItem',
        summary: 'Get a single item by id',
        tags: ['items'],
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: {
                    type: 'number',
                    description: 'Item id'
                }
            }
        },
        response: {
            200: {
                description: 'Successful response',
                ...ITEM
            }
        }
    },
    handler: getItem
}

const postItemOpts = {
    schema: {
        operationId: 'addItem',
        summary: 'Add an item',
        tags: ['items'],
        body: {
            type: 'object',
            required: ['name', 'description'],
            properties: {
                name: { type: 'string' },
                description: { type: 'string' }
            }
        },
        response: {
            201: {
                description: 'Item created',
                ...ITEM
            }
        }
    },
    handler: addItem
}

const deleteItemOpts = {
    schema: {
        operationId: 'deleteItem',
        summary: 'Delete an item',
        tags: ['items'],
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: { type: 'string' }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        }
    },
    handler: deleteItem
}

const updateItemOpts = {
    schema: {
        operationId: 'updateItem',
        summary: 'Update an item',
        tags: ['items'],
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: { type: 'string' }
            }
        },
        body: {
            type: 'object',
            required: ['name', 'description'],
            properties: {
                name: { type: 'string' },
                description: { type: 'string' }
            }
        },
        response: {
            200: {
                description: 'Item updated',
                ...ITEM
            }
        }
    },
    handler: updateItem
}
function itemRoutes (fastify, options, done) {
    // get all items
    fastify.get('/items', getItemsOpts)

    // get item by id
    fastify.get('/items/:id', getItemOpts)

    // add an item
    fastify.post('/items', postItemOpts)

    // delete an item
    fastify.delete('/items/:id', deleteItemOpts)

    // update an item
    fastify.put('/items/:id', updateItemOpts)

  done()
}

module.exports = itemRoutes
