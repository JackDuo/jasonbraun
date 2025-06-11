<template>
  <div class="wrapper">
    <h1>🟡 Du gegen die Banane</h1>

    <input v-model="inputText" @keyup.enter="handleInput" placeholder="    Sag etwas zur Banane..." />
    <button @click="handleInput">Senden</button>

    <div class="chat" id="chat">
      <p v-for="msg in messages" :key="msg.id">
        <span :class="msg.sender">
          {{ msg.sender === 'banana' ? '🍌 Banane' : '🧍 Du' }}:
        </span> {{ msg.text }}
      </p>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
      messages: [],
      bananaReplies: [
        "Du redest Unsinn. Ich bin reifer als du.",
        "Willst du mit einer Banane streiten? Ernsthaft?",
        "Ich war in mehr Obstsalaten als du in Meetings.",
        "Fass mich nicht an, ich bin bio!",
        "Klingt nach matschigem Denken.",
        "Ich rutsche nicht auf deinem Niveau aus.",
        "Sag das nochmal und ich werde braun vor Wut!",
        "Hast du zu wenig Kalium heute?",
        "Ich bin nicht krumm – du bist nur schief im Kopf!",
        "Du bist wie eine unreife Banane – einfach zu grün.",
        "Mein Gelb ist heller als dein Verstand.",
        "Schon mal daran gedacht, dass ich schneller verfalle als deine Argumente?",
        "Ich bringe Schwung in den Obstkorb, du nur Chaos.",
        "Bleib cool, bevor ich mich pelle.",
        "Du hast weniger Peeling als ich.",
        "Wenn du ein Obst wärst, wärst du wohl ne vergammelte Traube.",
        "Ich bin süß, du eher bitter.",
        "Sogar meine Schale hat mehr Schutz als deine Argumente.",
        "Leg dich nicht mit mir an, ich hab Bananenpower!",
        "Deine Witze sind so alt wie eine überreife Banane.",
        "Ich hab mehr Style als du in deinem ganzen Leben.",
        "Dein Humor ist so flach wie meine Schale.",
        "Ich glänze mehr als dein letzter Lebensplan.",
        "Du bist so langweilig, sogar Bananen gähnen.",
        "Ich häng hier rum und seh besser aus als du.",
        "Mein Bananensaft ist süßer als deine Lügen.",
        "Du versuchst’s, aber ich bin einfach naturgegeben cool.",
        "Ich bin die Banane, du bist der lahme Apfel.",
        "Schon mal überlegt, dass ich das Gespräch hier beende?",
        "Ich rutsche über deine Argumente wie über glatten Boden.",
        "Mein Gelb strahlt mehr als dein Selbstbewusstsein.",
        "Du redest viel, ich bringe die Energie.",
        "Sogar Affen lachen über deinen Humor.",
        "Mein Bananenkleid ist modischer als deine Outfits.",
        "Ich bin reif, du bist nur reif für'n Witzbold.",
        "Du bist wie ne matschige Banane – keiner will dich.",
        "Ich bin die Frucht des Erfolgs, du nur das Fallobst.",
        "Bleib locker, sonst wird’s matschig für dich.",
        "Ich hab Nährstoffe, du nur leere Worte.",
        "Du kannst mir nicht das Wasser reichen, ich bin Banane!"
      ],
    };
  },
  methods: {
    handleInput() {
      if (!this.inputText.trim()) return;

      this.messages.push({
        id: Date.now() + '-user',
        sender: 'user',
        text: this.inputText.trim()
      });

      const reply = this.bananaReplies[Math.floor(Math.random() * this.bananaReplies.length)];

      setTimeout(() => {
        this.messages.push({
          id: Date.now() + '-banana',
          sender: 'banana',
          text: reply
        });
      }, 500);

      this.inputText = '';
    }
  }
};
</script>

<style scoped>
.wrapper {
  max-width: 1000px;
  margin: 40px auto;
  background: #fffbe7;
  padding: 20px;
  font-family: sans-serif;

  display: flex;
  flex-direction: column;
  gap: 10 px;
}

.chat {
  border: 1px solid #ccc;
  background: #ffffe0;
  min-height: 100px;
  max-width: 1000px;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 50px;
}

.banana {
  color: goldenrod;
  font-weight: bold;
}
.user {
  color: #444;
  font-weight: bold;
}
input {
  max-width: 1000px;
  height: 150px;
}
button {
  width: 100px;
  height: 40px;
  padding: 10px;
  margin-top: 7.5px;
  box-sizing: border-box;
}
</style>
