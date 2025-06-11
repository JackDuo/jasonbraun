<template>
  <div class="frog-container">
    <h1>QuakGPT – Der Frosch, der alles weiß</h1>
    <p>Stell deine Frage, und der Frosch quakt dir eine Antwort in Reimen.</p>

    <textarea v-model="question" placeholder="Frag mich irgendwas..."></textarea><br />
    <button @click="askFrog">Quak mir was!</button>

    <div id="answer">{{ answer }}</div>
  </div>
</template>

<script>
export default {
  name: 'Frog',
  data() {
    return {
      question: '',
      answer: ''
    }
  },
  methods: {
    askFrog() {
      if (!this.question.trim()) {
        this.answer = "Quak! Bitte stell auch eine Frage.";
        return;
      }

      this.answer = "Der Frosch überlegt...";

      const answers = [
        "Ein Frosch am Teich, so klug und fein,\nAntwortet dir, doch stets im Reim.",
        "Quak! Das Wasser fließt und rinnt,\nAuch deine Frage nun beginnt.",
        "Im Morgentau, im Sonnenschein,\nFindet der Frosch die Antwort rein.",
        "Nicht alles klar, doch hör genau,\nDer Frosch erzählt dir eine Schau.",
        "Die Libelle fliegt, der Teich so nah,\nDeine Frage klingt wie wunderbar.",
        "Quak, quak, so klingt der Rat,\nFrag den Frosch, der alles hat.",
        "Im Schlamm versteckt, doch hell der Sinn,\nFrosch weiß Bescheid, so mach dich hin.",
        "Die Sterne leuchten, die Nacht ist klar,\nDein Frosch hat Antwort, wunderbar.",
        "Quak! Der Frosch, er singt sein Lied,\nWas du wissen willst, er dir verrät.",
        "Der Mond sieht zu, die Frösche hüpfen,\nDeine Frage lässt sie schnippen."
      ];

      setTimeout(() => {
        this.answer = answers[Math.floor(Math.random() * answers.length)];
      }, 1000);
    }
  }
}
</script>

<style scoped>
.frog-container {
  background: #a3d9a5;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  text-align: center;
  padding: 2rem;
  color: #064006;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

textarea {
  width: 80%;
  height: 80px;
  font-size: 1.1rem;
  border-radius: 8px;
  border: 2px solid #3b6e3b;
  padding: 0.5rem;
  resize: none;
}

button {
  margin-top: 1rem;
  background-color: #3b6e3b;
  color: white;
  font-size: 1.2rem;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2a4c2a;
}

#answer {
  margin-top: 2rem;
  font-size: 1.4rem;
  font-style: italic;
  min-height: 80px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  background: #d0f0c0;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px #2a4c2a;
  white-space: pre-line;
}
</style>
