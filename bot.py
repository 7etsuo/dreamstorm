import os
import discord
import requests
import discord.ext
from dotenv import load_dotenv

load_dotenv()
bot = discord.Bot(debug_guilds=[os.getenv('GUILD_ID')])  # 881207955029110855


@bot.event
async def on_ready():
    print(f"{bot.user} is ready and online!")


@bot.slash_command(name="hello", description="Say hello to the bot")
async def hello(ctx):
    await ctx.respond(f"Hey!")


@bot.slash_command(name="dream", description="Generates art from the user request")
async def hello(ctx, text_to_image: str):
    await ctx.respond(f"Generating \'{text_to_image}\'")
    r = requests.post(
        "https://api.deepai.org/api/text2img",
        data={
            'text': text_to_image,
        },
        headers={'api-key': str(os.getenv('AI_API_KEY'))}
    )
    await ctx.respond(f"{r.json()['output_url']}")


@ bot.command(description="Sends the bot's latency.")
async def ping(ctx):  # a slash command will be created with the name "ping"
    await ctx.respond(f"Pong! Latency is {bot.latency}")

bot.run(os.getenv('TOKEN'))
