const db = require('./db')

const resolver = {
    Query: {
        getTodo: (_, args) => {
            return db.getTable("todosTable").getRecordById(args.id).then(todo => {
                return todo.Item
            }).catch(err => null);
        },
        getTodos: (_, args) => {
            return  db.getTable("todosTable").getRecords({}).then(data => {
                return data.Items
            }).catch(err => null);
        }
    },
    Mutation: {
        createTodo: (_, args) => {
            return db.getTable("todosTable")
            .insertRecord({
                text: args.text,
                completed: false
            })
            .then(todo => todo)
            .catch(err => {
                throw err;
            })
        },
        deleteTodo: (_, args) => {
            return db.getTable("todosTable")
                .deleteRecordById(args.id)
                .then(data => true)
                .catch(err => false);
        },
        updateTodo: (_, args) => {
            const new_data = {
                text: args.text 
            }
            if ('completed' in args) {
                new_data["completed"] = args.completed
            }
            return db.getTable("todosTable")
                .updateRecordById(args.id, new_data)
                .then(data => data.Attributes)
                .catch(err => null);
        }
    }
}

module.exports = resolver;
