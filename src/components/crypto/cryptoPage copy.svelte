<script>
  import { account, mirrorChips, testEth } from "../../lib/state";
  import { ethers } from "ethers";
  import { Web3 } from "web3";

  let waiting = false;

  var faucet = async () => {
    waiting = true;
    let provider = new ethers.BrowserProvider(window.ethereum);
    const privKey = import.meta.env.VITE_FAUCET_PRIVATE_KEY;
    const signer = new ethers.Wallet(privKey, provider);
    const tx = await signer.sendTransaction({
      to: $account,
      value: Web3.utils.toWei(0.01, "ether"),
    });
    provider.waitForTransaction(tx.hash).then((receipt) => {
      waiting = false;
    });
  };

  /**
   * the deposit/withdrawl function works as follows
   * a wallet is generated for the user upon request for deposit
   * their account is tagged to the deposit address in database
   * deposit balance is stored in database as 0
   * every 15 seconds, the site checks the users deposit address
   * if the balance changes, user's chip balance increases by the delta
   * new balance is stored
   * tokens deposited are considered burned. withdrawls mint new tokens
   */
</script>

{#if $account}
  <p>account: {$account}</p>
  <p>test eth: {$testEth}</p>
  <p>mirror chips: {$mirrorChips}</p>
  <br />
  <button
    class="btn"
    disabled={waiting}
    on:click={async () => {
      faucet();
    }}>faucet</button
  >
  <a
    class="btn"
    href="https://app.uniswap.org/swap?inputCurrency=eth&outputCurrency=0xe5a50c2b0a2538838c9ABD8febC17Ee1CdFA3120"
    target="_blank"
  >
    Trade chips
  </a>
{:else}
  <p>please connect wallet</p>
{/if}
