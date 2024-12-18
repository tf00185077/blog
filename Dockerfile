FROM node:18-alpine

# 設置工作目錄
WORKDIR /app

# 安裝依賴
COPY package*.json ./
RUN yarn

# 複製源代碼
COPY . .

# 編譯 Next.js（生產模式需要此步驟）
RUN yarn build

# 暴露端口
EXPOSE 3000