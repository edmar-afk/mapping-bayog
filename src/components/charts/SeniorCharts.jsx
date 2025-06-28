import { useState, useEffect } from "react";import Chart from "react-apexcharts";import api from "../../assets/api";

function SeniorCharts() {
	const [, setData] = useState([]);
	const [ageCounts, setAgeCounts] = useState([0, 0, 0, 0]);
	const [genderCounts, setGenderCounts] = useState({ Male: 0, Female: 0 });

	useEffect(() => {
		const fetchSeniors = async () => {
			try {
				const response = await api.get(`/api/seniors/`);
				const fetchedData = response.data;
				setData(fetchedData);

				const ageGroupCounts = [0, 0, 0, 0];
				const genderGroupCounts = { Male: 0, Female: 0 };

				fetchedData.forEach((person) => {
					const age = parseInt(person.age);
					const gender = person.gender;

					if (!isNaN(age)) {
						if (age >= 50 && age <= 70) ageGroupCounts[0]++;
						else if (age >= 71 && age <= 90) ageGroupCounts[1]++;
						else if (age >= 91 && age <= 99) ageGroupCounts[2]++;
						else if (age >= 100) ageGroupCounts[3]++;
					}

					if (gender === "Male" || gender === "Female") {
						genderGroupCounts[gender]++;
					}
				});

				setAgeCounts(ageGroupCounts);
				setGenderCounts(genderGroupCounts);
			} catch (error) {
				console.error("Error fetching data:", error);
				setData([]);
				setAgeCounts([0, 0, 0, 0]);
				setGenderCounts({ Male: 0, Female: 0 });
			}
		};

		fetchSeniors();
	}, []);

	const ageChartOptions = {
		chart: {
			type: "line",
			zoom: { enabled: false },
		},
		dataLabels: { enabled: false },
		stroke: { curve: "straight" },
		title: {
			text: "Senior Age",
			align: "left",
		},
		grid: {
			row: {
				colors: ["#f3f3f3", "transparent"],
				opacity: 0.5,
			},
		},
		xaxis: {
			categories: ["50–70", "71–90", "91–99", "100+"],
		},
	};

	const genderChartOptions = {
		chart: {
			type: "line",
			zoom: { enabled: false },
		},
		dataLabels: { enabled: false },
		stroke: { curve: "straight" },
		title: {
			text: "Senior Gender",
			align: "left",
		},
		grid: {
			row: {
				colors: ["#f3f3f3", "transparent"],
				opacity: 0.5,
			},
		},
		xaxis: {
			categories: ["Male", "Female"],
		},
	};

	const ageSeries = [
		{
			name: "Count",
			data: ageCounts,
		},
	];

	const genderSeries = [
		{
			name: "Count",
			data: [genderCounts.Male, genderCounts.Female],
		},
	];

	return (
		<div className="flex flex-row w-full space-x-8 pt-12 px-8">
			<div className="flex-1">
				<Chart
					options={ageChartOptions}
					series={ageSeries}
					type="line"
					height={350}
					width="100%"
				/>
			</div>
			<div className="flex-1">
				<Chart
					options={genderChartOptions}
					series={genderSeries}
					type="line"
					height={350}
					width="100%"
				/>
			</div>
		</div>
	);
}

export default SeniorCharts;
