<template>
  <div class="info centered">
    <hr />

    <h3 style="color: #444; font-weight: normal">
      In the vast darkness of Eternity, one beacon can light all paths.
    </h3>

    <p>
      <b>Quasar</b> tells the tale of a galaxy erupting into full-scale war,
      where 5 major factions fight to gain control of the titular quasar at the
      galactic core. It is known as <b>the Crucible</b>, and it is a source of
      immesurable power. Those who manage to tame it would be able to achieve
      their every goal, fulfill their every wish. But in order to even reach the
      Crucible, let alone harness its energy, one would have to fight their way
      through a galaxy of warriors, each with their eyes set on the same target.
    </p>

    <h3>STORY ARTICLES</h3>

    <p>
      In addition to the flavor texts on the cards themselves, QSR has dedicated
      story articles. Each article is a single chapter of the story, and should
      ideally be read in order.
    </p>

    <p id="reminder">
      <em>(Click on a story below to go to a PDF of the article)</em>
    </p>

    <splide @splide:mounted="setInitialTitle" @splide:move="updateCurrentTitle" :options="options" class="centered">
      <splide-slide v-for="poster of posters" :key="poster.title">
        <a :href="poster.href" target="_blank"><img :src="poster.image"></a>
      </splide-slide>
    </splide>

    <p style="text-align: center;">{{currentTitle}}</p>

  </div>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
export default {
  name: "Story",
  data() {
    return {
      currentTitle: "",
      posters: [
        {
          title: "Ch. 1: When Good Heists Go Bad",
          image: require("../assets/qsr_poster_1.jpg"),
          href: "https://drive.google.com/file/d/1IdUu8-l0wocK8UistQ74KG2FQL0APsdM/view"
        },
        {
          title: "Ch. 2: Port Haerran",
          image: require("../assets/qsr_poster_2.jpg"),
          href: "https://drive.google.com/file/d/1EqL-LIlSxgsRiF18bD-CMGCtroO__I7o/view?usp=sharing"
        },
        {
          title: "Ch. 3: Crucible",
          image: require("../assets/qsr_poster_3.jpg"),
          href: "https://drive.google.com/file/d/1k0MP_i9dRiHrxP8mtgPF8owhHihyuQ3i/view?usp=sharing"
        },
        {
          title: "Ch. 4: Old Hunter",
          image: require("../assets/qsr_poster_4.jpg"),
          href: "https://drive.google.com/file/d/1P0n_30ed2Fnn9ig-OfS88q6chNOxmNxA/view?usp=sharing"
        },
        {
          title: "Ch. 5: Remembrance",
          image: require("../assets/qsr_poster_5.jpg"),
          href: "https://drive.google.com/file/d/1OeXIBW0h_cZIzn3OBiIthrYr9WmQrDT_/view?usp=sharing"
        },
        {
          title: "(TBA) Ch. 6: Embers",
          image: require("../assets/qsr_poster_6.jpg"),
          href: "#"
        }
      ],
      options: {
        type: 'loop',
        arrows: 'slider',
        perPage: 2,
        perMove: 1,
        padding: '5rem',
        gap: '2rem',
        focus: 'center',
        pagination: false,
        updateOnMove: true,
        width: "90%"
      },
    }
  },
  methods: {
    updateCurrentTitle(splide, newIndex) {
      this.currentTitle = this.posters[newIndex].title
    },
    setInitialTitle(){
      this.currentTitle = this.posters[0].title
    }
  },
  components: {
    Splide,
    SplideSlide
  }
};
</script>

<style scoped>
#reminder {
  text-align: center;
  color: #333;
  font-weight: bold;
  margin-top: 0.5rem;
}

.splide__slide img {
  width: 100%;
  filter: brightness(30%);
}

.splide__slide.is-active img {
  filter: none;
}
</style>