// Storage Controller

// Item Controller 
const ItemCtrl = (function(){
    // Item Constructor
    const item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / state
    const state = {
        items: [
            {id:0, name: 'Steak Dinner', calories: 800},
            {id:1, name: 'Hamburger', calories: 950},
            {id:2, name: 'Salade', calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    }
    // Public Methods
    return {
        getItems: function() {
            return state.items;
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
        addBtn: '.add-btn'
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
        e.preventDefault();    
    }

    //Public Methods
    return {
        init: function() {
           
            // Fetch item from state/data structure
            const items = ItemCtrl.getItems();

            // Populate list with items
            UiCtrl.populateItemList(items);

            // Load event listeners
            loadEventListeners();
        }
    }

})(ItemCtrl, UiCtrl);

//Initialize app
App.init();