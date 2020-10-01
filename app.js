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

    //Public Methods
    return{

    }
 
})();

// App Controller
const App = (function(ItemCtrl, UiCtrl){
    //Public Methods
    return {
        init: function() {
            console.log('Init app')
        }
    }

})(ItemCtrl, UiCtrl);

//Initialize app
App.init();