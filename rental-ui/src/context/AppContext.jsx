import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY;

    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [pickupDate, setPickupDate] = useState('')
    const [returnDate, setReturnDate] = useState('')

    const [cars, setCars] = useState([])
    const [selectedCars, setSelectedCars] = useState([])
    const [showComparison, setShowComparison] = useState(false)

    // Function to handle adding/removing cars from comparison
    const handleAddToComparison = (car) => {
        if (selectedCars.some(c => c._id === car._id)) {
            const updated = selectedCars.filter(c => c._id !== car._id);
            setSelectedCars(updated);
            if (updated.length === 0) setShowComparison(false);
        } else {
            if (selectedCars.length < 3) {
                const updated = [...selectedCars, car];
                setSelectedCars(updated);
                setShowComparison(true);
                toast.success(`Added ${car.brand} ${car.model}`);
            } else {
                toast.error('Maximum 3 cars can be compared');
            }
        }
    };

    const handleRemoveFromComparison = (carId) => {
        const updated = selectedCars.filter(c => c._id !== carId);
        setSelectedCars(updated);
        if (updated.length === 0) setShowComparison(false);
    };

    // Load comparison cars from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('comparisonCars');
        if (saved) {
            setSelectedCars(JSON.parse(saved));
        }
    }, []);

    // Save comparison cars to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('comparisonCars', JSON.stringify(selectedCars));
    }, [selectedCars]);

    // Function to check if user is logged in
    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/user/data')
            if(data.success) {
                setUser(data.user);
                setIsOwner(data.user.role === 'owner')
            } else {
                navigate('/')
            }
        } catch(error) {
            toast.error(error.message)
        }
    }

    // Function to fetch all cars from ther server
    const fetchCars = async () => {
        try {
            const {data} = await axios.get('/api/user/cars')
            data.success ? setCars(data.cars) : toast.error(data.message)
        } catch(error) {
            toast.error(error.message)
        }
    }

    // Function to logout the user
    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        axios.defaults.headers.common['Authorization'] = ''
        toast.success('You have been logged out successfully')
    }

    // useEffect to the retrieve token from localStorage
    useEffect(() => {
        const token = localStorage.getItem('token')
        setToken(token);
        fetchCars()
    }, [])

    // useEffect to fetch user data when token is available
    useEffect(() => {
        if(token) {
            axios.defaults.headers.common['Authorization'] = `${token}`
            fetchUser()
        }
    }, [token])

    const value = {
        navigate, currency, axios, user, setUser, token, setToken, isOwner, setIsOwner, fetchUser, showLogin, setShowLogin, logout, fetchCars, cars, setCars, pickupDate, setPickupDate, returnDate, setReturnDate, selectedCars, setSelectedCars, showComparison, setShowComparison, handleAddToComparison, handleRemoveFromComparison
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}