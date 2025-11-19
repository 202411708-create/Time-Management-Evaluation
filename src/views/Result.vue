<template>
  <div class="result">
    <h2 class="result-title">평가 결과</h2>

    <transition name="fade">
      <div v-if="isLoaded">
        <ResultGauge :score="totalScore" />

        <div class="description card">
          <p>{{ interpretation.description }}</p>
        </div>

        <TimeTypeCard :time-type="timeType" />

        <div class="chart-section card">
          <h3 class="section-title">영역별 분석</h3>
          <RadarChart :data="radarData" />
        </div>

        <StrengthWeakness :analysis="strengthWeakness" />

        <ScoreSummary :items="surveyItems" :responses="responses" />

        <button class="btn btn-secondary retry-btn" @click="retryTest">
          다시 테스트 하기
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ResultGauge from '../components/ResultGauge.vue';
import RadarChart from '../components/RadarChart.vue';
import ScoreSummary from '../components/ScoreSummary.vue';
import TimeTypeCard from '../components/TimeTypeCard.vue';
import StrengthWeakness from '../components/StrengthWeakness.vue';
import surveyItems from '../data/surveyItems.json';
import {
  calculateScore,
  getScoreInterpretation,
  getTimeType,
  getRadarData,
  getStrengthWeakness
} from '../data/scoringRules.js';

const route = useRoute();
const router = useRouter();

const responses = ref([]);
const isLoaded = ref(false);

onMounted(() => {
  try {
    const responsesQuery = route.query.responses;
    if (responsesQuery) {
      responses.value = JSON.parse(responsesQuery);
      isLoaded.value = true;
    } else {
      router.push('/');
    }
  } catch (e) {
    router.push('/');
  }
});

const totalScore = computed(() => {
  return calculateScore(responses.value, surveyItems);
});

const interpretation = computed(() => {
  return getScoreInterpretation(totalScore.value);
});

const timeType = computed(() => {
  return getTimeType(responses.value, surveyItems);
});

const radarData = computed(() => {
  return getRadarData(responses.value, surveyItems);
});

const strengthWeakness = computed(() => {
  return getStrengthWeakness(responses.value, surveyItems);
});

function retryTest() {
  router.push('/survey');
}
</script>

<style scoped>
.result {
  padding-top: var(--spacing-md);
  padding-bottom: var(--spacing-xl);
}

.result-title {
  text-align: center;
  margin-bottom: var(--spacing-md);
}

.description {
  text-align: center;
  margin-top: var(--spacing-md);
}

.description p {
  font-size: 0.9rem;
  line-height: 1.6;
}

.chart-section {
  margin-top: var(--spacing-md);
}

.section-title {
  font-size: 1rem;
  color: var(--color-accent);
  margin-bottom: var(--spacing-sm);
  text-align: center;
}

.retry-btn {
  width: 100%;
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
}
</style>
