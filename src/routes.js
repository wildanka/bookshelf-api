/* eslint-disable no-unused-vars */
const {
  addBookHandler,
  getAllBookList,
  getBookDetail,
  putUpdateBuku,
  deleteBook
} = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookList
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookDetail
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: putUpdateBuku
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook
  }
]

module.exports = routes
