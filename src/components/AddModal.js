import React, { useState } from 'react';
import addRecipes from '../api/addRecipes';
import {useForm} from 'react-hook-form';
import Modal from 'react-modal';
import StepsInputs from './StepsInputs';
import IngredientsInput from './IngredientsInput';
import { nanoid } from 'nanoid';

export default function AddModal(props){
	const { register, handleSubmit } = useForm();
	const [modalIsOpen,setIsOpen] = useState(false);
	const onSubmit = (data) => {
		
		let ingredients = [];

		for(let i=0; i < data.ingre.length; i++){
			ingredients.push({
				id: nanoid(),
				name: data.ingre[i],
				qty: data.qty[i]
			})
		}

		addRecipes(data.name, data.type, data.photos, data.description, data.steps, ingredients).then(response => {
			props.onAddRecipe(true)
			setIsOpen(false)
		})
	}

	return (
			<div>
				<button onClick={() => setIsOpen(true)}>Open Modal</button>
				<Modal
		          isOpen={modalIsOpen}
		          onRequestClose={() => setIsOpen(false)}
		          shouldCloseOnOverlayClick={false}
		          contentLabel="Add Recipe Modal"
		          ariaHideApp={false}
		        >
		          <button onClick={() => setIsOpen(false)}>close</button>
		          <form className="formInput" onSubmit={handleSubmit(onSubmit)}>
		            <div className="d-flex flex-column">
		            	<input type="text" name="name" ref={register} placeholder="name"/>	
						<input type="text" name="type" ref={register} placeholder="type"/>	
						<input type="file" name="photos" ref={register} placeholder="photos" encType="multipart/form-data" multiple/>	
						<input type="text" name="description" ref={register}  placeholder="description"/>	
						<StepsInputs refFunc={register}/>
						<IngredientsInput refFunc={register} />	
						<input type="submit" value="Add Recipe"/>
		            </div>
		          </form>
		        </Modal>		
			</div>
		)
}