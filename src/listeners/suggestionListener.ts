import { Discord, Guard, On } from 'discordx';
import { Settings } from '@config/settings';
import { createSuggestion } from '@app/utils/createSuggestion';
import { BotLogger } from '@app/core/BotLogger';
import { Message, MessageType, TextChannel } from 'discord.js';
import { injectable } from 'tsyringe';
import { NotBot } from '@discordx/utilities';
import { log } from 'util';

@Discord()
@injectable()
class suggestionListener {

	private logger: BotLogger;

	constructor(logger: BotLogger) {
		this.logger = logger;
	}

	@Guard(NotBot)
    @On('messageCreate')
	onMessageCreate([message]: [Message]) {
		const suggestionChannel = message.guild.channels.resolve(Settings.channels.suggestion) as TextChannel;
		if (message.channel.id !== suggestionChannel.id || message.type !== MessageType.Default) {
			return;
		}
		createSuggestion(message.member, message.content, message.attachments.first())
			.catch(() => { /* on fait rien car déjà loggé par createSuggestion */ })
			.finally(() => {
				if (message.deletable) {
					message.delete().catch((e) => {
						this.logger.error('Impossible de supprimer le message de suggestion', e);
					});
				}
			});
	}
}
