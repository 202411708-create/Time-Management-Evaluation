<template>
  <div class="result-gauge">
    <div class="gauge-container">
      <div class="gauge-background">
        <div
          class="gauge-fill"
          :style="{
            width: `${interpretation.percentage}%`,
            backgroundColor: gaugeColor
          }"
        ></div>
      </div>
      <div class="gauge-markers">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
    </div>
    <div class="score-display">
      <span class="score-value" :style="{ color: gaugeColor }">{{ interpretation.percentage }}</span>
      <span class="score-label">%</span>
    </div>
    <div class="score-raw">
      <span>{{ score }} / 36점</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getScoreInterpretation } from '../data/scoringRules.js';

const props = defineProps({
  score: {
    type: Number,
    required: true
  }
});

const interpretation = computed(() => getScoreInterpretation(props.score));

const gaugeColor = computed(() => interpretation.value.color);
</script>

<style scoped>
.result-gauge {
  text-align: center;
  padding: var(--spacing-md);
}

.gauge-container {
  margin-bottom: var(--spacing-md);
}

.gauge-background {
  width: 100%;
  height: 12px;
  background: var(--color-line);
  border-radius: 6px;
  overflow: hidden;
}

.gauge-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 1s ease, background-color 0.5s ease;
}

.gauge-markers {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-xs);
  font-size: 0.75rem;
  color: var(--color-text);
  opacity: 0.6;
}

.score-display {
  margin: var(--spacing-md) 0 0 0;
}

.score-value {
  font-size: 3rem;
  font-weight: 300;
}

.score-label {
  font-size: 1.25rem;
  color: var(--color-text);
  opacity: 0.6;
  margin-left: 4px;
}

.score-raw {
  margin-top: var(--spacing-xs);
  font-size: 0.875rem;
  color: var(--color-text);
  opacity: 0.6;
}
</style>
