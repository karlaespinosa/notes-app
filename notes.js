const chalk = require('chalk');
const fs = require('fs');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.bgGreen('Note added'));
    } else {
        console.log(chalk.bgRed('Note title taken'));
    }
}

const removeNote = title => {
    const notes = loadNotes();
    const updatedNotes = notes.filter(note => {
        return note.title !== title;
    });
    if(updatedNotes.length !== notes.length) {
        saveNotes(updatedNotes);
        console.log(chalk.bgGreen('Note removed!'));
    } else {
        console.log(chalk.bgRed('Note not found'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bgBlue.black('Your notes'));
    notes.forEach(note => {
        console.log(note.title);
    });
}

const readNote = title => {
    const notes = loadNotes();
    const searchNote = notes.find(note => note.title === title);
    if(searchNote) {
        console.log(chalk.yellow(searchNote.title));
        console.log(searchNote.body);
    } else {
        console.log(chalk.bgRed('Note not found'));
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
   try{ 
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
   } catch(e){
       return [];
   }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}