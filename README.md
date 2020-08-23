# Описание задачи

Основываясь на REST методах открытого сервиса "gorest.co.in" необходимо реализовать:

1 просмотр списков:

> пользователи (фамилия, имя, email)
> посты (id, наименование)

2 просмотр карточек

> пользователь
> пост (+ все комментарии, к запросу списка комментариев добавляется параметр post_id=<post_id> для фильтрации значений)

## Интерфейс

На главной странице должно присутствовать текстовое поле и кнопки выбора просмотра списков объектов.
В текстовое поле вводится значение access-token, который далее будет использоваться при отправке запросов на сервер.

Списки должны поддерживать возможность перелистывание страниц и переход на конкретную страницу.

К карточкам объектов конкретных требований нет. Главное, чтобы все элементы хорошо читались и была возможность возврата к списку объектов.

Задача.
Реализовать SPA с поддержкой IE11. Поддерживаемое разрешение от 1024x768 до FullHD

Задача бонус 1.
Выводить список постов у каждого пользователя.

Задача бонус 2.
Создание и редактирование постов.

Стек технологий: React, Redux, TypeScript.
