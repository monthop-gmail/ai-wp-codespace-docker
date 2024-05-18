const fs = require('fs');
require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// ฟังก์ชั่นในการอัปโหลดไฟล์
async function uploadFile(filePath) {
  const response = await openai.createFile(
    fs.createReadStream(filePath),
    'fine-tune'
  );
  return response.data.id;
}

// ฟังก์ชั่นในการเรียกใช้ Fine-tune
async function fineTuneModel() {
  try {
    const trainingFileId = await uploadFile('train_data.jsonl');
    const validationFileId = await uploadFile('val_data.jsonl');

    const fineTuneResponse = await openai.createFineTune({
      training_file: trainingFileId,
      validation_file: validationFileId,
      model: 'davinci',
      n_epochs: 3
    });

    console.log('Fine-tuning started:', fineTuneResponse.data);
  } catch (error) {
    console.error('Error during fine-tuning:', error);
  }
}

// เรียกใช้ฟังก์ชั่น fine-tune
fineTuneModel();
