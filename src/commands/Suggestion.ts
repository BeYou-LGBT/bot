import {
	Client,
	Discord, Guild, Slash, SlashOption, SlashOptionOptions,
} from 'discordx';
import {
	ApplicationCommandOptionType, Attachment, CommandInteraction, EmbedBuilder, GuildMember, TextChannel,
} from 'discord.js';
import { injectable } from 'tsyringe';
import { Settings } from '@config/settings';
import { createSuggestion } from '@app/utils/createSuggestion';
import { BotLogger } from '@app/core/BotLogger';

@Discord()
@injectable()
class SuggestionCommand {

	private client : Client;

	private logger: BotLogger;

	protected static options: SlashOptionOptions[] = [
		{
			description: 'La suggestion à soumettre',
			type: ApplicationCommandOptionType.String,
			maxLength: 300,
			required: true,
		},
		{
			description: '(Optionnel) une image a rajouter à la suggestion',
			type: ApplicationCommandOptionType.Attachment,
			required: false,
		},
	];

	constructor(client: Client, botlogger: BotLogger) {
		this.client = client;
		this.logger = botlogger;
	}

	@Guild(Settings.guild)
    @Slash('suggestion')
	suggestion(
		@SlashOption('suggestion', SuggestionCommand.options[0]) suggestion: string,
			@SlashOption('image', SuggestionCommand.options[1]) attachment: Attachment,
			interaction: CommandInteraction,
	) {
		createSuggestion(interaction.member as GuildMember, suggestion, attachment)
			.then(() => {
				interaction.reply({
					content: 'Votre suggestion a bien été proposé',
					ephemeral: true,
				});
			}).catch(() => {
				interaction.reply({
					content: 'Une erreur est survenu lors de la création de votre suggestion.'
						+ ' L\'erreur a été remonté au(x) développeur(s)',
					ephemeral: true,
				});
			});
	}
}
