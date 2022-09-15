import React from "react";
import "./emptyState.scss";

function EmptyState() {
	return (
		<>
			<div className="empty">
				<p className="empty__title">No pokemon Available</p>
			</div>
		</>
	);
}

export default EmptyState;
