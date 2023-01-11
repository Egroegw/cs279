function _1(md){return(
md`# TODO List app with ObservableHQ`
)}

function _2(md){return(
md`Tutorial followed: [Kennedy's tutorial](https://observablehq.com/@alejandrokennedy/d3-redux-and-redux-undo-todo-list), with supplementary reference to [Redux's basic tutorial](https://redux.js.org/basics/basic-tutorial) and [Redux-Undo](https://github.com/omnidan/redux-undo).`
)}

function _3(html,d3,store,toggleTodo,VisibilityFilters,setVisibilityFilter,addTodo,ActionCreators,clearTodo)
{
  let wrapper = html`<div class="wrapper">
    <div>
        <h2>TODO List app with ObservableHQ</h2>
    </div>
    <div>
        <input type="text" class="text" size="12" placeholder="Please type your task here...">
    </div>
    <div>
        <!-- Buttons to add, redo, undo, and clear all TODO items -->
        <input type="button" class="redo" value="Add to List / Redo">
        <input type="button" class="undo" value="Undo">
        <input type="button" class="clear" value="Clear TODO list">
    </div>
    <div class=visibilityFilterBoxDiv></div>
    <!--  Show the TODO list -->
    <div class=todoList></div>
  </div>`
  
  function updateData() {
    
    // update selection
    const item = d3.select('.todoList')
      .selectAll('.item')
      // get an array of TODO list items
      .data(store.getState().todos.present.filter(todo => {
        // show different versions of the TODO list depending on visibility
        // if visibilityFilter an unexpected value, return todo immediately
        switch (store.getState().visibilityFilter) {
          case 'SHOW_ALL':
            return todo
          case 'SHOW_COMPLETED':
            return todo.completed === true
          case 'SHOW_ACTIVE':
            return todo.completed === false
          default:
            console.warn('Unexpected visibilityFilter state')
            return todo
        }
      }), d => d.index)
    
    
    // update selection checkbox every time
    const updateItemBox = item.select('.itemBox')
        
    // enter selections, setting class and style
    const itemEnter = item.enter()
      .append('div')
      .attr('class', d => `item ${d.text}`)
      .style('text-align', 'center')
      .style('font-family', 'monospace')

    // enter selection checkboxes and merging with update checkboxes
    const itemBox = itemEnter.append('input')
      .attr('class', 'itemBox')
      .attr('type', 'checkbox')
      .merge(updateItemBox)
        // box checked if and only if item marked complete
        .each(function(d){
          if (d.completed) {
            d3.select(this).attr('checked', true)
          } else {
            d3.select(this).attr('checked', null)
          }
        })
        // on click, call toggleTodo and update the main view
        .on('click', d => {
          store.dispatch(toggleTodo(d.index))
          updateData()
        })
    
    // enter selection text
    const itemText = itemEnter.append('label')
      // setting the class and actual text
      .attr('class', 'itemText')
      .attr('for', d => d.text)
      .text(d => d.text)
    

    // exit selection
    const itemExit = item.exit().remove()
  }

  // three visibility filter options
  const visibilityFilterBoxes = d3.select(wrapper)
    .select('.visibilityFilterBoxDiv')
    .selectAll('.visibilityFilters')
    .data(Object.values(VisibilityFilters))
    .join('div')

  // check boxes for visibility options and attributes
  // on click, update visibility filter and update main view
  const visibilityCheckboxes = visibilityFilterBoxes.append('input')
    .attr('class', 'visibilityCheckboxes')
    .attr('type', 'radio')
    .attr('name', 'visibilityCheckboxes')
    .attr('id', d => d)
    .attr('value', d => d)
    .on('click', d => {
      store.dispatch(setVisibilityFilter(d))
      updateData()
    })
    .each(function(d) {
      if (store.getState().visibilityFilter === d) d3.select(this).attr('checked', true)
    })

  // atttributes, fonts
  const visibilityLabels = visibilityFilterBoxes.append('label')
    .attr('class', 'visibilityLabels')
    .attr('for', d => d)
    .text(d => d.charAt(0) + d.replace('_', ' ').toLowerCase().slice(1))
    .style('font-family', 'Arial')

  // adding a todo through the text box, call addTodo, and update main view
  d3.select(wrapper).select('.text')
    .on('change', function() {
      const index = store.getState().todos.present.length
      store.dispatch(addTodo(this.value, index))
      updateData()
      this.value = ''
    }) 

  // undo button calls ActionCreators.undo() and updates main view
  const undoButton = d3.select(wrapper).select('.undo')
    .on('click', () => {
      store.dispatch(ActionCreators.undo())
      updateData()
    })

  // redo button also calls ActionCreators.redo() and updates main view
  const redoButton = d3.select(wrapper).select('.redo')
    .on('click', () => {
      store.dispatch(ActionCreators.redo())
      updateData()
    })

  // clear button calls a helper function and updates main view
  const clearButton = d3.select(wrapper).select('.clear')
    .on('click', () =>  {
      store.dispatch(clearTodo())
      updateData()
    })

  return wrapper
}


function _4(md){return(
md`## Variable Declarations`
)}

