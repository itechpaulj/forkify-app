import {async} from 'regenerator-runtime'
import { API_URL,RES_PER_PAGE,KEY } from './config.js';
//import { getJSON,sendJson } from './helpers.js';
import { AJAX } from './helpers.js';
export const state = {
    recipe:{}, // display one result recipe
    query: '', // query search
    results: [], // all recipes
    page: RES_PER_PAGE,
    startPage: 1,
    bookmarks: [],
}

const createdObjRecipe = function (data){
 
  let {recipe} = data.data    
   return  {
    id: recipe.id,
    image_url: recipe.image_url,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ingredients: recipe.ingredients, // array
    cooking_time: recipe.cooking_time,
    bookmarked: false,
    //...(recipe.key && {key: recipe.key})
  }

}

export const loadRecipe = async function (id){

  try{
    
    const data = await AJAX(`${id}?key={KEY}`) // fetch url
    
   //console.log(data.data.recipe.key)
    state.recipe = createdObjRecipe(data)
    state.recipe.key = data.data.recipe.key
    if(state.bookmarks.some((bookmarked) => bookmarked.id === id)){
      // not found the data force push in the array
      if(id == state.recipe.id) state.recipe.bookmarked = true;
    }else{
      if(id == state.recipe.id) state.recipe.bookmarked = false;
    }

  }catch(err){
    throw err
  }

}

export const loadSearch = async function (search) {

  try{
    const data = await AJAX(`?search=${search}&key=${KEY}`) // fetch url
    state.query = `${search}`;
    state.results = data.data.recipes;
    state.startPage = 1
  }catch(err){
    throw err
  }

}

export const loadServicings = function (newServicing){

  // mutate or change the data value
  // newQT = qt * newServicing / servicings
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServicing) / state.recipe.servings
  });


  state.recipe.servings = newServicing
}

export const getResultPerPage = function(page = state.startPage){
  state.startPage = page; // note every page is always updated new pagination
  let start = (page - 1) * RES_PER_PAGE
  let end = (page * RES_PER_PAGE)

  return state.results.slice(start,end)
}

export const addBookmark = function(recipe){
    if(!state.bookmarks.some((bookmarked) => bookmarked.id === recipe.id)){
        // not found the data force push in the array
        state.bookmarks.push(recipe)
        if(recipe.id == state.recipe.id) state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;
        addLocalStorageBookMark();
    }
}

export const deleteBookmark = function(id){
  const index = state.bookmarks.findIndex((bookmarked)=> bookmarked.id === id) 
  state.bookmarks.splice(index,1)
  if(id == state.recipe.id) state.recipe.bookmarked = false;
  addLocalStorageBookMark();
}

export const addLocalStorageBookMark = function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))
}

export const addUploadRecipe = async function(newRecipe){
  try{
    console.log(newRecipe)
    const ingredients = Object.entries(newRecipe)
      .filter((entry)=>
        entry[0].startsWith('ingredient') && 
        entry[1].trim() !== ""
      )
      .map((ing)=>{
       // const ingArray = ing[1].replaceAll('','').split(',');
       const ingArray = ing[1].split(',').map((ing) => ing.trim());
      if(ingArray.length !== 3)
      throw new Error('Wrong format. Please use the correct format :).');

        const [quantity,unit,description] = ingArray
        return {
          quantity: quantity ? 
            !isNaN(Number(quantity)) ? Number(quantity) : null 
          : null,
          unit: unit ? unit : '',
          description: description ? description : ''
        }

    });

    const recipe = {
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        servings: newRecipe.servings,
        source_url: newRecipe.sourceUrl,
        title: newRecipe.title,
        ingredients: ingredients, // array
        cooking_time: newRecipe.cookingTime,
        bookmarked: false,
    }

    const data = await AJAX(`${API_URL}?key=${KEY}`,recipe)
    data.data.recipe.key = KEY
    state.recipe = createdObjRecipe(data)
    addBookmark(state.recipe)
  }catch(err){
    throw err
  }


}

const init = function () {
  const state = JSON.parse(localStorage.getItem('bookmarks'))
  if(state) state.bookmarks =  state

}
init();