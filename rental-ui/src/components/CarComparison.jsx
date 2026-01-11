import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

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
    <div className="fixed inset-0 bg-black/50 z-40 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-primary to-blue-600 text-white p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{t('common.compareTitle')}</h2>
              <p className="text-blue-100 text-sm mt-1">{t('common.compareSubtitle')}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 px-2 py-1.5 rounded-[100%] transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Comparison Table */}
          {/* Mobile: stacked cards */}
          <div className="sm:hidden bg-white p-3">
            {selectedCars.map((car) => (
              <div key={car._id} className="mb-4 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="flex items-start gap-3 p-3">
                  <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-28 h-20 object-cover rounded-md shadow-sm" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-gray-900">{car.brand}</p>
                        <p className="text-sm text-gray-600">{car.model}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">${car.pricePerDay}</div>
                        <div className="text-xs text-gray-500">/ {t('common.day')}</div>
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <img src={assets.users_icon} alt="seating" className="w-4 h-4" />
                        <span>{car.seating_capacity} {t('cars.seats') || 'Seats'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={assets.fuel_icon} alt="fuel" className="w-4 h-4" />
                        <span>{car.fuel_type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">{car.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={assets.location_icon} alt="location" className="w-4 h-4" />
                        <span>{car.location}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleBookNow(car)}
                        disabled={!car.isAvailable}
                        className={`flex-1 py-2 rounded-lg font-semibold transition ${car.isAvailable ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                      >
                        {t('cars.book')}
                      </button>
                      <button
                        onClick={() => onRemove(car._id)}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg"
                      >
                        ✕ {t('common.deselect')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/tablet: show table */}
          <div className="overflow-x-auto bg-white hidden sm:block">
            <table className="w-full border-collapse text-sm md:text-base">
              <tbody>
                {/* Car Images */}
                <tr className="hover:bg-gray-50 transition">
                  <td className="p-5 font-semibold text-gray-700 bg-gradient-to-b from-gray-100 to-gray-50 w-1/4 min-w-[200px] border-r border-gray-200">
                    {t('cars.title')}
                  </td>
                  {selectedCars.map((car, idx) => (
                    <td key={car._id} className={`p-5 text-center min-w-[280px] border-r border-gray-200 ${idx === selectedCars.length - 1 ? 'border-r-0' : ''}`}>
                      <div className="flex items-center justify-center mb-4">
                        <img
                          src={car.image}
                          alt={`${car.brand} ${car.model}`}
                          className={`object-cover rounded-lg shadow-md ${selectedCars.length === 1 ? 'max-w-xs h-56 w-56' : 'w-full h-48'}`}
                        />
                      </div>
                      <button
                        onClick={() => onRemove(car._id)}
                        className="px-3 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-md text-sm font-medium transition cursor-pointer inline-block hover:scale-105 transform"
                      >
                        ✕ {t('common.deselect')}
                      </button>
                    </td>
                  ))}
                </tr>

                {/* Car Name */}
                <tr className="hover:bg-gray-50 transition">
                  <td className="p-5 font-semibold text-gray-700 bg-gradient-to-b from-gray-100 to-gray-50 border-r border-gray-200">
                    {t('navbar.cars')}
                  </td>
                  {selectedCars.map((car, idx) => (
                    <td key={car._id} className={`p-5 text-center min-w-[280px] border-r border-gray-200 ${idx === selectedCars.length - 1 ? 'border-r-0' : ''}`}>
                      <p className="text-xl font-bold text-gray-900">{car.brand}</p>
                      <p className="text-lg text-gray-600">{car.model}</p>
                    </td>
                  ))}
                </tr>

                {/* Year */}
                <tr className="hover:bg-gray-50 transition bg-white">
                  <td className="p-5 font-semibold text-gray-700 bg-gradient-to-b from-gray-100 to-gray-50 border-r border-gray-200">
                    {t('owner.year')}
                  </td>
                  {selectedCars.map((car, idx) => (
                    <td key={car._id} className={`p-5 text-center min-w-[280px] border-r border-gray-200 ${idx === selectedCars.length - 1 ? 'border-r-0' : ''} text-gray-700`}>
                      {car.year}
                    </td>
                  ))}
                </tr>

                {/* Category */}
                <tr className="hover:bg-gray-50 transition">
                  <td className="p-5 font-semibold text-gray-700 bg-gradient-to-b from-gray-100 to-gray-50 border-r border-gray-200">
                    {t('owner.category')}
                  </td>
                  {selectedCars.map((car, idx) => (
                    <td key={car._id} className={`p-5 text-center min-w-[280px] border-r border-gray-200 ${idx === selectedCars.length - 1 ? 'border-r-0' : ''}`}>
                      <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                        {car.category}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Seating Capacity */}
                <tr className="hover:bg-gray-50 transition bg-white">
                  <td className="p-5 font-semibold text-gray-700 bg-gradient-to-b from-gray-100 to-gray-50 border-r border-gray-200">
                    {t('cars.seatingCapacity')}
                  </td>
                  {selectedCars.map((car, idx) => (
                    <td key={car._id} className={`p-5 text-center min-w-[280px] border-r border-gray-200 ${idx === selectedCars.length - 1 ? 'border-r-0' : ''}`}>
                      <div className="flex items-center justify-center gap-2">
                        <img src={assets.users_icon} alt="seating" className="w-5 h-5" />
                        <span className="text-gray-700 font-medium">{car.seating_capacity} Seats</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Fuel Type */}
                <tr className="hover:bg-gray-50 transition">
                  <td className="p-5 font-semibold text-gray-700 bg-gradient-to-b from-gray-100 to-gray-50 border-r border-gray-200">
                    {t('cars.fuelType')}
                  </td>
                  {selectedCars.map((car, idx) => (
                    <td key={car._id} className={`p-5 text-center min-w-[280px] border-r border-gray-200 ${idx === selectedCars.length - 1 ? 'border-r-0' : ''}`}>
                      <div className="flex items-center justify-center gap-2">
                        <img src={assets.fuel_icon} alt="fuel" className="w-5 h-5" />
                        <span className="text-gray-700 font-medium">{car.fuel_type}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Transmission */}
                <tr className="hover:bg-gray-50 transition bg-white">
                  <td className="p-5 font-semibold text-gray-700 bg-gradient-to-b from-gray-100 to-gray-50 border-r border-gray-200">
                    {t('cars.transmission')}
                  </td>
                  {selectedCars.map((car, idx) => (
                    <td key={car._id} className={`p-5 text-center min-w-[280px] border-r border-gray-200 ${idx === selectedCars.length - 1 ? 'border-r-0' : ''} text-gray-700 font-medium`}>
                      {car.transmission}
                    </td>
                  ))}
                </tr>

                {/* Location */}
                <tr className="hover:bg-gray-50 transition">
                  <td className="p-5 font-semibold text-gray-700 bg-gradient-to-b from-gray-100 to-gray-50 border-r border-gray-200">
                    {t('owner.location')}
                  </td>
                  {selectedCars.map((car, idx) => (
                    <td key={car._id} className={`p-5 text-center min-w-[280px] border-r border-gray-200 ${idx === selectedCars.length - 1 ? 'border-r-0' : ''}`}>
                      <div className="flex items-center justify-center gap-2">
                        <img src={assets.location_icon} alt="location" className="w-5 h-5" />
                        <span className="text-gray-700">{car.location}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Price Per Day */}
                <tr className="hover:bg-gray-50 transition">
                  <td className="p-5 font-semibold text-gray-700 bg-gradient-to-b from-gray-100 to-gray-50 border-r border-gray-200">
                    {t('owner.pricePerDay')}
                  </td>
                  {selectedCars.map((car, idx) => (
                    <td key={car._id} className={`p-5 text-center min-w-[280px] border-r border-gray-200 ${idx === selectedCars.length - 1 ? 'border-r-0' : ''}`}>
                      <div className="text-3xl font-bold text-primary">
                        ${car.pricePerDay}
                        <div className="text-xs text-gray-500 font-normal mt-1">/ {t('common.day')}</div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Availability */}
                <tr className="hover:bg-gray-50 transition">
                  <td className="p-5 font-semibold text-gray-700 bg-gradient-to-b from-gray-100 to-gray-50 border-r border-gray-200">
                    {t('common.isAvailable')}
                  </td>
                  {selectedCars.map((car, idx) => (
                    <td key={car._id} className={`p-5 text-center min-w-[280px] border-r border-gray-200 ${idx === selectedCars.length - 1 ? 'border-r-0' : ''}`}>
                      <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                          car.isAvailable
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {car.isAvailable ? '✓ ' : '✕ '}{car.isAvailable ? t('common.isAvailable') : t('common.notAvailable')}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Book Now */}
                <tr className="from-blue-50 to-blue-50 hover:from-blue-100 hover:to-blue-100 transition">
                  <td className="p-5 font-semibold text-gray-700  from-blue-100 to-blue-50 border-r border-gray-200"></td>
                  {selectedCars.map((car, idx) => (
                    <td key={car._id} className={`p-5 text-center min-w-[280px] border-r border-gray-200 ${idx === selectedCars.length - 1 ? 'border-r-0' : ''}`}>
                      <button
                        onClick={() => handleBookNow(car)}
                        disabled={!car.isAvailable}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition transform hover:scale-105 ${
                          car.isAvailable
                            ? 'bg-primary text-white hover:bg-blue-700 shadow-md hover:shadow-lg cursor-pointer'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {t('cars.book')}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t bg-gray-50 p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:items-center">
            {selectedCars.length < 3 && (
              <button
                onClick={onAddMore}
                className="w-full sm:w-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer"
              >
                + {t('common.addMore')}
              </button>
            )}
            <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-3 sm:ml-auto">
              <button
                onClick={() => {
                  setSelectedCars([]);
                  setShowComparison(false);
                  localStorage.removeItem('comparisonCars');
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium cursor-pointer"
              >
                {t('common.clearAll')}
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium cursor-pointer"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarComparison;
