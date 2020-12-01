import React,  { useState, useEffect } from 'react';
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

	useEffect(() => {
		if(props.initialValue){
			let stepArr = props.initialValue.steps;
			let formattedStepArr = stepArr.map(item => {
				return {
							id: nanoid(),
							step: item,
						}})

			setSteps(formattedStepArr)
		}
	}, [props.initialValue])

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
				<div className="stepInputs d-flex flex-row" key={item.id}>
					{index+1}. 
					<StepInput onChangeProps={onChangeHandle} refFunc={props.refFunc} stepId={item.id} stepVal={item.step} name={"steps[" + index + "]"}/>
					<button className="btn btn-secondary" type="button" onClick={() => deleteStep(item.id)}>X</button>
				</div>
			)}
			<button className="btn btn-info add-steps" onClick={() => addStepsHandle()} type="button">Add Steps</button>
		</div>	
		)
}