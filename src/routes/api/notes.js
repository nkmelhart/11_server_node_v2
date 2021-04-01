import { Router } from 'express'

import * as db from '../../helpers/db'
import logger from '../../helpers/logger'

const router = Router()

router.get('/', (req, res) => {
    res.send(db.getAll())
})

router.post('/', (req, res) => {
    const { note: newNote } = req.body
    if (newNote) {
        const note = db.add(newNote)
        if (note.error) {
            res.status(400)
        }
        res.send(note)
    }
    else {
        res.send(400).send({msg: 'Bad status'})
    }
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const note = db.getById(id)
    if (note) {
        res.send(note)
    }
    else {
        logger.warn(`Note ${id} does not exist`)
        res.status(404).send({})
    }
})
//this above will be requested as /apipath/notespath/{whatever}

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { note: updatedNote } = req.body
    const noteSend = db.update(id, updatedNote)
    if (noteSend.error) {
        res.status(400)
    }
    res.send(noteSend)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    res.send(db.remove(id))
})

router.put
export default router