<script lang="ts">
  import { ethers } from "ethers";
  let account: any = undefined;
  async function connectWallet() {
    isMetamaskConnected();
    let provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    account = (await signer).getAddress();
    account.then(function (value: any) {
      console.log(value);
    });
  }
  var isMetamaskConnected = async () => {
    let connected = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (connected) {
      account = connected[0];
    } else {
      account = undefined;
    }
  };
  let clear: any;
  $: {
    clearInterval(clear);
    clear = setInterval(isMetamaskConnected, 2000);
  }
  $: activeStyle = account
    ? "btn-circle ghost ring-1 ring-green-200 h-12 w-12"
    : "btn-circle ghost ring-1 transition duration-300 ease-in-out opacity-50 hover:opacity-100 ring-red-500 h-12 w-12";
</script>

<div class="relative">
  <div class="absolute bottom-[-1.85rem] right-[2rem]">
    <button
      on:click={() => {
        connectWallet();
      }}
      class={activeStyle}
      ><img
        class="p-1 z-100 transition duration-300 ease-in-out hover:scale-[125%]"
        src="src/assets/img/MetaMask_Fox.png"
        alt=""
      /></button
    >
  </div>
</div>
