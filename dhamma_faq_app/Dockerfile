# ใช้ node image เป็น base image
FROM node:20

# กำหนด working directory ใน container
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอก source code ทั้งหมดไปยัง container
COPY . .

# เปิดพอร์ตที่แอปพลิเคชันจะรัน
EXPOSE 3000

# คำสั่งเพื่อรันแอปพลิเคชัน
CMD ["node", "server.js"]
