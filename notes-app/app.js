const yargs = require('yargs')
const notes = require('./notes')

yargs.command({ // Add command
        command: 'add',
        describe: 'Adds a new note',
        aliases: ['insert', 'a', 'i'],
        builder: {
            title: {
                describe: 'Note title',
                alias: 't',
                demandOption: true,
                type: 'string'
            },
            body: {
                describe: 'Note body',
                alias: 'b',
                demandOption: true,
                type: 'string'
            }
        },
        handler: argv => notes.addNote(argv.title, argv.body)
    })
    .command({ // Remove command
        command: 'remove',
        describe: 'Removes a note',
        aliases: ['delete', 'd', 'r'],
        builder: {
            title: {
                describe: 'Note title',
                alias: 't',
                demandOption: true,
                type: 'string'
            }
        },
        handler: argv => notes.removeNote(argv.title)
    })
    .command({ // Read command
        command: 'read',
        describe: 'Reads the note',
        builder: {
            title: {
                describe: 'Note title',
                alias: 't',
                demandOption: true,
                type: 'string'
            }
        },
        handler: argv => notes.readNote(argv.title)
    })
    .command({ // List command
        command: 'list',
        describe: 'Lists all notes',
        aliases: ['l', 'display'],
        handler: () => notes.listNotes()
    })
    .demandCommand()
    .help()
    .parse()



// ====================================================================================


// Lecture 9:
// const fs = require('fs')

// fs.appendFileSync('notes.txt', 'hello world!!')

// ============================================

// Lecture 10:
// import util from './utils'
// const name = 'Nikhil'

// const util = require('./utils')
// const notes = require('./notes')

// console.log(util.add(1, 4))

// console.log(notes.getNotes())

// const validator = require('validator')
// console.log(validator.isEmail('hello@example.com'))


// const notes = require('./notes')
// const chalk = require('chalk')

// console.log(notes.getNotes())
// console.log(chalk.blue.inverse.bold('hello from chalk'))

// console.log('hello ', process.argv[2])

// const notes = require('./notes')
// const chalk = require('chalk')
// const yargs = require('yargs')

// const command = process.argv[2]
// console.log(process.argv)
// console.log(yargs.argv)

// if (command === 'add') {
//     console.log('Adding note!')
// } else if (command === 'remove') {
//     console.log('Removing note!')
// }

// const notes = require('./notes')
// const chalk = require('chalk')
// const yargs = require('yargs')

// console.log(yargs.argv)

// // Add command
// yargs.command({
//     command: 'add',
//     describe: 'Adds a new note',
//     handler: function() {
//         console.log('Adding the note!')
//     }
// })

// // Remove command
// yargs.command({
//     command: 'remove',
//     describe: 'Removes a note',
//     aliases: '',
//     handler: function() {
//         console.log('Removing the note!')
//     }
// })

// // Read command
// yargs.command({
//     command: 'read',
//     describe: 'Reads the note',
//     handler: function() {
//         console.log('Reading the note!')
//     }
// })

// // List command
// yargs.command({
//     command: 'list',
//     describe: 'Lists all notes',
//     handler: function() {
//         console.log('Listing the notes!')
//     }
// })

// console.log(yargs.argv)

// const chalk = require('chalk')
// const yargs = require('yargs')
// const notes = require('./notes')

// yargs.command({ // Add command
//         command: 'add',
//         describe: 'Adds a new note',
//         aliases: ['insert', 'a', 'i'],
//         builder: {
//             title: {
//                 describe: 'Note title',
//                 alias: 't',
//                 demandOption: true,
//                 type: 'string'
//             },
//             body: {
//                 describe: 'Note body',
//                 alias: 'b',
//                 demandOption: true,
//                 type: 'string'
//             }
//         },
//         handler: argv => notes.addNote(argv.title, argv.body)
//             // handler: argv => {
//             //     // console.log('Title: ', argv.title)
//             //     // console.log('Body: ', argv.body)
//             //     notes.addNote(argv.title, argv.body)
//             // }
//     })
//     .command({ // Remove command
//         command: 'remove',
//         describe: 'Removes a note',
//         aliases: ['delete', 'd', 'r'],
//         builder: {
//             title: {
//                 describe: 'Note title',
//                 alias: 't',
//                 demandOption: true,
//                 type: 'string'
//             }
//         },
//         handler: argv => notes.removeNote(argv.title)
//             // handler: function() {
//             //     console.log('Removing the note!')
//             // }
//     })
//     .command({ // Read command
//         command: 'read',
//         describe: 'Reads the note',
//         builder: {
//             title: {
//                 describe: 'Note title',
//                 alias: 't',
//                 demandOption: true,
//                 type: 'string'
//             }
//         },
//         handler: argv => notes.readNote(argv.title)
//             // handler: function() {
//             //     console.log('Reading the note!')
//             // }
//     })
//     .command({ // List command
//         command: 'list',
//         describe: 'Lists all notes',
//         aliases: ['l', 'display'],
//         handler: () => notes.listNotes()
//             // handler: function() {
//             //     console.log('Listing the notes!')
//             // }
//     })
//     .demandCommand()
//     .help()
//     .parse()


// const yargs = require('yargs')
// const notes = require('./notes')

// yargs.command({ // Add command
//         command: 'add',
//         describe: 'Adds a new note',
//         aliases: ['insert', 'a', 'i'],
//         builder: {
//             title: {
//                 describe: 'Note title',
//                 alias: 't',
//                 demandOption: true,
//                 type: 'string'
//             },
//             body: {
//                 describe: 'Note body',
//                 alias: 'b',
//                 demandOption: true,
//                 type: 'string'
//             }
//         },
//         handler: argv => notes.addNote(argv.title, argv.body)
//     })
//     .command({ // Remove command
//         command: 'remove',
//         describe: 'Removes a note',
//         aliases: ['delete', 'd', 'r'],
//         builder: {
//             title: {
//                 describe: 'Note title',
//                 alias: 't',
//                 demandOption: true,
//                 type: 'string'
//             }
//         },
//         handler: argv => notes.removeNote(argv.title)
//     })
//     .command({ // Read command
//         command: 'read',
//         describe: 'Reads the note',
//         builder: {
//             title: {
//                 describe: 'Note title',
//                 alias: 't',
//                 demandOption: true,
//                 type: 'string'
//             }
//         },
//         handler: argv => notes.readNote(argv.title)
//     })
//     .command({ // List command
//         command: 'list',
//         describe: 'Lists all notes',
//         aliases: ['l', 'display'],
//         handler: () => notes.listNotes()
//     })
//     .demandCommand()
//     .help()
//     .parse()