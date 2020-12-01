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
			<div className="content-wrapper add-modal">	
				<form className="formInput" onSubmit={handleSubmit(onSubmit)}>
		            <div className="d-flex flex-column">
		            	<div className="row">
		            		<div className="col-lg-6">
			            		<div className="input-group">
								  <div className="input-group-prepend">
								    <span className="input-group-text" id="">Name</span>
								  </div>
								  <input className="form-control" type="text" name="name" ref={register} placeholder="Name"/>	
								</div>
								<div className="input-select">
									<h4>Category</h4>
									<select name="type" ref={register} id="type">
									  <option value="maincourse">Main Course</option>
									  <option value="dessert">Dessert</option>
									  <option value="appetizer">Appetizer</option>
									  <option value="drink">Drink</option>
									</select>
								</div>
		            		</div>
		            	</div>	

		            	<div className="row">
		            		<div className="col-lg-10">
		            			<div className="photos-row">
									<h4>Photos</h4>
									<input type="file" name="photos" ref={register} placeholder="photos" encType="multipart/form-data" multiple/>	
								</div>

								<div className="input-group">
								  <div className="input-group-prepend">
								    <span className="input-group-text" id="">Description</span>
								  </div>
								  <input className="form-control" type="text" name="description" ref={register}  placeholder="Description"/>
								</div>

								<div>
									<h4>
										Ingredients
									</h4>
									<IngredientsInput refFunc={register} />	
								</div>

								<div>
									<h4>
										Steps
									</h4>
									<StepsInputs refFunc={register}/>
								</div>
		            		</div>
		            	</div>

						<div className="flex-row-reverse d-flex button-row">
							<button className="btn btn-secondary" onClick={() => cancelHandle()} type="button">Cancel</button>
							<input className="btn btn-primary" type="submit" value="Add Recipe"/>
						</div>	
		            </div>
		        </form>		
			</div>
		)
}