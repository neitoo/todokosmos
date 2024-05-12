# React приложение TODO Kosmos
**Для приложения создан обязательный для запуска сервер - [kosmos-server](https://github.com/neitoo/kosmos-server)**

## Инструкция по запуску локально
> Для запуска должен быть установлен Node.js и npm
1. Склонируйте репозиторий
    ```git
    git clone https://github.com/neitoo/todokosmos.git
    ```
    Откройте проект и выполните команду:
    ```powershell
    npm install
    ```
2. Откройте файл ```config.js``` и проверьте, что ссылка к запущенному серверу корректна.
3. Если вы не создавали пользователя, на этом шаге стоит перейти в [репозиторий сервера: 2 пункт в README](https://github.com/neitoo/kosmos-server)
4. Если у вас создан пользователь, выполните команду:
    ```powershell
    npm run start
    ```
    Сайт будет запущен по ссылке ```localhost:3000```
