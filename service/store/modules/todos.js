/* Explanation */
/*
const state = {};
const getters = {};
const actions = {};
const mutations = {};

export default {
    // it should be like line below
    // e.g. state: state
    // but because of es 6 we can do like below
  state,
  getters,
  actions,
  mutations
};
*/

import ajax from "@/common/ajax";

const state = {
    todos: []
  };
  
  const getters = {
    allTodos: state => state.todos
  };
  
  const actions = {
    async fetchTodos({ commit }) {
      const response = await ajax.get(
        'https://jsonplaceholder.typicode.com/todos'
      );

      commit('setTodos', response);
    },
    async addTodo({ commit }, title) {
      const response = await ajax.post(
        'https://jsonplaceholder.typicode.com/todos',
        { title, completed: false }
      );
  
      commit('newTodo', response);
    },
    async deleteTodo({ commit }, id) {
      await ajax.del(`https://jsonplaceholder.typicode.com/todos/${id}`);
      commit('removeTodo', id);
    },
    async filterTodos({ commit }, e) {
      // Get selected number
      const limit = parseInt(
        e.target.options[e.target.options.selectedIndex].innerText
      );
  
      const response = await ajax.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
      );

      commit('setTodos', response);
    },
    async updateTodo({ commit }, updTodo) {
      const response = await ajax.put(
        `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
        updTodo
      );
  
      commit('updateTodo', response);
    }
  };
  
  const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) =>
      (state.todos = state.todos.filter(todo => todo.id !== id)),
    updateTodo: (state, updTodo) => {
      const index = state.todos.findIndex(todo => todo.id === updTodo.id);
      if (index !== -1) {
        state.todos.splice(index, 1, updTodo);
      }
    }
  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  };
  
