<template>
  <div class="radar-chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

const chartCanvas = ref(null);
let chartInstance = null;

function createChart() {
  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = chartCanvas.value.getContext('2d');

  chartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: props.data.map(d => d.label),
      datasets: [{
        label: '나의 점수',
        data: props.data.map(d => d.value),
        backgroundColor: 'rgba(138, 143, 122, 0.2)',
        borderColor: '#8A8F7A',
        borderWidth: 2,
        pointBackgroundColor: '#8A8F7A',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#8A8F7A'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
            font: {
              size: 10
            },
            color: '#2D2D2D'
          },
          grid: {
            color: '#E0DED8'
          },
          angleLines: {
            color: '#E0DED8'
          },
          pointLabels: {
            font: {
              size: 12,
              family: 'Noto Sans KR'
            },
            color: '#2D2D2D'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

onMounted(() => {
  createChart();
});

watch(() => props.data, () => {
  createChart();
}, { deep: true });
</script>

<style scoped>
.radar-chart-container {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: var(--spacing-sm);
}
</style>
