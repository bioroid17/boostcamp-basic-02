function play(cards) {
  let arrays = [[10], [30], [50], [80]];

  let turn = 0;
  let players = [
    { name: "A", penalty: 0, card: 0 },
    { name: "B", penalty: 0, card: 0 },
    { name: "C", penalty: 0, card: 0 },
  ];
  while (true) {
    // 배열이 비어있거나 카드가 소진되면 게임 종료
    if (
      (arrays[0].length === 0 &&
        arrays[1].length === 0 &&
        arrays[2].length === 0 &&
        arrays[3].length === 0) ||
      turn * 3 >= cards.length
    ) {
      break;
    }
    console.log(
      `==================================Turn ${
        turn + 1
      } starts!==================================`
    );

    players[0].card = cards[turn * 3];
    players[1].card = cards[turn * 3 + 1];
    players[2].card = cards[turn * 3 + 2];

    let sortedPlayers = players.toSorted((a, b) => {
      return a.card - b.card;
    });

    console.log(
      `Turn ${turn + 1}: Player ${sortedPlayers[0].name} plays ${
        sortedPlayers[0].card
      }, Player ${sortedPlayers[1].name} plays ${
        sortedPlayers[1].card
      }, Player ${sortedPlayers[2].name} plays ${sortedPlayers[2].card}`
    );

    for (const player of sortedPlayers) {
      let index = 0;
      let min = 1000;
      for (i = 0; i <= 3; i++) {
        // 배열이 비어있으면 건너뛰기
        if (arrays[i].length === 0) {
          continue;
        }
        const len = arrays[i].length;
        // 각 배열의 마지막 카드와 현재 플레이어의 카드 차이 계산
        const diff = Math.abs(arrays[i][len - 1] - player.card);
        if (diff <= min) {
          min = diff;
          index = i;
        }
      }
      if (arrays[index][arrays[index].length - 1] > player.card) {
        arrays[index].push(player.card);
      } else {
        player.penalty += arrays[index].length + 1;
        arrays[index] = [];
      }
      console.log(player);
    }
    console.log(
      `After Turn ${turn + 1}: Player ${players[0].name}'s penalty: ${
        players[0].penalty
      }, Player ${players[1].name}'s penalty: ${players[1].penalty}, Player ${
        players[2].name
      }'s penalty: ${players[2].penalty}`
    );
    console.log(
      `Arrays: ${arrays[0]} / ${arrays[1]} / ${arrays[2]} / ${arrays[3]}`
    );

    for (const player of players) {
      for (const sortedPlayer of sortedPlayers) {
        if (player.name === sortedPlayer.name) {
          player.penalty = sortedPlayer.penalty;
        }
      }
    }

    turn++;
  }

  console.log("Game Set!");

  return new Map([
    ["A", players[0].penalty],
    ["B", players[1].penalty],
    ["C", players[2].penalty],
  ]);
}

let cards = [];
const forbidden = [10, 30, 50, 80];
while (cards.length < 30) {
  let card = Math.floor(Math.random() * 100) + 1;
  if (cards.includes(card) || forbidden.includes(card)) {
    continue;
  } else {
    cards.push(card);
  }
}

const penalties = play(cards);
console.log(`Player A's penalty: ${penalties.get("A")}`);
console.log(`Player B's penalty: ${penalties.get("B")}`);
console.log(`Player C's penalty: ${penalties.get("C")}`);
