каменщики проект стажировки next/Page Router
## https://code-style.it-incubator.io/react/format
стилистика - styles.module.scss
## https://9art.ru/ развернул проект через Kubernetes (со входом через гугл, проблемы только через 9art.ru, почему то redirect на localHost. В дев разработке проблем нет, и через тестовый vercel хостинг, тоже нет проблем, перепробовал все, возможно проблема с хостингом 9art)
## https://it-incubator.atlassian.net/wiki/spaces/STUD/pages/353009665/git+flow
основная ветка development от неё делайте ветки, и мержите в неё, или создавайте pull request сами и просите команду посмотреть ваш комит. В зависимости от проделанной работы, буду деплоить в продакшен через ветку main. Делайте больше комитов, тестируйте, пробуйте, совершайте ошибки при работе с git, это поможет команде и вам избежать этих ошибок когда устроитесь на работу.
## https://youtu.be/c3JGBdxfYcU?t=1618  FSD архитектура(инфо) время от времени, буду делать информационный файл внутри проекта по FSD архитектуре и наших ошибках.
1)основную папку pages занес за пределы папки src для удобства отображения иерархии папок в src(по FSD)
##
2)подписал иеархию папок по нумерации(папка 4_features основная, где будет больше всего модульных папок) public папка, пример
##
3) RTK подключен. Можете пробовать тестировать. Registery_Login_User папка из features, есть пример в папке api регистрации на наш сервер
##
4) креденшел регистрацию нашего сервера  сделал, но не прорабатывал логику(вход, уведомление и т.д.) Тестово сделал авторизацию через nextAuth(google) для мокевого отображения UI
##
5) UI kit Chakra UI. Установлен в проекте.  Используйте при желание.
## https://chakra-ui.com/getting-started/nextjs-pages-guide
Если видите ошибки в коде, то исправляйте и создавайте комиты. То что есть на 5 февраля, сделано в спешке, просто для отображения и понимания, и много где наговнокодил
##
npm install
##
npm run dev
##
npm run lint npm run format, для форматирования кода, если не получается в вашей IDE настроить автоматическое исправление
