<template>
  <div class="game-container">
    <h1>Fang das Pixel!</h1>
    <div ref="game" class="game-area">
      <div
          v-show="gameActive"
          class="pixel"
          :style="{ left: pixelPos.x + 'px', top: pixelPos.y + 'px' }"
          @click="catchPixel"
      ></div>
    </div>
    <div class="scoreboard" v-if="gameActive || showResults">
      Score: {{ score }} | Zeit: {{ timeLeft }}s
    </div>
    <button @click="startGame" :disabled="gameActive">Spiel starten</button>

    <div v-if="showResults" class="results">
      <h2>Spiel vorbei! Dein Score: {{ score }}</h2>
      <div class="rewards">
        <p>Danke fürs Mitspielen! Hier ein paar Dinge über mich:</p>
        <ul>
          <li>🟢 Du hast unter 5 Punkte? Kein Problem, hier ein kleiner Fun-Fact: Ich liebe Retro-Games!</li>
          <li v-if="score >= 5">🟡 Ab 5 Punkten gibt's noch mehr: Mein Lieblingsgetränk ist Kaffee ☕</li>
          <li v-if="score >= 10">🔵 10+ Punkte! Ich programmiere gerade an meiner Website mit Vue.js 🚀</li>
          <li v-if="score >= 15">🟣 Wow, 15 oder mehr! Hier ein Geheimnis: Mein Avatar liebt Katzen 🐱</li>
        </ul>
      </div>
      <button @click="resetGame">Nochmal spielen</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';

const score = ref(0);
const timeLeft = ref(30);
const gameActive = ref(false);
const showResults = ref(false);
const pixelPos = ref({ x: 0, y: 0 });
const game = ref(null);

let gameInterval = null;
let timerInterval = null;

function randomPosition() {
  const maxX = game.value.clientWidth - 20;
  const maxY = game.value.clientHeight - 20;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);
  return { x, y };
}

function movePixel() {
  pixelPos.value = randomPosition();
}

function startGame() {
  if (gameActive.value) return;
  score.value = 0;
  timeLeft.value = 30;
  gameActive.value = true;
  showResults.value = false;
  movePixel();

  gameInterval = setInterval(() => {
    movePixel();
  }, 800);

  timerInterval = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameActive.value = false;
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  showResults.value = true;
}

function catchPixel() {
  if (!gameActive.value) return;
  score.value++;
  movePixel();
}

function resetGame() {
  showResults.value = false;
  score.value = 0;
  timeLeft.value = 30;
}
onUnmounted(() => {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
});
</script>

<style scoped>
.game-container {
  font-family: monospace;
  background: #222;
  color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.game-area {
  position: relative;
  width: 300px;
  height: 300px;
  background: #444;
  border: 3px solid #eee;
  margin-top: 20px;
}

.pixel {
  position: absolute;
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
}

.scoreboard {
  margin-top: 15px;
  font-size: 1.2rem;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}

.results {
  margin-top: 20px;
  background: #333;
  padding: 15px;
  border-radius: 8px;
  width: 320px;
  text-align: left;
}

.results ul {
  padding-left: 20px;
  margin-top: 10px;
}

.results li {
  margin-bottom: 8px;
}
</style>
