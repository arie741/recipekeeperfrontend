import React from 'react';
import addRecipes from '../api/addRecipes';
import {useForm} from 'react-hook-form';
import StepsInputs from './StepsInputs';
import IngredientsInput from './IngredientsInput';
import { useHistory } from 'react-router-dom';

export default function AddModal(props){
	const { register, handleSubmit } = useForm();
	const history = useHistory();

	const onSubmit = (data) => {
		
		let ingredients = [];

		for(let i=0; i < data.ingre.length; i++){
			ingredients.push({
				id: data.ingId[i],
				name: data.ingre[i],
				qty: data.qty[i]
			})
		}

		addRecipes(data.name, data.type, data.photos, data.description, data.steps, ingredients).then(response => {
			history.push("/");
		})
	}

	const cancelHandle = () => {
		history.push("/");
	}

	return (
			<div>	
				<form className="formInput" onSubmit={handleSubmit(onSubmit)}>
		            <div className="d-flex flex-column">
		            	<input type="text" name="name" ref={register} placeholder="name"/>	
						<select name="type" ref={register} id="type">
						  <option value="maincourse">Main Course</option>
						  <option value="dessert">Dessert</option>
						  <option value="appetizer">Appetizer</option>
						  <option value="drink">Drink</option>
						</select>
						<input type="file" name="photos" ref={register} placeholder="photos" encType="multipart/form-data" multiple/>	
						<input type="text" name="description" ref={register}  placeholder="description"/>	
						<IngredientsInput refFunc={register} />	
						<StepsInputs refFunc={register}/>
						<button onClick={() => cancelHandle()} type="button">Cancel</button>
						<input type="submit" value="Add Recipe"/>
		            </div>
		        </form>		
			</div>
		)
}