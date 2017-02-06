"use strict";
var TicTacToe = (function($) {

  var _x_clicked_index = [],
    _o_clicked_index = [],
    _x_score = 0,
    _o_score = 0,
    _valid_matches = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
        [2, 5, 8], [0, 4, 8], [2, 4, 6]],
    _current_player, // can be "X" or "O"
    $reset_button, $x_score, $o_score, $cards, round_count;

  _init();

  function _init() {
    _cacheDom();
    resetBoard();
    _bindEvents();
  }

  function resetBoard() {
    _x_clicked_index = [];
    _o_clicked_index = [];
    $cards.html("").removeClass("matched");
    _current_player = "X"
  }

  function _cacheDom() {
    $reset_button = $(".reset_button");
    $x_score = $("#x_score");
    $o_score = $("#o_score");
    $cards = $(".card");
  }

  function _bindEvents() {
    $cards.on("click", _playGame);
    $reset_button.on("click", resetBoard);
  }

  function _playGame(event) {
    event.preventDefault();
    var $target = $(event.target);

    if ($target.html() === "") {

      var index = $target.index(".card");
      $target.html(_current_player);

      _current_player === "X" ? _x_clicked_index.push(index) : _o_clicked_index.push(index);

      if (_x_clicked_index.length > 2 || _o_clicked_index.length > 2) {

        var box_selected = checkIfMatchedFor(_current_player);

        if (box_selected.hasMatched) {
          _current_player === "X" ? ++_x_score : ++_o_score;
          $(".card" + box_selected.matchedPair[0] + ", .card" + box_selected.matchedPair[1] + ", .card" + box_selected.matchedPair[2]).addClass("matched");
          displayScores();
          if (confirm(_current_player + " Wins!!\nDo you want to play the next round?")) {
            resetBoard();
          }
          return;
        }

      }

      _current_player === "X" ? _current_player = "O" : _current_player = "X";

    }

    if ((_x_clicked_index.length + _o_clicked_index.length) === 9) {
      if (confirm("That's a draw!!\nDo you want to play the next round?")) {
        resetBoard();
      }
      return;
    }

  }

  function checkIfMatchedFor(current_player) {
    var hasMatched = false,
      matchedPair = [];
    var to_check_with = current_player === "X" ? _x_clicked_index.slice() : _o_clicked_index.slice();

    for (let i = 0, match_length = _valid_matches.length; i < match_length; i++) {

      if ((to_check_with.indexOf(_valid_matches[i][0]) !== -1) &&
        (to_check_with.indexOf(_valid_matches[i][1]) !== -1) &&
        (to_check_with.indexOf(_valid_matches[i][2]) !== -1)) {
        hasMatched = true;
        matchedPair = _valid_matches[i].slice();
        break;
      }

    }

    return {
      hasMatched: hasMatched,
      matchedPair: matchedPair
    };
  }

  function displayScores() {
    $x_score.html(_x_score);
    $o_score.html(_o_score);
  }

  return {
    resetBoard: resetBoard
  };

})(jQuery);
