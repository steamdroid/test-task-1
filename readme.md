# Стартовая сборка Gulp

## О cборке
Сборка Gulp для автоматизации задач вёрстки и фронтенда. Ключевые функции:

- Webpack + esbuild для совместимости современного JavaScript (ES6+) с различными браузерами
- сборка стилей из SCSS
- сжатие картинок с помощью [Sharp](https://sharp.pixelplumbing.com/)
- создание webp-версий изображений
- минификация css и js с созданием карт кода
- .editorconfig и линтеры css/js для приведения кода к единому стилю
- browser-sync для автоматической перезагрузки страниц и "горячей" загрузки обновленных стилей при разработке

## Установка
Сборка заточена под использование [Yarn](https://yarnpkg.com/) и [Visual Studio Code](https://code.visualstudio.com/).

Yarn ощутимо быстрее работает с пакетами, чем npm. Для VS Code есть множество расширений, облегчающих работу с кодом.

Процесс работы:

1. Установить gulp глобально, если он не установлен: `yarn global add gulp-cli`;
2. Для установки необходимых компонентов ввести в директории со сборкой команду `yarn install`;
3. Для корректной работы линтеров и прочих библиотек с VS Code: `yarn dlx @yarnpkg/sdks vscode`;
4. Перед началом работы скопировать содержимое `.env.example` в `.env` и, при необходимости, отредактировать параметры.

## Рекомендуемые дополнения и конфигурация VS Code
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) — поддержка .editorconfig
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) — вывод ошибок линтера ESLint в редакторе и автоматические фиксы
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) — автоматическое форматирование стилей и скриптов
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) — вывод ошибок линтера Stylelint в редакторе и автоматические фиксы
- [typograf](https://marketplace.visualstudio.com/items?itemName=svetlanakost.typograf) — автоматическое типографирование текста в редакторе

Для автоматического исправления SCSS с помощью Stylelint по Alt+Shift+F нужно сделать следующее:
Ctrl+Shift+P — Preferences: Open Keyboard Shortcuts (JSON)

В открывшемся файле keybindings.json добавить следующие настройки:

```
[
    {
        "key": "alt+shift+f",
        "command": "stylelint.executeAutofix",
        "when": "editorTextFocus && editorLangId == 'css'"
    },
    {
        "key": "alt+shift+f",
        "command": "stylelint.executeAutofix",
        "when": "editorTextFocus && editorLangId == 'scss'"
    },
    {
        "key": "alt+shift+f",
        "command": "stylelint.executeAutofix",
        "when": "editorTextFocus && editorLangId == 'less'"
    }
]
```

## Команды сборки

- `yarn dev` — режим разработки с browser-sync и горячей перезагрузкой стилей
- `yarn build` — сборка и минификация проекта в ./assets/static/. Включает все задачи по сборке, **кроме** `favicon` и `deploy`.
- `yarn styles` — сборка и минификация только стилей в ./assets/static/
- `yarn js` — сборка и минификация только js в ./assets/static/
- `yarn images` — сжатие и создание webp-версий изображений в ./assets/static/
- `yarn stylelint` — запуск линтера stylelint с выдачей ошибок в консоли
- `yarn stylelint:fix` — запуск линтера stylelint с автоматическим исправлением тех ошибок, которые возможно исправить автоматически

## Встроенные библиотеки
Все перечисленные библиотеки не нужно скачивать, нужно только импортировать их стили в main.scss и скрипты в main.js

- [normalize.css](https://github.com/necolas/normalize.css/) — сброс стилевых свойств

## Структура каталогов
```
├── .vscode Конфиги для VS Code 
├── assets Собранный проект
│   ├── css Скомпилированные css
│   ├── fonts Шрифты
│   ├── img Изображения
│   ├── js Скомпилированные js
│   └── video Видео для сайта
├── gulp Локальные модули для gulp
└── src Исходные файлы
│   └── fonts Шрифты
│   └── img Изображения
│   └── js js-файлы
│       └── main.js Основной JS-файл
│   └── scss
│       ├── blocks Стили блоков страниц, компоненты здесь могут относительно совпадать с nunjucks-шаблонами в src/blocks/ 
│       ├── components Стили более мелких компонентов вроде кнопок, инпутов и т.п.
│       ├── utils Утилитарные стили: кастомный ресет, шрифты, раскладки блоков, медиазапросы, миксины и переменные
│       ├── _common.scss Общие стили вроде типографики текста и заголовков
│       └── main.scss Основной файл стилей с импортами, в т.ч. установленных через yarn библиотек
│   └── *.html Страницы сайта
└── tasks js-файлы с задачами для Gulp
└── .env.example образец файла конфигурации путей для сборки, минимально необходимо сделать копию с именем `.env`
```
