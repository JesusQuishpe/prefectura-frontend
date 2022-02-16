import { Button, Form } from "react-bootstrap";

import React from 'react';

export const FilterComponent = ({filterText,onFilter,onClear,placeholder}) => {
  return (
    <>
		<Form.Control
			id="search"
			type="search"
			placeholder={placeholder}
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
      className="w-50"
		/>
	</>
  );
};
