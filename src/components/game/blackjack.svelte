<script lang="ts">
  import { updateDB } from "../crypto/localTokenDatabase";
  import { chips } from "../../lib/state";
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

  function validator(node: any, value: any) {
    if (bet <= $chips) {
      return {
        update(value: any) {
          bet = value === null || bet < node.min ? previous : parseInt(value);
          previous = bet;
        },
      };
    }
  }

  function isBlackjack(hand: any[]) {
    return (
      hand.length === 2 &&
      hand.some((card) => card[0] === "A") &&
      hand.some((card) => ["10", "J", "Q", "K"].includes(card[0]))
    );
  }

  function addScore() {
    playerScore = 0;
    dealerScore = 0;
    for (let i = 0; i < playerHand.length; i++) {
      let value: string | number = playerHand[i][0];
      if (value === "K" || value === "Q" || value === "J") {
        value = 10;
      } else if (value === "A") {
        value = playerScore + 11 <= 21 ? 11 : 1;
      }
      value = Number(value);
      if (value === 1 && playerHand[i][1] === "0") {
        value = 10;
      }
      playerScore += value;
    }
    for (let i = 0; i < dealerHand.length; i++) {
      let value = dealerHand[i][0];
      if (value === "K" || value === "Q" || value === "J") {
        value = 10;
      } else if (value === "A") {
        value = dealerScore + 11 <= 21 ? 11 : 1;
      }
      value = Number(value);
      if (value === 1 && dealerHand[i][1] === "0") {
        value = 10;
      }
      dealerScore += value;
    }
  }

  function scoreHand() {
    let playerBlackjack = isBlackjack(playerHand);
    let dealerBlackjack = isBlackjack(dealerHand);

    if ((playerScore > 21 && dealerScore > 21) || dealerScore == playerScore) {
      win = "tie";
    } else if (playerScore > 21 || (dealerBlackjack && !playerBlackjack)) {
      win = "dealer";
    } else if (dealerScore > 21 || (playerBlackjack && !dealerBlackjack)) {
      win = "player";
    } else if (playerScore < dealerScore) {
      win = "dealer";
    } else if (playerScore > dealerScore) {
      win = "player";
    }

    if (win === "player") {
      chips.set($chips + bet);
    }
    if (win === "dealer") {
      chips.set($chips - bet);
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

  function resetTable() {
    if (bet > $chips) {
      bet = $chips;
    }
    playerHand = [...[]];
    dealerHand = [...[]];
    playerScore = 0;
    dealerScore = 0;
    dealerTurn = false;
    gameOver = undefined;
    win = undefined;
  }

  function handleChange(e: Event) {
    let t = e.target as HTMLInputElement;
    const value = Number(t.value);
    if (!Number.isNaN(value)) {
      if (value > $chips || value < 0) {
        bet = previous;
      } else {
        bet = value;
      }
    }
  }
</script>

<div class="min-h-[75%] flex justify-center items-center">
  {#if stage === "betting"}
    <button
      on:click={() => {
        gameOver = false;
        stage = "intro";
        resetTable();
      }}
      class="btn mr-2 btn-primary">Back</button
    >
    <br />
  {/if}
  <div class="w-full max-w-lg bg-secondary shadow-lg rounded-lg p-5">
    <h1 class="text-center text-xl font-bold">Blackjack</h1>
    <hr />
    <div class="flex justify-between items-center">
      <p>Chips: {$chips}</p>
      <button
        class="btn btn-primary m-2"
        on:click={() => {
          updateDB("testAddress", $chips);
        }}>Cash Out</button
      >
    </div>
    {#if stage === "intro"}
      <button
        class="btn btn-primary"
        on:click={() => {
          startGame();
          gameOver = false;
        }}>Play for Fun</button
      >
      <button
        class="btn btn-primary"
        on:click={() => {
          startGame();
          gameOver = false;
        }}>Play for Crypto</button
      >
    {/if}
    {#if gameOver === false}
      <div class="flex justify-between items-center">
        <p>
          Bet:
          {#if stage === "playing"}
            {bet}
          {:else}
            <button
              class="btn-xs btn-circle mt-1 btn-primary"
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
              class="btn-xs btn-circle mt-1 btn-primary"
              on:click={() => {
                if (bet < $chips) {
                  bet = Number(bet) + 1;
                }
              }}>+</button
            >
          {/if}
        </p>
      </div>
      <hr />
      {#if stage === "betting"}
        <br />
        <button
          class="btn btn-primary"
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
        <div class="flex justify-between items-center">
          <p>Dealer score: {dealerScore}</p>
          <p>Your score: {playerScore}</p>
        </div>
        <hr />
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            {#each dealerHand as card}
              <img
                alt=""
                class="h-16 w-12"
                src={"src/assets/img/cards/" + card + ".svg"}
              />
            {/each}
          </div>
          <div class="flex items-center">
            {#each playerHand as card}
              <img
                alt=""
                class="h-16 w-12"
                src={"src/assets/img/cards/" + card + ".svg"}
              />
            {/each}
          </div>
        </div>
        <hr />
        <div class="flex justify-between items-center">
          <button
            class="btn btn-primary"
            disabled={dealerTurn}
            on:click={() => {
              draw(0);
              if (playerScore >= 21) {
                dealerPlay();
              }
            }}>hit me</button
          >
          <button
            class="btn btn-primary"
            disabled={dealerTurn}
            on:click={() => {
              dealerPlay();
            }}>stand</button
          >
        </div>
      {/if}
      {#if win === "player"}
        <p>You win {bet} tokens!</p>
      {/if}
      {#if win === "dealer"}
        <p>You lose {bet} tokens!</p>
      {/if}
      {#if win === "tie"}
        <p>You tied!</p>
      {/if}
      {#if win}
        <button
          class="btn btn-primary"
          on:click={() => {
            if ($chips === 0) {
              alert("No chips to bet!");
              return 0;
            }
            resetTable();
            gameOver = false;
            startGame();
          }}>new game</button
        >
      {/if}
    {/if}
  </div>
</div>
