import { ChatInputCommandInteraction } from 'discord.js';
import { JULIKA_PASSWORD } from '../config';

export const withLove = async (interaction: ChatInputCommandInteraction) => {
  const inputPassword = interaction.options.getString('password', true);
  const realPassword = JULIKA_PASSWORD;

  console.log(inputPassword, realPassword);

  if (inputPassword === realPassword) {
    await interaction.reply({
      content: 'Цьом ❤️',
      files: ['https://media1.tenor.com/m/iZDdTZjYllkAAAAC/iloveyou-cat.gif'],
    });
  } else {
    await interaction.reply({
      content: '❌ Спочатку пароль)))',
      ephemeral: true,
    });
  }
};
