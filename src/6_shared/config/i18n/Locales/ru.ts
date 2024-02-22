export const ru = {
  confrirm_Password: {
    confirmed: 'Ваш Email подтверждён',
    congratulations: 'Поздравляем!',
  },
  navBar: {
    create: 'Создать',
    favorites: 'Избранное',
    home: 'Главная',
    messenger: 'Мессенджер',
    myProfile: 'Мой профиль',
    search: 'Поиск',
    statistics: 'Статистика',
  },
  passwordRecovery: {
    backToSignIn: 'Назад',
    createNewPassword: 'Создать Пароль',
    instructions: 'Введите свой email адрес и мы отправим Вам ссылку для восстановления пароля',
    passwordRecovery: 'Восстановление Пароля',
    resendEmailInstructions:
      'Похоже, что время перехода по ссылке истекло. Не волнуйтесь, мы можем отправить Вам новую ссылку',
    resendLink: 'Отправить Еще Раз',
    resetPassword: 'Создание Нового Пароля',
    sendLink: 'Отправить',
  },
  signIn_SignUp: {
    dontHaveAccount: 'Нет аккаунта?',
    forgotPassword: 'Забыли пароль?',
    haveAccount: 'Уже есть аккаунт?',
    logout: 'Выход',
    passwordRequirements:
      'Пароль должен содержать как минимум одну заглавную букву, одну строчную букву, одну цифру, один специальный символ и быть длиной от 6 до 20 символов',
    signIn: 'Войти',
    signUp: 'Регистрация',
    singOut: 'Выход',
  },
}

export type LocaleType = typeof ru
// !т.к. везде будут переменные, а в середине текста должно быть имя например красным цветом или цитата в тексте должна быть курсивом, то испольуем Trans компоненту, и уже сами выбераем стиль текста (добавля стили на теги например)
// Test: {
//     description:
//       'человек с именем <1>имя</1>с таким email <2>емеил</2> использует столько чего то там <3>...</3>',
//   }

//в рабочей компоненте импортируем Trans и указываем <Trans
// text={t.Test.description}
// tags={{
//   1: () => <b>{.name}</b>,
//   2: () => <b>{.species}</b>,
//   3: () => <b>{thing}</b>
// }}
// />
// В проекте возомжно даже не понадобиться, а достаточно будет обычного использования хука useTransition

//! Plural form. Плюральные (множественные) формы
// формы которые нужны для работы с окончанием слов, в зависимости от языка, окончаний бывает где то 1, где то 3, а гдето и 5 и больше
// изучить можно и позже, в проекте возможно и не нужно
