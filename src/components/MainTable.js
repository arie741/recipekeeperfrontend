import React,  { useState, useEffect } from 'react';
import RecipeRow from './RecipeRow';
import getRecipes from '../api/getRecipes';
import deleteRecipe from '../api/deleteRecipe';
import DetailsModal from './DetailsModal';
import FilterInput from './FilterInput';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function MainTable(){
	const [recipes, setRecipes] = useState([]);
	const [initialValues, setInitialValues] = useState([]);
	const [submitting, isSubmitting] = useState(true);
	const [showDetails, setShowDetails] = useState({});
	const [modalIsOpen,setIsOpen] = useState(false);

	function getData(){
		getRecipes().then(response => {
			setInitialValues(response);
			setRecipes(response);
			isSubmitting(false);
		})
	}
	
	useEffect(() => {
		getData();
	}, [submitting]);

	function onClickHandler(id){
		let detailsArray = recipes;
		let details = detailsArray.find((item) => item.uid === id)
		
		setShowDetails(details);
		setIsOpen(true);
	}

	function deleteHandler(uid){
		deleteRecipe(uid).then(response => {
			getData();
		});
	}

	function searchOnChangeHandle(event){
		if (event.target.value){
			let searchValue = event.target.value;
			let initialValuesArray = initialValues;

			let filteredArray = initialValuesArray.filter(item => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);

			setRecipes(filteredArray);
		} else {
			setRecipes(initialValues);
		}
	}

	function filterOnChangeHandle(filterArr){
		if (filterArr.length !== 0){
			let initialValuesArray = initialValues;

			let filteredArray = initialValuesArray.filter(item => filterArr.includes(item.type.toLowerCase()));

			setRecipes(filteredArray);
		} else {
			setRecipes(initialValues);
		}
	}

	return(
			<div className="container">
				<div className="input-group search-input">
				  <div className="input-group-prepend">
				    <FontAwesomeIcon icon={faSearch} />
				  </div>
				  <input onInput={(e) => searchOnChangeHandle(e)} type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1"/>
				</div>
				<FilterInput onChangeHandle={filterOnChangeHandle} />
				{recipes.map(recipe => 
					<RecipeRow data={recipe} key={recipe.uid} onClickHandle={onClickHandler}/>	
					)}	
				{submitting ? 'Loading...' : ''}
				<DetailsModal isOpen={modalIsOpen} modalHandle={setIsOpen} data={showDetails} deleteHandle={deleteHandler}/>
			</div>	
		)
}