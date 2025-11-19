<template>
  <div class="result-gauge">
    <div class="gauge-container">
      <div class="gauge-background">
        <div
          class="gauge-fill"
          :style="{
            width: `${gaugePercentage}%`,
            backgroundColor: gaugeColor
          }"
        ></div>
      </div>
      <div class="gauge-markers">
        <span>0</span>
        <span>9</span>
        <span>18</span>
        <span>27</span>
        <span>36</span>
      </div>
    </div>
    <div class="score-display">
      <span class="score-value" :style="{ color: gaugeColor }">{{ score }}</span>
      <span class="score-label">점</span>
    </div>
    <div class="interpretation">
      <span class="level-badge" :style="{ backgroundColor: gaugeColor }">
        {{ interpretation.label }}
      </span>
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

const gaugePercentage = computed(() => {
  return Math.min((props.score / 36) * 100, 100);
});

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

.interpretation {
  margin-top: var(--spacing-sm);
}

.level-badge {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius);
  color: var(--color-white);
  font-size: 0.875rem;
  font-weight: 400;
}
</style>
