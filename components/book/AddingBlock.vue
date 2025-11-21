<template>
  <div class="bookAddingBlock">
    <LogoBlock place="addBook" />
    <FormAddBook place="addBook" />
  </div>
</template>

<style lang="scss" scoped>
.bookAddingBlock {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  width: 100%;
  background: var(--white-thirdly);
  border-radius: var(--border-radius-l);
  box-shadow: var(--shadow-secondary);
  backdrop-filter: blur(8px);
  padding: 32px;

  @media (max-width: 1023px) {
    gap: 32px;
  }

  @media (max-width: 474px) {
    padding: 40px 10px 20px 10px;
  }
}
</style>
