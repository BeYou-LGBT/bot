import {
	ArgsOf, Discord, Once, On, Client,
} from 'discordx';
import { Settings } from '@config/settings';
import { BotLogger } from '@app/core/BotLogger';
import { container, injectable } from 'tsyringe';

@Discord()
@injectable()
class BotReady {

	private logger: BotLogger;

	constructor(logger: BotLogger) {
		this.logger = logger;
	}

    @Once('ready')
	checkConfig([client]: ArgsOf<'ready'>) {
		const logger: BotLogger = container.resolve(BotLogger);
		const misconfiguredChannels: string[] = [];

		if (!process.env.BOT_TOKEN) {
			logger.fatal('Le token du bot est manquant dans le fichier .env');
		}

		if (!process.env.SENTRY_DSN && process.env.NODE_ENV !== 'production') {
			logger.error('Le DSN de Sentry est manquant dans le fichier .env, les rapports de bugs ne seront pas envoyés');
		}

		if (!Settings.guild) {
			logger.fatal('L\'identifiant du serveur est manquant dans le fichier .env');
		}

		if (!client.guilds.resolveId(Settings.guild)) {
			logger.fatal('L\'id du serveur est mal configuré, le bot ne peut pas fonctionné correctement');
		}

		Object.entries(Settings.channels).forEach(([key, value]) => {
			if (!value) {
				misconfiguredChannels.push(`le salon ${key} n'est pas configuré (id ou nom manquant ?)`);
			} else if (!client.channels.resolve(value)) {
				misconfiguredChannels.push(`le salon ${key} est mal configuré (id ou nom incorrect ?)`);
			}
		});

		if (misconfiguredChannels.length > 0) {
			logger.fatal(misconfiguredChannels.join('\n '));
		}
	}
}
