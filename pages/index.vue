<template>
  <div class="bg-primary">
    <div
      class="w-full min-h-screen relative flex items-center justify-center flex-col p-6"
    >
      <Logo
        class=" absolute top-0 left-0 h-16 m-8 w-auto fill-current  text-red-500"
      ></Logo>
      <a
        class="hidden md:block facebook-group absolute top-0 right-0 m-8 h-16 mt-12"
        href="https://www.facebook.com/groups/2524572697856866"
        >Facebook Group</a
      >
      <p class="value-prop md:text-center mt-16 md:mt-0">
        Connecting tradies with fire affected communities.
      </p>
      <div class="py-16 text-center text-white w-full">
        <a
          class="block text-left  mb-6 md:mb-0  md:inline-block"
          href="https://forms.gle/jqmFg32PhMvskEhG8"
          target="_blank"
        >
          <ButtonPrimary>
            <IconNeedHelp
              class="absolute center-abs inline-block fill-current"
              style="width: 47px; height: 39px;"
            ></IconNeedHelp>
            I need help</ButtonPrimary
          >
        </a>
        <a
          class="block text-left md:inline-block"
          href="https://docs.google.com/forms/d/e/1FAIpQLScKuXaNHLkaWmfx8VL0I3ZkOdc8LtvBfCe1r-21RmhGzBlnMQ/viewform"
          target="_blank"
        >
          <ButtonPrimary>
            <IconOfferHelp
              class="absolute center-abs inline-block fill-current"
              style="width: 47px; height: 26px;"
            ></IconOfferHelp>
            I can offer help</ButtonPrimary
          >
        </a>

        <small
          class="absolute bottom-0 left-0 mb-8 block mt-3 text-white mt-24 w-full text-center"
          >This is a temporary site. Complete site coming soon.</small
        >
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import ButtonPrimary from '~/components/ButtonPrimary.vue'
import IconNeedHelp from '~/components/IconNeedHelp.vue'
import IconOfferHelp from '~/components/IconOfferHelp.vue'

export default {
  components: {
    Logo,
    IconNeedHelp,
    IconOfferHelp,
    ButtonPrimary
  }
}
</script>

<style>
.value-prop {
  max-width: 577px;
  font-size: 48px;
  line-height: 58px;
  letter-spacing: 0;
  color: #ffffff;
  opacity: 1;
}

.facebook-group {
  text-align: left;
  text-decoration: underline;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0;
  color: #ffffff;
  opacity: 1;
}

.center-abs {
  transform: translate(0, -50%);
  top: 50%;
  left: 0;
}
</style>
