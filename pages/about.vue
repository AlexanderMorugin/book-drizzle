<template>
  <div class="about">
    <div class="about__buttonBox">
      <button @click="router.go(-1)" class="about__buttonBack">назад</button>
    </div>

    <InfoBlock />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});

const router = useRouter();
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: 32px;

  &__buttonBox {
    position: sticky;
    top: 10px;
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  &__buttonBack {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    background: var(--gradient-user-icon-box);
    box-shadow: var(--shadow-thirdly);
    border-radius: var(--border-radius-s);
    font-family: "Inter-SemiBold", sans-serif;
    font-size: 14px;
    line-height: 22px;
    color: var(--white-primary);
    padding: 12px 22px;
    transition: 0.35s ease;

    &:hover {
      box-shadow: var(--shadow-secondary);
      animation: shine 10s infinite;
      background-image: -webkit-gradient(
        linear,
        left center,
        right center,
        from var(--violet-thirdly),
        color-stop(0.5, var(--violet-secondary)),
        to var(--violet-thirdly)
      );
      background-image: -webkit-linear-gradient(
        left,
        var(--violet-thirdly) 0%,
        var(--violet-secondary) 50%,
        var(--violet-thirdly) 100%
      );
    }

    @media (max-width: 767px) {
      top: 20px;
      right: 20px;
    }
  }
}
</style>
