const { nanoid } = require('nanoid')
const books = require('./books')

function isFinished(pageCount, readPage) {
  if (pageCount === readPage) {
    return true
  }
  return false
}
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
  const finished = isFinished(pageCount, readPage)

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

  const bookDetail = books.find((book) => book.id === bookId)
  console.log(bookDetail)
  if (bookDetail !== undefined) {
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

// Kriteria 4
const putUpdateBuku = (request, h) => {
  const { bookId } = request.params

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

  if (name === '' || name === undefined) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      })
      .code(400)
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      })
      .code(400)
  }
  // search for id
  const bookDetail = books.find((book) => book.id === bookId)
  if (bookDetail === undefined) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
      })
      .code(404)
    return response
  } else {
    // jika data valid, maka update data
    bookDetail.name = name
    bookDetail.year = year
    bookDetail.author = author
    bookDetail.summary = summary
    bookDetail.publisher = publisher
    bookDetail.pageCount = pageCount
    bookDetail.readPage = readPage
    bookDetail.reading = reading
    bookDetail.finished = isFinished(pageCount, readPage)

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
      })
      .code(200)
  }
}

// Kriteria 4
const deleteBook = (request, h) => {
  const { bookId } = request.params
  const indexResult = books.findIndex((book) => book.id === bookId)
  console.log('indexResult ' + indexResult)

  if (indexResult < 0) {
    const response = h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
      })
      .code(404)
    return response
  } else {
    // jika data valid, maka hapus data
    books.splice(indexResult, 1)
    return h
      .response({
        status: 'success',
        message: 'Buku berhasil dihapus'
      })
      .code(200)
  }
}
module.exports = {
  addBookHandler,
  getAllBookList,
  getBookDetail,
  putUpdateBuku,
  deleteBook
}
