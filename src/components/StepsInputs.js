import React,  { useState } from 'react';
import { nanoid } from 'nanoid';

function StepInput(props){
	return (			
		<input type="text" value={props.stepVal} onChange={(e) => props.onChangeProps(props.stepId, e)} name={props.name} ref={props.refFunc} placeholder="steps"/>
	)	
}

export default function StepsInputs(props){
	const [steps, setSteps] = useState([{
		id: nanoid(),
		step: ''
	}])

	function deleteStep(sid){
		let deleteArr = [...steps];
		let deletetedArr = deleteArr.filter(item => item.id !== sid);

		setSteps([...deletetedArr]);
	}

	function addStepsHandle(){
		setSteps([...steps, {step: '', id: nanoid()}])
	}

	function onChangeHandle(pid, event){
		event.preventDefault();
		let updatedArr = [...steps];
		let objIndex = updatedArr.findIndex(item => item.id === pid);

		updatedArr[objIndex].step = event.target.value;
		setSteps(updatedArr);

	}

	return (
		<div>
			{steps.map((item, index) => 
				<div className="stepInputs" key={item.id}>
					{index+1}
					<StepInput onChangeProps={onChangeHandle} refFunc={props.refFunc} stepId={item.id} stepVal={item.step} name={"steps[" + index + "]"}/>
					<button type="button" onClick={() => deleteStep(item.id)}>Delete</button>
				</div>
			)}
			<button onClick={() => addStepsHandle()} type="button">Add Steps</button>
		</div>	
		)
}