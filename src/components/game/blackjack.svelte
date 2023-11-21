<script lang="ts">
  let chips: number = 10;
  let deck: any = [];
  let playerHand: any = [];
  let dealerHand: any = [];
  let bet: number = 0;
  let playerScore: number = 0;
  let dealerScore: number = 0;
  let dealerTurn: boolean = false;
  let gameOver: Boolean | undefined = undefined;
  let win: string | undefined = undefined;
  let stage: string = "intro";
  let previous = bet;

  function validator(node, value) {
    if (bet <= chips) {
      return {
        update(value: number) {
          bet = value === null || bet < node.min ? previous : parseInt(value);
          previous = bet;
        },
      };
    }
  }

  function addScore() {
    playerScore = 0;
    dealerScore = 0;
    for (let i = 0; i < playerHand.length; i++) {
      let value: string | number = playerHand[i][0];
      if (value === "K" || value === "Q" || value === "J" || value === "A") {
        value = 10;
      }
      value = Number(value);
      if (value === 1 && playerHand[i][1] === "0") {
        value = 10;
      }
      playerScore += value;
    }
    for (let i = 0; i < dealerHand.length; i++) {
      let value = dealerHand[i][0];
      if (value === "K" || value === "Q" || value === "J" || value === "A") {
        value = 10;
      }
      value = Number(value);
      if (value === 1 && dealerHand[i][1] === "0") {
        value = 10;
      }
      dealerScore += value;
    }
  }

  function draw(turn: number) {
    let shuffle = Math.floor(Math.random() * deck.length);
    let drawn = deck.splice(shuffle, 1);
    if (turn === 0) {
      let oldHand = playerHand;
      playerHand = [...[]];
      oldHand.push(drawn[0]);
      playerHand = oldHand;
    } else {
      dealerHand = dealerHand.concat(drawn[0]);
    }
    addScore();
  }

  function setDeck() {
    deck = [
      "AH",
      "AC",
      "AD",
      "AS",
      "2H",
      "2C",
      "2D",
      "2S",
      "3H",
      "3C",
      "3D",
      "3S",
      "4H",
      "4C",
      "4D",
      "4S",
      "5H",
      "5C",
      "5D",
      "5S",
      "6H",
      "6C",
      "6D",
      "6S",
      "7H",
      "7C",
      "7D",
      "7S",
      "8H",
      "8C",
      "8D",
      "8S",
      "9H",
      "9C",
      "9D",
      "9S",
      "10H",
      "10C",
      "10D",
      "10S",
      "JH",
      "JC",
      "JD",
      "JS",
      "QH",
      "QC",
      "QD",
      "QS",
      "KH",
      "KC",
      "KD",
      "KS",
    ];
  }

  function deal() {
    draw(0);
    draw(1);
    draw(0);
    draw(1);
  }

  function startGame() {
    setDeck();
    deal();
    stage = "betting";
  }

  function dealerPlay() {
    dealerTurn = true;
    while (dealerScore < 17) {
      draw(1);
    }
    scoreHand();
  }

  function scoreHand() {
    if ((playerScore > 21 && dealerScore > 21) || dealerScore == playerScore) {
      win = "tie";
    } else if (playerScore > 21) {
      win = "dealer";
    } else if (dealerScore > 21) {
      win = "player";
    } else if (playerScore < dealerScore) {
      win = "dealer";
    } else if (playerScore > dealerScore) {
      win = "player";
    }

    if (win === "player") {
      chips += bet;
    }
    if (win === "dealer") {
      chips -= bet;
    }
  }

  function resetTable() {
    if (bet > chips) {
      bet = chips;
    }
    playerHand = [...[]];
    dealerHand = [...[]];
    playerScore = 0;
    dealerScore = 0;
    dealerTurn = false;
    gameOver = undefined;
    win = undefined;
    startGame();
  }

  function handleChange(e) {
    const value = Number(e.target.value);
    if (!Number.isNaN(value)) {
      if (value > chips || value < 0) {
        bet = previous;
      } else {
        bet = value;
      }
    }
  }
</script>

{#if stage === "intro"}
  <button
    on:click={() => {
      startGame();
      gameOver = false;
    }}>Start Game</button
  >
{/if}

{#if gameOver === false}
  <!--chip count-->
  <p>chips: {chips}</p>

  {#if stage === "betting"}
    <!--bets-->
    <button
      on:click={() => {
        if (bet > 0) {
          bet = Number(bet) - 1;
        }
      }}>-</button
    >

    <input
      use:validator={bet}
      bind:value={bet}
      min="0"
      on:input={(e) => {
        handleChange(e);
      }}
      class="w-8 text-center"
    />

    <button
      on:click={() => {
        if (bet < chips) {
          bet = Number(bet) + 1;
        }
      }}>+</button
    >

    <br />
    <button
      on:click={() => {
        if (bet > 0) {
          stage = "playing";
        } else {
          alert("Bet must be greater than 0");
        }
      }}>Bet</button
    >
  {/if}

  {#if stage === "playing"}
    <!--frozen bet counter-->
    <button>-</button>
    <input value={bet} disabled={true} class="w-8 text-center" />
    <button>+</button>

    <!--table-->

    <p>Dealer score: {dealerScore}</p>
    <div class="carousel">
      {#each dealerHand as card}
        <div class="carousel-item">
          <img class={"h-32"} src={"src/assets/img/cards/" + card + ".svg"} />
        </div>
      {/each}
    </div>
    <br />
    <p>Your score: {playerScore}</p>
    <div class="carousel">
      {#each playerHand as card}
        <div class="carousel-item">
          <img class={"h-32"} src={"src/assets/img/cards/" + card + ".svg"} />
        </div>
      {/each}
    </div>

    <br />

    <!--player ui-->
    <button
      disabled={dealerTurn}
      on:click={() => {
        draw(0);
        if (playerScore >= 21) {
          dealerPlay();
        }
      }}>hit me</button
    >
    <button
      disabled={dealerTurn}
      on:click={() => {
        dealerPlay();
      }}>stand</button
    >
  {/if}

  {#if win === "player"} <p>You win {bet} tokens!</p> {/if}
  {#if win === "dealer"} <p>You lose {bet} tokens!</p> {/if}
  {#if win === "tie"} <p>You tied!</p> {/if}

  {#if win}
    <button
      on:click={() => {
        if (chips === 0) {
          alert("No chips to bet!");
          return 0;
        }
        resetTable();
        gameOver = false;
      }}>new game</button
    >
  {/if}
{/if}
