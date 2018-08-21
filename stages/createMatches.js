'use strict';

/**
 * Создание матчей для одного круга.
 *
 * @param {Array} teams Список комманд
 * @returns {Object} mathches Объект. Ключ команда проводящая домашний поединок, значение массив с гостями
 */
module.exports = function createMatches(teams) {
	if (!teams) {
		throw new Error('teams is required');
	}
	const teamsCount = teams.length;


	const mathches = [];

	teams.forEach((team, currentTeamIndex) => {
		const isInFirstHalf = currentTeamIndex < teamsCount/2
		let guestTeamsCount = isInFirstHalf
			? Math.ceil((teamsCount - 1)/2)
			: (teamsCount - 1)/2;
		const guestTeams = [];
		for (var i = 1; i <= guestTeamsCount; i++) {
			const guestTeamIndex = currentTeamIndex + i < teamsCount
				? currentTeamIndex + i
				: -1 * (teamsCount - currentTeamIndex - i) ;

			guestTeams.push(teams[guestTeamIndex]);
		}
		mathches.push({
			team,
			guestTeams
		})
	});


	return mathches;
};
