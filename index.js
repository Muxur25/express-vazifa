const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const port = 3000

app.use(express.json())

const booksFilePath = path.join(__dirname, 'books.json')

// GET /books - barcha kitoblarni olish
app.get('/books', (req, res) => {
	fs.readFile(booksFilePath, (err, data) => {
		if (err) {
			return res.status(500).send('Server xatosi')
		}
		res.json(JSON.parse(data))
	})
})

// GET /books/:id - kitobni ID bo’yicha olish
app.get('/books/:id', (req, res) => {
	const bookId = parseInt(req.params.id, 10)
	fs.readFile(booksFilePath, (err, data) => {
		if (err) {
			return res.status(500).send('Server xatosi')
		}
		const books = JSON.parse(data)
		const book = books.find(b => b.id === bookId)
		if (book) {
			res.json(book)
		} else {
			res.status(404).send("Ma'lumot topilmadi")
		}
	})
})

// POST /books - yangi kitob qo’shish
app.post('/books', (req, res) => {
	const { title, author } = req.body
	if (!title || !author) {
		return res.status(400).send('Title va Author kiritilishi kerak')
	}

	fs.readFile(booksFilePath, (err, data) => {
		if (err) {
			return res.status(500).send('Server xatosi')
		}
		const books = JSON.parse(data)
		if (books.find(b => b.title === title)) {
			return res.status(400).send('Bu kitob bazada mavjud')
		}

		const newBook = {
			id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
			title,
			author,
		}
		books.push(newBook)

		fs.writeFile(booksFilePath, JSON.stringify(books, null, 2), err => {
			if (err) {
				return res.status(500).send("Ma'lumot qo'shishda xatolik")
			}
			res.status(201).json(newBook)
		})
	})
})

// PUT /books/:id - kitob ma’lumotlarini yangilash
app.put('/books/:id', (req, res) => {
	const bookId = parseInt(req.params.id, 10)
	const { title, author } = req.body

	fs.readFile(booksFilePath, (err, data) => {
		if (err) {
			return res.status(500).send('Server xatosi')
		}
		let books = JSON.parse(data)
		const bookIndex = books.findIndex(b => b.id === bookId)

		if (bookIndex === -1) {
			return res.status(404).send("Ma'lumot topilmadi")
		}

		if (title) books[bookIndex].title = title
		if (author) books[bookIndex].author = author

		fs.writeFile(booksFilePath, JSON.stringify(books, null, 2), err => {
			if (err) {
				return res.status(500).send("Ma'lumot yangilashda xatolik")
			}
			res.json(books[bookIndex])
		})
	})
})

// DELETE /books/:id - kitobni o’chirib tashlash
app.delete('/books/:id', (req, res) => {
	const bookId = parseInt(req.params.id, 10)

	fs.readFile(booksFilePath, (err, data) => {
		if (err) {
			return res.status(500).send('Server xatosi')
		}
		let books = JSON.parse(data)
		const bookIndex = books.findIndex(b => b.id === bookId)

		if (bookIndex === -1) {
			return res.status(404).send("Ma'lumot topilmadi")
		}

		books.splice(bookIndex, 1)

		fs.writeFile(booksFilePath, JSON.stringify(books, null, 2), err => {
			if (err) {
				return res.status(500).send("Ma'lumot o'chirishda xatolik")
			}
			res.status(204).send()
		})
	})
})

app.listen(4000, () => {
	console.log(`Server http://localhost:4000 da ishlamoqda`)
})
