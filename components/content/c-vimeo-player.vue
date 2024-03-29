<template>
  <div
    ref="root"
    class="vimeo"
    :class="{ 'is-ready': ready }"
  >
    <img
      :src="src"
      :srcset="`
        ${src850} 850w,
        ${src550} 550w
      `"
      alt="2 Frauen in einer Praxis gucken gemeinsam auf einen Monitor"
      width="650"
      height="365"
      sizes="(min-width: 1280px) 550px, (min-width: 640px) 850px, 100vw"
    />
    <template v-if="toggleVideo">
      <client-only>
        <vue-vimeo-player
          :video-id="props.videoId"
          :options="options"
          player-width="650"
          player-height="365"
          @ready="onReady"
        >
        </vue-vimeo-player>
      </client-only>
    </template>
  </div>
</template>

<script setup>
/* global useCloudinary */

import { buildImageUrl } from 'cloudinary-build-url';
import { vueVimeoPlayer } from 'vue-vimeo-player';

const props = defineProps({
  videoId: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    default: 'poster.jpg',
  },
});

const ready = ref('false');
const root = ref(null);
const toggleVideo = ref(false);

const options = {
  responsive: true,
};

useIntersectionObserver(root, ([{ isIntersecting }]) => {
  if (!toggleVideo.value) {
    toggleVideo.value = isIntersecting;
  }
});

const onReady = () => {
  ready.value = true;
};

const cloudinary = useCloudinary();

const imageUrl = Object.values(cloudinary.value).reduce((acc, cur) => {
  return acc.concat(`/${cur}`);
});

const resize = { type: 'scale', aspectRatio: '1.618' };

const src = buildImageUrl(`${imageUrl}/${props.poster}`, {
  cloud: {
    cloudName: cloudinary.value.cloudName,
  },
  transformations: {
    resize: {
      ...resize,
      width: 600,
    },
  },
});

const src550 = buildImageUrl(`${imageUrl}/${props.poster}`, {
  cloud: {
    cloudName: cloudinary.value.cloudName,
  },
  transformations: {
    resize: {
      ...resize,
      width: 550,
    },
  },
});

const src850 = buildImageUrl(`${imageUrl}/${props.poster}`, {
  cloud: {
    cloudName: cloudinary.value.cloudName,
  },
  transformations: {
    resize: {
      ...resize,
      width: 850,
    },
  },
});
</script>

<style scoped>
.vimeo {
  aspect-ratio: 1.777 / 1;
  position: relative;
}

.vimeo > img {
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
}
</style>
