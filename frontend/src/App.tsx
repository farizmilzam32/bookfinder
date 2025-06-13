import { useState } from 'react';
import axios from 'axios';
import BookItem from './components/BookItem';
import Wishlist from './components/Wishlist';

function App() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchBooks = async () => {
    if (!search.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}`);
      setBooks(res.data.items || []);
    } catch (error) {
      console.error('Failed to search books:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchBooks();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Book Finder
            </h1>
            <p className="text-gray-600">Discover your next favorite book and build your wishlist</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-200 text-gray-800 placeholder-gray-500"
                  placeholder="Search for books by title, author, or ISBN..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyUp={handleKeyPress}
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
              <button
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={searchBooks}
                disabled={loading || !search.trim()}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {hasSearched && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
              {books.length > 0 && (
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  {books.length} {books.length === 1 ? 'book' : 'books'} found
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
                <p className="text-gray-500">Try searching with different keywords</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {books.map((book) => (
                  <BookItem key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        )}

        {hasSearched && (
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-100 px-4 py-2 text-gray-500 text-sm rounded-full">
                Your Collection
              </span>
            </div>
          </div>
        )}

        <Wishlist />
      </div>
    </div>
  );
}

export default App;
