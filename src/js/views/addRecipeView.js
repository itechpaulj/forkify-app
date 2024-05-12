import View from "./View.js";
import icons from 'url:../../img/icons.svg';
class AddRecipeView extends View {
    _container = document.querySelector('.upload');
    _successMessage = 'Recipe was successfully upload :).'
    _overlay = document.querySelector('.overlay');
    _window = document.querySelector('.add-recipe-window')
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')
    
    constructor(){
        super();
        this._addHandlerShadowRecipe();
        this._hideHandlerShadowRecipe();
        
    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShadowRecipe(){
        // POP UP MODAL ADD RECIPE BUTTON
        this._btnOpen.addEventListener('click',this.toggleWindow.bind(this))
    }

    _hideHandlerShadowRecipe(){
        // POP UP MODAL HIDE RECIPE BUTTON
        this._btnClose.addEventListener('click',this.toggleWindow.bind(this))
        this._overlay.addEventListener('click',this.toggleWindow.bind(this))
    }

    addFormRecipeContainer(handler){
        this._container.addEventListener('submit',function(e){
            e.preventDefault();

            const form = [...new FormData(this)]; // create a array list ['key','value']
            const objForm = Object.fromEntries(form) // array to object
            handler(objForm)
          
        })
    }


    _generateMarkUp(){

    }


}

export default new AddRecipeView();