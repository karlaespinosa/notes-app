const yargs = require('yargs'); //It helps parse the commands coming from the command line more easily
const notes = require('./notes');

//Adding a new note
yargs.command({
    command: 'add',
    description: 'Add new note.',
    builder: {
        title: {
            description: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            description: 'Body note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        notes.addNote(argv.title, argv.body);
    }
});

//Removing a note
yargs.command({
    command: 'remove',
    description: 'Remove a note',
    builder: {
        title: {
            description: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        notes.removeNote(argv.title);
    }
});

//Listing notes
yargs.command({
    command: 'list',
    description: 'Listing out all notes',
    handler: () => {
        notes.listNotes();
    }
});

yargs.command({
    command: 'read',
    description: 'Reading all notes',
    builder: {
        title: {
            description: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        notes.readNote(argv.title);
    }
})

yargs.parse();