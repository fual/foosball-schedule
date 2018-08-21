'use strict';

/*
  Делает тур - массив с элементами матчами
  (в туре играет одна команда играет только раз)
  удаляет(мутирует) из переданного массива с матчами уже записанные
*/
const createTour = (matches) => {

  const availableTeams = matches.map((match) => match.team);
  const tour = matches.reduce((acc, current, index) => {
    // доступна ли домашняя команда
    if (!availableTeams.includes(current.team)) {
      return acc;
    }

    // проверяем доступна ли гостевая команда
    let guestTeamI = 0;
    let guestTeam = current.guestTeams[guestTeamI];
    if (!guestTeam) {
      return acc;
    }

    if(!availableTeams.includes(guestTeam)) {
      while (guestTeam && !availableTeams.includes(guestTeam)) {
        guestTeamI++;
        guestTeam = current.guestTeams[guestTeamI];
      }
      if (!guestTeam) {
        return acc;
      }
    };

    acc.push({
      homeTeam: current.team,
      guestTeam
    });

    const guestTeamIndex = availableTeams.findIndex((val) => val === guestTeam);
    const homeTeamIndex = availableTeams.findIndex((val) => val === current.team);
    // удаляем из доступных в этом туре
    delete availableTeams[homeTeamIndex];
    delete availableTeams[guestTeamIndex];
    // удаляем из круга
    delete current.guestTeams[guestTeamI];
    // убираем undefined
    current.guestTeams = current.guestTeams.filter((team) => team);

    return acc;
  }, []);
  return tour;
};

const isMathchesEmpty = (matches) => {
  const isEmpty = matches.every(match => match.guestTeams.length === 0);
  return isEmpty;
};

/**
 * Создание матчей для одного круга.
 *
 * @param {Object} matches Объект. Ключ - команда проводящая домашний поединок, значение - массив с гостями
 * @returns {Array} где каждый элемент массива это массив, с матчами
 */
module.exports = function createTours(matches) {
	if (!matches) {
		throw new Error('matches is required');
	}

  const tours = [];
  let i = 1;
  while(!isMathchesEmpty(matches)) {
      ++i;
      const newTour = createTour(matches);
      tours.push(newTour);
      //matches.sort((match, prevMatch) => prevMatch.guestTeams.length - match.guestTeams.length)
  }
	return tours;
};
