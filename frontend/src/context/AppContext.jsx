import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { doctors as staticDoctors } from "../assets/assets";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
	const currencySymbol = "₹";
	const backendUrl = "https://ski-medical-mern-stack-backend.onrender.com";

	const [doctors, setDoctors] = useState([]);
	const [token, setToken] = useState(
		localStorage.getItem("token") ? localStorage.getItem("token") : ""
	);
	const [userData, setUserData] = useState(false);

	// Getting Doctors using API
	const getDoctorsData = async () => {
		try {
			const { data } = await axios.get(backendUrl + "/api/doctor/list");
			// 	if (data.success) {
			// 		setDoctors(data.doctors);
			// 	} else {
			// 		toast.error(data.message);
			// 	}
			// } catch (error) {
			// 	console.log(error);
			// 	toast.error(error.message);
			// }
			if (data.success) {
				const mergedDoctors = [...staticDoctors, ...data.doctors];
				setDoctors(mergedDoctors);
			} else {
				toast.error(data.message);
				setDoctors(staticDoctors); // fallback
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to fetch doctors from server. Using static data.");
			setDoctors(staticDoctors); // fallback
		}
	};

	// Getting User Profile using API
	const loadUserProfileData = async () => {
		try {
			const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
				headers: { token },
			});

			if (data.success) {
				setUserData(data.userData);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getDoctorsData();
	}, []);

	useEffect(() => {
		if (token) {
			loadUserProfileData();
		}
	}, [token]);

	const value = {
		doctors,
		getDoctorsData,
		currencySymbol,
		backendUrl,
		token,
		setToken,
		userData,
		setUserData,
		loadUserProfileData,
	};

	return (
		<AppContext.Provider value={value}>{props.children}</AppContext.Provider>
	);
};

export default AppContextProvider;
