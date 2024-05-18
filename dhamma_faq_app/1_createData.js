const axios = require('axios');
const fs = require('fs');
const _ = require('lodash');
require('dotenv').config()

// ฟังก์ชั่นในการดึงข้อมูลจาก API
async function fetchData(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    if (response.data.result === 1 && response.data.data) {
      return response.data.data;
    } else {
      console.error('Unexpected response format:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// ฟังก์ชั่นในการแปลงข้อมูล
function transformData(data) {
  return data.map(item => ({
    prompt: item.faq_q,
    completion: item.faq_a,
    question_type: item.faq_type.faq_type_name
  }));
}

// ฟังก์ชั่นในการแบ่งข้อมูลและบันทึกลงไฟล์
function splitAndSaveData(data, trainFilePath, valFilePath, trainSize = 0.8) {
  const shuffled = _.shuffle(data);
  const trainData = _.slice(shuffled, 0, Math.floor(trainSize * data.length));
  const valData = _.slice(shuffled, Math.floor(trainSize * data.length));

  fs.writeFileSync(trainFilePath, trainData.map(JSON.stringify).join('\n'), 'utf-8');
  fs.writeFileSync(valFilePath, valData.map(JSON.stringify).join('\n'), 'utf-8');
}

// ฟังก์ชั่นหลักในการดึงข้อมูลและสร้างไฟล์
async function createTrainingData() {
  const apiUrl = process.env.WP_FAQ_API_URL;
  const rawData = await fetchData(apiUrl);

  // แปลงข้อมูลให้เป็นรูปแบบที่ต้องการ
  const formattedData = transformData(rawData);

  splitAndSaveData(formattedData, 'train_data_.jsonl', 'val_data_.jsonl');
  console.log('Training and validation data files have been created.');
}

createTrainingData();
