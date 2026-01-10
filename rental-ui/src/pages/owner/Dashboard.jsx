import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const {axios, isOwner, currency} = useAppContext();
    const { t } = useTranslation();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: t('owner.totalCars'), value: data.totalCars, icon: assets.carIconColored },
    {
      title: t('owner.totalBookings'),
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: t('owner.pendingBookings'),
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: t('owner.completedBookings'),
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const {data} = await axios.get('/api/owner/dashboard')
      if(data.success){
        setData(data.dashboardData)
      }  else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(isOwner){
      fetchDashboardData()
    }
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title
        title={t('owner.dashboard')}
        subTitle={t('owner.dashboardSubtitle')}
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {dashboardCards.map((card, idx) => (
          <div
            key={idx}
            className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor"
          >
            <div>
              <h1 className="text-xs text-gray-500">{card.title}</h1>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>

            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <img src={card.icon} alt="" className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        {/* Recent Bookings */}
        <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
          <h1 className="text-lg font-medium">{t('owner.recentBookings')}</h1>
          <p className="text-gray-500">{t('owner.latestCustomerBookings')}</p>
          {data.recentBookings.map((booking, idx) => (
            <div key={idx} className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <img
                    src={assets.listIconColored}
                    alt=""
                    className="h-5 w-5"
                  />
                </div>

                <div>
                  <p>
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-medium">
                <p className="text-sm text-gray-500">{booking.price}</p>
                <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">
                  {currency}{booking.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Revenue */}
      <div className="p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs">
        <h1 className="text-lg font-medium">{t('owner.monthlyRevenue')}</h1>
        <p className="text-gray-500">{t('owner.monthlyRevenueSubtitle')}</p>
        <p className="text-3xl mt-6 font-semibold text-primary">{currency}{data.monthlyRevenue}</p>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
