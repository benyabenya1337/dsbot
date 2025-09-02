import { REST, Routes } from 'discord.js';
import { commands } from './commandsList';
import { CLIENT_ID, GUILD_ID } from '../config';

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);

export const initCommands = async () => {
  try {
    console.log('GUILD_ID', GUILD_ID, CLIENT_ID);
    console.log('📡 Реєструю slash-команди на сервері...');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    console.log('✅ Slash-команди зареєстровано на сервері!');
  } catch (error) {
    console.error(error);
  }
};
