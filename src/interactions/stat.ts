import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Result, resultsPath } from '../saveData';
import fs from 'fs';

export const statisticsInteraction = async (
  interaction: ChatInputCommandInteraction,
) => {
  try {
    const startDateStr = interaction.options.getString('start', true);
    const endDateStr = interaction.options.getString('end', true);

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      await interaction.reply({
        content: '❌ Невірний формат дати (використовуй YYYY-MM-DD)',
        ephemeral: true,
      });
      return;
    }

    if (!fs.existsSync(resultsPath)) {
      await interaction.reply({
        content: '❌ Немає тєр',
        ephemeral: true,
      });
      return;
    }

    const results: Result[] = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));

    // Фільтруємо за період
    const startOfDay = new Date(startDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);

    const filtered = results.filter((r) => {
      const d = new Date(r.date);
      return d >= startOfDay && d <= endOfDay;
    });

    if (!filtered.length) {
      await interaction.reply({
        content: '❌ 0 тєр, за цей час',
        ephemeral: true,
      });
      return;
    }

    // Підрахунок
    const stats: Record<string, { win: number; lose: number; total: number }> =
      {};
    filtered.forEach((r) => {
      if (!stats[r.user]) stats[r.user] = { win: 0, lose: 0, total: 0 };
      stats[r.user].total++;
      if (r.outcome === 'win') stats[r.user].win++;
      else stats[r.user].lose++;
    });

    console.log('stats', stats);

    // Формуємо Embed
    const embed = new EmbedBuilder()
      .setTitle(`📊 Стата (${startDateStr} ➜ ${endDateStr})`)
      .setColor('Blue')
      .setTimestamp()
      .setFooter({ text: 'Katana family ❤️' });

    for (const user of Object.keys(stats)) {
      const s = stats[user];
      embed.addFields({
        name: `${user}`, // просто нікнейм, без <@ID>
        value: `🎯 Total: ${s.total}\n✅ Win: ${s.win}\n❌ Lose: ${s.lose}`,
        inline: true,
      });
    }

    await interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.log('stats error ->', error);
  }
};
