import { ButtonInteraction, EmbedBuilder } from 'discord.js';
import { saveResult } from '../saveData';

export const onButtonInteraction = async (interaction: ButtonInteraction) => {
  const buttonInteraction = interaction as ButtonInteraction;
  const message = buttonInteraction.message;
  if (!message.embeds.length) return;

  const embed = EmbedBuilder.from(message.embeds[0]);

  const userMentions: string[] =
    embed.data.fields?.map((f) => f.value as string) || [];
  const userNames: string[] = [];
  for (const mention of userMentions) {
    const match = mention.match(/<@!?(\d+)>/); // витягуємо ID
    if (match) {
      const user = await interaction.client.users.fetch(match[1]);
      userNames.push(user.username); // отримуємо нікнейм
    } else {
      userNames.push(mention); // якщо не mention, залишаємо текст
    }
  }
  saveResult(userNames, buttonInteraction.customId === 'win' ? 'win' : 'lose');

  // Оновлюємо заголовок залежно від кнопки
  if (buttonInteraction.customId === 'win') {
    embed.setTitle(`${embed.data.title} ✅ Win`);
  } else if (buttonInteraction.customId === 'lose') {
    embed.setTitle(`${embed.data.title} ❌ Lose`);
  }

  // Редагуємо повідомлення і прибираємо всі кнопки
  await buttonInteraction.update({ embeds: [embed], components: [] });
};
