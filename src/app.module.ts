import { Module } from '@nestjs/common';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';
import { AppUpdate } from './app.update';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NecordModule.forRoot({
      token: process.env.DISCORD_TOKEN!,
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildVoiceStates,
      ],
      development: [process.env.DISCORD_DEVELOPMENT_GUILD_ID!],
    }),
  ],
  providers: [AppUpdate],
})
export class AppModule {}
