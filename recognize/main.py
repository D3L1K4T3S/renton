from aiogram import Bot, types
from aiogram.dispatcher import Dispatcher
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
bot = Bot(os.getenv("telegram_token"))
dp = Dispatcher(bot)


@dp.message_handler(commands="start")
async def starting(message: types.Message):
    await message.reply("Тут приветственное сообщение")


@dp.message_handler(content_types=types.ContentType.VOICE)
async def download_voice(message: types.Message):
    voice = message.voice
    file_id = voice.file_id
    file = await bot.get_file(file_id)
    file_path = file.file_path
    audio = f"downloads_voice/{file_id}.ogg"
    await bot.download_file(file_path, audio)
    await message.reply("Скачали сообщение")

if __name__ == '__main__':
    from aiogram import executor
    executor.start_polling(dp, skip_updates=True)
