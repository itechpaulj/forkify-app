import View from "./View.js";
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js'
class ResultView extends View {
    _container = document.querySelector('.results');
    _errMessage = 'We could not found the recipes. Please try again!';
    _successMessage = '';

    _generateMarkUp(){
      return this._data.map(result => previewView.render(result,false)).join('')
  }


}

export default new ResultView();