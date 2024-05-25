from aiogram import Bot, types
from aiogram.dispatcher import Dispatcher
import os
from dotenv import load_dotenv, find_dotenv
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.contrib.fsm_storage.memory import MemoryStorage

load_dotenv(find_dotenv())
bot = Bot(os.getenv("telegram_token"))
dp = Dispatcher(bot, storage=MemoryStorage())


class States(StatesGroup):
    ASK_VERIF = State()

# Обработчик старта бота
@dp.message_handler(commands="start")
async def starting(message: types.Message):
    await message.reply("Тут приветственное сообщение")

# Обработчик верификации
@dp.message_handler(commands="veref")
async def starting(message: types.Message):
    await message.reply("Введите 3 слова для верефикации")
    await States.ASK_VERIF.set()


# Обработчик слов для верификации
@dp.message_handler(state=States.ASK_VERIF)
async def handle_title(message: types.Message, state: FSMContext):
    words_list = message.text.split() #тут три слова для верификации
    mess = ("Ваши три слова для верефикации \n") + " ".join(words_list)
    await message.reply(mess)
    await state.finish()


@dp.message_handler(content_types=types.ContentType.VOICE)
async def download_voice(message: types.Message):
    voice = message.voice
    file_id = voice.file_id
    file = await bot.get_file(file_id)
    file_path = file.file_path

    download_dir = "downloads_voice"
    if not os.path.exists(download_dir):
        os.makedirs(download_dir)

    audio = f"{download_dir}/{file_id}.ogg"
    await bot.download_file(file_path, audio)

    if os.path.exists(audio):
        await message.reply("Успешно скачено")
    else:
        await message.reply("Не получилось загрузить")

if __name__ == '__main__':
    from aiogram import executor
    executor.start_polling(dp, skip_updates=True)