const { nanoid } = require('nanoid')
const books = require('./books')

// TODO -> Kriteria 1 : API dapat menyimpan buku
/**
     * Server harus merespons gagal bila:

      1. Client tidak melampirkan properti namepada request body. Bila hal ini terjadi, maka server akan merespons dengan:
      Status Code : 400

      2. Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan:
      Status Code : 400

      3. Server gagal memasukkan buku karena alasan umum (generic error). Bila hal ini terjadi, maka server akan merespons dengan:
      Status Code : 500

      4. Bila buku berhasil dimasukkan, server harus mengembalikan respons dengan:
      Status Code : 201
     */
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  const id = nanoid(16)

  const responseBody = {
    id: id,
    author: author
  }
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const finished = () => {
    if (pageCount === readPage) {
      return true
    } else {
      return false
    }
  }

  const bookToBeSaved = {
    id: id,
    name: name,
    year: year,
    author: author,
    summary: summary,
    publisher: publisher,
    pageCount: pageCount,
    readPage: readPage,
    finished: finished,
    reading: reading,
    insertedAt: insertedAt,
    updatedAt: updatedAt
  }

  books.push(bookToBeSaved)

  const isSuccess = books.filter((book) => book.id === id).length > 0

  if (isSuccess) {
    const response = h.response(responseBody).code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllBookList = (request, h) => {
  const bookList = books.map(({ id, name, publisher }) => ({
    id,
    name,
    publisher
  }))

  const response = h
    .response({
      status: 'success',
      data: {
        books: bookList
      }
    })
    .code(200)
  return response
}
module.exports = { addBookHandler, getAllBookList }
