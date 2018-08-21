'use strict';

const createMatches = require('../stages/createMatches');
const createTours = require('../stages/createTours');
const SP1 = require('../teams/SP-1.json');
const _ = require('lodash');

// 1-ая стадия: определяем матчи
const mathces = createMatches(SP1);
console.log(mathces);
// 2-ая стадия: группируем эти матчи по турам
const tours = createTours(mathces);
console.log(tours);

tours.forEach((mathches, index) => {
  console.log(`${index + 1} тур`);
  mathches.forEach(game => {
    console.log(`${game.homeTeam} - ${game.guestTeam}`);
  })
})
