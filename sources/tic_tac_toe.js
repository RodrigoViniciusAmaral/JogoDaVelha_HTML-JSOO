const players_score = Array.from(document.querySelectorAll('.player_score'))
var playerwinX = 0
var playerwinO = 0
players_score[0].innerHTML = playerwinX
players_score[1].innerHTML = playerwinO
var modal_msg = document.getElementById("modal")
var modal_status_msg = document.getElementById("status_modal")
var modal_msg_text = document.getElementById("text_modal")

const tic_tac_toe_game = {
    board: ['','','','','','','','',''],
    container_element: null,

    init: function (container){
        this.container_element = container;
    },

    draw_board: function(){
        let content = '';
        
        for ( i in this.board) {
            content += '<div class="tuple">' + this.board[i] + '</div>';
        }

        this.container_element.innerHTML = content;
    },
    
    tic_tac_toe_logic_game: function(){
        const tic_tac_toe_logic_game = new TicTacToeLogicGame();
        tic_tac_toe_logic_game.start();
    },
    
};

function TicTacToeLogicGame() {
    const logicboard = new LogicBoard();
    const playerx = new PlayerX(logicboard);
    const playero = new PlayerO(logicboard);
    const playersturn = Array.from(document.querySelectorAll('.playersturn'))
    let turn = 0

    this.start = function(){
        const config = {childList: true};
        const observer = new MutationObserver(() => takeTurn());
        logicboard.positions.forEach((el) => observer.observe(el, config));
        takeTurn();
    }

    function LogicBoard() {
        this.positions = Array.from(document.querySelectorAll('.tuple'));

        this.checkWinner = function() {
            let winner = false;
            const winningCombinations = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 4, 8],
                [2, 4, 6],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ];

            const positions = this.positions;
        
            winningCombinations.forEach((winningComb) => {

                const isWinningComb = positions[winningComb[0]].innerHTML !== '' && 
                positions[winningComb[0]].innerHTML === positions[winningComb[1]].innerHTML &&
                positions[winningComb[1]].innerHTML === positions[winningComb[2]].innerHTML;

                if (isWinningComb) {
                    winner = true;
                    
                    winningComb.forEach((index) => {
                        positions[index].className += 'winner';
                        setTimeout(function(){ 
                            modal_msg.style.display = "block";
                         }, 140);
                         modal_status_msg.innerHTML = "Parabéns!";
                    })
                    
                    if (turn % 2 == 0 && winner == true) {
                        playerwinO += 1
                        players_score[1].innerHTML = playerwinO
                        logicboard.positions.forEach(el => el.removeEventListener('click'));
                    } else {
                        playerwinX += 1
                        players_score[0].innerHTML = playerwinX
                        logicboard.positions.forEach(el => el.removeEventListener('click'));
                    }
                }
            });
        }
    }

    function takeTurn() {
        if (logicboard.checkWinner()){
            return;
        }

        
        if (turn % 2 == 0) {
            playerx.takeTurn();
            playersturn[0].innerHTML="<img src = 'https://lh3.googleusercontent.com/VkR8TxIr6E8oDCmL5nTL0U38kZGdSeTA_a9QYCYnxou6_n3TnNgH_9S-rfYk3m-xX_mjA5dS5u_M9GNKCO0nqa1lPQQE67dI6a1Q1pn7QMtDLjV5l6CfeQY0zwI7KFLd0jN98jTFwO3meiVyT0Cv9n6N3JukHk_5A79hpSP3_VaJrff_5enqpTjKqG3fUlyScm333Akc4ojbcOo2EkKT9LMdWbS0jBp7u018x0gh3Hcu9QAhvGUC8_TxDigb2Yki0tvX5-dIMPMsX7qj1QdHKhk1ikKx14ci1-5S1O7U5mjONJ3x1V2VSKVdPYNKF-ErLy0o-Vbf6N-6lm8o3xjJSJRPMCx10N5gr15Pv7w2zKzZWUDS_9f3KYS1yaOQg9T_jfHy9itSH6n1E_hCDa2xdkiyJw5zRzpjeOMdShc78MBxRevpOmCM7LYxcVyb3ETogi-zUaUhV5WWztPeTYKUkGYGiYqk3EAXez-geeu2SHok4DOItJpc0LDE_UOAuDV-VGT7fHKk8j-RelJ0QRNUy6dQv5Oe_1yuXWABu7YT0lxhgNE4DmXh5MOq4itHA5WFZsC7cT6SBcSBDVzY55GeUXd1tFkMNX4jjZFQUw-QIaWipHymfvDhFHGLp6Y9V7-S9fc6FbZOtV-VWGWlO-P2RRdw93tKxpnhNrK5ixrJNWAO48he3Gn98_V8xKfaH5z7q8z4oZy3D0xmLHDP3zM3zoE=w121-h144-no?authuser=0'width=\'15px\' height=\'15px\'>";
            playersturn[1].innerHTML=""
            modal_msg_text.innerHTML = "O jogador X venceu!";

        } else {
            playero.takeTurn();
            playersturn[1].innerHTML="<img src = 'https://lh3.googleusercontent.com/VkR8TxIr6E8oDCmL5nTL0U38kZGdSeTA_a9QYCYnxou6_n3TnNgH_9S-rfYk3m-xX_mjA5dS5u_M9GNKCO0nqa1lPQQE67dI6a1Q1pn7QMtDLjV5l6CfeQY0zwI7KFLd0jN98jTFwO3meiVyT0Cv9n6N3JukHk_5A79hpSP3_VaJrff_5enqpTjKqG3fUlyScm333Akc4ojbcOo2EkKT9LMdWbS0jBp7u018x0gh3Hcu9QAhvGUC8_TxDigb2Yki0tvX5-dIMPMsX7qj1QdHKhk1ikKx14ci1-5S1O7U5mjONJ3x1V2VSKVdPYNKF-ErLy0o-Vbf6N-6lm8o3xjJSJRPMCx10N5gr15Pv7w2zKzZWUDS_9f3KYS1yaOQg9T_jfHy9itSH6n1E_hCDa2xdkiyJw5zRzpjeOMdShc78MBxRevpOmCM7LYxcVyb3ETogi-zUaUhV5WWztPeTYKUkGYGiYqk3EAXez-geeu2SHok4DOItJpc0LDE_UOAuDV-VGT7fHKk8j-RelJ0QRNUy6dQv5Oe_1yuXWABu7YT0lxhgNE4DmXh5MOq4itHA5WFZsC7cT6SBcSBDVzY55GeUXd1tFkMNX4jjZFQUw-QIaWipHymfvDhFHGLp6Y9V7-S9fc6FbZOtV-VWGWlO-P2RRdw93tKxpnhNrK5ixrJNWAO48he3Gn98_V8xKfaH5z7q8z4oZy3D0xmLHDP3zM3zoE=w121-h144-no?authuser=0'width=\'15px\' height=\'15px\'>";
            playersturn[0].innerHTML=""
            modal_msg_text.innerHTML = "O jogador O venceu!";
        }
        turn++;

        if (turn == 10) {
            this.positions = Array.from(document.querySelectorAll('.tuple'));
            positions[0].className += 'winner';
            positions[1].className += 'winner';
            positions[2].className += 'winner';
            positions[3].className += 'winner';
            positions[4].className += 'winner';
            positions[5].className += 'winner';
            positions[6].className += 'winner';
            positions[7].className += 'winner';
            positions[8].className += 'winner';
            setTimeout(function(){ 
                modal_msg.style.display = "block";
             }, 140);
            modal_status_msg.innerHTML = "Ops, Deu velha!... :/";
            modal_msg_text.innerHTML = "Não houve vitorioso!";
        }
    }

    function PlayerX(logicboard) {
        this.takeTurn = function() {
            logicboard.positions.forEach(el => el.addEventListener('click', handleTurnTaken));
        }

        function handleTurnTaken(event) {
            if (event.target.innerText == '') {
                event.target.innerHTML = "<img src = 'https://lh3.googleusercontent.com/76ru1-VbR_nhciX-fXq7tRG99gLG22-vCIILlWx9q3e9UjwAANt_zPIftQoDYWdwPU3Hv8JvSTxYfd0i8PEPUgLualr12W01IjdmjjQsNokCDH_FYzXvr0Zar6ejlYUDWQTTFXPtIjgv9HK_LchdbeZFXBhiwam2D8DLzG0GJK2WaMvxoUvPor4rl-j5PWCLv_LWlrSl-T-YXHJ-08IYwHLsesoALQy4JfGS9-JWqFZRVXFi3ffFO0PmHq-rjupOrttYf5pEMuseQ8YRTrn22ZQyWLZPzyHohco5qR2jZx4pgg0twwQcAlFRq1hemW-3l48e97AiCVgCnds_XHB82TmzEUhrnw1EkFtmT2eUTfhrR_YE0CTPK3Qv3LP6qqeyu3aR4GNkeHQZ9BBGUHXcPWJ-Wz2p-UNieHObZuPYov2X4nS2o7qvchvWvbOJT8dnwZ3L3kxQ7QBmm1ztxof1k7sqoOcIQYrL3kjhFdzTLt4M0rlaBdrxoKvmNdsVunZix_5c_5pEl3tTyaXCnR8DKh_FStYRtD-vNAPpZZiubQVF3GRsJUkzXYx6youblchitJ0aZl1jS1tWGp-yPgJemEMFmtsli-5XiNWEEzZs8Tw5Yi4JwLz1vb_H4f-9fU80jLL2808cSYBuUqJ53YHHJ9JhMG6jd-IkN-JaFN6egMw8Vycbk-rkFS0CnLEYDv0C2tPrVlxD2YBJ8kMNE7MAryU=w625-h657-no?authuser=0'width=\'80px\' height=\'80px\'>";
                logicboard.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));
            }
        }
    }

    function PlayerO(logicboard) {
        this.takeTurn = function() {
            logicboard.positions.forEach(el => el.addEventListener('click', handleTurnTaken));
        }

        function handleTurnTaken(event) {
            if (event.target.innerText == '') {
                event.target.innerHTML = "<img src = 'https://lh3.googleusercontent.com/-3Mot3veLx_CGMQI6D4DMVkDLNNrviFjivxaeGCOuSh16Hk4tBMUGoRsVouMEwTebYUnNei0hbaX1klcL9nbZL12VSOlNJdrAMudTo8PW5JrwtTMz3Q5zQIYFytsOuo7ns4hqMjNadBXxEk5U2x2orYRmZI0U1gGfbraA8snSEkt1uJ6dAFv7-soHkqhkNoVO9wsVOMeOHqKXmhkw0cYZ0fN3m_pDWSjdI4_mKLwawLEvi2xbygvD0CY16RiRD_jA-S5rNvuMRtpqHWSW8XYHiVRU3HpPDbDEXRcLOLNbJsj07aUKUswA3dD1sg4YrBe3sp-fA4KuB6350K8yxu2s0-skdYKZes5_7KRkKgwuxm-B4mWAIHlUQFWlPIRqRYSGFGNz_uaJJjBkn-dL_eWlcgGLCSwHijN1UETL_9obBcmAX6sWIPDaihkD2_1IjY4OjrfujxYooqcfGcrSdMhL_uYjsvDvTC4GUFIidsyRDHT2AaD8eVT9IPR2kXqJxhNX0c6EAx7Q079kXVxtd5vZvKzQJSDt-saU5FeUqgS6QnWYLntOqJj1SNHKfq9yeeeG3aTAZE4Y3acrrmmfB7Lvvgf2jFZY3gTEWNLl_SdBamQe2h2uFuyRbBtfuhijh_DDWGMXtDKnQbyj5lBRhG3rpLWpLu_zuK9u8QSGTpZYm4HW68oiwn1OefYhpLE8vvMPJKXG7zMffnaVNTAak3intc=w649-h657-no?authuser=0'width=\'80px\' height=\'80px\'>";
                logicboard.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));
            }
        }
    }
};