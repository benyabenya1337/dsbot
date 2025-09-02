// Slash-команда

import { SlashCommandBuilder } from 'discord.js';

// Команда /vs_list
const vsListCommand = new SlashCommandBuilder()
  .setName('vs_list')
  .setDescription('Створює список гравців')
  .addStringOption((option) =>
    option
      .setName('title')
      .setDescription('Заголовок списку')
      .setRequired(true),
  )
  .addStringOption((option) =>
    option
      .setName('users')
      .setDescription('Список користувачів через пробіл')
      .setRequired(true),
  );

// Команда /vs_stat
const vsStatCommand = new SlashCommandBuilder()
  .setName('vs_stat')
  .setDescription('Підрахунок статистики Win/Lose по гравцях за період')
  .addStringOption((option) =>
    option
      .setName('start')
      .setDescription('Дата початку (YYYY-MM-DD)')
      .setRequired(true),
  )
  .addStringOption((option) =>
    option
      .setName('end')
      .setDescription('Дата кінця (YYYY-MM-DD)')
      .setRequired(true),
  );

const julikaCommand = new SlashCommandBuilder()
  .setName('julika')
  .setDescription('Пароль скажи')
  .addStringOption((option) =>
    option.setName('password').setDescription('Введи пароль').setRequired(true),
  );

// Масив команд для реєстрації
export const commands = [
  vsListCommand.toJSON(),
  vsStatCommand.toJSON(),
  julikaCommand.toJSON(),
];
