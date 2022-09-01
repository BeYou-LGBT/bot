import {
	ArgsOf, Discord, On, Client,
} from 'discordx';
import { EmbedBuilder, EmbedFooterOptions, TextChannel } from 'discord.js';
import { Settings } from '@config/settings';
import { BotLogger } from '@app/core/BotLogger';
import { injectable } from 'tsyringe';

@Discord()
@injectable()
class LogListeners {

	private client: Client;

	private logger: BotLogger;

	private dateOption: EmbedFooterOptions = {
		text: new Date().toLocaleDateString(
			'fr-FR',
			{
				year: '2-digit',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
			},
		),
	};

	constructor(logger: BotLogger, client: Client) {
		this.logger = logger;
		this.client = client;
	}

    @On('messageUpdate')
	private logEdit([oldMsg, newMsg]: ArgsOf<'messageUpdate'>) {
		if (oldMsg.content.length === 0 || newMsg.content.length === 0) {
			return;
		}
		const logChannel: TextChannel = this.client.channels.resolve(Settings.channels.log) as TextChannel;
		const embed: EmbedBuilder = new EmbedBuilder()
			.setTitle('Message édité')
			.setAuthor({
				name: newMsg.author.tag,
				iconURL: newMsg.author.avatarURL(),
			})
			.addFields([
				{
					name: 'Avant',
					value: oldMsg.content,
				},
				{
					name: 'Après',
					value: newMsg.content,
				},
			])
			.setFooter(this.dateOption);
		logChannel.send({
			embeds: [embed],
		}).catch((e: Error) => {
			this.logger.error('Erreur lors de l\'envoi des logs d\'un message édité', e);
		});
	}

	@On('messageDelete')
    private logDelete([message]: ArgsOf<'messageDelete'>) {
    	if (message.content.length === 0) {
    		return;
    	}
    	const logChannel: TextChannel = this.client.channels.resolve(Settings.channels.log) as TextChannel;
    	const embed: EmbedBuilder = new EmbedBuilder()
    		.setTitle('Message supprimé')
    		.setAuthor({
    			name: message.author.tag,
    			iconURL: message.author.avatarURL(),
    		})
    		.addFields([
    			{
    				name: 'Message supprimé',
    				value: message.content,
    			},
    		])
    		.setFooter(this.dateOption);
    	logChannel.send({ embeds: [embed] })
    		.catch((e: Error) => {
    			this.logger.error('Erreur lors de l\'envoi des logs d\'un message supprimé', e);
    		});
    }
}
