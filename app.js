// Storage Controller

// Item Controller 
const ItemCtrl = (function(){
    // Item Constructor
    const item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
 
})();

// UI Controller
const UiCtrl = (function(){
 
})();

// App Controller
const App = (function(ItemCtrl, UiCtrl){
 
})(ItemCtrl, UiCtrl);