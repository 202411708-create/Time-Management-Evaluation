<template>
  <div class="home">
    <div class="hero">
      <h1 class="title">시간 관리 평가</h1>
      <p class="subtitle">나의 시간 관리 능력을 점검해보세요</p>

      <div class="info-card card">
        <p>총 9개의 질문에 답하면 나의 시간 관리 유형과 개선점을 알 수 있습니다.</p>
        <ul class="info-list">
          <li>소요 시간: 약 3분</li>
          <li>문항 수: 9문항</li>
          <li>평가 방식: 5점 리커트 척도</li>
        </ul>
      </div>

      <button class="btn btn-primary start-btn" @click="startSurvey">
        시작하기
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function startSurvey() {
  router.push('/survey');
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 80vh;
}

.hero {
  text-align: center;
}

.title {
  margin-bottom: var(--spacing-sm);
}

.subtitle {
  color: var(--color-text);
  opacity: 0.7;
  margin-bottom: var(--spacing-lg);
}

.info-card {
  text-align: left;
  margin-bottom: var(--spacing-lg);
}

.info-card p {
  margin-bottom: var(--spacing-md);
}

.info-list {
  list-style: none;
  padding: 0;
}

.info-list li {
  padding: var(--spacing-xs) 0;
  font-size: 0.875rem;
  color: var(--color-text);
  opacity: 0.8;
  position: relative;
  padding-left: var(--spacing-md);
}

.info-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: var(--color-accent);
  border-radius: 50%;
}

.start-btn {
  width: 100%;
  padding: var(--spacing-md);
  font-size: 1.125rem;
}
</style>
