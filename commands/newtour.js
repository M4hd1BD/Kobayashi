module.exports = {
	name: 'newtour',
	description: 'Publish new tournament schedule.',
	permissions: 'ADMINISTRATOR',
	execute(message, args) {

		const dotenv = require('dotenv');
		dotenv.config()
		const Discord = require('discord.js');
		const client = new Discord.Client();

		var tourName, roundName, slot, pointSystem, startTime, idpTime, totalQualify, map, date, finalMessage;
		message.channel.send(`Please enter tournament name:`).then(() => {
			const filter = m => message.author.id === m.author.id;

			message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
			.then(messages => {
				tourName = messages.first().content;
				message.channel.send(`Please enter round name:`).then(() => {
					const filter = m => message.author.id === m.author.id;
		
					message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
					.then(messages => {
						roundName = messages.first().content;
						message.channel.send(`Please enter map name:`).then(() => {
							const filter = m => message.author.id === m.author.id;
				
							message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
							.then(messages => {
								map = messages.first().content;
								message.channel.send(`Please enter date (DD-MM-YYYY):`).then(() => {
									const filter = m => message.author.id === m.author.id;
						
									message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
									.then(messages => {
										date = messages.first().content;
										message.channel.send(`Please enter IDP time (HH'MM AM/PM):`).then(() => {
											const filter = m => message.author.id === m.author.id;
								
											message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
											.then(messages => {
												idpTime = messages.first().content;
												message.channel.send(`Please enter start time (HH'MM AM/PM):`).then(() => {
													const filter = m => message.author.id === m.author.id;
										
													message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
													.then(messages => {
														startTime = messages.first().content;
														message.channel.send(`Please enter slot number:`).then(() => {
															const filter = m => message.author.id === m.author.id;
												
															message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
															.then(messages => {
																slot = messages.first().content;
																message.channel.send(`Please enter point system (F.E. 20/02):`).then(() => {
																	const filter = m => message.author.id === m.author.id;
														
																	message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
																	.then(messages => {
																		pointSystem = messages.first().content;
																		message.channel.send(`Please enter number of qualifiers:`).then(() => {
																			const filter = m => message.author.id === m.author.id;
																			message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
																			.then(messages => {
																				totalQualify = messages.first().content;
																				finalMessage =
																				`
${tourName}
${roundName}
																				
Map: **${map}**
																				
Date: **${date}**
ID & Pass: **${idpTime}**
Match: **${startTime}**
Slot: ${slot}
																				
Point System: ${pointSystem}
																				
**Top ${totalQualify}** qualifies for the next round
																				
||<@&${'808362192649846824'}>||
																				`;
																				const channel = client.channels.cache.get('808331631345008670');
																				channel.send(`${finalMessage}`);
																			})
																			.catch(() => {
																				message.channel.send('You did not enter any input! 1');
																			});
																			});
																	})
																	.catch(() => {
																		message.channel.send('You did not enter any input! 2');
																	});
																	});
															})
															.catch(() => {
																message.channel.send('You did not enter any input! 3');
															});
															});
													})
													.catch(() => {
														message.channel.send('You did not enter any input! 4');
													});
													});
											})
											.catch(() => {
												message.channel.send('You did not enter any input! 5');
											});
											});
									})
									.catch(() => {
										message.channel.send('You did not enter any input! 6');
									});
									});
							})
							.catch(() => {
								message.channel.send('You did not enter any input! 7');
							});
							});
					})
					.catch(() => {
						message.channel.send('You did not enter any input! 8');
					});
					});
			})
			.catch(() => {
				message.channel.send('You did not enter any input! 9');
			});
			});
			client.login(process.env.botToken);

	},
};