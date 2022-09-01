import 'module-alias/register';
import {
	Client, DIService, IGuild, tsyringeDependencyRegistryEngine,
} from 'discordx';
import { importx } from '@discordx/importer';
import { IntentsBitField, Message } from 'discord.js';
import 'dotenv/config';
import { container } from 'tsyringe';
import * as Sentry from '@sentry/node';
import { BotLogger } from '@app/core/BotLogger';

DIService.engine = tsyringeDependencyRegistryEngine.setInjector(container);

const logger: BotLogger = container.resolve(BotLogger);

export const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessageReactions,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
	botGuilds: [(c: Client) => c.guilds.cache.map((guild) => guild.id)],
});

if (!container.isRegistered(Client)) {
	container.registerInstance(Client, client);
}

if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
	});
}

importx(`${__dirname}/{listeners,commands}/**/*.{ts,js}`).catch((error) => {
	logger.error('Impossible de charger les commandes et/ou les listeners :', error);
});

client.once('ready', async () => {
	// On initialise les commandes utilisant le décorateur @Slash
	await client.initApplicationCommands().catch((error) => {
		logger.error('Impossible d\'initialiser les commandes :', error);
	});

	logger.info('Bot lancé !');
});

client.on('interactionCreate', (interaction) => {
	try {
		client.executeInteraction(interaction, true);
	} catch (e) {
		logger.error(e);
	}
});

client.login(process.env.BOT_TOKEN).catch((error) => {
	logger.error('Impossible de se connecter à discord :', error);
});
