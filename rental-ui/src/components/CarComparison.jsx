import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';

const CarComparison = ({ selectedCars, onRemove, onClose, onAddMore }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSelectedCars, setShowComparison } = useAppContext();

  if (selectedCars.length === 0) {
    return null;
  }

  const handleBookNow = (car) => {
    onClose();
    navigate(`/car-details/${car._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 overflow-y-auto"
      >
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col border border-white/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-6 md:px-8 flex justify-between items-center shadow-lg z-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t('common.compareTitle')}</h2>
                <p className="text-blue-100 text-sm md:text-base mt-1 opacity-90">{t('common.compareSubtitle')}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white bg-white/10 hover:bg-white/20 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer hover:rotate-90"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>

            {/* Comparison Content */}
            <div className="flex-1 overflow-auto bg-gray-50/50">
              {/* Mobile View: Stacked Cards */}
              <div className="sm:hidden p-4 space-y-4">
                {selectedCars.map((car) => (
                  <motion.div 
                    layout
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    key={car._id} 
                    className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex gap-4">
                        <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-24 h-20 object-cover rounded-lg shadow-sm" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 truncate">{car.brand}</h3>
                          <p className="text-sm text-gray-500">{car.model}</p>
                          <div className="mt-1 flex items-baseline gap-1">
                            <span className="text-xl font-bold text-primary">${car.pricePerDay}</span>
                            <span className="text-xs text-gray-500">/ {t('common.day')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <img src={assets.users_icon} alt="seating" className="w-4 h-4 opacity-70" />
                          <span>{car.seating_capacity} {t('cars.seats')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <img src={assets.fuel_icon} alt="fuel" className="w-4 h-4 opacity-70" />
                          <span>{car.fuel_type}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {car.category}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => handleBookNow(car)}
                          disabled={!car.isAvailable}
                          className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${car.isAvailable ? 'bg-primary text-white hover:bg-blue-700 shadow-md active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        >
                          {t('cars.book')}
                        </button>
                        <button
                          onClick={() => onRemove(car._id)}
                          className="px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300 active:scale-95"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop View: Comparison Table */}
              <div className="hidden sm:block min-w-full">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="sticky top-0 z-20 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                      <th className="p-6 text-left font-semibold text-gray-400 uppercase text-xs tracking-wider bg-white w-1/4 border-b border-gray-100">
                        {t('common.features')}
                      </th>
                      {selectedCars.map((car) => (
                        <th key={car._id} className="p-6 bg-white border-b border-gray-100 min-w-[250px]">
                          <div className="relative group">
                            <motion.img
                              layoutId={`car-img-${car._id}`}
                              src={car.image}
                              alt={`${car.brand} ${car.model}`}
                              className="w-full h-40 object-cover rounded-xl shadow-md mb-4 transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <button
                              onClick={() => onRemove(car._id)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 cursor-pointer"
                              title={t('common.deselect')}
                            >
                              ✕
                            </button>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{car.brand}</h3>
                          <p className="text-gray-500 text-sm mb-2">{car.model}</p>
                          <div className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {car.category}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {/* Feature Rows */}
                    {[
                      { label: t('owner.year'), key: 'year' },
                      { label: t('cars.seatingCapacity'), key: 'seating_capacity', icon: assets.users_icon, suffix: ' Seats' },
                      { label: t('cars.fuelType'), key: 'fuel_type', icon: assets.fuel_icon },
                      { label: t('cars.transmission'), key: 'transmission' },
                      { label: t('owner.location'), key: 'location', icon: assets.location_icon },
                    ].map((row, idx) => (
                      <tr key={row.key} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-blue-50/40 transition-colors duration-200 group`}>
                        <td className="p-6 font-semibold text-gray-700 border-r border-gray-100 group-hover:text-primary">
                          {row.label}
                        </td>
                        {selectedCars.map((car) => (
                          <td key={car._id} className="p-6 text-center text-gray-700 font-medium border-r border-gray-100 last:border-r-0">
                            <div className="flex items-center justify-center gap-2">
                              {row.icon && <img src={row.icon} alt={row.key} className="w-5 h-5 opacity-60" />}
                              <span>{car[row.key]}{row.suffix || ''}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Price Row */}
                    <tr className="bg-blue-50/20 group hover:bg-blue-50/40 transition-colors duration-200">
                      <td className="p-8 font-bold text-gray-900 border-r border-gray-100">
                        {t('owner.pricePerDay')}
                      </td>
                      {selectedCars.map((car) => (
                        <td key={car._id} className="p-8 text-center border-r border-gray-100 last:border-r-0">
                          <div className="text-3xl font-extrabold text-primary">
                            ${car.pricePerDay}
                            <span className="text-xs text-gray-500 font-normal block mt-1 tracking-wide">/ {t('common.day')}</span>
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Availability Row */}
                    <tr className="hover:bg-gray-50/50 transition-colors duration-200">
                      <td className="p-6 font-semibold text-gray-700 border-r border-gray-100">
                        {t('common.isAvailable')}
                      </td>
                      {selectedCars.map((car) => (
                        <td key={car._id} className="p-6 text-center border-r border-gray-100 last:border-r-0">
                          <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${
                            car.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            <span className="text-xs">{car.isAvailable ? '●' : '●'}</span>
                            {car.isAvailable ? t('common.isAvailable') : t('common.notAvailable')}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* CTA Row */}
                    <tr className="bg-gray-50/50">
                      <td className="p-8 border-r border-gray-100"></td>
                      {selectedCars.map((car) => (
                        <td key={car._id} className="p-8 border-r border-gray-100 last:border-r-0">
                          <motion.button
                            whileHover={car.isAvailable ? { scale: 1.03 } : {}}
                            whileTap={car.isAvailable ? { scale: 0.98 } : {}}
                            onClick={() => handleBookNow(car)}
                            disabled={!car.isAvailable}
                            className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 shadow-lg ${
                              car.isAvailable
                                ? 'bg-primary text-white hover:bg-blue-700 hover:shadow-blue-500/25 cursor-pointer ring-offset-2 focus:ring-2 focus:ring-primary'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                            }`}
                          >
                            {t('cars.book')}
                          </motion.button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t bg-white p-6 md:px-8 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-[0_-5px_20px_rgba(0,0,0,0.03)] z-10">
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <span className="bg-blue-100 text-primary w-6 h-6 flex items-center justify-center rounded-full text-xs">{selectedCars.length}</span>
                {t('common.compareItems')}
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 w-full sm:w-auto">
                {selectedCars.length < 3 && (
                  <button
                    onClick={onAddMore}
                    className="flex-1 sm:flex-none px-6 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-bold cursor-pointer active:scale-95"
                  >
                    + {t('common.addMore')}
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedCars([]);
                    setShowComparison(false);
                    localStorage.removeItem('comparisonCars');
                    onClose();
                  }}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-bold cursor-pointer active:scale-95"
                >
                  {t('common.clearAll')}
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-8 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all font-bold cursor-pointer shadow-lg active:scale-95"
                >
                  {t('common.close')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CarComparison;
