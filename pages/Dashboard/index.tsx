import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Dashboard/Navbar";
import LandingPage from "../../components/Dashboard/LandingPage";
import GeneratedImagesSection from "../../components/Dashboard/GeneratedImagesSection";
import { useUser } from "@/context/context";
import Background from "@/components/Dashboard/Background";

function Dashboard() {
	const { setPage } = useUser();

	useEffect(() => {
		setPage("Home");
	}, []);
	return (
		<main
			className="w-screen h-screen overflow-x-hidden"
			id="mainDashboardSectionId"
		>
			<Background />

			<LandingPage />
			<GeneratedImagesSection />
		</main>
	);
}

export default Dashboard;
