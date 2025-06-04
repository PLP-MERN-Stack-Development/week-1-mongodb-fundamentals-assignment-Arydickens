// MongoDB queries to:
// 1. Find books in a specific genre (replace 'Fiction' with a desired genre)
db.books.find({ genre: "Fiction" })
//Find books published after a certain year (replace 1980 with a desired year)
db.books.find({ published_year: { $gt: 1980 } })
// 3. Find books by a specific author (replace 'George Orwell' with a desired author)
db.books.find({ author: "George Orwell" })
//Update the price of a specific book 
db.books.updateOne(
  { title: "The Lord of the Rings" }, 
  { $set: { price: 12.99 } } 
)
// Delete a book by its title
db.books.deleteOne({ title: "1984" })

//A query to find books that are both in stock and published after 2010
db.books.find({ 
  in_stock: true, 
  published_year: { $gt: 2010 } 
})
//Use projection to return only the title, author, and price fields in your queries
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 } // Excluded _id field
)
// Implement sorting to display books by price (both ascending and descending)
db.books.find().sort({ price: 1 }) // Ascending order
db.books.find().sort({ price: -1 }) // Descending order
// Use the limit and skip methods to implement pagination (5 books per page)
db.books.find().limit(5) // First page (first 5 books)
db.books.find().skip(5).limit(5) // Second page (next 5 books)
// Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }])
  // Create an aggregation pipeline to find the author with the most books in the collection
  db.books.aggregate([
    {
      $group: {
        _id: "$author",
        bookCount: { $sum: 1 }
      }
    },
    {
      $sort: { bookCount: -1 } // Sort by book count in descending order
    },
    {
      $limit: 1 // Get the author with the most books
    }])

    //Implement a pipeline that groups books by publication decade and counts them
    db.books.aggregate([
        {
          $project: {
            decade: {
              $multiply: [
                { $floor: { $divide: ["$published_year", 10] } },
                10
              ]
            }
          }
        },
        {
          $group: {
            _id: "$decade",
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 } // sort decades ascending
        }
      ])
      
      // Create an index on the title field for faster searches
db.books.createIndex({ title: 1 })
// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })
// Use the explain() method to demonstrate the performance improvement with your indexes
db.books.find({ title: "The Great Gatsby" }).explain("executionStats")