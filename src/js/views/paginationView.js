import View from "./View.js";
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
    _container = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._container.addEventListener('click',function(e){
            e.preventDefault()
            let btn = e.target.closest('.btn--inline');
            if(!btn) return
            let goTo = Number(btn.dataset.goto);
            handler(goTo)
        })

   

    }

    _generateMarkUp(){
        let currPage = this._data.startPage;
        let numPage = Math.ceil(this._data.results.length / this._data.page)
        let validPositiveNumber = this._data.results.length - this._data.page;
        let showPaginationBtn = false;
        if(validPositiveNumber >= 0){
            showPaginationBtn = true
        }
       
        if(showPaginationBtn){
            // 1 page, means no prev page
            if(currPage === 1){
                return `
                <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currPage+1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
                ` 
            }

            // 2 page, we have prev and next page
            if(currPage < numPage){
                return `
                <button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currPage - 1}</span>
                </button>
                <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button> 
                `
            }

            // last page, means, prev
            if(numPage === currPage){
                return `
                <button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currPage - 1}</span>
                </button>
                `
            }
        }

        return ``;
    }


}

export default new PaginationView();