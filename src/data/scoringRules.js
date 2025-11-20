// 점수 계산 함수 (0-4점 체계)
// 역채점 항목(4, 5, 6, 9번)은 슬라이더에서 이미 반전 처리됨
// 선택한 점수를 그대로 합산
export function calculateScore(responses, items) {
  return responses.reduce((sum, value) => {
    return sum + value;
  }, 0);
}

// 점수별 해석 (총점 0-36점, 낮을수록 좋음)
export function getScoreInterpretation(score) {
  if (score <= 10) {
    return {
      level: 'excellent',
      label: '매우 우수',
      description: '시간 관리 능력이 매우 뛰어납니다. 계획적이고 효율적인 생활을 하고 있습니다.',
      color: '#8A8F7A'
    };
  } else if (score <= 18) {
    return {
      level: 'good',
      label: '우수',
      description: '시간 관리를 잘 하고 있습니다. 조금만 더 노력하면 완벽해질 수 있습니다.',
      color: '#A3B86C'
    };
  } else if (score <= 26) {
    return {
      level: 'average',
      label: '보통',
      description: '평균적인 시간 관리 수준입니다. 계획을 세우고 실천하는 습관을 길러보세요.',
      color: '#E8A849'
    };
  } else if (score <= 33) {
    return {
      level: 'needs-improvement',
      label: '개선 필요',
      description: '시간 관리에 어려움이 있습니다. 작은 목표부터 시작해 보세요.',
      color: '#D97B4A'
    };
  } else {
    return {
      level: 'difficulty',
      label: '어려움 있음',
      description: '시간 관리에 많은 어려움을 겪고 있습니다. 체계적인 도움이 필요할 수 있습니다.',
      color: '#C45B4D'
    };
  }
}

// 시간 유형 결정
export function getTimeType(responses, items) {
  const categoryScores = {
    planning: { total: 0, count: 0 },
    execution: { total: 0, count: 0 },
    distraction: { total: 0, count: 0 },
    memory: { total: 0, count: 0 },
    punctuality: { total: 0, count: 0 },
    awareness: { total: 0, count: 0 },
    efficiency: { total: 0, count: 0 }
  };

  responses.forEach((value, index) => {
    const item = items[index];
    // 슬라이더에서 이미 역채점 처리됨, 그대로 사용
    categoryScores[item.category].total += value;
    categoryScores[item.category].count += 1;
  });

  // 평균 점수 계산 (낮을수록 좋음)
  const avgScores = {};
  Object.keys(categoryScores).forEach(key => {
    const cat = categoryScores[key];
    avgScores[key] = cat.count > 0 ? cat.total / cat.count : 0;
  });

  // 가장 강한 영역 찾기 (점수가 낮을수록 강함)
  const strongest = Object.entries(avgScores)
    .sort((a, b) => a[1] - b[1])[0][0];

  // 가장 약한 영역 찾기 (점수가 높을수록 약함)
  const weakest = Object.entries(avgScores)
    .sort((a, b) => b[1] - a[1])[0][0];

  // MUJI 스타일: 아이콘 대신 심플한 기호 사용
  const typeMap = {
    planning: { name: '계획형', symbol: '—' },
    execution: { name: '실행형', symbol: '—' },
    distraction: { name: '집중형', symbol: '—' },
    memory: { name: '기억형', symbol: '—' },
    punctuality: { name: '시간엄수형', symbol: '—' },
    awareness: { name: '시간인식형', symbol: '—' },
    efficiency: { name: '효율형', symbol: '—' }
  };

  return {
    type: typeMap[strongest],
    weakness: typeMap[weakest],
    categoryScores: avgScores
  };
}

// 레이더 차트용 데이터 생성
export function getRadarData(responses, items) {
  const categories = {
    '계획성': [],
    '실행력': [],
    '집중력': [],
    '기억력': [],
    '시간감각': []
  };

  const categoryMapping = {
    planning: '계획성',
    execution: '실행력',
    distraction: '집중력',
    memory: '기억력',
    punctuality: '시간감각',
    awareness: '시간감각',
    efficiency: '실행력'
  };

  responses.forEach((value, index) => {
    const item = items[index];
    // 슬라이더에서 이미 역채점 처리됨, 그대로 사용
    // 100점 만점으로 변환 (높을수록 좋음 = 낮은 점수일수록 좋음)
    const normalizedScore = ((4 - value) / 4) * 100;
    const categoryName = categoryMapping[item.category];
    categories[categoryName].push(normalizedScore);
  });

  return Object.entries(categories).map(([label, scores]) => ({
    label,
    value: scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0
  }));
}

// 항목별 바 차트 데이터 생성
export function getBarChartData(responses, items) {
  return items.map((item, index) => {
    const value = responses[index];
    // 슬라이더에서 이미 역채점 처리됨, 그대로 사용
    // 100점 만점 변환 (높을수록 좋음)
    const normalizedScore = ((4 - value) / 4) * 100;

    return {
      id: item.id,
      text: item.text,
      rawScore: value,
      adjustedScore: value,
      percentage: normalizedScore,
      isReverse: item.reverse
    };
  });
}

// 강점/약점 분석
export function getStrengthWeakness(responses, items) {
  const barData = getBarChartData(responses, items);

  // 강점 (상위 3개)
  const strengths = [...barData]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

  // 약점 (하위 3개)
  const weaknesses = [...barData]
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3);

  return { strengths, weaknesses };
}
