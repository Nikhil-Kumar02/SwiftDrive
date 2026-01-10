import React, { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useTranslation } from 'react-i18next';

const ManageBookings = () => {
  const {currency, axios} = useAppContext()
  const { t } = useTranslation()
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    try {
      const {data} = await axios.get('/api/bookings/owner')
      data.success ? setBookings(data.bookings) : toast.error(data.message)
    } catch(error) {
      toast.error(error.message)
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const {data} = await axios.post('/api/bookings/change-status', {bookingId, status})
      if(data.success){
        toast.success(data.message)
        fetchOwnerBookings() 
      } else {
        toast.error(data.message)
      }
    } catch(error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title={t('owner.manageBookings')}
        subTitle={t('owner.manageBookingsSubtitle')}
      />

      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">{t('owner.table.car')}</th>
              <th className="p-3 font-medium max-md:hidden">{t('owner.table.dateRange')}</th>
              <th className="p-3 font-medium">{t('owner.table.total')}</th>
              <th className="p-3 font-medium max-md:hidden">{t('owner.table.payment')}</th>
              <th className="p-3 font-medium">{t('owner.table.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <tr key={idx} className="border-t border-borderColor text-gray-500">
                <td className="p-3 flex items-center gap-3">
                    <img src={booking.car.image} alt="" className="h-12 w-12 aspect-square rounded-md object-cover" />
                    <p className="font-medium max-md:hidden">{booking.car.brand}{booking.car.model}</p>
                </td>

                <td className="p-3 max-md:hidden">
                  {booking.pickupDate.split('T')[0]} {t('common.to')} {booking.returnDate.split('T')[0]}
                </td>

                <td className="p-3">
                    {currency}{booking.price}
                </td>

                <td className="p-3 max-md:hidden">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">{t('owner.table.offline')}</span>
                </td>

                <td className="p-3">
                    {booking.status === 'pending' ? (
                      <select onChange={e => changeBookingStatus(booking._id, e.target.value)} value={booking.status} className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none">
                        <option value="pending">{t('booking.pending')}</option>
                        <option value="cancelled">{t('booking.cancelled')}</option>
                        <option value="confirmed">{t('booking.confirmed')}</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>{t(`booking.${booking.status}`)}</span>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
