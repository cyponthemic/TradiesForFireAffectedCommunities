<template>
  <div>
    <div
      class="w-full min-h-screen relative bg-red-500 flex items-center justify-center flex-col p-6"
    >
      <Logo class="w-full max-w-sm fill-current text-white"></Logo>

      <div class="py-16 text-center text-white">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScKuXaNHLkaWmfx8VL0I3ZkOdc8LtvBfCe1r-21RmhGzBlnMQ/viewform"
          target="_blank"
        >
          <ButtonPrimary>Offer Help</ButtonPrimary>
        </a>
        <ButtonPrimary class="opacity-50 pointer-events-none"
          >Need Help
        </ButtonPrimary>
        <small class="block mt-3">Need Help form coming soon</small>
      </div>
    </div>
    <div class="container p-6 mx-auto">
      <div class="max-w-sm mx-auto text-center">
        <h2 class="text-4xl my-6 font-bold">About us</h2>
        <p>
          The devastating fires we’ve seen for the last 5 months are
          unprecedented, and unparalleled. However, community spirit,
          selflessness and the willingness to go out of your way to help
          complete strangers is by far, the shining light that comes out of the
          ashes. As tradies we are forever helping mates, and this is no
          different. So if you’d like to get your hands dirty and help out the
          community, please register your input above. And if you’re a bushfire
          victim looking for help, please do the same and we will put you in
          contact with the right people. Keep up the great work!
        </p>
        <h2 class="text-4xl my-6 font-bold">Get in touch</h2>
        <div class="flex justify-center pb-16">
          <a
            href="https://www.facebook.com/groups/2524572697856866"
            target="_blank"
          >
            <IconFacebook class="w-8 h-8 mx-4"></IconFacebook>
          </a>
          <a href="mailto:tradies4fac@gmail.com" target="_blank">
            <IconMail class="w-8 h-8 mx-4"></IconMail>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconFacebook from '../components/IconFacebook'
import IconMail from '../components/IconMail'
import Logo from '~/components/Logo.vue'
import ButtonPrimary from '~/components/ButtonInvert.vue'

export default {
  components: {
    Logo,
    ButtonPrimary,
    IconFacebook,
    IconMail
  }
}
</script>
