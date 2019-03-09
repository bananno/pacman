
$(document).ready(createBoard);

function createBoard() {
  let newBoard = '<table>';

  maps[0].forEach(row => {
    newBoard += '<tr>';

    const tiles = row.split('');

    tiles.forEach(tile => {
      if (tile == '|') {
        newBoard += '<td class="board-wall"> </td>';
      } else if (tile == '.') {
        newBoard += '<td class="board-path"> * </td>';
      }
    });

    newBoard += '</tr>';
  });

  newBoard += '</table>';

  $('#board').html(newBoard);
}
