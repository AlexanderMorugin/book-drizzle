<template>
  <SideBarContainer padding="slim" line="bottom">
    <div class="sideBarAuth">
      <div class="sideBarAuth__profile">
        <div class="sideBarAuth__userIconBox">
          <IconProfile class="profileIcon" />
        </div>
        <div v-if="userStore.user" class="sideBarAuth__userNameBox">
          <span class="sideBarAuth__name">{{ userStore.user.name }}</span>
          <span class="sideBarAuth__email">{{ userStore.user.email }}</span>
        </div>
      </div>
      <ButtonIconNavigate name="logout" @handleClick="handleLogout" />
    </div>
  </SideBarContainer>
</template>

<script setup>
const userStore = useUserStore();

const handleLogout = async () => {
  // Удаляем куки
  await $fetch("/api/auth/logout", {
    method: "POST",
  });

  // Очищаем пользователя в сторе
  userStore.logoutCurrentUser();
  location.reload();
  return navigateTo("/login");
};
</script>

<style lang="scss" scoped>
.sideBarAuth {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  background: var(--gray-primary);
  border-radius: var(--border-radius-l);
  padding: 12px;

  &__profile {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__userIconBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: var(--border-radius-full);
    background: var(--gradient-user-icon-box);
  }

  &__userNameBox {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-family: "Inter-Medium", sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: var(--text-color-primary);
  }

  &__email {
    font-family: "Inter-Regular", sans-serif;
    font-size: 12px;
    line-height: 16px;
    color: var(--text-color-secondary);
  }
}

.profileIcon {
  color: var(--white-primary);
}
</style>
