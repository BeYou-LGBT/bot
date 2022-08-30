import {
	ArgsOf, Discord, On, Client,
} from 'discordx';
import { EmbedBuilder, Message } from 'discord.js';

@Discord()
class LogListeners {

    @On('messageUpdate')
	private logEdit([oldMsg, newMsg]: ArgsOf<'messageUpdate'>) { /* */ }
}
