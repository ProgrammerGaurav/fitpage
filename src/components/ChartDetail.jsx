import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FormatCriteria = (id, criteria, index) => {
	if (criteria.type === "plain_text") {
		return criteria.text;
	} else if (criteria.type === "variable") {
		let criteriaText = criteria.text;
		for (var key of Object.keys(criteria.variable)) {
			if (criteria.variable[key].type === "value") {
				criteriaText = criteriaText.replace(
					key,
					`<a
						href="/${id}/${index}/${key}"
					>
						(${criteria.variable[key].values[0]})
					</a>`
				);
			} else if (criteria.variable[key].type === "indicator") {
				criteriaText = criteriaText.replace(
					key,
					`<a
						href="/${id}/${index}/${key}"
					>
						(${criteria.variable[key].default_value})
					</a>`
				);
			}
		}
		return criteriaText;
	}
};

const ChartDetail = ({ scans }) => {
	const { id } = useParams();
	const scan = scans.find((scan) => scan.id === parseInt(id));
	let navigate = useNavigate();
	useEffect(() => {
		const links = document.querySelectorAll(".criteria a");
		links.forEach((link) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				navigate(link.getAttribute("href"));
			});
		});
	}, []);
	return (
		<>
			{scan && (
				<div className="chartslist chartdetail">
					<div className="list" key={scan.id}>
						<div className="title">{scan.name}</div>
						<div className={`subtitle ${scan.color}`}>{scan.tag}</div>
					</div>
					{scan.criteria.map((cri, index) => (
						<div className="criteria" key={index}>
							<div
								className="title"
								dangerouslySetInnerHTML={{ __html: FormatCriteria(id, cri, index) }}
							/>
							{scan.criteria.length - 1 !== index && <div className="subtitle">and</div>}
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default ChartDetail;
