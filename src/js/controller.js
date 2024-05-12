import 'core-js/stable';
import 'regenerator-runtime/runtime'
import * as model from  '../js/model.js'
import {MODAL_CLOSE_SEC} from './config.js';
import viewRecipe from '../js/views/recipeView.js'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
// https://forkify-api.herokuapp.com/v2 -- fork API

///////////////////////////////////////


const showRecipe = async function(){

  try{

    let id = window.location.hash.slice(1);
    
    if(!id) return

    viewRecipe.renderSpinner();
    resultsView.update(model.getResultPerPage())
    
    await model.loadRecipe(id)
    
    viewRecipe.render(model.state.recipe)
    
    bookmarksView.update(model.state.bookmarks)
  }catch(err){
    viewRecipe.renderError()
    throw err
  }  

}


const showResult = async function(){
  try{
    // 1. input search query
    const search = searchView.queryInputResult();
    if(!search) return
    resultsView.renderSpinner()
    //2.  get the result from the query
    await model.loadSearch(search);
    
    //resultsView.render(model.state.results)
    resultsView.render(model.getResultPerPage())
    
    // pagination view
    paginationView.render(model.state);

  }catch(err){
    //resultsView.renderError()
    throw err
  }
}

const paginationBtnHandler = function (gotoPage){
    // new initialize render per page
     resultsView.render(model.getResultPerPage(gotoPage))

     // pagination view
     paginationView.render(model.state);
}

const controlServicings = function(updateTo){
  // update quantity the servings
    model.loadServicings(updateTo)

    // update the viewRecipe Container
    //viewRecipe.render(model.state.recipe)
    viewRecipe.update(model.state.recipe)
}

const controlBookmark = function(){
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)
  viewRecipe.update(model.state.recipe)
  bookmarksView.render(model.state.bookmarks)
}

const bookmarkLocalStorage = function(){
  let show = JSON.parse(localStorage.getItem('bookmarks'))
  if(show) 
    model.state.bookmarks = show
    bookmarksView.render(show)
  
}

const controlAddFormRecipe = async function(newRecipe){
  try{
    // loader
    addRecipeView.renderSpinner()

  // upload Recipe
    await model.addUploadRecipe(newRecipe)
    
   controlAddFormRecipe
    // review or show new added recipe
    viewRecipe.render(model.state.recipe)

    // success message
    addRecipeView.renderSuccess();

    // updated pop up modal to show new add recipe
    bookmarksView.render(model.state.bookmarks)
    
    window.history.pushState(null,'',`#${model.state.recipe.id}`)

    // close model
    setTimeout(function(){
      addRecipeView.toggleWindow();
      
    },MODAL_CLOSE_SEC * 1000)

  }catch(err){
    console.log(err)
    addRecipeView.renderError(err.message)
  }

}


const init = function (){
  
  viewRecipe.addHandlerRender(showRecipe)
  viewRecipe.addHandlerServing(controlServicings)
  viewRecipe.addHandlerBookmark(controlBookmark)

  searchView.searchHandler(showResult)

  paginationView.addHandlerClick(paginationBtnHandler)
  
  bookmarksView.addHandlerBookMark(bookmarkLocalStorage)
  
  // add recipe form [pop up modal] btn
  addRecipeView.addFormRecipeContainer(controlAddFormRecipe)

  
}


init();

