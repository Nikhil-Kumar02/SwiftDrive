import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

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
    chartData: []
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
    <div className="px-4 pt-10 md:px-10 flex-1 bg-gray-50/30">
      <Title
        title={t('owner.dashboard')}
        subTitle={t('owner.dashboardSubtitle')}
      />
      
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {dashboardCards.map((card, idx) => (
          <div
            key={idx}
            className="flex gap-4 items-center justify-between p-6 rounded-xl border border-borderColor bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <h1 className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">{card.title}</h1>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>

            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/5">
              <img src={card.icon} alt="" className="h-6 w-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Revenue Chart */}
        <div className="p-6 border border-borderColor rounded-xl bg-white shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Revenue Overview (Last 6 Months)</h2>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.chartData}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                        <Tooltip />
                        <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Bookings Chart */}
        <div className="p-6 border border-borderColor rounded-xl bg-white shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Booking Activity</h2>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                        <Tooltip />
                        <Bar dataKey="bookings" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
        {/* Recent Bookings List */}
        <div className="xl:col-span-2 p-6 border border-borderColor rounded-xl bg-white shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-lg font-bold text-gray-800">{t('owner.recentBookings')}</h1>
              <p className="text-sm text-gray-400">{t('owner.latestCustomerBookings')}</p>
            </div>
          </div>
          <div className="space-y-4">
            {data.recentBookings.map((booking, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 border border-transparent hover:border-borderColor transition-all group">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-16 overflow-hidden rounded-lg">
                    <img src={booking.car.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {booking.car.brand} {booking.car.model}
                    </p>
                    <p className="text-xs text-gray-400">
                      Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <p className="font-bold text-gray-800">{currency}{booking.price}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
            {data.recentBookings.length === 0 && <p className="text-center py-10 text-gray-400">No bookings yet.</p>}
          </div>
        </div>

        {/* Total Monthly Summary Card */}
        <div className="p-8 border border-borderColor rounded-xl bg-primary text-white shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-xl font-medium opacity-80 mb-2">{t('owner.monthlyRevenue')}</h1>
            <p className="text-4xl font-bold">{currency}{data.monthlyRevenue.toLocaleString()}</p>
            <p className="text-sm mt-4 opacity-70 leading-relaxed">{t('owner.monthlyRevenueSubtitle')}</p>
          </div>
          <div className="mt-10 relative z-10">
            <button className="w-full py-3 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-colors">
              Withdraw Earnings
            </button>
          </div>
          {/* Decorative background element */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
