import View from "./View.js";
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js'
class BookmarksView extends View {
    _container = document.querySelector('.bookmarks__list');
    _errMessage = 'No recipe(s), found. Please select a nice repice :).';
    _successMessage = '';

    addHandlerBookMark(handler){
        window.addEventListener('load',handler)

    }

    _generateMarkUp(){
        return this._data.map(bookmark => previewView.render(bookmark,false)).join('')
    }

}

export default new BookmarksView();