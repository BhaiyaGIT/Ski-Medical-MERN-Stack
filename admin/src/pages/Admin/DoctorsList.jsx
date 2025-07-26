import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
	const { doctors, changeAvailability, aToken, getAllDoctors } =
		useContext(AdminContext);

	useEffect(() => {
		if (aToken) {
			getAllDoctors();
		}
	}, [aToken]);

	return (
		<div className="m-5 max-h-[90vh] overflow-y-scroll">
			<h1 className="text-lg font-medium">All Doctors</h1>
			<div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
				{doctors.map((item, index) => (
					<div
						className="border border-[#C9D8FF] rounded-xl w-56 h-85 overflow-hidden cursor-pointer group flex flex-col"
						key={index}
					>
						<div className="w-full h-60 bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500 flex items-center justify-center">
							<img
								src={item.image}
								alt=""
								className="object-contain max-h-full max-w-full"
							/>
						</div>
						<div className="p-4 flex-1 bg-white">
							<p className="text-[#262626] text-lg font-medium">{item.name}</p>
							<p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
							<div className="mt-2 flex items-center gap-1 text-sm">
								<input
									onChange={() => changeAvailability(item._id)}
									type="checkbox"
									checked={item.available}
								/>
								<p>Available</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default DoctorsList;
