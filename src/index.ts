import { Client, GatewayIntentBits } from 'discord.js';

import { initCommands } from './commands';
import { listInteraction } from './interactions/list';
import { statisticsInteraction } from './interactions/stat';
import { withLove } from './interactions/julika';
import { onButtonInteraction } from './interactions/buttons';

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
  console.log(`✅ Работаєм по тегу ${client.user?.tag}`);
});

initCommands();

// --- Обробка команд ---
client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'vs_list') {
      await listInteraction(interaction);
    }

    if (interaction.commandName === 'vs_stat') {
      statisticsInteraction(interaction);
    }

    if (interaction.commandName === 'julika') {
      withLove(interaction);
    }
  }

  // --- Кнопки ---
  else if (interaction.isButton()) {
    onButtonInteraction(interaction);
  }
});

client.login(process.env.TOKEN);
