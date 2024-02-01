<script lang="ts">
  import { onMount } from "svelte";
  import { storedImageList } from "../../lib/state";
  import Carousel from "svelte-carousel";
  onMount(() => {
    console.log($storedImageList);
  });
</script>

<Carousel
  images={$storedImageList}
  showIndicators
  autoPlay
  loop
  easing="easeInOutCubic"
  transitionDuration={1000}
  visibleSlides={1}
  style="width:100%;"
>
  <div slot="slide" let:active let:slide>
    <img src={slide} style="width: 100%; height: auto;" />
  </div>
</Carousel>
