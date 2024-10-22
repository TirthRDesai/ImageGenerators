import { useUser } from "@/context/context";
import React from "react";
import Navbar from "./Dashboard/Navbar";

function CheckForNavbar() {
	const { page } = useUser();
	return (
		<>
			{page != "login" && page != "signup" && page != "forgotpassword" ? (
				<Navbar />
			) : null}
		</>
	);
}

export default CheckForNavbar;
