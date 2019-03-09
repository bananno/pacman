
$(document).ready(createBoard);

function createBoard() {
  let newBoard = '<table>';

  maps[0].forEach((row, r) => {
    newBoard += '<tr>';

    const tiles = row.split('');

    newBoard += tiles.map((tile, c) => {
      if (tile == '|') {
        return '<td class="board-wall"> </td>';
      }
      if (tile == 'P') {
        pacmanPosition[0] = r;
        pacmanPosition[1] = c;
      }
      return '<td class="board-path">' + tile + '</td>';
    }).join('');

    newBoard += '</tr>';
  });

  newBoard += '</table>';

  $('#board').html(newBoard);
}
