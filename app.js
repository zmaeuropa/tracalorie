// Storage Controller

// Item Controller 
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / state
    const state = {
        items: [
            // {id:0, name: 'Steak Dinner', calories: 800},
            // {id:1, name: 'Hamburger', calories: 950},
            // {id:2, name: 'Salade', calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    }
    // Public Methods
    return {
        getItems: function() {
            return state.items;
        },
        addItem: function(name, calories) {
            let ID;
            // create id
            if (state.items.length > 0) {
                ID = state.items[state.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // calories to number
            calories = parseInt(calories);

            // Create new item
            newItem = new Item(ID, name, calories);

            // add to item array
            state.items.push(newItem);

            return newItem;
        },
        getTotalCalories:function() {
            let total = 0;
            // loop through item and add calories
            state.items.forEach(function(item){
                total += item.calories;
            });
            // set total calories in data structure
            state.totalCalories = total;

            // return total
            return state.totalCalories;
        },
        logState: function() {
            return state;
        }
    }

 
})();

// UI Controller
const UiCtrl = (function(){
    const UiSelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        updateBtn:'.update-btn',
        deleteBtn:'.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories:'.total-calories'
    }
    //Public Methods
    return{
        populateItemList: function(items) {
            let html = '';

            items.forEach(function(item){
                html+= `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}</strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class=" edit-item fa fa-pencil"></i>
                </a>
              </li>`
                
            });

            // Insert list items
            document.querySelector(UiSelectors.itemList).innerHTML = html;
        },
        getItemInput:function() {
            return {
                name: document.querySelector(UiSelectors.itemNameInput).value,
                calories: document.querySelector(UiSelectors.itemCaloriesInput).value
            }
        },

        addListItem:function(item){
            // Show  the list
            document.querySelector(UiSelectors.itemList).style.display = 'block';
            // create li element
            const li = document.createElement('li');
            // add class
            li.className = 'collection-item';
            // add id
            li.id = `item-${item.id}`;
            // add html
            li.innerHTML = `<strong>${item.name}</strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class=" edit-item fa fa-pencil"></i>
            </a>`;
            // insert item
            document.querySelector(UiSelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        clearInput:function() {
            document.querySelector(UiSelectors.itemNameInput).value = '';
            document.querySelector(UiSelectors.itemCaloriesInput).value = '';
        },
        hideList:function() {
            document.querySelector(UiSelectors.itemList).style.display = 'none';
        },
        showTotalCalories:function(totalCalories) {
            document.querySelector(UiSelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState:function(){
            UiCtrl.clearInput();
            document.querySelector(UiSelectors.updateBtn).style.display = 'none';
            document.querySelector(UiSelectors.deleteBtn).style.display = 'none';
            document.querySelector(UiSelectors.backBtn).style.display = 'none';
            document.querySelector(UiSelectors.addBtn).style.display = 'inline';
        },
        getSelectors:function() {
            return UiSelectors;
        }
    }
 
})();

// App Controller
const App = (function(ItemCtrl, UiCtrl){
    // Load event Listenners
    const loadEventListeners = function() {
        // get ui selectors
        const UiSelectors = UiCtrl.getSelectors();

        // add item event
        document.querySelector(UiSelectors.addBtn).addEventListener('click', itemAddSubmit);
    }

    // add item submit
    const itemAddSubmit = function(e) {
        
        // Get form input from Ui Controller
        const input = UiCtrl.getItemInput();

       //Check for name and calories input
       if (input.name !== '' && input.calories !== '') {
           //add item 
           const newItem = ItemCtrl.addItem(input.name, input.calories);

           // add item to UI list
           UiCtrl.addListItem(newItem);

           // get total calories
           const totalCalories = ItemCtrl.getTotalCalories();

           // add total calories to Ui
           UiCtrl.showTotalCalories(totalCalories);

           // clear input
           UiCtrl.clearInput();
       }
        e.preventDefault();    
    }

    //Public Methods
    return {
        init: function() {
           // clear edit state
           UiCtrl.clearEditState();
            // Fetch item from state/data structure
            const items = ItemCtrl.getItems();

            // Checj if any items
            if (items.length === 0) {
                UiCtrl.hideList();
            } else {
                // Populate list with items
                UiCtrl.populateItemList(items);
            }
            
            // get total calories
           const totalCalories = ItemCtrl.getTotalCalories();

           // add total calories to Ui
           UiCtrl.showTotalCalories(totalCalories);

            // Load event listeners
            loadEventListeners();
        }
    }

})(ItemCtrl, UiCtrl);

//Initialize app
App.init();