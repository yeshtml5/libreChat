# LibreChat 개발 가이드

LibreChat 프로젝트 개발을 위한 종합적인 가이드 모음입니다.

## 📚 가이드 목차

### [01. 프론트엔드 개발 가이드](./01.프론트엔드-개발-가이드.md)
- React 기반 프론트엔드 개발 방법
- 개발 환경 설정 및 빌드 프로세스
- 컴포넌트 구조 및 상태 관리
- 스타일링 및 다국어 지원

### [02. Docker 배포 가이드](./02.Docker-배포-가이드.md)  
- Docker를 이용한 실서버 배포 방법
- 3090 서버 배포 및 테스트 과정
- 컨테이너 모니터링 및 트러블슈팅
- 무중단 업데이트 전략

### [03. 폴더 구조 및 기능 가이드](./03.폴더구조-및-기능-가이드.md)
- 전체 프로젝트 구조 상세 설명
- 각 폴더별 역할과 주요 기능
- 백엔드/프론트엔드 아키텍처
- 패키지 의존성 관계

### [04. 빌드 문제 해결 가이드](./04.빌드-문제-해결-가이드.md)
- 버전 차이로 인한 빌드 에러 해결
- 패키지 의존성 문제 해결방법
- TypeScript 및 Vite 설정 이슈
- 체계적인 문제 해결 프로세스

### [05. 공식 리소스 및 학습 가이드](./05.공식-리소스-및-학습-가이드.md)
- 공식 문서 및 튜토리얼 링크
- YouTube 강의 및 학습 로드맵
- 커뮤니티 참여 방법
- 추천 학습 순서 및 팁

### [06. Package.json 스크립트 가이드 (Yarn 버전)](./06.Package.json-스크립트-가이드-Yarn버전.md)
- Yarn 워크스페이스 기반 스크립트 명령어
- 개발/배포/테스트 명령어 상세 설명
- 상황별 명령어 사용 방법
- Yarn Berry 활용법

### [07. Yarn Berry 가이드 - 왜 사용하는가?](./07.YarnBerry-가이드-왜-사용하는가.md)
- Yarn Berry vs npm/pnpm 비교
- 모노레포 최적화 장점
- LibreChat에서의 실제 활용 사례
- 성능 및 개발 효율성 분석

## 🚀 빠른 시작

### 개발 환경 준비 (Yarn Berry 워크스페이스)
```bash
# 1. 프로젝트 클론
git clone https://github.com/danny-avila/LibreChat.git
cd LibreChat

# 2. Yarn Berry 의존성 설치
yarn install

# 3. 패키지 빌드 (의존성 순서 중요!)
yarn build:data-schemas      # 1순위: 스키마
yarn build:data-provider     # 2순위: API 클라이언트  
yarn build:api               # 3순위: 백엔드 공통 로직
yarn build:client-package    # 4순위: UI 컴포넌트

# 4. 프론트엔드 개발 서버 시작
yarn frontend:dev
```

### Docker로 빠른 테스트
```bash
# 1. 환경변수 설정
cp .env.example .env
# .env 파일 편집하여 API 키 설정

# 2. Docker Compose 실행
docker-compose up -d

# 3. 브라우저에서 접속
# http://localhost:3080
```

## ⚡ 자주 발생하는 문제와 해결책

### 빌드 에러 (Yarn Berry)
```bash
# 패키지 의존성 문제 해결
yarn build:data-schemas
yarn build:data-provider
yarn build:api
yarn build:client-package

# 또는 병렬 빌드
yarn workspaces foreach --topological run build

# 캐시 및 node_modules 클리어
rm -rf node_modules */node_modules packages/*/node_modules
rm -rf .yarn/cache .yarn/install-state.gz
yarn install
```

### Docker 실행 문제
```bash
# 컨테이너 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs -f api

# 헬스체크
curl http://localhost:3080/health
```

## 📋 개발 체크리스트

### 프론트엔드 개발시 (Yarn Berry)
- [ ] Yarn 워크스페이스 의존성 설치 완료
- [ ] 패키지 빌드가 의존성 순서대로 완료되었는지 확인
- [ ] TypeScript 타입 에러 없는지 체크 (`yarn workspace client typecheck`)
- [ ] ESLint 규칙 준수 (`yarn lint:fix`)
- [ ] 다국어 지원 추가
- [ ] 반응형 디자인 적용

### 백엔드 개발시  
- [ ] API 엔드포인트 문서화
- [ ] 에러 핸들링 구현
- [ ] 인증/인가 검증
- [ ] 데이터 검증 로직 추가
- [ ] 로깅 및 모니터링 설정

### 배포 전 체크
- [ ] 모든 테스트 통과
- [ ] 프로덕션 빌드 성공
- [ ] 환경변수 설정 완료
- [ ] 데이터베이스 마이그레이션
- [ ] 보안 설정 검토

## 🔗 유용한 링크

- **공식 문서**: [https://docs.librechat.ai](https://docs.librechat.ai)
- **GitHub**: [https://github.com/danny-avila/LibreChat](https://github.com/danny-avila/LibreChat)
- **Discord 커뮤니티**: [https://discord.librechat.ai](https://discord.librechat.ai)
- **YouTube 채널**: [https://www.youtube.com/@LibreChat](https://www.youtube.com/@LibreChat)

## 📞 지원 및 피드백

문제가 발생하거나 질문이 있으시면:

1. **먼저 해당 가이드 문서 확인**
2. **GitHub Issues 검색**
3. **Discord 커뮤니티에서 질문**
4. **새로운 이슈 등록**

---

**이 가이드는 LibreChat 프로젝트의 효율적인 개발을 위해 작성되었습니다.** 
가이드에 오류가 있거나 개선사항이 있다면 언제든 피드백해주세요!