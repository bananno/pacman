
$(document).ready(createBoard);

function createBoard() {
  let newBoard = '<table>';

  maps[0].forEach(row => {
    newBoard += '<tr>';

    const tiles = row.split('');

    newBoard += tiles.map(tile => {
      if (tile == '|') {
        return '<td class="board-wall"> </td>';
      }
      return '<td class="board-path">' + tile + '</td>';
    }).join('');

    newBoard += '</tr>';
  });

  newBoard += '</table>';

  $('#board').html(newBoard);
}
