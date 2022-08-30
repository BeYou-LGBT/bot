import {
	Attachment, EmbedBuilder, GuildMember, Message, TextChannel, ThreadAutoArchiveDuration,
} from 'discord.js';
import { Settings } from '@config/settings';
import { container } from 'tsyringe';
import { BotLogger } from '@app/core/BotLogger';

export async function createSuggestion(member: GuildMember, suggestion: string, attachment? :Attachment): Promise<void | Message> {
	const logger: BotLogger = container.resolve(BotLogger);
	const nickname: string = member.nickname ? `(aka ${member.nickname})` : '';
	const embed: EmbedBuilder = new EmbedBuilder({
		title: `Suggestion de ${member.user.tag} ${nickname}`,
		color: 0xed4245,
		description: suggestion,
		footer: { text: `${member.user.id}` },
		image: { url: attachment && attachment.contentType === 'image' ? attachment.url : undefined },
	});

	const channel: TextChannel = member.guild.channels.resolve(Settings.channels.suggestion) as TextChannel;
	try {
		const message: Message = await channel.send({ embeds: [embed] });
		await message.react('👍');
		await message.react('👎');
		await message.startThread({
			name: `Suggestion : ${suggestion.substring(0, Settings.suggestion.maxSuggestionThreadName)}`,
			reason: `Suggestion de ${member.user.tag}`,
			autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
		});
		return Promise.resolve();
	} catch (e: unknown) {
		logger.error('Impossible de faire une suggestion', e);
		return Promise.reject();
	}
}
