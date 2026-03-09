import React, { useState } from "react";
import Title from "../components/Title";
import { assets, dummyCarData } from "../assets/assets";
import CarCard from "../components/CarCard";
import CarComparison from "../components/CarComparison";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const Cars = () => {
  const { t } = useTranslation();
  // getting search params from the URL
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios, selectedCars, setSelectedCars, showComparison, setShowComparison, handleAddToComparison, handleRemoveFromComparison, search, setSearch } = useAppContext();
  
  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filteredCars, setFilteredCars] = useState([]);
  const [category, setCategory] = useState([]);
  const [fuel, setFuel] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [showFilter, setShowFilter] = useState(false);

  const toggleCategory = (value) => {
    if (category.includes(value)) {
      setCategory(prev => prev.filter(item => item !== value));
    } else {
      setCategory(prev => [...prev, value]);
    }
  }

  const toggleFuel = (value) => {
    if (fuel.includes(value)) {
      setFuel(prev => prev.filter(item => item !== value));
    } else {
      setFuel(prev => [...prev, value]);
    }
  }

  const applyFilter = async () => {
    let tempCars = cars.slice();

    if (search) {
      const searchLower = search.toLowerCase();
      tempCars = tempCars.filter(car => 
        car.brand.toLowerCase().includes(searchLower) ||
        car.model.toLowerCase().includes(searchLower) ||
        car.category.toLowerCase().includes(searchLower) ||
        car.transmission.toLowerCase().includes(searchLower)
      );
    }

    if (category.length > 0) {
      tempCars = tempCars.filter(car => category.includes(car.category));
    }

    if (fuel.length > 0) {
      tempCars = tempCars.filter(car => fuel.includes(car.fuel_type));
    }

    // Sort Logic
    switch (sortType) {
      case 'low-high':
        setFilteredCars(tempCars.sort((a, b) => (a.pricePerDay - b.pricePerDay)));
        break;
      case 'high-low':
        setFilteredCars(tempCars.sort((a, b) => (b.pricePerDay - a.pricePerDay)));
        break;
      case 'newest':
        setFilteredCars(tempCars.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt))));
        break;
      default:
        setFilteredCars(tempCars);
        break;
    }
  };

  const searchCarAvailability = async () => {
    const { data } = await axios.post("/api/bookings/check-availability", {
      location: pickupLocation,
      pickupDate,
      returnDate,
    });

    if (data.success) {
      setFilteredCars(data.availableCars);

      if (data.availableCars.length === 0) {
        toast.error(t("cars.noResults"));
      }
      return null;
    }
  };

  useEffect(() => {
    isSearchData && searchCarAvailability();
  }, []);

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter();
  }, [search, cars, category, fuel, sortType]);

  return (
    <div>
      {showComparison && (
        <CarComparison
          selectedCars={selectedCars}
          onRemove={handleRemoveFromComparison}
          onClose={() => setShowComparison(false)}
          onAddMore={() => {
            setShowComparison(false);
            setTimeout(() => window.scrollTo(0, 0), 100);
          }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center py-20 bg-light max-md:px-4"
      >
        <Title
          title={t("cars.title")}
          subtitle="Browse our selection of premium vehicles available for your next adventure"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow"
        >
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2" />

          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder={t("cars.search")}
            className="w-full h-full outline-none text-gray-500"
          />

          <img 
            onClick={() => setShowFilter(!showFilter)}
            src={assets.filter_icon} 
            alt="" 
            className="w-4.5 h-4.5 ml-2 cursor-pointer lg:hidden" 
          />
        </motion.div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-1 sm:gap-10 px-6 md:px-16 lg:px-24 xl:px-32 mt-10 max-w-7xl mx-auto">
        
        {/* Filter Sidebar */}
        <div className="min-w-60">
          <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2 uppercase font-medium">FILTERS
            <img className={`h-3 lg:hidden transition-all ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          </p>

          {/* Category Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} lg:block rounded-lg`}>
            <p className="mb-3 text-sm font-medium uppercase">Categories</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Convertible'].map((item) => (
                <p key={item} className="flex gap-2">
                  <input className="w-3" type="checkbox" value={item} onChange={() => toggleCategory(item)} checked={category.includes(item)} /> {item}
                </p>
              ))}
            </div>
          </div>

          {/* Fuel Filter */}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} lg:block rounded-lg`}>
            <p className="mb-3 text-sm font-medium uppercase">Fuel Type</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map((item) => (
                <p key={item} className="flex gap-2">
                  <input className="w-3" type="checkbox" value={item} onChange={() => toggleFuel(item)} checked={fuel.includes(item)} /> {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Car Listing */}
        <div className="flex-1">
          <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
            <p className="text-gray-500 text-sm sm:text-base">
              Showing {filteredCars.length} Cars
            </p>
            
            {/* Sort Dropdown */}
            <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2 py-1 rounded-md outline-none bg-white">
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Price (Low to High)</option>
              <option value="high-low">Sort by: Price (High to Low)</option>
              <option value="newest">Sort by: Newest Arrivals</option>
            </select>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredCars.map((car, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.4 }}
                key={idx}
              >
                <CarCard
                  car={car}
                  onCompare={handleAddToComparison}
                  isComparing={selectedCars.some(c => c._id === car._id)}
                />
              </motion.div>
            ))}

            {filteredCars.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-400">
                No cars found matching your criteria.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
