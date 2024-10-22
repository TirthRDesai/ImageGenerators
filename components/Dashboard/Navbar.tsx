import { pageType, useUser } from "@/context/context";
import React, { useEffect, useState } from "react";

const MenuItemDesign = ({ href, label }: { href: string; label: pageType }) => {
	const { page, setPage } = useUser();

	const [extra, setExtra] = useState(
		"hover:bg-slate-100 hover:text-black/80"
	);

	const [is_selected, setIs_selected] = useState(page === label);

	useEffect(() => {
		setIs_selected(page === label);
	}, [page]);

	useEffect(() => {
		if (is_selected) {
			setExtra("border-none bg-zinc-200 text-black ");
		} else {
			setExtra("hover:bg-slate-100 hover:text-black/80");
		}
	}, [is_selected]);

	return (
		<span
			className={
				"rounded-lg px-4 py-1.5 cursor-pointer flex items-center justify-center duration-200 transition-all ease-in-out " +
				extra
			}
			onClick={() => {
				if (page !== label) {
					setPage(label);
					window.location.href = href;
				}
			}}
		>
			<a>{label}</a>
		</span>
	);
};

function Navbar() {
	const { page, setPage } = useUser();

	return (
		<nav className="flex w-full min-h-[80px] rounded-b-lg text-white/85 max-h-md bg-transparent/50 shadow-white/60 shadow-md fixed z-50 backdrop-blur-md">
			<ul className="flex items-center justify-between px-4 py-3 w-full">
				<li className="text-xl font-semibold">Website Name</li>
				<li className="flex justify-stretch gap-6 items-stretch">
					{menuItems.map((item, index) => (
						<MenuItemDesign
							key={item.key}
							href={item.url}
							label={item.label}
						/>
					))}
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;

interface MenuItem {
	label: pageType;
	url: string;
	key: string;
}

const menuItems: MenuItem[] = [
	{
		key: "menu1",
		label: "Home",
		url: "/Dashboard",
	},
	{
		key: "menu2",
		label: "Models",
		url: "/Models",
	},
	{
		key: "menu3",
		label: "Contact",
		url: "/contact",
	},
];
