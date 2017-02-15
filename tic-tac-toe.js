"use strict";
var TicTacToe = (function($) {

  var _x_clicked_index = [],
    _o_clicked_index = [],
    _x_score = 0,
    _o_score = 0,
    _valid_matches = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
        [2, 5, 8], [0, 4, 8], [2, 4, 6]],
    _current_player = "X", // can be "X" or "O"
    $reset_button, 
    $x_score, 
    $o_score, 
    $cards, 
    $message, 
    $score_display, 
    _messages = [
      "Start game or select a player to start with", 
      " Wins!!", 
      "You have selected ",
      " 's turn",
      "That's a draw!!"
      ],
    _btns_text = ["Reset Game?", "Rematch"],
    _match_end;

  _init();

  function _init() {
    _cacheDom();
    resetBoard();
    _bindEvents();
    displayScores();
  }

  function _cacheDom() {
    $reset_button = $(".reset_button");
    $x_score = $("#x_score");
    $o_score = $("#o_score");
    $cards = $(".card");
    $message = $(".message");
    $score_display = $(".score_display");
  }

  function _bindEvents() {
    $cards.on("click", _playGame);
    $reset_button.on("click", resetBoard);
    $score_display.on("click", changePlayer);
  }

  function resetBoard(e, playerChanged) {
    _x_clicked_index = [];
    _o_clicked_index = [];
    _match_end = false;
    $cards.html("").removeClass("matched");
    if(_current_player === "X") {
      $score_display[0].classList.add("selected-player");
      $score_display[1].classList.remove("selected-player");
    } else {
      $score_display[1].classList.add("selected-player");
      $score_display[0].classList.remove("selected-player");
    }
    $reset_button.html(_btns_text[0]);
    if(playerChanged){
      $message.html(_messages[2] + "<b>" + _current_player + "</b>");  
    } else {
      $message.html(_messages[0]);
    }
  }

  function _playGame(event) {
    var $this = $(this);

    if ($this.html() === "" && !_match_end) {

      var index = $this.index(".card");
      $this.html(_current_player);

      _current_player === "X" ? _x_clicked_index.push(index) : _o_clicked_index.push(index);

      if (_x_clicked_index.length > 2 || _o_clicked_index.length > 2) {

        var box_selected = checkIfMatchedFor(_current_player);

        if (box_selected.hasMatched) {
          _current_player === "X" ? ++_x_score : ++_o_score;
          $(".card" + box_selected.matchedPair[0] + ", .card" + box_selected.matchedPair[1] + ", .card" + box_selected.matchedPair[2]).addClass("matched");
          displayScores();
          $reset_button.html(_btns_text[1]);
          $message.html("<b>" + _current_player + "</b>" + _messages[1]);
          _match_end = true;
          return;
        }

      }

      _current_player = _current_player === "X" ?  "O" : "X";
      $message.html("<b>" + _current_player + "</b>" + _messages[3]);
      $score_display.toggleClass("selected-player");
    }

    if ((_x_clicked_index.length + _o_clicked_index.length) === 9) {
      $reset_button.html(_btns_text[1]);
      $message.html(_messages[4]);
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  }

  function changePlayer() {
    var idx = $(this).index();
    _current_player = idx === 0 ? "X" : "O";
    $message.html(_messages[2] + "<b>" + _current_player + "</b>");
    resetBoard({}, true);
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
    $x_score.html(_x_score ? _x_score : "-");
    $o_score.html(_o_score ? _o_score : "-");
  }

  return {
    resetBoard: resetBoard
  };

})(jQuery);
