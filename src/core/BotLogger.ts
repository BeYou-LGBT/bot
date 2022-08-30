import { singleton } from 'tsyringe';
import chalk from 'chalk';
import { captureException, captureMessage, SeverityLevel } from '@sentry/node';

@singleton()
export class BotLogger {

	log = (message : string) => {
		const formatedDate = new Date().toLocaleDateString('fr-FR', {
			minute: '2-digit',
			hour: '2-digit',
			day: '2-digit',
			month: '2-digit',
			year: '2-digit',
		});
		console.log(`[${formatedDate}] ${message}`);
	};

	public debug(message: string): void {
		this.log(chalk.magenta(`[DEBUG] ${message}`));
	}

	public info(message: string): void {
		this.log(chalk.green(`[INFO] ${message}`));
		this.sendLogToSentry('info', message);
	}

	public warn(message: string): void {
		this.log(chalk.yellow(`[AVERTISSEMENT] ${message}`));
		this.sendLogToSentry('warning', message);
	}

	public error(message: string, error?: unknown): void {
		this.log(chalk.redBright(`[ERREUR] ${message}`));
		this.sendLogToSentry('error', message, error as Error);
	}

	public fatal(message: string, error?: Error): void {
		this.log(chalk.red(`[FATAL] ${message}`));
		this.sendLogToSentry('fatal', message, error);
		if (process.env.NODE_ENV === 'production') {
			process.exit(1);
		}
	}

	public sendLogToSentry(level: SeverityLevel, message: string, error?: Error): void {
		captureMessage(message, level);
		if (error) {
			captureException(error);
			console.log(`${error.stack}`);
		}
	}
}
