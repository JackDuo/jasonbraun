<script setup>
import { ref } from 'vue'

let id = 1

const newTodo = ref('')
const hideCompleted = ref(false)
const Todolist = ref([
  { id: id++, text: 'nummer 1', done: true },
  { id: id++, text: 'nummer 2', done: false },
  { id: id++, text: 'nummer 3', done: false },
])
const filteredTodos = computed(() => {
  return hideCompleted.value
    ? Todolist.value.filter((t) => !t.done)
    : Todolist.value
})

function addTodo() {
Todolist.value.push({ id: id++, text: newTodo.value, done:false })
  newTodo.value = ''
}

function removetodo(todo){
  Todolist.value = Todolist.value.filter((t) => t !== todo)
}

</script>



<template>

  <form @submit.prevent="addTodo">
    <input v-model="newTodo" required placeholder="Neue Todo">
    <button>Add Todo</button>
  </form>

  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="removetodo(todo)">Löschen</button>
    </li>
  </ul>

  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Zieg alles' : 'Versteckt' }}
  </button>
</template>



<style scoped>
.done {
  text-decoration: line-through;
}
</style>