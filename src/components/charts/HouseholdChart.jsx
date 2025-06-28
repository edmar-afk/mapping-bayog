import { useState, useEffect } from "react";import api from "../../assets/api";

function HouseholdChart() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchHousehold = async () => {
			try {
				const response = await api.get(`/api/households/`);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching Households:", error);
				setData([]);
			}
		};

		fetchHousehold();
	}, []);

	return (
		<>
			<p className="text-gray-800 text-center pt-12 text-4xl font-extrabold">HOUSEHOLD</p>
			<div className="flex flex-wrap gap-4 justify-center">
				{data.map((household, index) => (
					<div
						key={index}
						className="w-full md:w-[48%] bg-white p-8 overflow-auto mt-8 rounded-lg shadow">
						<h2 className="text-2xl mb-4 text-center text-[#2B4DC9] font-bold">{household.family_name} Family</h2>

						{household.members && household.members.length > 0 ? (
							<div className="relative overflow-auto">
								<div className="overflow-x-auto rounded-lg">
									<table className="min-w-full bg-white border mb-4">
										<thead>
											<tr className="bg-[#2B4DC994] text-center text-xs md:text-sm font-thin text-white">
												<th className="p-0">
													<span className="block py-2 px-3 border-r border-gray-300">Name</span>
												</th>
												<th className="p-0">
													<span className="block py-2 px-3 border-r border-gray-300">Age</span>
												</th>
												<th className="p-0">
													<span className="block py-2 px-3 border-r border-gray-300">Role</span>
												</th>
											</tr>
										</thead>
										<tbody>
											{household.members.map((member, i) => (
												<tr
													key={i}
													className="border-b text-xs md:text-sm text-center text-gray-800">
													<td className="p-2 md:p-4">{member.name}</td>
													<td className="p-2 md:p-4">{member.age}</td>
													<td className="p-2 md:p-4">{member.role}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						) : (
							<p className="text-gray-500 italic text-center">No family members found.</p>
						)}
					</div>
				))}
			</div>
		</>
	);
}

export default HouseholdChart;
