(function() {
	let tmpl = document.createElement('template');
	tmpl.innerHTML = `

		<style>
			* {
			box-sizing: border-box;
			}

			body {
			font: 16px Arial;  
			}

			/*the container must be positioned relative:*/
			.autocomplete {
			position: relative;
			display: inline-block;
			}

			input {
			border: 1px solid transparent;
			background-color: #f1f1f1;
			padding: 10px;
			font-size: 16px;
			}

			input[type=text] {
			background-color: #f1f1f1;
			width: 100%;
			}

			input[type=submit] {
			background-color: DodgerBlue;
			color: #fff;
			cursor: pointer;
			}

			.autocomplete-items {
			position: absolute;
			border: 1px solid #d4d4d4;
			border-bottom: none;
			border-top: none;
			z-index: 99;
			/*position the autocomplete items to be the same width as the container:*/
			top: 100%;
			left: 0;
			right: 0;
			}

			.autocomplete-items div {
			padding: 10px;
			cursor: pointer;
			background-color: #fff; 
			border-bottom: 1px solid #d4d4d4; 
			}

			/*when hovering an item:*/
			.autocomplete-items div:hover {
			background-color: #e9e9e9; 
			}

			/*when navigating through the items using the arrow keys:*/
			.autocomplete-active {
			background-color: DodgerBlue !important; 
			color: #ffffff; 

		</style>

		<div class="autocomplete" id="container" style="width:300px;">
			<input id="myInput" type="text" name="myCountry" placeholder="Country">
		</div>


	`;

	class ISearch extends HTMLElement {
		constructor() {
			super();
			var countries = [];
			let shadow = this.attachShadow({ mode: 'open' });
			shadow.appendChild(tmpl.content.cloneNode(true));

			function autocomplete(inp, arr) {
				var currentFocus;
				inp.addEventListener('input', function(e) {
					var a,
						b,
						i,
						val = this.value;

					//closeAllLists();
					if (!val) {
						return false;
					}
					currentFocus = -1;
					a = document.createElement('DIV');
					a.setAttribute('id', this.id + 'autocomplete-list');
					a.setAttribute('class', 'autocomplete-items');
					this.parentNode.appendChild(a);
					for (i = 0; i < arr.length; i++) {
						if (
							arr[i].substr(0, val.length).toUpperCase() ==
							val.toUpperCase()
						) {
							b = document.createElement('DIV');
							b.innerHTML =
								'<strong>' +
								arr[i].substr(0, val.length) +
								'</strong>';
							b.innerHTML += arr[i].substr(val.length);
							b.innerHTML +=
								"<input type='hidden' value='" + arr[i] + "'>";

							b.addEventListener('click', function(e) {
								inp.value = this.getElementsByTagName(
									'input'
								)[0].value;
								closeAllLists();
							});
							a.appendChild(b);
						}
					}
				});

				// inp.addEventListener('keydown', function(e) {
				// 	var x = shadow.getElementById(
				// 		this.id + 'autocomplete-list'
				// 	);
				// 	if (x) x = x.getElementsByTagName('div');
				// 	if (e.keyCode == 40) {
				// 		currentFocus++;
				// 		addActive(x);
				// 	} else if (e.keyCode == 38) {
				// 		currentFocus--;

				// 		addActive(x);
				// 	} else if (e.keyCode == 13) {
				// 		e.preventDefault();
				// 		if (currentFocus > -1) {
				// 			if (x) x[currentFocus].click();
				// 		}
				// 	}
				// });
				function addActive(x) {
					if (!x) return false;

					removeActive(x);
					if (currentFocus >= x.length) currentFocus = 0;
					if (currentFocus < 0) currentFocus = x.length - 1;
					x[currentFocus].classList.add('autocomplete-active');
				}
				function removeActive(x) {
					for (var i = 0; i < x.length; i++) {
						x[i].classList.remove('autocomplete-active');
					}
				}
				function closeAllLists(elmnt) {
					console.log("enter func");
					var x = shadow.getElementsByClassName('autocomplete-items');
					for (var i = 0; i < x.length; i++) {
						console.log("enter func FOR");
						if (elmnt != x[i] && elmnt != inp) {
							console.log("enter func for IF");
							x[i].parentNode.removeChild(x[i]);
						}
					}
				}

				this.getData = function(result){
					 countries = [];
					var x = "";
					result.forEach(function(element) {
			
						data.push(x);	
					 }
				);
				}

				this.setData = function(){
					return sdata;
				};

				document.addEventListener('click', function(e) {
					//closeAllLists(e.target);
				});
			}

			// var countries = [
			// 	'Afghanistan',
			// 	'Albania',
			// 	'Algeria',
			// 	'Andorra',
			// 	'Angola',
			// 	'Anguilla',
			// 	'Antigua'
			// ];

			autocomplete(shadow.querySelector('#myInput'), countries);

			if (this._alive) {
				return;
			} else {
				this._alive = true;
			}
		}
	}
	/* Define web component - input: tag and class */
	customElements.define('com-iprosis-sample-search', ISearch);
})();
