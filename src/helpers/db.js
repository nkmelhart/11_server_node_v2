import { nanoid } from 'nanoid'
import logger from './logger'
import joi from 'joi'
import Joi from 'joi'

const noteSchema = Joi.object({
    title: Joi.string().required().min(3).max(20),
    content: Joi.string().required().min(5).max(30)
})

let notes = []

const note = {
    id: "randomid",
    title: 'Note Title',
    content: 'The content of the note, it should have more charachters than the title',
}

notes.push(note)

export const getAll = () => notes

export const getById = id => notes.find((note) => note.id === id)

export const add = (n) => {
    const { error } = noteSchema.validate(n)
    if (error) {
        logger.error(error)
        return { error:{msg:error.details[0].message} }
    }
    const id = nanoid()
    notes.push({ id, ...n })
    return getById(id)
}

export const remove = (id) => {
    notes = notes.filter(note => note.id != id)
    return notes
}

export const update = (id, n) => {
    const { error } = noteSchema.validate(n)
    if (error) {
        logger.error
        return { error:{msg:error.details[0].message} }
    }
    let dbNote = getById(id)
    if (dbNote) {
        dbNote = { ...dbNote, ...n }
        remove(id)
        add(dbNote)
        return dbNote
    }
    else {
        return null
    }
}
