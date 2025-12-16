<template>
  <div class="infoBlock">
    <div class="infoBlock__titleBox">
      <h1 class="infoBlock__title">Проект Book Drizzle</h1>
      <span class="infoBlock__subtitle">персональный трекер чтения книг</span>
      <a
        href="https://book-drizzle.vercel.app/"
        class="infoBlock__linkOut"
        target="_blank"
        >https://book-drizzle.vercel.app/</a
      >
    </div>
    <img
      src="/images/img-book-drizzle-promo.webp"
      alt="Проект Book Drizzle"
      class="infoBlock__image"
    />
    <section>
      <h2 class="infoBlock__sectionTitle">В основном</h2>
      <div class="infoBlock__textBlock infoBlock__text">
        <div>-</div>
        <p>
          Приложение написано на фреймворке Nuxt (SSR, Composition API,
          Setup-синтаксис).
        </p>
        <div>-</div>
        <p>Адаптировано и применяет препроцессор стилей SCSS.</p>
        <div>-</div>
        <p>Стили прописаны согласно методологии БЭМ.</p>
        <div>-</div>
        <p>
          Дизайн проекта взят из макета Figma для ПК
          <a
            href="https://www.figma.com/design/OcmK7YNnqsKPQPD8OV1WYQ/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%BF%D1%80%D0%BE%D1%87%D0%B8%D1%82%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-%D0%BA%D0%BD%D0%B8%D0%B3?node-id=0-1&p=f&t=PSnFn8n6JbCibIZl-0"
            class="infoBlock__linkOut"
            target="_blank"
            >здесь</a
          >. Адаптивность дорабатывалась самостоятельно.
        </p>
        <div>-</div>
        <p>
          SEO оптимизация не делалась, т.к. приложение пользовательское и не
          подразумевает какую либо интернет раскрутку.
        </p>
      </div>
    </section>

    <section>
      <h2 class="infoBlock__sectionTitle">
        Авторизация / Аутентификация / Сессии
      </h2>
      <div class="infoBlock__textBlock infoBlock__text">
        <div>-</div>
        <p>
          Любой пользователь может зарегистрироваться в приложении и далее в нём
          логинится.
        </p>
        <div>-</div>
        <p>
          При регистрации, в удаленной БД создается пользователь. Пароль
          хешируется. Сверяется почта пользователя введённая в инпут с почтами
          имеющимися в БД и если таковая уже имеется, то пользователю в
          регистрации отказывается.
        </p>
        <div>-</div>
        <p>
          При логине, бекенд приложения проверяет в БД наличие пользователя с
          такой почтой и сравнивает введенный в инпут пароль с имеющимся
          хешированным паролем пользователя в БД.
        </p>
        <div>-</div>
        <p>
          Во время логина, для пользователя генерируются два Jwt токена Access и
          Refresh. Оба токена записываются в куки, а рефреш токен ещё и
          добавляется в БД, в объект самого пользователя. Токены имеют защиту
          httpOnly, secure, sameSite. Жизнь токенов: Access - 1 мин, Refresh -
          30мин.
        </p>
        <div>-</div>
        <p>
          По окончании жизни Access токена, он в фоновом режиме обновляется
          бекендом и снова прописывается в куки. По окончании жизни Refresh
          токена, происходит разлогин. Пользователь должен снова залогинится и
          получить новую пару ключей.
        </p>
        <div>-</div>
        <p>
          При перезагрузке страницы создаётся сессия. Считывается в куках
          Refresh токен и далее Nitro по нему находит нужного пользователя в БД
          и хранит его в Pinia. Также в сессию пользователя загружаются все
          книги, если таковые имеются и далее они тоже хранятся в Pinia.
        </p>
      </div>
    </section>

    <section>
      <h2 class="infoBlock__sectionTitle">Работа с книгами</h2>
      <div class="infoBlock__textBlock infoBlock__text">
        <div>-</div>
        <p>Каждому пользователю показываются только его книги.</p>
        <div>-</div>
        <p>
          На своей личной страничке пользователь может добавлять, редактировать
          и удалять книги. Устанавливать рейтинг книги, писать заметку к ней
          (отзыв), указывать прогресс по чтению. Многие показатели книги,
          отображаются на других страницах приложения.
        </p>
        <div>-</div>
        <p>
          Также пользователь может установить годовую цель по количеству книг.
          Это можно сделать на странице добавления книги, внизу. И далее
          приложение отображает статус книг (запланированные, в процессе чтения,
          прочитанные), высчитывает и отрисовывает общий прогресс чтения за год.
          Отображается на главной странице и в сайдбаре.
        </p>
      </div>
    </section>

    <section>
      <h2 class="infoBlock__sectionTitle">Формы / Инпуты</h2>
      <div class="infoBlock__textBlock infoBlock__text">
        <div>-</div>
        <p>Все поля инпутов валидируются сторонней библиотекой Vuelidate.</p>
        <div>-</div>
        <p>
          Реализован способ добавления обложки книги с помощью Drag and Drop.
        </p>
      </div>
    </section>

    <section>
      <h2 class="infoBlock__sectionTitle">
        Бекенд / База данных / Хранилище / ORM
      </h2>
      <div class="infoBlock__textBlock infoBlock__text">
        <div>-</div>
        <p>Весь бекенд написан на сущности Nuxt Nitro.</p>
        <div>-</div>
        <p>
          База данных PostgreSQL развёрнута на облачном сервере Reg.ru и
          запущена в докер контейнере.
        </p>
        <div>-</div>
        <p>Связь бекенда с БД осуществляет Drizzle ORM.</p>
        <div>-</div>
        <p>
          Объектное хранилище S3, в которое загружаются картинки обложек книг,
          тоже находится на облачном сервере Reg.ru
        </p>
        <div>-</div>
        <p>Связь бекенда с S3 осуществляется с помощью AWS SDK.</p>
      </div>
    </section>

    <section>
      <h2 class="infoBlock__sectionTitle">Тестовый пользователь</h2>
      <div class="infoBlock__textBlock infoBlock__text">
        <div>-</div>
        <p>почта: alexander@mail.ru</p>
        <div>-</div>
        <p>пароль: 123456</p>
      </div>
    </section>

    <section>
      <h2 class="infoBlock__sectionTitle">Автор проекта / GitHub</h2>
      <div class="infoBlock__textBlock infoBlock__text">
        <div>-</div>
        <p>Александр Моругин</p>
        <div>-</div>
        <a
          href="https://github.com/AlexanderMorugin/book-drizzle"
          class="infoBlock__linkOut"
          target="_blank"
          >https://github.com/...</a
        >
        <div>-</div>
        <p>декабрь 2025</p>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.infoBlock {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 1152px;

  &__image {
    width: 100%;
  }

  &__titleBox {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__title {
    font-family: "Inter-SemiBold", sans-serif;
    font-size: 28px;
    line-height: 36px;
    color: var(--text-color-fourthly);
  }

  &__sectionTitle {
    font-family: "Inter-SemiBold", sans-serif;
    font-size: 24px;
    line-height: 52px;
    color: var(--text-color-primary);
  }

  &__subtitle {
    font-family: "Inter-Medium", sans-serif;
    font-size: 17px;
    line-height: 29px;
    color: var(--text-color-primary);
  }

  &__textBlock {
    display: grid;
    grid-template-columns: 20px 1fr;
    row-gap: 18px;
  }

  &__text {
    font-family: "Inter-Regular", sans-serif;
    font-size: 17px;
    line-height: 29px;
    color: var(--text-color-thirdly);
  }

  &__linkOut {
    font-family: "Inter-Regular", sans-serif;
    font-size: 17px;
    line-height: 29px;
    color: var(--blue-primary);
    transition: 0.25s ease;

    &:hover {
      color: var(--red-primary);
    }
  }
}
</style>
