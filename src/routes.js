/* eslint-disable no-unused-vars */
const { addBookHandler, getAllBookList } = require('./handler')

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello World!'
    },
    options: {
      cors: {
        origin: ['*']
      }
    }
  },
  {
    method: 'GET',
    path: '/homepage',
    handler: (request, h) => {
      return 'Homepage'
    }
  },
  {
    method: 'GET',
    path: '/about',
    handler: (request, h) => {
      return 'About page'
    }
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler
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
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookList
    // TODO -> Kriteria 2 : API dapat menampilkan seluruh buku
    /**
        1. Server harus mengembalikan respons dengan:
        2. Jika belum terdapat buku yang dimasukkan, server bisa merespons dengan array books kosong.
      */
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: (request, h) => {
      // TODO -> Kriteria 3 : API dapat menampilkan detail buku
      /**
        1. Bila buku dengan id yang dilampirkan oleh client tidak ditemukan, maka server harus mengembalikan respons dengan:
        Status Code : 404

        2. Bila buku dengan id yang dilampirkan ditemukan, maka server harus mengembalikan respons dengan:
        Status Code : 200
      */
      return 'About page'
    }
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: (request, h) => {
      // TODO -> Kriteria 4 : API dapat mengubah data buku
      /**
       * Server harus merespons gagal bila:

        1. Client tidak melampirkan properti name pada request body. Bila hal ini terjadi, maka server akan merespons dengan:
        Status Code : 400

        2. Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan:
        Status Code : 400

        3. Id yang dilampirkan oleh client tidak ditemukkan oleh server. Bila hal ini terjadi, maka server akan merespons dengan:
        Status Code : 404

        4.Bila buku berhasil diperbarui, server harus mengembalikan respons dengan:
        Status Code : 200
       */
      return 'About page'
    }
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: (request, h) => {
      // TODO -> Kriteria 5 : API dapat menghapus buku
      /**
       * Server harus merespons gagal bila:

        1. Bila id yang dilampirkan tidak dimiliki oleh buku manapun, maka server harus mengembalikan respons berikut:
        Status Code : 404

        2. Bila id dimiliki oleh salah satu buku, maka buku tersebut harus dihapus dan server mengembalikan respons berikut:
        Status Code : 200
       */
      return 'About page'
    }
  }
]

module.exports = routes
