from aiogram import Bot, types
from aiogram import executor
from aiogram.dispatcher import Dispatcher
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.contrib.fsm_storage.memory import MemoryStorage

from pydantic import BaseModel
from fastapi import FastAPI, HTTPException

import requests
import asyncio
import uvicorn

from speechkit import Session, ShortAudioRecognition

oauth_token = "y0_AgAAAAAMG_1sAATuwQAAAAEFvneVAACaqv9J6YxJ8JCiBSFGjgq9BjCHzg"
catalog_id = "b1g6lvlrih4kiirhnj80"

TELEGRAM_API_TOKEN="6999863631:AAE_whYrbM0Hf9G1eRc_rRvGC2BH6qH3jko"

host = "localhost"
port = "8080"

bot = Bot(token=TELEGRAM_API_TOKEN)
dp = Dispatcher(bot, storage=MemoryStorage())
app = FastAPI()

class RequestPay(BaseModel):
    user_id: int
    message: str
    amount: str
    code1: str
    code2: str
    code3: str

class StatusPay(BaseModel):
    user_id: int
    status: str

async def send_request_to_user(user_id: int, message: str, amount: str, code1: str, code2: str, code3: str):
    try:
        total = ("Cчёт оплаты услуг ЖКХ." + message + "\n" + "Сумма к оплате:" + amount + "\n"
                 + "Для подтверждения оплаты проговорите слова в данном порядке:\n"
                 + "1." + code1 + "\n" + "2." + code2 + "\n" + "3." + code3)
        await bot.send_message(user_id, total)
    except Exception as e:
        print(e)

async def send_status_request_to_user(user_id: int, status: str):
    try:
        await bot.send_message(user_id, status)
    except Exception as e:
        print(e)

@app.post("/request_message")
async def send_message(request: RequestPay):
    asyncio.create_task(send_request_to_user(request.user_id, request.message, request.amount, request.code1, request.code2, request.code3))
    return {"status": "success"}

@app.post("/status_message")
async def send_message(request: StatusPay):
    asyncio.create_task(send_status_to_user(request.user_id, request.status))
    return {"status": "success"}

class States(StatesGroup):
    ASK_VERIF = State()

@dp.message_handler(commands="start")
async def starting(message: types.Message):
    user = message.from_user
    username = user.username
    user_id = user.id
    await message.reply(f"Hello {username}! Your id: {user_id}")

@dp.message_handler(state=States.ASK_VERIF)
async def wait_verif(message: types.Message, state: FSMContext):
    verification_code = message.text
    mess = f"Ваш код: {verification_code}\n"
    await message.reply(mess)
    await state.finish()

@dp.message_handler()
async def echo(message: types.Message):
    await message.reply(f"Крутое сообщение: {message.text}")


@dp.message_handler(content_types=types.ContentType.VOICE)
async def recognize_voice(message: types.Message):
    voice = message.voice
    file_id = voice.file_id
    file = await bot.get_file(file_id)
    file_path = file.file_path
    file = requests.get('https://api.telegram.org/file/bot{0}/{1}'.format(TELEGRAM_API_TOKEN, file_path))

    session = Session.from_yandex_passport_oauth_token(oauth_token, catalog_id)
    recognizeShortAudio = ShortAudioRecognition(session)
    text = recognizeShortAudio.recognize(
        file.content, sampleRateHertz='16000')
    await message.reply(f"Вы сказали: {text}")

    command, *args = message.text.split()
    if args:
        try:
            code1 = str(args[0])
            code2 = str(args[1])
            code3 = str(args[2])

            url = "http://localhost:8080/public/tg/compare"
            data = {
                'code1': code1,
                'code2': code2,
                'code3': code3,
            }
            headers = {'Content-Type': 'application/json'}
            print("before")
            response = requests.post(url, headers=headers, json=data)
            print("after")
            response_json = response.json()
            boolean_value = response_json.get('boolean_value')



if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    def start_api():
        unicorn.run(app, host=host, port=port)
    api_task = loop.run_in_executor(None, start_api)
    executor.start_polling(dp, skip_updates=True)
