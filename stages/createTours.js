'use strict';
const _ = require('lodash');

/*
  Делает тур - массив с элементами матчами
  (в туре играет одна команда играет только раз)
  удаляет(мутирует) из переданного массива с матчами уже записанные
*/
const createTour = (matches) => {

  const homeTeams = Object.getOwnPropertyNames(matches);
  const availableTeams = Object.getOwnPropertyNames(matches);
  const tour = homeTeams.reduce((acc, current, index) => {
    // доступна ли домашняя команда
    if (!availableTeams.includes(current)) {
      return acc;
    }

    // проверяем доступна ли гостевая команда
    let guestTeamI = 0;
    let guestTeam = matches[current][guestTeamI];
    if (!guestTeam) {
      return acc;
    }

    if(!availableTeams.includes(guestTeam)) {
      while (guestTeam && !availableTeams.includes(guestTeam)) {
        guestTeamI++;
        guestTeam = matches[current][guestTeamI];
      }
      if (!guestTeam) {
        return acc;
      }
    };

    acc.push({
      homeTeam: current,
      guestTeam
    });
    const guestTeamIndex = availableTeams.findIndex((val) => val === guestTeam);
    // удаляем из доступных в этом туре
    delete availableTeams[index];
    delete availableTeams[guestTeamIndex];
    // удаляем из круга
    delete matches[current][0];
    // убираем undefined
    matches[current] = matches[current].filter((team) => team);

    return acc;
  }, []);
  return tour;
};

const isMathchesEmpty = (matches) => {
  const homeTeams = Object.getOwnPropertyNames(matches);
  const isEmpty = homeTeams.every(team => matches[team].length === 0);
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
  }

	return tours;
};
