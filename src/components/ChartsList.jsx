import React from "react";
import { Link } from "react-router-dom";

const ChartsList = ({ scans }) => {
	return (
		<div className="chartslist">
			{scans.map((scan) => (
				<div className="list" key={scan.id}>
					<Link to={`/${scan.id}`}>
						<div className="title">{scan.name}</div>
						<div className={`subtitle ${scan.color}`}>{scan.tag}</div>
					</Link>
				</div>
			))}
		</div>
	);
};

export default ChartsList;
