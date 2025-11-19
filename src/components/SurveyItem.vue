<template>
  <div class="survey-item card">
    <div class="question-number">{{ questionNumber }} / {{ totalQuestions }}</div>
    <h3 class="question-text">{{ item.text }}</h3>

    <div class="slider-container">
      <div class="slider-labels">
        <span class="label-left">{{ item.reverse ? '전혀 (0점)' : '전혀 (4점)' }}</span>
        <span class="label-right">{{ item.reverse ? '매우 (4점)' : '매우 (0점)' }}</span>
      </div>

      <div class="slider-wrapper">
        <input
          type="range"
          min="0"
          max="4"
          step="1"
          :value="sliderValue"
          @input="onSliderChange"
          class="slider"
        />
        <div class="slider-track">
          <div
            class="slider-fill"
            :style="{ width: `${fillPercentage}%` }"
          ></div>
        </div>
      </div>

      <div class="slider-ticks">
        <span v-for="n in 5" :key="n" class="tick">{{ getTickScore(n - 1) }}</span>
      </div>

      <div class="current-value">
        <span class="value-number">{{ displayValue }}</span>
        <span class="value-label">점</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  modelValue: {
    type: Number,
    default: null
  },
  questionNumber: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

// 슬라이더 위치 값 (0-4)
const sliderValue = computed(() => {
  if (props.modelValue === null) return 2;
  // 역채점: 슬라이더 값 = 점수 그대로
  // 일반: 슬라이더 값 = 4 - 점수
  return props.item.reverse ? props.modelValue : 4 - props.modelValue;
});

// 표시할 점수
const displayValue = computed(() => props.modelValue ?? 2);

const fillPercentage = computed(() => {
  return (sliderValue.value / 4) * 100;
});

// 눈금 점수 계산
function getTickScore(sliderPos) {
  // 역채점: 왼쪽 0, 오른쪽 4
  // 일반: 왼쪽 4, 오른쪽 0
  return props.item.reverse ? sliderPos : 4 - sliderPos;
}

function onSliderChange(event) {
  const sliderPos = parseInt(event.target.value);
  // 역채점: 점수 = 슬라이더 값 그대로
  // 일반: 점수 = 4 - 슬라이더 값
  const score = props.item.reverse ? sliderPos : 4 - sliderPos;
  emit('update:modelValue', score);
}
</script>

<style scoped>
.survey-item {
  margin-bottom: var(--spacing-md);
}

.question-number {
  font-size: 0.875rem;
  color: var(--color-accent);
  margin-bottom: var(--spacing-sm);
  font-weight: 400;
}

.question-text {
  margin-bottom: var(--spacing-lg);
  line-height: 1.5;
}

.slider-container {
  padding: var(--spacing-sm) 0;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
  font-size: 0.75rem;
  color: var(--color-text);
  opacity: 0.7;
}

.slider-wrapper {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
}

.slider-track {
  position: absolute;
  width: 100%;
  height: 8px;
  background: var(--color-line);
  border-radius: 4px;
  pointer-events: none;
}

.slider-fill {
  height: 100%;
  background: var(--color-accent);
  border-radius: 4px;
  transition: width 0.1s ease;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  background: transparent;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-white);
  border: 3px solid var(--color-accent);
  cursor: grab;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
}

.slider::-webkit-slider-thumb:active {
  cursor: grabbing;
  transform: scale(1.15);
}

.slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-white);
  border: 3px solid var(--color-accent);
  cursor: grab;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.slider-ticks {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-xs);
  padding: 0 2px;
}

.tick {
  font-size: 0.625rem;
  color: var(--color-text);
  opacity: 0.5;
  width: 16px;
  text-align: center;
}

.current-value {
  text-align: center;
  margin-top: var(--spacing-md);
  color: var(--color-accent);
}

.value-number {
  font-size: 2.5rem;
  font-weight: 300;
}

.value-label {
  font-size: 1rem;
  opacity: 0.7;
  margin-left: 4px;
}

@media (max-width: 480px) {
  .slider::-webkit-slider-thumb {
    width: 28px;
    height: 28px;
  }

  .value-number {
    font-size: 2rem;
  }
}
</style>
