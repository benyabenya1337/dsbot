import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from 'discord.js';

export const listInteraction = async (
  interaction: ChatInputCommandInteraction,
) => {
  const title = interaction.options.getString('title', true);
  const usersInput = interaction.options.getString('users', true);

  const users = usersInput.split(/\s+/);

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setColor('Purple')
    .setFooter({ text: 'Список сілачів' })
    .setTimestamp();

  users.forEach((user, index) => {
    embed.addFields({
      name: `Сілач №${index + 1}`,
      value: user,
      inline: true,
    });
  });

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('win')
      .setLabel('Win ✅')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('lose')
      .setLabel('Lose ❌')
      .setStyle(ButtonStyle.Danger),
  );

  await interaction.reply({ embeds: [embed], components: [row] });
};
