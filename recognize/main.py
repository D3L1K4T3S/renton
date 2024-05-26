from aiogram import Bot, types
from aiogram.dispatcher import Dispatcher
import os
import requests
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.contrib.fsm_storage.memory import MemoryStorage

from speechkit import Session, ShortAudioRecognition

oauth_token = "y0_AgAAAAAMG_1sAATuwQAAAAEFvneVAACaqv9J6YxJ8JCiBSFGjgq9BjCHzg"
catalog_id = "b1g6lvlrih4kiirhnj80"


TELEGRAM_API_TOKEN="6999863631:AAE_whYrbM0Hf9G1eRc_rRvGC2BH6qH3jko"

bot = Bot(token=TELEGRAM_API_TOKEN)
dp = Dispatcher(bot, storage=MemoryStorage())


class States(StatesGroup):
    ASK_VERIF = State()

@dp.message_handler(commands="start")
async def starting(message: types.Message):
    user = message.from_user
    username = user.username
    user_id = user.id
    await message.reply(f"Hello {username}! Your id: {user_id}")


@dp.message_handler(commands="verify")
async def starting(message: types.Message):
    await message.reply("Введите код")
    await States.ASK_VERIF.set()


# Обработчик слов для верификации
@dp.message_handler(state=States.ASK_VERIF)
async def handle_title(message: types.Message, state: FSMContext):
    verification_code = message.text
    mess = f"Ваш код: {verification_code}\n"
    await message.reply(mess)
    await state.finish()


@dp.message_handler(content_types=types.ContentType.VOICE)
async def download_voice(message: types.Message):
    voice = message.voice
    file_id = voice.file_id
    file = await bot.get_file(file_id)
    file_path = file.file_path
    file = requests.get('https://api.telegram.org/file/bot{0}/{1}'.format(TELEGRAM_API_TOKEN, file_path))

    session = Session.from_yandex_passport_oauth_token(oauth_token, catalog_id)
    recognizeShortAudio = ShortAudioRecognition(session)
    text = recognizeShortAudio.recognize(
        file.content, sampleRateHertz='16000')
    await message.reply(f"Ваш текст: {text}")



    # download_dir = "downloads_voice"
    # if not os.path.exists(download_dir):
    #     os.makedirs(download_dir)
    #
    # audio = f"{download_dir}/{file_id}.ogg"
    # await bot.download_file(file_path, audio)
    #
    # if os.path.exists(audio):
    #     await message.reply("Успешно скачено")
    # else:
    #     await message.reply("Не получилось загрузить")

if __name__ == '__main__':
    from aiogram import executor
    executor.start_polling(dp, skip_updates=True)
