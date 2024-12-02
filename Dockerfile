# Node.js 공식 이미지 사용
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# 로컬의 package.json과 package-lock.json 파일을 컨테이너로 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 소스 코드 복사
COPY . .

# 앱 실행 포트 설정 (예: 3000)
EXPOSE 3000

# 애플리케이션 실행 명령
CMD ["npm", "start"]
