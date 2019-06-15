const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()

    // if (!checkIfTitletaken(notes, title)) {
    if (!checkIfTitleTakenFilter(notes, title)) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.info(chalk.green.inverse('New Note added!'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        const data = JSON.parse(dataJson)
        return data
    } catch (error) {
        return []
    }
}

const saveNotes = notes => {
    try {
        const dataJson = JSON.stringify(notes)
        fs.writeFileSync('notes.json', dataJson)
    } catch (error) {
        console.error(chalk.red.inverse('Error while saving note!'))
    }
}

const checkIfTitletaken = (notes, title) => {
    try {
        notes.forEach(element => {
            if (element.title === title)
                throw new Error(chalk.red.inverse('Note title taken!'))
        });
        return false
    } catch (error) {
        console.error(chalk.red.inverse(error.toString()))
        return true
    }
}

const checkIfTitleTakenFilter = (notes, title) => {
    // const duplicateNotes = notes.filter(note => note.title === title)
    // if (duplicateNotes.length > 0) {
    //     console.error(chalk.red.inverse('Note title taken!'))
    //     return true
    // } else {
    //     return false
    // }

    // More efficient than above code
    const duplicateNote = notes.find(note => note.title === title)
    if (duplicateNote) {
        console.error(chalk.red.inverse('Note title taken!'))
        return true
    } else {
        return false
    }
}

const removeNote = title => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title !== title)

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.info(chalk.green.inverse('Note deleted: ', title))
    } else {
        console.error(chalk.red.inverse(`Note title doesn't exist`))
    }

    // if (checkIfNoteExist) {
    //     const notesToKeep = notes.filter(note => note.title !== title)
    //     saveNotes(notesToKeep)
    //     console.info('Note deleted: ', title)
    // }
}

const checkIfNoteExist = (notes, title) => {
    const note = notes.filter(note => note.title === title)
    console.log(note.length)
    if (note.length > 0) {
        return true
    } else {
        console.error(`Note title doesn't exist`)
        return false
    }
}

const listNotes = () => {
    const notes = loadNotes()

    if (notes.length) {
        console.log(chalk.blue('Your Notes:'))
        notes.forEach(note => console.log(note.title))
    } else {
        console.error(chalk.red.inverse('No notes found!'))
    }
}

const readNote = title => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)

    if (note) {
        console.log(chalk.blue('Note Found: ', JSON.stringify(note)))
    } else {
        console.log(chalk.red.inverse(`Note doesn't exist`))
    }

}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}