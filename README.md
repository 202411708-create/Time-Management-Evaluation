# 시간 관리 평가 프로그램

중학교 3학년 학생을 위한 시간 관리 능력 평가 프로그램입니다.

## 기능

- 9문항 리커트 5점 척도 기반 평가
- MUJI 스타일 미니멀 디자인
- 시간 유형 분석 (계획형, 실행중심형 등)
- 영역별 레이더 차트 분석
- 모바일/태블릿 반응형 지원

## 기술 스택

- Vue 3 + Vite
- Vue Router
- Chart.js

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 배포

Vercel을 통해 자동 배포됩니다.

1. GitHub 저장소에 푸시
2. Vercel에서 GitHub 저장소 연동
3. 자동 빌드 및 배포

## 프로젝트 구조

```
src/
├── assets/styles/
│   └── common.css          # MUJI 스타일 공통 CSS
├── components/
│   ├── SurveyItem.vue      # 설문 문항 컴포넌트
│   ├── ResultGauge.vue     # 결과 게이지 컴포넌트
│   ├── RadarChart.vue      # 레이더 차트
│   ├── ScoreSummary.vue    # 점수 요약
│   └── TimeTypeCard.vue    # 시간 유형 카드
├── data/
│   ├── surveyItems.json    # 설문 문항 데이터
│   └── scoringRules.js     # 점수 계산 로직
├── router/
│   └── index.js            # 라우터 설정
└── views/
    ├── Home.vue            # 메인 화면
    ├── Survey.vue          # 평가 화면
    └── Result.vue          # 결과 화면
```

## 점수 해석

- 0~10점: 매우 우수
- 11~18점: 우수
- 19~26점: 보통
- 27~33점: 개선 필요
- 34점 이상: 어려움 있음
