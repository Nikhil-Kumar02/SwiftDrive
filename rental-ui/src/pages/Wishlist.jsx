import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import CarCard from "../components/CarCard";
import Loader from "../components/Loader";
import { motion } from "motion/react";

const Wishlist = () => {
  const { cars, wishlist, token, navigate } = useAppContext();
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
        navigate('/');
        return;
    }
    const filtered = cars.filter(car => wishlist.includes(car._id));
    setFavoriteCars(filtered);
    setLoading(false);
  }, [cars, wishlist, token]);

  if (loading) return <Loader />;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-12 mb-20">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
        <p className="text-gray-500">Your curated collection of dream cars.</p>
      </div>

      {favoriteCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteCars.map((car, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              key={car._id}
            >
                <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Your wishlist is empty</h2>
          <p className="text-gray-400 mt-2 mb-8">Start exploring and save your favorites!</p>
          <button 
            onClick={() => navigate('/cars')}
            className="px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dull transition-all"
          >
            Browse Cars
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
