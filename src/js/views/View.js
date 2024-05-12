import icons from 'url:../../img/icons.svg';
export default class View {

    _data
    /**
     * 
     * @param {OBJECT || ARRAY OBJECT[{}]} data 
     * @param {Boolean=true} render if true default no upload a data
     * @param {Boolean=false} upload a new recipe a data
     * @author Paul Javinez and Jonas Schmedtmann
     * @returns 
     */
    render(data, render = true){
    if(!data || (Array.isArray(data) && data.length === 0)) 
    return this.renderError()
    
    this._data = data
    const markUp = this._generateMarkUp()
    if(!render) return markUp
    this.clear();
    this._container.insertAdjacentHTML('afterbegin',markUp)
    }

    update(data){
       
        this._data = data
        const newMarkUp = this._generateMarkUp();

        const newDom = document.createRange().createContextualFragment(newMarkUp)
        const newElements = [...newDom.querySelectorAll('*')]
        const currElements = [...this._container.querySelectorAll('*')]

        newElements.forEach((newEl,i)=>{
          const currEle = currElements[i]
          //console.log(currEle,newEl.isEqualNode(currEle))
          
          // only the text value change
          if(!newEl.isEqualNode(currEle) &&
            newEl.firstChild?.nodeValue.trim() !== ''
          ){
            currEle.textContent = newEl.textContent
          }
          // only the ATTRIBUTES
          if(!newEl.isEqualNode(currEle)){
            //console.log(Array.from(newEl.attributes))
            [...newEl.attributes].forEach((attr)=>{
              currEle.setAttribute(attr.name,attr.value)
            })
          }

        })

    }


    renderSpinner(){
        this.clear();
        const markUp = `<div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
        </div>`;
        this._container.insertAdjacentHTML('afterbegin',markUp)
    }
    clear(){
        this._container.innerHTML = '';
    }

    renderError(message = this._errMessage){
        const markUp = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
      this.clear();
      this._container.insertAdjacentHTML('afterbegin',markUp)
    }

    renderSuccess(message = this._successMessage){
      const markUp = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this.clear();
    this._container.insertAdjacentHTML('afterbegin',markUp)
  }

}