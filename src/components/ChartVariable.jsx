import React from "react";
import { useParams } from "react-router-dom";

const ChartVariable = ({ scans }) => {
	const { id, criteria, va } = useParams();
	const scan = scans.find((scan) => scan.id === parseInt(id));
	const values = scan?.criteria[criteria].variable[va];
	return (
		<>
			{scan && (
				<div className="chartslist chartvariable">
					{values.type === "value" &&
						values.values.map((value, index) => (
							<div className="list" key={index}>
								<div className="title">{value}</div>
							</div>
						))}
					{values.type === "indicator" && (
						<div>
							<div className="title">{values.study_type}</div>
							<div className="subtitle">Set Parameters</div>
							<div className="indicator">
								<div>Period</div>
								<input type="text" defaultValue={values.default_value} />
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default ChartVariable;
