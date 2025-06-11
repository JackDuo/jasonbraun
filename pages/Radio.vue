<template>
  <div class="Full-container">
    <!-- Mute Button -->
    <img
        src="/assets/radio/mutebutton.png"
        alt="Mute"
        class="mute-button"
        :style="{ opacity: isMuted ? 0.4 : 1, cursor: 'pointer' }"
        @click="toggleMute"
    />
    <p class="mute-hint" style="overflow-wrap: break-word">Den Drehregler durch scrollen drehen!</p>
    <div class="radio-container">
      <!-- Drehknopf -->
      <img
          src="/assets/radio/knob.png"
          alt="Drehknopf"
          class="knob"
          @wheel.prevent="handleScroll"
          :style="{ transform: `rotate(${knobRotation}deg)` }"
      />

      <!-- Frequenzskala mit Zeiger -->
      <div class="frequency-line">
        <div class="line"></div>
        <div
            class="indicator"
            :style="{ left: indicatorPosition + '%' }"
        ></div>
      </div>

      <!-- Frequenzanzeige digital -->
      <div class="digital-display">{{ frequency.toFixed(1) }} MHz</div>

      <!-- Beschreibungen -->
      <div class="info-box">
        <component
            v-if="activeStation"
            :is="activeStation.component"
            :style="{ opacity: getOpacity(activeStation.freq) }"
        />
        <div v-else class="no-station">
          <p>Kein Sender gefunden</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Baddisco from "@/components/radio/Baddisco.vue";
import Einkdisplay from "@/components/radio/einkDisp.vue";
import BewSystem from "@/components/radio/Bewsyst.vue";


export default {
  name: "RetroRadio",
  data() {
    return {
      frequency: 87.0,
      step: 0.1,
      minFreq: 87.0,
      maxFreq: 108.0,
      scrollAccumulator: 0,  // NEU: Scroll-Delta summieren
      scrollThreshold: 7,    // NEU: Schwellenwert (je höher, desto weniger empfindlich)
      rotation: 0, // Drehwinkel in Grad
      isMuted: false,
      audio: new Audio(),
      noiseAudio: new Audio("/radio/mute.mp3"),
      currentStationFreq: null,
      stations: [
        {
          freq: 89.0,
          audio: "/radio/emotAmbHipHop.mp3",
          component: Baddisco,
        },
        {
          freq: 100.0,
          audio: "/assets/radio/expHipHop.mp3",
          component: Einkdisplay,
        },
        {
          freq: 104.0,
          audio: "/assets/radio/gorila.mp3",
          component: BewSystem,
        },
      ],
    };

  },
  computed: {
    activeStation() {
      return this.stations.find(
          (s) => Math.abs(s.freq - this.frequency) < 1
      ) || null;
    },
    indicatorPosition() {
      // Prozentsatz der Position auf der Skala (0% = minFreq, 100% = maxFreq)
      return ((this.frequency - this.minFreq) / (this.maxFreq - this.minFreq)) * 100;
    },
    knobRotation() {
      // Rechnet Drehwinkel: z.B. 270° Gesamt-Drehbereich für 87 - 108 MHz (21 MHz)
      // 270 Grad Drehung von Minimum bis Maximum, also linear:
      const totalRange = this.maxFreq - this.minFreq;
      const relativeFreq = this.frequency - this.minFreq;
      const maxRotation = 270; // Grad
      return - (relativeFreq / totalRange) * maxRotation - maxRotation / 2;
      // -135° bis +135° Drehbereich, damit Drehknopf zentriert startet
    },
  },
  mounted() {
    this.audio = new Audio();
    this.audio.loop = true;
    this.noiseAudio = new Audio("/radio/noise.mp3");
    this.noiseAudio.loop = true;
    this.noiseAudio.volume = 0.3;
    this.noiseAudio.play();
  },
  methods: {
    toggleMute() {
      this.isMuted = !this.isMuted;
      this.audio.muted = this.isMuted;
      this.noiseAudio.muted = this.isMuted;
    },
    handleScroll(event) {
      // Scroll nach oben = niedrigere Frequenz, unten = höhere Frequenz
      this.scrollAccumulator += event.deltaY;

      // Schwelle prüfen (positive oder negative Richtung)
      if (this.scrollAccumulator >= this.scrollThreshold) {
        this.changeFrequency(1);
        this.scrollAccumulator = 0;
      } else if (this.scrollAccumulator <= -this.scrollThreshold) {
        this.changeFrequency(-1);
        this.scrollAccumulator = 0;
      }
    },

    changeFrequency(direction) {
      // direction: 1 = scroll runter (höhere freq), -1 = scroll hoch (niedrigere freq)
      let newFreq = this.frequency + direction * this.step;
      newFreq = Math.min(this.maxFreq, Math.max(this.minFreq, parseFloat(newFreq.toFixed(1))));
      this.frequency = newFreq;
      this.updateAudio();
    },

    updateAudio() {
      const station = this.stations.find(
          (s) => Math.abs(s.freq - this.frequency) < 0.2
      );

      if (station) {
        // Nur wenn die Station sich ändert, neu laden
        if (this.currentStationFreq !== station.freq) {
          this.audio.src = station.audio;
          this.audio.play();
          this.currentStationFreq = station.freq;
        }
        this.noiseAudio.pause();
      } else {
        this.audio.pause();
        this.noiseAudio.play();
        this.currentStationFreq = null;
      }
    },

    shouldShowStation(stationFreq) {
      // Station anzeigen, wenn innerhalb von ±1 MHz
      const diff = Math.abs(this.frequency - stationFreq);
      return diff <= 1;
    },

    getOpacity(stationFreq) {
      const diff = Math.abs(this.frequency - stationFreq);
      // Opazität von 1 (bei 0 Abstand) bis 0 (bei 1 MHz Abstand)
      let opacity = 1 - diff;
      if (opacity < 0) opacity = 0;
      return opacity;
    },

    // Prüfen, ob eine Station innerhalb 1 MHz ist (für "Kein Sender gefunden"-Anzeige)
    anyStationClose() {
      return this.stations.some(s => Math.abs(s.freq - this.frequency) <= 1);

    },
  },
  beforeUnmount() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = "";
    }
    if (this.noiseAudio) {
      this.noiseAudio.pause();
      this.noiseAudio.src = "";
    }
  },
};
</script>

