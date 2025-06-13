import { useEffect, useState } from 'react';
import axios from 'axios';

interface WishlistItem {
  _id: string;
  title: string;
  thumbnail: string;
  authors: string[];
  rating: number;
}

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/wishlist`);
      setWishlist(res.data);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchWishlist();

    // Listen for wishlist updates
    const handleWishlistUpdate = () => {
      fetchWishlist();
    };

    window.addEventListener('wishlistUpdated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Wishlist</h2>
        <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
          {wishlist.length} {wishlist.length === 1 ? 'book' : 'books'}
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500">Start adding books you'd love to read!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {wishlist.map((item) => (
            <div 
              key={item._id} 
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-50 relative">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-pink-600 transition-colors duration-200">
                  {item.title}
                </h3>
                
                <p className="text-sm text-gray-600 line-clamp-1">
                  by {item.authors.join(', ')}
                </p>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(item.rating || 0) 
                            ? 'text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
