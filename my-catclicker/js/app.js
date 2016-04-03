
/* ======== Model ======== */

var model = {
	currentCat: null,
	cats: [
		{
			name: 'Furry',
			image: 'img/cat_picture1.jpg',
			clickCount: 0
		}, {
			name: 'Purr',
			image: 'img/cat_picture2.jpeg',
			clickCount: 0
		}, {
			name: 'Meow',
			image: 'img/cat_picture3.jpeg',
			clickCount: 0
		}, {
			name: 'Claws',
			image: 'img/cat_picture4.jpeg',
			clickCount: 0
		}, {
			name: 'Tiger',
			image: "img/cat_picture5.jpeg",
			clickCount: 0
		}
	]
};

var octopus = {
	
	init: function() {
		//set our current cat to the first one in the list
		model.currentCat = model.cats[0];
		
		//tell our view to initialize
		listViewCat.init();
		viewCat.init();
	},
	
	getCurrentCat: function() {
		return model.currentCat;
	},
	
	getCats: function() {
		return model.cats;
	},
	
	// set the currently-selected cat to the object passed in
	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},
	
	// increments the counter for the currently-selected cat
	incrementCounter: function() {
		model.currentCat.clickCount++;
		viewCat.render();
	}	
};

/* ========== View =========== */
	
	
var viewCat = {
	
	init: function() {
		// store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');
		
		//on click, increment the current cats counter
		this.catImageElem.addEventListener('click', function(){
			octopus.incrementCounter();
		});
		
		// render this view (update DOM elements with the right values)
		this.render();
	},
	
	render: function(){
		//update DOM elements with the right values from the current cat
		var currentCat = octopus.getCurrentCat();
		this.countElem.textContent = currentCat.clickCount;
		this.catNameElem.textContent = currentCat.name;
		this.catImageElem.src = currentCat.image;
	}
};
		
		
var listViewCat = {
	init: function() {
		// store the DOM element for easy access later
		this.catListElem = document.getElementById('cat-list');
		
		//render this view (update DOM elements with the right values)
		this.render();
	},
	
	render: function() {
		var cat, elem, i;
		//get the cats we'll be rendering from the octopus
		var cats = octopus.getCats();
		
		//empty the cat list
		this.catListElem.innerHTML = '';
		
		//loop over the cats
		for (i = 0; i < cats.length; i++) {
			//this is the cat we are currently lopping over
			cat = cats[i];
			// make a new cat list and set its text
			elem = document.createElement('li');
			elem.textContent = cat.name;
			
			
			// on click, setCurrentCat and render the viewCat
			// (this uses our closure-in-a-loop trick to connect the value
			// of the cat variable to the click event function)
			elem.addEventListener('click', (function(catCopy) {
				return function() {
					octopus.setCurrentCat(catCopy);
					viewCat.render();
				};
			})(cat));
			
			//append element
			this.catListElem.appendChild(elem);
		}	
	}
};

//make it go/
octopus.init();
		
