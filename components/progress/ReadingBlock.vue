<template>
  <div
    :class="[
      'progressReadingBlock',
      {
        progressReadingBlock_wide: place === 'home',
      },
    ]"
  >
    <h2
      :class="[
        'progressReadingBlock__title',
        {
          progressReadingBlock__title_wide: place === 'home',
        },
      ]"
    >
      {{ title }}
    </h2>

    <ul v-if="readingBooks.length" class="progressReadingBlock__list">
      <li v-for="book in readingBooks" :key="book.id">
        <NuxtLink
          :to="`/library/${book.id}`"
          :class="[
            'progressReadingBlock__bookBlock',
            {
              progressReadingBlock__bookBlock_wide: place === 'home',
            },
          ]"
        >
          <BookImage
            v-if="place === 'home'"
            :place="place"
            :image="book.image"
            :title="book.name"
          />

          <div
            :class="[
              'progressReadingBlock__details',
              {
                progressReadingBlock__details_wide: place === 'home',
              },
            ]"
          >
            <div>
              <p
                :class="[
                  'progressReadingBlock__detailsTitle',
                  {
                    progressReadingBlock__detailsTitle_wide: place === 'home',
                  },
                ]"
              >
                {{ book.name }}
              </p>
              <p
                :class="[
                  'progressReadingBlock__detailsAuthor',
                  {
                    progressReadingBlock__detailsAuthor_wide: place === 'home',
                  },
                ]"
              >
                {{ book.author }}
              </p>
            </div>

            <ProgressBarDetails :progress="book.progress" />
          </div>
        </NuxtLink>
      </li>
    </ul>

    <div v-else class="no-info">
      На данный момент вы не читаете ни одной книги.
    </div>
  </div>
</template>

<script setup>
const bookStore = useBookStore();

const { title } = defineProps(["place", "title"]);

const readingBooks = computed(() =>
  bookStore.books.filter((item) => item.progress > 0 && item.progress < 100)
);
</script>

<style lang="scss" scoped>
.progressReadingBlock {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  &_wide {
    gap: 16px;
  }

  &__title {
    font-family: "Inter-Medium", sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: var(--text-color-primary);

    &_wide {
      font-family: "Inter-SemiBold", sans-serif;
      font-size: 19px;
      line-height: 28px;
    }
  }

  &__bookBlock {
    display: flex;
    gap: 24px;
    width: 100%;
    background: var(--white-primary);
    border-radius: var(--border-radius-l);
    box-shadow: var(--shadow-thirdly);
    padding: 12px;
    transition: 0.2s ease;

    &:hover {
      background: var(--green-primary);
      box-shadow: var(--shadow-secondary);
    }

    &_wide {
      box-shadow: var(--shadow-fourthly);
      backdrop-filter: blur(8px);
      padding: 24px;

      @media (max-width: 767px) {
        padding: 20px 10px;
      }
    }

    @media (max-width: 767px) {
      gap: 12px;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    &_wide {
      gap: 12px;
    }
  }

  &__detailsTitle {
    font-family: "Inter-Medium", sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-color-primary);

    &_wide {
      font-size: 17px;
      line-height: 28px;
    }
  }

  &__detailsAuthor {
    font-family: "Inter-Regular", sans-serif;
    font-size: 12px;
    line-height: 16px;
    color: var(--text-color-secondary);

    &_wide {
      font-size: 16px;
      line-height: 24px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
