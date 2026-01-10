import React, { useEffect, useState } from "react";
import { assets, dummyCarData } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useTranslation } from 'react-i18next';

const ManageCars = () => {
  const {isOwner, axios, currency} = useAppContext();
  const { t } = useTranslation();

  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const {data} = await axios.get('/api/owner/cars')
      if(data.success){
        setCars(data.cars)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const {data} = await axios.post('/api/owner/toggle-car', {carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const deleteCar = async (carId) => {
    try {
      const confirmDelete = window.confirm(t('owner.confirmDelete'))

      if(!confirmDelete) return null

      const {data} = await axios.post('/api/owner/delete-car', {carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title={t('owner.manageCars')}
        subTitle={t('owner.manageCarsSubtitle')}
      />

      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">{t('owner.table.car')}</th>
              <th className="p-3 font-medium max-md:hidden">{t('owner.table.category')}</th>
              <th className="p-3 font-medium">{t('owner.table.price')}</th>
              <th className="p-3 font-medium max-md:hidden">{t('owner.table.status')}</th>
              <th className="p-3 font-medium">{t('owner.table.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, idx) => (
              <tr key={idx} className="border-t border-borderColor">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={car.image}
                    className="h-12 w-12 aspect-square rounded-md object-cover"
                    alt=""
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {car.brand} {car.model}
                    </p>
                    <p className="font-medium">
                      {car.seating_capacity} • {car.transmission}
                    </p>
                  </div>
                </td>

                <td className="p-3 max-md:hidden">{car.category}</td>
                <td className="p-3">
                  {currency}
                  {car.pricePerDay}/day
                </td>

                <td className="p-3 max-md:hidden">
                    <span className={`px-3 py-1 rounded-full text-xs ${car.isAvailable ? 'bg-green-100 text-green' : 'bg-red-100 text-red-500'}`}>
                      {car.isAvailable ? t('common.isAvailable') : t('common.notAvailable')}
                    </span>
                </td>

                <td className="flex items-center p-3">
                    <img src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon} onClick={() => toggleAvailability(car._id)} alt="" className="cursor-pointer" />
                    <img src={assets.delete_icon} onClick={() => deleteCar(car._id)} alt="" className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;
