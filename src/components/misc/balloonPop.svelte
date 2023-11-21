<script lang="ts">
  const balloon: any = document.getElementById("balloon");

  document.addEventListener("click", (e) => {
    let targetElementId = e.target as HTMLElement;
    if (e.target && targetElementId.id === "pump") {
      const size = getComputedStyle(balloon).getPropertyValue("--size");
      balloon.style.setProperty("--size", parseFloat(size) + 0.2);
    }
  });
</script>

<div class="inset-0 place-content-center">
  <div id="balloon" />
  <div class="stem" />

  <button id="pump">Pump it up!</button>
</div>

<style>
  #balloon {
    --size: 1;
    width: 30vh;
    height: 30vh;
    position: relative;
    border-radius: 100%;
    background: #ffee69;
    transform: scale(var(--size, 1));
    transform-origin: bottom center;
    transition: transform 0.5s cubic-bezier(0.79, 1.66, 0.88, 0.38);
  }

  #balloon::before {
    content: "";
    width: 10%;
    height: 10%;
    background: rgba(255, 255, 255, 0.7);
    position: absolute;
    top: 20%;
    left: 20%;
    border-radius: 100%;
  }

  .stem {
    width: 5vh;
    height: 5vh;
    background: #b8a525;
    clip-path: polygon(20% 0%, 80% 0%, 100% 76%, 0 77%);
    margin-top: -1px;
    margin-bottom: 3vh;
  }
</style>
