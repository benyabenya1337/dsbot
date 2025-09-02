import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { listInteraction } from './interactions/list';
import { statisticsInteraction } from './interactions/stat';
import { withLove } from './interactions/julika';
import { onButtonInteraction } from './interactions/buttons';
import { CLIENT_ID, GUILD_ID, TOKEN } from './config';
import { commands } from './commands/commandsList';

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
  console.log(`✅ Работаєм по тегу ${client.user?.tag}`);
});

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Refreshing guild commands...');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    console.log('Guild commands registered!');
  } catch (error) {
    console.error(error);
  }
})();

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
