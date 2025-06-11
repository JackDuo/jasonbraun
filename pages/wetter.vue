<template>
  <div class="weather">
    <div class="weatherbg">
    <h1>🌤️ Wetter in {{ city }}</h1>
    <div class="card">
      <p><strong>Temperatur:</strong> {{ temperature }}</p>
      <p><strong>Windstärke:</strong> {{ wind }}</p>
      <p><strong>Luftdruck:</strong> {{ pressure }}</p>
      <p><strong>Niederschlag:</strong> {{ rain }}</p>
      <p v-html="mood"></p>
    </div>

    <div class="wetterbutton">
      <button @click="generateWeather">🔁 Neues Wetter</button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FunnyWeather",
  data() {
    return {
      city: null,
      error: null,
      temperature: "",
      wind: "",
      pressure: "",
      rain: "",
      mood: ""
    };
  },
  async mounted() {
    this.generateWeather();
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      this.city = data.city || 'Unbekannt';
    } catch (err) {
      this.error = 'IP-Standort konnte nicht ermittelt werden.';
    }
  },
  methods: {
    generateWeather() {
      const temps = [
        "über der Jogginggrenze",
        "zu warm für Pinguine",
        "unter Kuscheldeckenpflicht",
        "in Hundejahren",
        "mit Heizdeckenbonus",
        "aber fühlt sich an wie Montag",
        "heiß genug für Eiscreme-Krise",
        "perfekt zum Drinnen-Verschwinden",
        "zu kalt für gute Laune",
        "grad so, dass selbst die Sonne schwitzt",
        "da, wo selbst Katzen jammern",
        "ideal zum Sofawintern",
        "für Schneehasen fast schon Sommer",
        "optimal für kalte Füße",
        "schwitziger als deine letzten Ausreden",
        "zu kalt für deine Ausreden",
        "wärmer als dein Kaffee um 9 Uhr",
        "frischer als dein Humor",
        "eine Heizung würde sich freuen",
        "schon fast tropisch, aber mit Regen",
        "so heiß, dass die Sonne neidisch wird",
        "frischer als dein letzter Witz",
        "perfekt für einen Serien-Marathon unter der Decke",
        "kälter als dein letzter Blick",
        "ideal, um die Eiskristalle tanzen zu lassen",
        "wärmer als dein Kühlschrank nach dem Aufräumen",
        "so kalt, dass sogar der Yeti friert",
        "genau richtig für eine Ausrede, nicht rauszugehen",
        "heißer als dein Bildschirm nach 3 Stunden Zocken",
        "der Moment, wenn der Kaffee schneller abkühlt als du",
        "kühler als deine Ausreden beim Aufräumen",
        "perfekt, um sich in eine Wolldecke zu wickeln und zu meckern",
        "grad so warm, dass du denkst, der Sommer wäre zurück",
        "so kalt, dass sogar der Schnee eine Pause macht",
        "wärmer als das Gefühl, wenn der Wecker klingelt",
        "kalt genug, um die Motivation zu erfrieren",
        "so heiß, dass deine Sonnenbrille zum Accessoire wird",
        "ideal, um die Heizung heimlich anzumachen",
        "schon fast Sauna, aber ohne Handtuch",
        "genau richtig, um die Couch nicht zu verlassen"
      ];

      const winds = [
        "flugzeugartige Windböen",
        "leichtes Sabberwackeln",
        "3 Hütten weggeweht",
        "Brisenlevel: Omaschürze flattert",
        "Wind wie nach Bohnensuppe",
        "Fenster klappern im Takt der Natur",
        "Haare im Dauerchaos-Modus",
        "Stark genug, um dich vom Sofa zu pusten",
        "Der Himmel übt für den Sturm der Entrüstung",
        "Gegenwind deluxe – nimm’s sportlich!",
        "Blätterchaos auf Speed",
        "Windig genug, um den Hut zu verlieren",
        "Die Frisur sagt: ‚Heute wird’s wild!‘",
        "Wenn die Jacke plötzlich zum Segel wird",
        "Fast wie ein Mini-Tornado im Vorgarten",
        "Der Wind flüstert ‚Abenteuer!‘ und pustet dich um",
        "Sanft wie ein nervöser Wellensittich",
        "Kraftvoller als deine Ausrede zum Drinnenbleiben",
        "Wind, der mehr Power hat als deine Kaffeemaschine",
        "Eine Brise mit Attitüde",
      ];

      const pressures = [
        "1,013 MemeBar",
        "Kopfschmerzwahrscheinlichkeit: 50%",
        "Stabil wie ein Ikea-Regal",
        "Ziemlich gedrückt, wie dein Kontostand",
        "Explosionsgefahr nur bei Politikgesprächen",
        "Luftdruck: So hoch, dass die Wolken keuchen",
        "Atmosphäre mit Extra-Drama",
        "Drück dich nicht zu sehr – sagt der Luftdruck",
        "So locker wie dein letzter Wochenendplan",
        "Die Luft macht heute ordentlich Druck",
        "Fast so schwer wie deine To-do-Liste",
        "Druck steigt – wie deine Motivation (hoffentlich)",
        "Luft so dicht wie der letzte Club am Freitagabend",
        "Entspannt wie ein Faultier auf der Couch",
        "Der Himmel hält die Luft an",
        "Luftdruck: Mehr Stress als Montagmorgen",
        "Atmosphäre mit Überholspur",
        "Drückender als dein Chef bei der Deadline",
        "So entspannt wie ein Sonntag ohne Wecker",
        "Druck steigt, aber nicht dein Blutdruck",
        "Luft so dünn wie deine Geduld",
        "Atmosphäre auf Anschlag, aber du bleibst cool",
        "Wenn der Himmel das Gewicht der Welt trägt",
        "Luftdruck: Mehr Power als dein Energy-Drink",
        "Die Atmosphäre sagt ‚Ich hab alles im Griff‘",
      ];

      const rains = [
        "Regen aus Fröschen möglich",
        "Niesel bis Platzregen, je nach Laune",
        "Schauerwahrscheinlichkeit: 42%",
        "Regenbogen mit Einhornsichtung",
        "Schlammfestival-Level: 3",
        "Tropfen tanzen Breakdance",
        "Wasser von oben, Überraschung inklusive",
        "Matschgefahr: Hoch",
        "Wolken weinen stille Freudentränen",
        "Regengüsse mit Drama und Special Effects",
        "Schirme empfohlen, falls du keinen Style hast",
        "Der Himmel schüttelt die Wasserflasche",
        "Feuchtfröhlich mit Aussicht auf Pfützen",
        "Flüssiges Glück aus der Natur",
        "Schnell rein oder später wie ein nasser Pudel",
        "Regensaison: Aktiv, mit Pausen und Pläuschen",
        "Gummistiefel-Modus: Ein",
        "Wolken legen eine Duschpause ein",
        "Tropfenroulette – wer wird nass?",
        "Regenpause – die Natur macht Urlaub",
        "Wolkenfrei, aber nicht ganz wolkenlos im Kopf",
        "Sonnenbrandgefahr: Hoch, Schattenmangel inklusive",
        "Trocken wie dein Humor heute",
        "Kein Tropfen in Sicht – Pfützen im Winterschlaf",
        "Wetter sagt: ‚Heute bleib ich trocken‘",
        "Nicht mal ein Regentropfen traut sich raus",
        "Klare Sicht, aber noch nicht klar im Kopf",
        "Trockenzeit – Zeit, die Gummistiefel wegzupacken",
        "Sonne lacht, Wolken haben frei",
        "Trocken wie der Humor vom Chef",
        "Wolken? Fehlanzeige. Gute Laune? Optional.",
        "Kein Regen, aber vielleicht ein bisschen Drama",
        "Trockener als deine Ausreden am Montag",
        "Kein Regen – höchste Pfützen-Alarmstufe vorbei",
        "Heute wird nicht geduscht"
      ];

      const moods = [
        "🌞 <strong>Laune:</strong> euphorisch sonnig",
        "🌫️ <strong>Stimmung:</strong> neblig introvertiert",
        "🌪️ <strong>Gefühl:</strong> innerer Tornado",
        "☔ <strong>Vibes:</strong> melancholisch feucht",
        "🔥 <strong>Emotional:</strong> Grillparty im Kopf",
        "💨 <strong>Stimmung:</strong> vom Winde verweht",
        "🌈 <strong>Laune:</strong> bunt wie ein Einhorn auf Zucker",
        "🌧️ <strong>Gefühl:</strong> Regenschirm im Kopf verloren",
        "⚡ <strong>Vibes:</strong> elektrisierend und leicht durchgeknallt",
        "❄️ <strong>Stimmung:</strong> eisgekühlt und cool wie ein Pinguin",
        "🌻 <strong>Emotional:</strong> Sonnenblume im Frühlingswind",
        "🌙 <strong>Laune:</strong> mondbeschienen und nachdenklich",
        "🔥 <strong>Gefühl:</strong> brodelnder Vulkan der Kreativität",
        "🍂 <strong>Vibes:</strong> herbstlich zerstreut und gemütlich",
        "🌬️ <strong>Stimmung:</strong> leicht chaotisch, wie Herbstblätter im Wind",
        "🎉 <strong>Emotional:</strong> Party im Kopf mit Konfetti",
        "🌀 <strong>Gefühl:</strong> Wirbelsturm der Gedanken",
        "🌸 <strong>Laune:</strong> blühend und voller Hoffnung",
        "🌞 <strong>Vibes:</strong> strahlend, wie ein frisch aufgebrühter Kaffee",
        "💧 <strong>Stimmung:</strong> ruhig wie ein stiller See",
        "⚡ <strong>Emotional:</strong> Blitzstart ins Abenteuer",
        "🌺 <strong>Laune:</strong> exotisch und unberechenbar",
        "🌪️ <strong>Gefühl:</strong> Sturmfrei im Kopf",
        "🌙 <strong>Vibes:</strong> geheimnisvoll und mondscheinfarben",
        "🌟 <strong>Stimmung:</strong> funkeln wie ein Stern im Großstadtdschungel",
        "🍃 <strong>Emotional:</strong> frisch wie eine Brise am Morgen",
      ];

      this.temperature = this.biasedRandom(-30, 50) + "° " + this.getRandom(temps);
      this.wind = this.getRandom(winds);
      this.pressure = this.getRandom(pressures);
      this.rain = this.getRandom(rains);
      this.mood = this.getRandom(moods);
    },
    getRandom(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    biasedRandom(min, max) {
    // Box-Muller-Transform für Normalverteilung
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); // [0,1) ausschließen
    while(v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    // Standardabweichung und Mittelwert anpassen
    const mean = (min + max) / 2; // Mittelpunkt der Range (-20 bis 40 → Mitte ist 10)
    const stddev = (min + max) / 6; // je kleiner, desto mehr Ballung um mean

    num = Math.round(num * stddev + mean);

    // Begrenzen auf gewünschten Bereich
    return Math.max(min, Math.min(max, num));
    }
  }
};


</script>

<style scoped>
.weather {
  font-family: 'Comic Sans MS', sans-serif;
  text-align: center;
  min-height: 100vh;
  padding: 2rem;
  color: #1F2937;
}

.weatherbg {
  background-color: rgba(255, 255, 255, 0.75); /* leicht transparentes Weiß */
  display: block;
  border-radius: 1rem;
  padding-top: 2rem;
  padding-bottom: 10rem;
  margin-left: 3.5rem;
  }
.card {
  background: #fffbe6;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  display: inline-block;
  padding: 2rem;
  margin-top: 1rem;
  font-size: 1.2rem;
  text-align: left;
}

button {
  margin-top: 2rem;
  font-size: 1rem;
  padding: 0.6rem 1.5rem;
  background: #ffa400;
  color: #1f2937;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #388e3c;
}
</style>
