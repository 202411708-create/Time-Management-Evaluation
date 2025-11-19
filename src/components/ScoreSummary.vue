<template>
  <div class="score-summary card">
    <h3 class="summary-title">항목별 분석</h3>
    <div class="score-table">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="score-row"
      >
        <div class="row-header">
          <span class="item-number">{{ index + 1 }}</span>
          <span class="item-text">{{ item.text }}</span>
          <span v-if="item.reverse" class="reverse-badge">역</span>
        </div>
        <div class="bar-container">
          <div class="bar-wrapper">
            <div
              class="bar-fill"
              :style="{
                width: `${getPercentage(index)}%`,
                backgroundColor: getBarColor(index)
              }"
            ></div>
          </div>
          <span class="score-text" :style="{ color: getBarColor(index) }">
            {{ getItemScore(index) }}점
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  responses: {
    type: Array,
    required: true
  }
});

function getItemScore(index) {
  const item = props.items[index];
  const value = props.responses[index];
  return item.reverse ? 4 - value : value;
}

function getPercentage(index) {
  const score = getItemScore(index);
  // 낮은 점수가 좋은 것이므로, 100에서 빼서 높을수록 좋게 표시
  return Math.round(((4 - score) / 4) * 100);
}

function getBarColor(index) {
  const percentage = getPercentage(index);
  if (percentage >= 70) return '#8A8F7A';
  if (percentage >= 40) return '#E8A849';
  return '#D97B4A';
}
</script>

<style scoped>
.score-summary {
  margin-top: var(--spacing-md);
}

.summary-title {
  margin-bottom: var(--spacing-md);
  font-size: 0.875rem;
  color: var(--color-accent);
  font-weight: 400;
}

.score-table {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.score-row {
  padding: var(--spacing-sm);
  background: var(--color-background);
  border-radius: 8px;
}

.row-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-xs);
}

.item-number {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-line);
  border-radius: 50%;
  font-size: 0.625rem;
  margin-right: var(--spacing-xs);
  flex-shrink: 0;
}

.item-text {
  flex: 1;
  font-size: 0.8rem;
  line-height: 1.4;
}

.reverse-badge {
  font-size: 0.625rem;
  padding: 2px 6px;
  background: var(--color-line);
  border-radius: 4px;
  margin-left: var(--spacing-xs);
  color: var(--color-text);
  opacity: 0.7;
}

.bar-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.bar-wrapper {
  flex: 1;
  height: 8px;
  background: var(--color-line);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.score-text {
  font-size: 0.75rem;
  font-weight: 500;
  min-width: 32px;
  text-align: right;
}

@media (max-width: 480px) {
  .score-row {
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  .item-text {
    font-size: 0.75rem;
  }
}
</style>
