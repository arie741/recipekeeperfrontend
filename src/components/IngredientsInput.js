import React,  { useState,useEffect } from 'react';
import { nanoid } from 'nanoid';

function IngreInput(props){
	return(
		<div className="d-flex flex-row">
			<input ref={props.refFunc} type="text" value={props.ingData.name} onChange={(e) => props.onChangeProps(props.ingData.id, 'name', e)} name={"ingre[" + props.nameIndex + "]"} placeholder="Ingredient"/>
			<input ref={props.refFunc} type="text" value={props.ingData.qty} onChange={(e) => props.onChangeProps(props.ingData.id, 'qty', e)} name={"qty[" + props.nameIndex + "]"} placeholder="Quantity"/>
			<input ref={props.refFunc} type="hidden" value={props.ingData.id} name={"ingId[" + props.nameIndex + "]"} placeholder="Id"/>
		</div>
	)
}

export default function IngredientsInput(props){
	const [ingre,setIngre] = useState([
			{
				id: nanoid(),
				name: '',
				qty: ''
			}
		]);

	useEffect(() => {
		if(props.initialValue){
			setIngre(props.initialValue.ingredients)
		}
	},[props.initialValue]);

	function deleteIngre(pid){
		let deleteArr = [...ingre];
		let deletetedArr = deleteArr.filter(item => item.id !== pid);

		setIngre([...deletetedArr]);
	}

	function addIngreHandle(){
		setIngre([...ingre, {
			id: nanoid(),
			name: '',
			qty: ''
		}])
	}

	function onChangeHandle(pid, field, event){
		event.preventDefault();
		let updatedArr = [...ingre];
		let objIndex = updatedArr.findIndex(item => item.id === pid);

		switch(field){
			case 'name':
			updatedArr[objIndex].name = event.target.value;
			break;
			case 'qty':
			updatedArr[objIndex].qty = event.target.value;
			break;
			default:
		}
		setIngre(updatedArr);

	}

	return (
		<div>
			{ingre.map((item, index) => 
				<div className="ingreInputs flex-row d-flex" key={item.id}>
					{index+1}. 
					<IngreInput onChangeProps={onChangeHandle} refFunc={props.refFunc} ingData={item} nameIndex={index}/>
					<button className="btn btn-secondary" type="button" onClick={() => deleteIngre(item.id)}>X</button>
				</div>	
			)
			}
			<button className="btn btn-info add-ingredient" type="button" onClick={() => addIngreHandle()}>Add More Ingredient</button>
		</div>	
		)
}