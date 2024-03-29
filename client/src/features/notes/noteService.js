import axios from "axios";

// const API_URL = 'http://localhost:5000/api/notes/'
const API_URL = 'https://days-api-5cwl.onrender.com/api/notes/'

// Create new note
const createNote = async (noteData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer: ${token}` 
        }
    }

    const response = await axios.post(API_URL, noteData, config)

    return response.data
}

// Get user notes
const getNotes = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer: ${token}` 
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete user note
const deleteNote = async (noteId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer: ${token}` 
        }
    }

    const response = await axios.delete(API_URL + noteId, config)

    return response.data
}

const updateNote = async (note, token) => {
    const config = {
        headers: {
            Authorization: `Bearer: ${token}` 
        },
    }

    const response = await axios.put(API_URL + note._id, note, config)

    return response.data
}

const noteService = {
    createNote,
    getNotes,
    deleteNote,
    updateNote
}

export default noteService