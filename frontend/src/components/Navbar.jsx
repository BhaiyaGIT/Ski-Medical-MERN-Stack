import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import logofinal from "../assets/logofinal.png";

const Navbar = () => {
	const navigate = useNavigate();

	const [showMenu, setShowMenu] = useState(false);
	const { token, setToken, userData } = useContext(AppContext);

	const logout = () => {
		localStorage.removeItem("token");
		setToken(false);
		navigate("/login");
	};

	return (
		<div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD] overflow-visible">
			<img
				onClick={() => navigate("/")}
				className="w-64 cursor-pointer hover:bg-white hover:scale-125  transition-all duration-300 "
				src={logofinal}
				alt="Welcome to SkiCare Medical & Diagnostic"
			/>
			<ul className="md:flex items-center gap-8 px-6 py-4 font-medium hidden">
				<NavLink to="/">
					<li className="py-1 text-2xl hover:text-primary transition duration-300 hover:bg-white hover:text-3xl hover:scale-105">
						HOME
					</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>

				<NavLink to="/doctors">
					<li className="py-1 text-2xl hover:text-primary transition duration-300 hover:bg-white hover:text-3xl hover:scale-105">
						ALL DOCTORS
					</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>

				<NavLink to="/about">
					<li className="py-1 text-2xl hover:text-primary transition duration-300 hover:bg-white hover:text-3xl hover:scale-105">
						ABOUT
					</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>

				<NavLink to="/contact">
					<li className="py-1 text-2xl hover:text-primary transition duration-300 hover:bg-white hover:text-3xl hover:scale-105">
						CONTACT
					</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>
			</ul>

			<div className="flex items-center gap-4  ">
				{token && userData ? (
					<div className="flex items-center gap-2 cursor-pointer group relative transition-all duration-300 hover:scale-115">
						<img
							className="w-8 h-8 rounded-full transition-transform duration-300 group-hover:scale-110"
							src={userData.image}
							alt="User"
						/>
						<img
							className="w-2.5 transition-transform duration-300 group-hover:scale-110"
							src={assets.dropdown_icon}
							alt="Dropdown"
						/>
						<div className="absolute top-0 right-0 pt-14 text-lg font-medium text-red-900 z-20 hidden  hover:scale-105 group-hover:block">
							<div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
								<p
									onClick={() => navigate("/my-profile")}
									className="hover:text-black cursor-pointer hover:text-xl hover:scale-105"
								>
									My Profile
								</p>
								<p
									onClick={() => navigate("/my-appointments")}
									className="hover:text-black cursor-pointer hover:text-xl hover:scale-105"
								>
									My Appointments
								</p>
								<p
									onClick={logout}
									className="hover:text-black cursor-pointer hover:text-xl hover:scale-105"
								>
									Logout
								</p>
							</div>
						</div>
					</div>
				) : (
					<button
						onClick={() => navigate("/login")}
						className="bg-orange-300 text-indigo-600 px-10 py-2 rounded-full font-extrabold hidden text-lg md:block transition duration-300 hover:bg-primary hover:text-xl hover:text-black cursor-pointer hover:scale-105"
					>
						Login or Register
					</button>
				)}
				<img
					onClick={() => setShowMenu(true)}
					className="w-6 md:hidden"
					src={assets.menu_icon}
					alt=""
				/>

				{/* ---- Mobile Menu ---- */}
				<div
					className={`md:hidden ${
						showMenu ? "fixed w-full" : "h-0 w-0"
					} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
				>
					<div className="flex items-center justify-between px-5 py-6">
						<img
							src={assets.logo2}
							className="w-36"
							alt=""
						/>
						<img
							onClick={() => setShowMenu(false)}
							src={assets.cross_icon}
							className="w-7"
							alt=""
						/>
					</div>
					<ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
						<NavLink
							onClick={() => setShowMenu(false)}
							to="/"
						>
							<p className="px-4 py-2 rounded full inline-block">HOME</p>
						</NavLink>
						<NavLink
							onClick={() => setShowMenu(false)}
							to="/doctors"
						>
							<p className="px-4 py-2 rounded full inline-block">ALL DOCTORS</p>
						</NavLink>
						<NavLink
							onClick={() => setShowMenu(false)}
							to="/about"
						>
							<p className="px-4 py-2 rounded full inline-block">ABOUT</p>
						</NavLink>
						<NavLink
							onClick={() => setShowMenu(false)}
							to="/contact"
						>
							<p className="px-4 py-2 rounded full inline-block">CONTACT</p>
						</NavLink>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
