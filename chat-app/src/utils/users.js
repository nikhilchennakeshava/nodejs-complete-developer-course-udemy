const users = []

// addUser
const addUser = ({ id, username, room }) => {
    // clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // check for existing user
    const existingUser = users.find(user => user.room === room && user.username === username)

    // validate username
    if (existingUser) {
        return {
            error: 'Username already taken!'
        }
    }

    // store user
    const user = { id, username, room }
    users.push(user)

    // return stored user
    return { user }
}

// removeUser
const removeUser = (id) => {
    // find index
    const index = users.findIndex(user => user.id === id)

    // if index === -1 then no match
    // return the user removed
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// getUser
const getUser = (id) => {
    return users.find(user => user.id === id)
}

// getUsersInroom
const getUsersInroom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter(user => user.room === room)
}

// get all rooms
const getAllRooms = () => {
    return [...new Set(users.filter(user => user.room))]
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInroom,
    getAllRooms
}