const express = require('express')
const mangaRouter = require('./routes/manga')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    const startedAt = new Date()
    
    res.on('finish', () => {
        console.log(`${startedAt.toISOString()} - ${req.method} ${req.originalUrl}`)
    })
    next()

    })
app.get('/', (req, res) => {
    res.json({ message: 'service is healthy' })
})
app.use('/api/manga', mangaRouter)

app.use((req,res)=>{
    res.status(404).json({ error: `маршрут ${req.originalUrl} не найден` })
})

module.exports = app
