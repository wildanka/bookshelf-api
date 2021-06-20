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

  // validasi
  console.log(name)
  if (name === '' || name === undefined) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku'
      })
      .code(400)
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      })
      .code(400)
  }

  const id = nanoid(16)

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
    const response = h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id
        }
      })
      .code(201)
    return response
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

// Kriteria 2 : API dapat menampilkan seluruh buku
/**
        1. Server harus mengembalikan respons 200 dengan bentuk sbb DONE
        2. Jika belum terdapat buku yang dimasukkan, server bisa merespons dengan array books kosong. DONE
      */
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

// Kriteria 3
const getBookDetail = (request, h) => {
  const { bookId } = request.params
  const bookDetail = books.filter((book) => book.id === bookId)

  if (bookDetail.length > 0) {
    const response = h
      .response({
        status: 'success',
        data: {
          book: bookDetail
        }
      })
      .code(200)
    return response
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    })
    .code(404)
  return response
}
module.exports = { addBookHandler, getAllBookList, getBookDetail }
