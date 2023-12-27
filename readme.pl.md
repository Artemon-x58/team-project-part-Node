#HealhyHub

Healhy Hub to aplikacja internetowa, która pomaga użytkownikom śledzić ich dietę, spożycie wody i zmiany wagi. Głównym celem projektu jest zapewnienie użytkownikom narzędzi do kontrolowania zalecanej wagi.
Projekt przewiduje rejestrację użytkowników, uwierzytelnianie i autoryzację.
Aplikacja pozwala użytkownikom śledzić ich dzienne cele w zakresie kalorii, wody i składników odżywczych, a także prowadzić dziennik żywności.
Ponadto aplikacja posiada przyjazny i intuicyjny interfejs użytkownika, który pozwala użytkownikom wygodnie i szybko wykonywać wszystkie niezbędne czynności. Projekt zapewnia również bezpieczeństwo użytkowników poprzez szyfrowanie haseł i identyfikację za pomocą tokenów.

## Cechy:

### Rejestracja użytkownika, z kontrolą unikalności informacji i tworzeniem rekordów.

POST /api/auth/signup.

### Tworzenie loginu użytkownika z weryfikacją poświadczeń i generowaniem tokenu uwierzytelniającego.

POST /api/auth/signin

### Aktualizacja informacji o haśle użytkownika, wysłanie nowego tokena na adres e-mail użytkownika podany podczas rejestracji.

POST /api/auth/forgot-password

### Rejestracja nowego hasła otrzymanego z adresu e-mail użytkownika.

POST /api/auth/create-new-password

### Warstwa autoryzacji, która sprawdza token i prawa dostępu.

middlewares/authenticate
GET /api/auth/currentUser

### Wylogowanie użytkownika (logout).

POST /api/auth/signout

### Pobieranie informacji o użytkowniku, w tym informacji o obliczonym bieżącym BMR, dziennym spożyciu wody i stosunku makroskładników odżywczych do BMR.

GET /api/user/current

### Zastępuje awatar otrzymany przez użytkownika podczas rejestracji własnym.

PATCH /api/user/avatars

### Aktualizacja informacji o użytkowniku lub jednego z pól danych kontaktowych z przeliczeniem BMR/dobowego spożycia wody/stosunku makroskładników odżywczych do BMR w przypadku zmian danych użytych we wzorach.

PUT /api/user/update

### Aktualizuje cel użytkownika i ponownie oblicza stosunek makroskładników do BMR. Nowy cel i stosunek makroskładników do BMR są przekazywane w treści żądania.

PUT /api/user/goal

### Dodaje informacje o aktualnej wadze użytkownika dla bieżącej daty. Treść żądania zawiera nową wagę, dzienne spożycie wody i stosunek makroskładników do BMR.

POST /api/user/weight

### Zapisuje informacje o spożyciu żywności przez użytkownika dla bieżącej daty.

POST /api/user/food-intake

### Pobieranie informacji o spożyciu żywności przez użytkownika w bieżącym dniu.

GET /api/user/food-intake

### Usunięcie informacji o spożyciu odpowiedniego posiłku dla bieżącej daty.

DELETE /api/user/food-intake/

### Aktualizacja informacji o spożyciu żywności dla określonego rekordu według jego identyfikatora (id). Treść żądania zawiera nowe dane, takie jak nazwa posiłku i nazwa produktu, kalorie, węglowodany, białka i tłuszcze.

PUT /api/user/food-intake/:id

### Usuwa informacje o spożyciu żywności dla określonego rekordu według jego identyfikatora (id). W treści żądania przekazywane są nowe zaktualizowane dane, takie jak nazwa pory posiłku, całkowita ilość węglowodanów, białek i tłuszczów dla tej pory posiłku oraz lista spożytych pokarmów.

DELETE /api/user/food-intake/:id

### Zapisuje informacje o spożyciu wody przez użytkownika dla bieżącej daty.

POST /api/user/water-intake

### Usunięcie informacji o spożyciu wody przez użytkownika dla bieżącej daty.

DELETE /api/user/water-intake

### Uzyskanie statystyk spożycia kalorii, wody i wagi użytkownika w wybranym okresie.

GET /api/user/statistics

### Pobierz listę polecanych produktów.

GET /api/recommended-food

### Stos bibliotek używanych w projekcie:

### Node.js - środowisko uruchomieniowe JavaScript na serwerze

### Bcrypt - biblioteka do pracy z hashowanymi hasłami

### Cloudinary - umożliwia integrację aplikacji z Cloudinary

### Cors - służy do włączania CORS z różnymi opcjami

### Cross-env - uruchamia skrypty, które ustawiają i używają zmiennych środowiskowych na różnych platformach

### Dotenv - moduł o zerowej zależności, który ładuje zmienne środowiskowe z pliku .env do process.env

### Express.js - framework do tworzenia aplikacji internetowych w Node.js

### Gravatar - biblioteka do generowania adresów URL gravatar w Node.js

### Jimp - biblioteka do przetwarzania obrazów dla Node

### Joi - język opisu schematu i walidator danych dla JavaScript

### Jsonwebtoken - implementacja tokenów sieciowych JSON

### Jsonwebtoken - implementacja sieciowych tokenów JSON

### Mongoose - biblioteka do pracy z MongoDB w Node.js

### Morgan - do tworzenia funkcji middleware

### Multer - oprogramowanie pośredniczące node.js do przetwarzania danych wieloczęściowych/kształtowych

### Nanoid - generator identyfikatorów łańcuchowych dla JavaScript

### Node-cron - czysty harmonogram zadań JavaScript dla Node.js

### Nodemailer - wysyłanie wiadomości e-mail za pomocą Node.js

### Swagger-ui-express - pozwala serwować automatycznie generowaną dokumentację API swagger-ui z wyrażenia opartego na pliku swagger.json
