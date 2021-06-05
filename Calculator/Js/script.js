function getHistory(){
	return document.getElementById("history-value").innerText;
}
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}
function getOutput(){
	return document.getElementById("output-value").innerText;
}
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}
function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //if output is a number
			output=output+this.id;
			printOutput(output);
		}
	});
}
//create a function that will be called when the user either hovers or clicks the button
function showModal(){
	var modalHolder = document.getElementById("modal-holder");
	modalHolder.style.display = "block";

	//closes the modal when the user clicks anywhere outside the modal dialog
	window.onclick = function(e){
		if (e.target == modalHolder) {
			modalHolder.style.display = "none";
		}
	}
	//closes the modal when the user clicks the "X" button
	document.getElementById('close-btn').addEventListener("click", (event)=>{
		modalHolder.style.display = "none";
	});
}

//set event listeners for the button to be clicked or hovered:(use either)
/*1. onClick event listener*/
document.getElementById("openModal").addEventListener("click", (event)=>{
	event.preventDefault();
	showModal();
});
/*2. hover event listener*/
document.getElementById("openModal").addEventListener("mouseover", (event)=>{
	event.preventDefault();
	showModal();
});
// you can comment either 1 or 2 to chck both functionality
//NB: USE CLICK EVENT LISTENER (RECOMMENDED). HOVER EFFECT DOESNT GUARANTEE TO WORK ON MOBILE DEVICES, ONLY IN DESKTOP