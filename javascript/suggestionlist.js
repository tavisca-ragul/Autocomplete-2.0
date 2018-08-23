const nameList = [
	"Ragul", 
	"Rajpreet", 
	"Pallvi", 
	"Neha", 
	"Ankita", 
	"Raja", 
	"Shreea", 
	"Smriti", 
	"Shrijeet", 
	"Ayush", 
	"Swapnil", 
	"Nihit", 
	"Bhargavi", 
	"Anushka", 
	"Swinal", 
	"Utkarsh", 
	"Saurabh", 
	"Paarth", 
	"Vishwas", 
	"Mohit", 
	"Gurbaksh", 
	"Ashwarya"
];

const nameSuggestions = {
	actionurl: "nameSuggestions",
	name: {
		actionurl: "name",
		pattern: null,
		value: "",
		input: (args) => {
			nameSuggestions.name.value = args.target.value;
			nameSuggestions.name.pattern = new RegExp(nameSuggestions.name.value, 'i');
			let ulElement = document.getElementById(nameSuggestions.actionurl);
			ulElement.innerText = "";
			if(nameSuggestions.name.value === "")
				return;
			for(let list of nameList) {
				if(list.toLowerCase().match(nameSuggestions.name.pattern)) {
					let liElement = document.createElement("li");
					liElement.setAttribute("id", list);
					liElement.innerText = list;
					ulElement.appendChild(liElement);
					document.getElementById(list).addEventListener("click", nameSuggestions.name.action);
				}
			}
			if(!ulElement.hasChildNodes()) {
				let liElement = document.createElement("li");
				liElement.setAttribute("id", "listMessage");
				liElement.innerText = "No names found";
				ulElement.appendChild(liElement);
			}
		},
		action: (args) => {
			let nameElement = document.getElementById(nameSuggestions.name.actionurl);
			nameSuggestions.name.value = args.target.innerText;
			nameElement.value = nameSuggestions.name.value;
			let ulElement = document.getElementById(nameSuggestions.actionurl);
			ulElement.innerText = "";
		},
		clearInput: {
			actionurl: "clearInput",
			action: () => {
				let clearInputElement = document.getElementById(nameSuggestions.name.clearInput.actionurl);
				let inputElement = document.getElementById(nameSuggestions.name.actionurl);
				inputElement.value = nameSuggestions.name.value = "";
			}
		}
	}
};

const handleElementsVisiblity = {
	nameInputHolder: {
		actionurl: "nameInputHolder",
		action: (args) => {
			if(document.getElementById(args.target.id) !== null) {
				let clickedElement = document.getElementById(args.target.id);
				let nameInputHolder = document.getElementById(handleElementsVisiblity.nameInputHolder.actionurl);
				if(clickedElement.parentNode !== nameInputHolder)
					document.getElementById(nameSuggestions.actionurl).style.display = "none";
			} else 
				document.getElementById(nameSuggestions.actionurl).style.display = "none";
		}
	},
	nameInput: {
		actionurl: "name",
		input: (args) => {
			if(document.getElementById(args.target.id) !== null) {
				let inputElement = document.getElementById(args.target.id);
				let nameInput = document.getElementById(handleElementsVisiblity.nameInput.actionurl);
				if(inputElement === nameInput && nameInput.value !== "")
					document.getElementById(nameSuggestions.name.clearInput.actionurl).style.display = "block";
				else
					document.getElementById(nameSuggestions.name.clearInput.actionurl).style.display = "none";
			}
		},
		action: (args) => {
			if(document.getElementById(args.target.id) !== null) {
				let clickedElement = document.getElementById(args.target.id);
				let nameInput = document.getElementById(handleElementsVisiblity.nameInput.actionurl);
				if(clickedElement === nameInput)
					document.getElementById(nameSuggestions.actionurl).style.display = "block";
			}
		}
	},
	clearInput: {
		actionurl: "clearInput",
		action: (args) => {
			if(document.getElementById(args.target.id) !== null) {
				let clickedElement = document.getElementById(args.target.id);
				let clearInput = document.getElementById(handleElementsVisiblity.clearInput.actionurl);
				if(clickedElement === clearInput) {
					clearInput.style.display = "none";
					nameSuggestions.name.action(args);
				}
			}
		}
	}
};

function loadEvents() {
	let elem;
	if(document.getElementById(nameSuggestions.name.actionurl) !== null) {
		elem = document.getElementById(nameSuggestions.name.actionurl);
		elem.addEventListener("input", nameSuggestions.name.input);
	}

	if(document.getElementById(nameSuggestions.name.clearInput.actionurl) !== null) {
		elem = document.getElementById(nameSuggestions.name.clearInput.actionurl);
		elem.addEventListener("click", nameSuggestions.name.clearInput.action);
	}
}

function loadClickVisibilityEvents(args) {
	let elem;
	if(document.getElementById(handleElementsVisiblity.nameInputHolder.actionurl) !== null)
		handleElementsVisiblity.nameInputHolder.action(args);

	if(document.getElementById(handleElementsVisiblity.nameInput.actionurl) !== null)
		handleElementsVisiblity.nameInput.action(args);

	if(document.getElementById(handleElementsVisiblity.clearInput.actionurl) !== null)
		handleElementsVisiblity.clearInput.action(args);
}

function loadInputVisibilityEvents(args) {
	let elem;
	if(document.getElementById(handleElementsVisiblity.nameInput.actionurl) !== null)
		handleElementsVisiblity.nameInput.input(args);
}

window.addEventListener("click", loadClickVisibilityEvents);
window.addEventListener("input", loadInputVisibilityEvents);
window.addEventListener("load", loadEvents);