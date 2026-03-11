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
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full overflow-hidden flex flex-col border border-white/20 ${selectedCars.length === 1 ? 'max-w-lg mx-auto' : 'max-w-7xl'} max-h-[90vh]`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-4 md:px-8 flex justify-between items-center shadow-md z-20">
              <div>
                <h2 className="text-lg md:text-2xl font-bold tracking-tight">{t('common.compareTitle')}</h2>
                <p className="text-blue-100 text-[10px] md:text-sm mt-0.5 opacity-90">{t('common.compareSubtitle')}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white bg-white/10 hover:bg-white/20 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer hover:rotate-90"
              >
                <span className="text-lg">✕</span>
              </button>
            </div>

            {/* Comparison Content */}
            <div className="flex-1 overflow-auto bg-gray-50/20 custom-scrollbar">
              {/* Mobile View: Stacked Cards */}
              <div className="sm:hidden p-3 space-y-3">
                {selectedCars.map((car) => (
                  <motion.div 
                    layout
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    key={car._id} 
                    className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
                  >
                    <div className="p-3">
                      <div className="flex gap-3">
                        <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-16 h-14 object-cover rounded-lg shadow-sm" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-gray-900 truncate">{car.brand}</h3>
                          <p className="text-[10px] text-gray-500">{car.model}</p>
                          <div className="mt-0.5 flex items-baseline gap-1">
                            <span className="text-base font-bold text-primary">${car.pricePerDay}</span>
                            <span className="text-[9px] text-gray-400 font-normal">/ {t('common.day')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 grid grid-cols-2 gap-2 pb-2 border-b border-gray-50">
                        <div className="flex items-center gap-1 text-[10px] text-gray-600">
                          <img src={assets.users_icon} alt="seating" className="w-3 h-3 opacity-60" />
                          <span>{car.seating_capacity} {t('cars.seats')}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-gray-600">
                          <img src={assets.fuel_icon} alt="fuel" className="w-3 h-3 opacity-60" />
                          <span>{car.fuel_type}</span>
                        </div>
                      </div>

                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => handleBookNow(car)}
                          disabled={!car.isAvailable}
                          className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] transition-all duration-300 ${car.isAvailable ? 'bg-primary text-white active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        >
                          {t('cars.book')}
                        </button>
                        <button
                          onClick={() => onRemove(car._id)}
                          className="px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg text-[10px] font-bold active:scale-95"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop View: Comparison Table */}
              <div className="hidden sm:block">
                <table className={`w-full border-collapse table-fixed ${selectedCars.length === 1 ? 'max-w-lg mx-auto' : ''}`}>
                  <thead>
                    <tr className="sticky top-0 z-30 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
                      <th className="p-4 md:p-5 text-left font-semibold text-gray-400 uppercase text-[9px] tracking-widest bg-white w-32 md:w-48 border-b border-gray-100">
                        {t('common.features')}
                      </th>
                      {selectedCars.map((car) => (
                        <th key={car._id} className="p-4 md:p-5 bg-white border-b border-gray-100">
                          <div className="relative group mx-auto max-w-[200px]">
                            <motion.img
                              layoutId={`car-img-${car._id}`}
                              src={car.image}
                              alt={`${car.brand} ${car.model}`}
                              className="w-full h-24 md:h-32 object-cover rounded-xl shadow-md mb-3 transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <button
                              onClick={() => onRemove(car._id)}
                              className="absolute -top-1.5 -right-1.5 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 cursor-pointer text-[10px]"
                              title={t('common.deselect')}
                            >
                              ✕
                            </button>
                          </div>
                          <h3 className="text-sm md:text-base font-bold text-gray-900 truncate">{car.brand}</h3>
                          <p className="text-gray-500 text-[10px] mb-1.5 truncate">{car.model}</p>
                          <div className="inline-flex items-center bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[9px] font-bold">
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
                      <tr key={row.key} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/20'} hover:bg-blue-50/30 transition-colors duration-200 group`}>
                        <td className="p-4 md:p-6 text-xs md:text-sm font-semibold text-gray-600 border-r border-gray-50 group-hover:text-primary transition-colors">
                          {row.label}
                        </td>
                        {selectedCars.map((car) => (
                          <td key={car._id} className="p-4 md:p-6 text-center text-gray-700 text-xs md:text-sm font-medium border-r border-gray-50 last:border-r-0">
                            <div className="flex items-center justify-center gap-1.5">
                              {row.icon && <img src={row.icon} alt={row.key} className="w-4 h-4 opacity-40" />}
                              <span className="truncate">{car[row.key]}{row.suffix || ''}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Price Row */}
                    <tr className="bg-blue-50/10 group hover:bg-blue-50/20 transition-colors duration-200">
                      <td className="p-4 md:p-6 text-xs md:text-sm font-bold text-gray-900 border-r border-gray-50">
                        {t('owner.pricePerDay')}
                      </td>
                      {selectedCars.map((car) => (
                        <td key={car._id} className="p-4 md:p-6 text-center border-r border-gray-50 last:border-r-0">
                          <div className="text-xl md:text-2xl font-black text-primary">
                            ${car.pricePerDay}
                            <span className="text-[10px] text-gray-400 font-normal block mt-0.5">/ {t('common.day')}</span>
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Availability Row */}
                    <tr className="hover:bg-gray-50/50 transition-colors duration-200">
                      <td className="p-4 md:p-6 text-xs md:text-sm font-semibold text-gray-600 border-r border-gray-50">
                        {t('common.isAvailable')}
                      </td>
                      {selectedCars.map((car) => (
                        <td key={car._id} className="p-4 md:p-6 text-center border-r border-gray-50 last:border-r-0">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold ${
                            car.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {car.isAvailable ? t('common.isAvailable') : t('common.notAvailable')}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* CTA Row */}
                    <tr className="bg-gray-50/30">
                      <td className="border-r border-gray-50"></td>
                      {selectedCars.map((car) => (
                        <td key={car._id} className="p-4 md:p-6 border-r border-gray-50 last:border-r-0">
                          <motion.button
                            whileHover={car.isAvailable ? { scale: 1.02 } : {}}
                            whileTap={car.isAvailable ? { scale: 0.98 } : {}}
                            onClick={() => handleBookNow(car)}
                            disabled={!car.isAvailable}
                            className={`w-full py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                              car.isAvailable
                                ? 'bg-primary text-white hover:bg-blue-700 shadow-md hover:shadow-blue-500/20 cursor-pointer'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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
            <div className="border-t bg-white p-5 md:px-8 flex flex-col sm:flex-row gap-4 items-center justify-between z-10">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                <span className="bg-blue-50 text-primary w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">{selectedCars.length}</span>
                {t('common.compareItems')}
              </div>
              
              <div className="flex flex-wrap justify-center gap-2.5 w-full sm:w-auto">
                {selectedCars.length < 3 && (
                  <button
                    onClick={onAddMore}
                    className="flex-1 sm:flex-none px-5 py-2 text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-xs font-bold cursor-pointer"
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
                  className="flex-1 sm:flex-none px-5 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all text-xs font-bold cursor-pointer"
                >
                  {t('common.clearAll')}
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-black transition-all text-xs font-bold cursor-pointer shadow-lg"
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