function _5(md){return(
md`Variables must be declared here. Each variable here has type string.`
)}

function _ADD_TODO(){return(
'ADD_TODO'
)}

function _TOGGLE_TODO(){return(
'TOGGLE_TODO'
)}

function _CLEAR_ALL(){return(
'CLEAR_ALL'
)}

function _SET_VISIBILITY_FILTER(){return(
'SET_VISIBILITY_FILTER'
)}

function _VisibilityFilters()
{
  return {
    SHOW_ALL: 'SHOW_ALL ITEMS',
    SHOW_COMPLETED: 'SHOW_COMPLETED ITEMS',
    SHOW_ACTIVE: 'SHOW_ACTIVE ITEMS',
  }
}


function _11(md){return(
md`## Action Creators`
)}

function _addTodo(ADD_TODO){return(
function addTodo(text, index) {
    return { type: ADD_TODO, text, index }
}
)}

function _clearTodo(CLEAR_ALL){return(
function clearTodo() {
    return { type: CLEAR_ALL }
}
)}

function _toggleTodo(TOGGLE_TODO){return(
function toggleTodo(index) {
    return { type: TOGGLE_TODO, index }
}
)}

function _setVisibilityFilter(SET_VISIBILITY_FILTER){return(
function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}
)}

function _16(md){return(
md`## Reducers and Store Creation`
)}

function _initialState(VisibilityFilters)
{
  return {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
  }
}


function _todos(ADD_TODO,TOGGLE_TODO,CLEAR_ALL){return(
function todos(state = [], action) {
    switch (action.type) {
        // set item status to incomplete
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false,
                    index: action.index
                }
            ]
        // toggle item status
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo
            })
        // return empty TODO list
        case CLEAR_ALL:
            return []
        default:
            return state
    }
}
)}

function _undoableTodos(undoable,todos){return(
undoable(todos)
)}

function _visibilityFilter(VisibilityFilters,SET_VISIBILITY_FILTER){return(
function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}
)}

function _todoApp(initialState,visibilityFilter,undoableTodos){return(
function todoApp(state = initialState, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: undoableTodos(state.todos, action),
    }
}
)}

function _store(redux,todoApp){return(
redux.createStore(todoApp)
)}

function _23(md){return(
md`## Libraries

We include the \`d3\`, \`redux\`, and \`reduxUndo\` libraries. The \`d3\` library is responsible for updating the GUI, while \`reduxUndo\` gives undo/redo abilities.`
)}

function _d3(require){return(
require('d3@5')
)}

function _redux(require){return(
require('redux@4')
)}

async function _reduxUndo(require){return(
await require('https://cdn.jsdelivr.net/npm/redux-undo@1.0.0-beta9-9-7/dist/redux-undo.js')
)}

function _27(md){return(
md`## Assigning Redux-Undo functions to variables`
)}

function _undoable(reduxUndo){return(
reduxUndo.default
)}

function _ActionCreators(reduxUndo){return(
reduxUndo.ActionCreators
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["html","d3","store","toggleTodo","VisibilityFilters","setVisibilityFilter","addTodo","ActionCreators","clearTodo"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("ADD_TODO")).define("ADD_TODO", _ADD_TODO);
  main.variable(observer("TOGGLE_TODO")).define("TOGGLE_TODO", _TOGGLE_TODO);
  main.variable(observer("CLEAR_ALL")).define("CLEAR_ALL", _CLEAR_ALL);
  main.variable(observer("SET_VISIBILITY_FILTER")).define("SET_VISIBILITY_FILTER", _SET_VISIBILITY_FILTER);
  main.variable(observer("VisibilityFilters")).define("VisibilityFilters", _VisibilityFilters);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("addTodo")).define("addTodo", ["ADD_TODO"], _addTodo);
  main.variable(observer("clearTodo")).define("clearTodo", ["CLEAR_ALL"], _clearTodo);
  main.variable(observer("toggleTodo")).define("toggleTodo", ["TOGGLE_TODO"], _toggleTodo);
  main.variable(observer("setVisibilityFilter")).define("setVisibilityFilter", ["SET_VISIBILITY_FILTER"], _setVisibilityFilter);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("initialState")).define("initialState", ["VisibilityFilters"], _initialState);
  main.variable(observer("todos")).define("todos", ["ADD_TODO","TOGGLE_TODO","CLEAR_ALL"], _todos);
  main.variable(observer("undoableTodos")).define("undoableTodos", ["undoable","todos"], _undoableTodos);
  main.variable(observer("visibilityFilter")).define("visibilityFilter", ["VisibilityFilters","SET_VISIBILITY_FILTER"], _visibilityFilter);
  main.variable(observer("todoApp")).define("todoApp", ["initialState","visibilityFilter","undoableTodos"], _todoApp);
  main.variable(observer("store")).define("store", ["redux","todoApp"], _store);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("redux")).define("redux", ["require"], _redux);
  main.variable(observer("reduxUndo")).define("reduxUndo", ["require"], _reduxUndo);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("undoable")).define("undoable", ["reduxUndo"], _undoable);
  main.variable(observer("ActionCreators")).define("ActionCreators", ["reduxUndo"], _ActionCreators);
  return main;
}
