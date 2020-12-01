import React,  { useState } from 'react';

export default function FilterInput(props){
	const [checkedFilters, setCheckedFilters] = useState([]);

	const onClickHandle = (event) => {
		if(event.target.checked){
			let checkedArray = checkedFilters;
			checkedArray.push(event.target.value);

			setCheckedFilters(checkedArray);
			props.onChangeHandle(checkedArray);
		} else {
			let checkedArray = checkedFilters;
			let filteredArray = checkedArray.filter(item => item != event.target.value);

			setCheckedFilters(filteredArray);
			props.onChangeHandle(filteredArray);
		}
	}

	return (
			<div className="filter-by d-flex flex-row">
				<div>Category: </div>
				<div className="filter-checkboxes d-flex flex-row">
					<div>
						<input onClick={(e) => onClickHandle(e)} type="checkbox" id="maincourse" name="categoryFilter" value="maincourse"/>
						<label htmlFor="maincourse">Main Course</label>
					</div>	
					<div>
						<input onClick={(e) => onClickHandle(e)} type="checkbox" id="dessert" name="categoryFilter" value="dessert"/>
						<label htmlFor="dessert">Dessert</label>
					</div>	
					<div>
						<input onClick={(e) => onClickHandle(e)} type="checkbox" id="appetizer" name="categoryFilter" value="appetizer"/>
						<label htmlFor="appetizer">Appetizer</label>
					</div>
					<div>
						<input onClick={(e) => onClickHandle(e)} type="checkbox" id="drink" name="categoryFilter" value="drink"/>
						<label htmlFor="drink">Drink</label>
					</div>	
				</div>
			</div>	
		)
}