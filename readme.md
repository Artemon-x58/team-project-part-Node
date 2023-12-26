# Healhy Hub

Healhy Hub - це веб-додаток, який допомагає користувачам вести контроль за своїм харчуванням, споживанням води та змінами ваги. Головна мета проекту полягає в тому, щоб забезпечити користувачів інструментами для контролю своєї рекомендованої ваги.
У проекті передбачено можливість реєстрації користувачів, їх аутентифікації та авторизації.
Додаток дозволяє користувачам стежити за своїми щоденними цілями щодо калорій, води та нутрієнтів, а також вести щоденник їжі.
Окрім того, додаток має дружній та зрозумілий інтерфейс користувача, що дозволяє зручно та швидко виконувати всі необхідні дії. Проект також забезпечує безпеку користувачів за допомогою шифрування паролів та ідентифікації за допомогою токенів.

## Функціональні можливості:

### Реєстрація користувача, з перевірками унікальності інформації та створенням запису

POST /api/auth/signup

### Створення логіна користувача з перевіркою облікових даних та генерацією токену аутентифікації

POST /api/auth/signin

### Оновлення інформації про пароль користувача, з надсиланням нового пароля на ємейл користувача, який він вказав при реєстрації

POST /api/auth/forgot-password

### Прошарок авторизації, що перевірятиме наявність токену та відповідність прав доступу

middlewares/authenticate
GET /api/auth/currentUser

### Виход користувача з системи (логаут)

POST /api/auth/signout

### Отримання інформації про користувача, в т.ч. інформації про розраховану поточну BMR, денну норму води та співвідношення макроелементів до BMR

GET /api/user/current

### Оновлення інформації про користувача або одного з полів контактної інформації з перерахунком BMR/денної норми води/співвідношення макроелементів до BMR, у разі змін даних, що застосовуються у формулах

PUT /api/user/update

### Оновлення цілі користувача і перераховано співвідношення макроелементів до BMR. У тілі запиту передається нова ціль

PUT /api/user/goal

### Додавання інформації про актуальну вагу користувача за поточну дату та перераховано BMR і денну норму води. У тілі запиту передано нове значення ваги.

POST /api/user/weight