<style scoped>
.Full-container {
  position: relative;
  width: 80vw;
  padding-top: 2vh;
  padding-bottom: 50px;
  height: auto;
  margin-top: 20px;
  margin: 20px 12%;

  background-color: rgba(224, 190, 57, 0.60);
  border-radius: 1vw;

  font-family: "Lucida Console", Monaco, monospace;
}


.radio-container {
  position: relative;
  width: 40vw;
  padding-top: 5vh;
  margin: 20px auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
}

.knob {
  width: 100px;
  cursor: grab;
  display: block;
  margin: 0 auto;
  text-align: right;
}

.mute-button {
  position: absolute;
  right: 20px;
  width: 5rem;
  height: auto;
  transition: opacity 0.2s ease-in-out;
  z-index: 100;
}
.mute-hint {
  position: absolute;
  right: 22px;
  top: 6rem; /* etwas unterhalb des Buttons – anpassen je nach Größe */
  font-size: 0.9rem;
  color: #fff;
  text-align: right;
  width: 150px; /* oder auto */
  z-index: 99;
}

.frequency-line {
  position: relative;
  height: 20px;
  margin: 20px 0;
  background: #ccc;
  border-radius: 5px;
}

.frequency-line .line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: #555;
  transform: translateY(-50%);
}

.frequency-line .indicator {
  position: absolute;
  top: 0;
  width: 4px;
  height: 20px;
  background: #e63946;
  border-radius: 2px;
  transform: translateX(-50%);
}

.digital-display {
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: 10px;
}

.info-box {
  margin-top: 10px;
  text-align: left;
  position: relative;
}

.station-info {
  transition: opacity 0.3s ease;
}

.station-info h2 {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
}

.station-info img {
  max-width: 100px;
  border-radius: 5px;
}

.no-station {
  color: #888;
  font-style: italic;
  opacity: 0.5;
}
</style>
