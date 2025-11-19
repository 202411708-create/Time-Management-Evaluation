<template>
  <div class="time-type-card card">
    <h3 class="type-title">나의 시간 유형</h3>
    <div class="type-content">
      <span class="type-name">{{ timeType.type.name }}</span>
    </div>
    <p class="type-description">{{ description }}</p>

    <div class="weakness-section">
      <span class="weakness-label">개선 필요 영역</span>
      <div class="weakness-content">
        <span class="weakness-name">{{ timeType.weakness.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  timeType: {
    type: Object,
    required: true
  }
});

const description = computed(() => {
  const descriptions = {
    '계획형': '체계적으로 계획을 세우고 관리하는 것을 선호합니다.',
    '실행형': '계획보다는 바로 행동으로 옮기는 것을 좋아합니다.',
    '집중형': '외부 방해에 잘 대응하고 집중력을 유지합니다.',
    '기억형': '기억력이 좋아 할 일을 잘 기억합니다.',
    '시간엄수형': '약속 시간을 잘 지키고 시간 관리에 철저합니다.',
    '시간인식형': '시간의 흐름을 잘 인지하고 있습니다.',
    '효율형': '시간을 효율적으로 사용하려고 노력합니다.'
  };
  return descriptions[props.timeType.type.name] || '';
});
</script>

<style scoped>
.time-type-card {
  text-align: center;
  margin-top: var(--spacing-md);
}

.type-title {
  font-size: 0.875rem;
  color: var(--color-accent);
  margin-bottom: var(--spacing-md);
  font-weight: 400;
}

.type-content {
  margin-bottom: var(--spacing-sm);
}

.type-name {
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--color-text);
}

.type-description {
  font-size: 0.875rem;
  color: var(--color-text);
  opacity: 0.7;
  margin-bottom: var(--spacing-md);
  line-height: 1.5;
}

.weakness-section {
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-line);
}

.weakness-label {
  font-size: 0.75rem;
  color: var(--color-text);
  opacity: 0.5;
  display: block;
  margin-bottom: var(--spacing-xs);
}

.weakness-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.weakness-name {
  font-size: 1rem;
  font-weight: 300;
  color: var(--color-text);
}
</style>
