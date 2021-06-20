/* eslint-disable no-unused-vars */
const {
  addBookHandler,
  getAllBookList,
  getBookDetail,
  putUpdateBook,
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
    handler: putUpdateBook
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook
  }
]

module.exports = routes
