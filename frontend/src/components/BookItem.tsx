import axios from 'axios';
import { useState } from 'react';

interface BookItemProps {
  book: any;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const info = book.volumeInfo;

  const addToWishlist = async () => {
    if (isAdding || isAdded) return;
    
    setIsAdding(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/wishlist`, {
        title: info.title,
        thumbnail: info.imageLinks?.thumbnail || '',
        authors: info.authors || ['Unknown'],
        rating: info.averageRating || 0,
      });
      setIsAdded(true);
      
      // Trigger wishlist update
      window.dispatchEvent(new Event('wishlistUpdated'));
      
      setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      alert('Failed to add to wishlist');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      {/* Book Cover */}
      <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative">
        {info.imageLinks?.thumbnail ? (
          <img 
            src={info.imageLinks.thumbnail} 
            alt={info.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-2">📚</div>
              <div className="text-xs">No Cover</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-pink-600 transition-colors duration-200 text-base">
            {info.title || 'Untitled'}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-1">
            by {info.authors?.join(', ') || 'Unknown Author'}
          </p>
          
          {/* Rating */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.floor(info.averageRating || 0) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
            {info.averageRating && (
              <span className="text-xs text-gray-500 ml-1">
                ({info.averageRating.toFixed(1)})
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={addToWishlist}
          disabled={isAdding || isAdded}
          className={`
            w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-300 transform active:scale-95
            ${isAdded 
              ? 'bg-green-500 text-white cursor-default' 
              : isAdding
              ? 'bg-pink-300 text-white cursor-not-allowed'
              : 'bg-pink-500 hover:bg-pink-600 text-white hover:shadow-lg'
            }
          `}
        >
          {isAdding ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adding...</span>
            </div>
          ) : isAdded ? (
            <div className="flex items-center justify-center space-x-2">
              <span>✅</span>
              <span>Added to Wishlist!</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>Add to Wishlist</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookItem;
