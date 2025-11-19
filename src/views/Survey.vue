<template>
  <div class="survey">
    <div class="progress-container">
      <div class="progress-bar">
        <div
          class="progress-bar-fill"
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
      <span class="progress-text">{{ currentQuestion + 1 }} / {{ surveyItems.length }}</span>
    </div>

    <transition name="slide" mode="out-in">
      <SurveyItem
        :key="currentQuestion"
        :item="surveyItems[currentQuestion]"
        :question-number="currentQuestion + 1"
        :total-questions="surveyItems.length"
        v-model="responses[currentQuestion]"
      />
    </transition>

    <div class="navigation">
      <button
        class="btn btn-secondary"
        @click="prevQuestion"
        :disabled="currentQuestion === 0"
      >
        이전
      </button>
      <button
        v-if="currentQuestion < surveyItems.length - 1"
        class="btn btn-primary"
        @click="nextQuestion"
        :disabled="responses[currentQuestion] === null"
      >
        다음
      </button>
      <button
        v-else
        class="btn btn-primary"
        @click="submitSurvey"
        :disabled="responses[currentQuestion] === null"
      >
        결과 보기
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import SurveyItem from '../components/SurveyItem.vue';
import surveyItems from '../data/surveyItems.json';

const router = useRouter();

const currentQuestion = ref(0);
const responses = ref(Array(surveyItems.length).fill(null));

const progressPercentage = computed(() => {
  return ((currentQuestion.value + 1) / surveyItems.length) * 100;
});

function nextQuestion() {
  if (responses.value[currentQuestion.value] !== null && currentQuestion.value < surveyItems.length - 1) {
    currentQuestion.value++;
  }
}

function prevQuestion() {
  if (currentQuestion.value > 0) {
    currentQuestion.value--;
  }
}

function submitSurvey() {
  if (responses.value.every(r => r !== null)) {
    // 결과 페이지로 이동하면서 응답 데이터 전달
    router.push({
      name: 'Result',
      query: { responses: JSON.stringify(responses.value) }
    });
  }
}
</script>

<style scoped>
.survey {
  padding-top: var(--spacing-md);
}

.progress-container {
  margin-bottom: var(--spacing-lg);
}

.progress-text {
  display: block;
  text-align: right;
  font-size: 0.75rem;
  color: var(--color-text);
  opacity: 0.6;
  margin-top: var(--spacing-xs);
}

.navigation {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.navigation .btn {
  flex: 1;
}

.navigation .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
