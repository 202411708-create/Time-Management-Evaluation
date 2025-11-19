<template>
  <div class="strength-weakness">
    <div class="section card">
      <h3 class="section-title strength-title">강점 영역</h3>
      <div class="items">
        <div
          v-for="item in analysis.strengths"
          :key="item.id"
          class="item strength"
        >
          <div class="item-info">
            <span class="item-number">{{ item.id }}</span>
            <span class="item-text">{{ item.text }}</span>
          </div>
          <div class="item-score">{{ item.percentage }}%</div>
        </div>
      </div>
    </div>

    <div class="section card">
      <h3 class="section-title weakness-title">개선 필요 영역</h3>
      <div class="items">
        <div
          v-for="item in analysis.weaknesses"
          :key="item.id"
          class="item weakness"
        >
          <div class="item-info">
            <span class="item-number">{{ item.id }}</span>
            <span class="item-text">{{ item.text }}</span>
          </div>
          <div class="item-score">{{ item.percentage }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  analysis: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.strength-weakness {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.section {
  padding: var(--spacing-md);
}

.section-title {
  font-size: 0.875rem;
  margin-bottom: var(--spacing-sm);
}

.strength-title {
  color: #8A8F7A;
}

.weakness-title {
  color: #D97B4A;
}

.items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 8px;
}

.item.strength {
  background: rgba(138, 143, 122, 0.1);
}

.item.weakness {
  background: rgba(217, 123, 74, 0.1);
}

.item-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex: 1;
}

.item-number {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  background: var(--color-line);
  border-radius: 50%;
  flex-shrink: 0;
}

.item-text {
  font-size: 0.75rem;
  line-height: 1.3;
}

.item-score {
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: var(--spacing-sm);
}

.strength .item-score {
  color: #8A8F7A;
}

.weakness .item-score {
  color: #D97B4A;
}
</style>
