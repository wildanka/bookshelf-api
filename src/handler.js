const { nanoid } = require('nanoid')
const books = require('./books')

function isFinished(pageCount, readPage) {
  if (pageCount === readPage) {
    return true
  }
  return false
}

// Kriteria 1
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

// Kriteria 2
const getAllBookList = (request, h) => {
  const { name, reading, finished } = request.query

  const filterName = (book) => {
    const nameRegex = new RegExp(name, 'gi')
    return nameRegex.test(book.name)
  }

  const filterBookReading = (book) => {
    return book.reading === true
  }
  const filterBookReadingFalse = (book) => {
    return book.reading === false
  }
  const filterFinished = (book) => {
    return book.finished === true
  }
  const filterFinishedFalse = (book) => {
    return book.finished === false
  }

  const mapData = ({ id, name, publisher }) => ({
    id,
    name,
    publisher
  })

  let finalResponse
  console.log(`name: ${name}, reading: ${reading}, finished: ${finished}`)
  if (name) {
    console.log('name ' + name)
    finalResponse = books.filter(filterName)
    console.log('kena 1 : ')
    console.log('hasil 1 : ' + finalResponse)
  }

  if (reading) {
    // eslint-disable-next-line eqeqeq
    if (reading == 0) {
      // filter where reading is false
      finalResponse = books.filter(filterBookReadingFalse).map(mapData)
      // eslint-disable-next-line eqeqeq
    } else if (reading == 1) {
      finalResponse = books.filter(filterBookReading).map(mapData)
    }
  }

  if (finished) {
    // eslint-disable-next-line eqeqeq
    if (finished == 0) {
      // filter where finished is false
      finalResponse = books.filter(filterFinishedFalse).map(mapData)
      // eslint-disable-next-line eqeqeq
    } else if (finished == 1) {
      finalResponse = books.filter(filterFinished).map(mapData)
    }
  }

  if (finalResponse === undefined) {
    // kalau bookList undefined, maka buat mapping untuk semuanya
    finalResponse = books.map(({ id, name, publisher }) => ({
      id,
      name,
      publisher
    }))
  }

  const response = h
    .response({
      status: 'success',
      data: {
        books: finalResponse
      }
    })
    .code(200)
  return response
}

// Kriteria 3
const getBookDetail = (request, h) => {
  const { bookId } = request.params

  const bookDetail = books.find((book) => book.id === bookId)
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
const putUpdateBook = (request, h) => {
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
    // jika data ditemukan, maka update data
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

// Kriteria 5
const deleteBook = (request, h) => {
  const { bookId } = request.params
  const indexResult = books.findIndex((book) => book.id === bookId)

  if (indexResult < 0) {
    const response = h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
      })
      .code(404)
    return response
  } else {
    // jika data ditemukan, maka hapus data
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
  putUpdateBook,
  deleteBook
}
