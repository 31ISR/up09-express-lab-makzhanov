const express = require('express')
const router = express.Router()
let manga = [
    {
        id: 1,
        title: 'berserk',
        author: 'kentaro miura',
        chapters:386,
        finished: false
    },
    {
        id: 2,
        title: 'chainsaw men',
        author: 'tatsuki fujimoto',
        chapters:232,
        finished: true
    },
    {
        id: 3,
        title: 'one-punch man',
        author: 'one',
        chapters:248,
        finished: false
    }
]

router.get('/', (req,res)=>{
    res.json(manga)
})

router.post('/',(req,res)=>{
    const {title,author,chapters,finished} = req.body

    const newManga = {
        id: Date.now(),
        title: title.trim(),
        author,
        chapters,
        finished: finished ?? false,
    }

    manga.push(newManga)

    res.status(201).json(newManga)
})

router.get('/:id', (req,res)=>{
    const item = manga.find((m) => m.id === Number(req.params.id))

    if(!item) {
        return res.status(404).json({ message: `manga with id: ${req.params.id} not found` })
    }
    res.json(item)
})

router.patch('/:id', (req,res) =>{
    const mangaIndex = manga.findIndex((m)=> m.id===Number(req.params.id))

    if (mangaIndex === -1){
        return res.status(404).json({ message: `manga with id: ${req.params.id} not found` })
    }

    manga[mangaIndex]={...manga[mangaIndex], ...req.body}

    res.json(manga[mangaIndex])
})

router.delete('/:id',(req,res)=>{
    const item = manga.find((m)=> m.id === Number(req.params.id))

    if(!item) {
        return res.status(404).json({ message: 'manga with id: ${req.params.id} not found' })
    }
    manga = manga.filter((m)=> m.id !== Number(req.params.id))

    res.status(204).end()
})

module.exports = router