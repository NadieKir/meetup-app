import { Locale } from "i18n";

export const messages = {
  [Locale.RUSSIAN]: {
    /* Titles */
    meetups: 'Митапы',
    news: 'Новости',
    login: 'Войти',
    topicView: 'Просмотр темы',
    meetupView: 'Просмотр митапа',
    newsView: 'Просмотр новости',

    /* Buttons */
    signInButton: 'Войти',
    signInAsGuestButton: 'Войти как гость',
    logOutButton: 'Выйти',
    createMeetupButton: '+ Создать тему',
    createNewsButton: '+ Создать новость',
    deleteButton: 'Удалить',
    approveTopicButton: 'Одобрить тему',
    supportTopicButton: 'Поддержать тему',
    unsupportTopicButton: 'Отменить голос',
    enrollMeetup: 'Записаться',
    disenrollMeetup: 'Отменить запись',
    publishButton: 'Опубликовать',
    goBackButton: 'Назад',
    editButton: 'Редактировать',
    goMainButton: 'Перейти на главную',

    /* Alts */
    logoAlt: 'Логотип',
    loginAlt: 'Войти',
    meetupPhotoAlt: 'Изображение митапа',
    dateAlt: 'Дата',
    timeAlt: 'Время',
    locationAlt: 'Место',
    newsPhotoAlt: 'Изображение новости',

    /* Sign In Form */
    usernameLabel: 'Имя',
    passwordLabel: 'Пароль',
    usernameMinError: 'Имя должно содержать минимум 2 символа',
    usernameMaxError: 'Имя не может содержать более 30 символов',
    usernameMatchError: 'Имя может состоять из букв, символа "-" и пробела',
    usernameRequiredError: 'Введите имя',
    passwordMinError: 'Пароль должен содержать минимум 6 символов',
    passwordMaxError: 'Пароль не может содержать более 40 символов',
    passwordRequiredError: 'Введите пароль',
    noUserError: 'Данный пользователь не существует',

    /* Tabs */
    topics: 'Темы',
    onModeration: 'На модерации',
    upcoming: 'Будущие',
    finished: 'Прошедшие',

    /* Meetup */
    name: 'Название',
    supportUsers: '{votesCount, plural, one {# поддерживает} other {# поддерживают}}',
    support: 'Поддерживают',    
    enrolled: 'Записаны',
    timeAndLocation: 'Время и место проведения',
    author: 'Автор',
    speaker: 'Спикер',
    description: 'Описание',

    /* 404 */
    pageNotFound: 'Запрашиваемая страница на найдена',

    /* Loader */
    loading: 'Загрузка...',
  },

  [Locale.ENGLISH]: {
    meetups: `Meetups`,
    news: 'News',
    login: 'Sign In',
    topicView: 'View Topic',
    meetupView: 'View Meetup',
    newsView: 'View News',

    signInButton: 'Sign In',
    signInAsGuestButton: 'Sign In As Guest',
    logOutButton: 'Log Out',
    createMeetupButton: '+ Create topic',
    createNewsButton: '+ Create news',
    deleteButton: 'Delete',
    approveTopicButton: 'Approve topic',
    supportTopicButton: 'Support topic',
    unsupportTopicButton: 'Cancel vote',
    enrollMeetup: 'Enroll',
    disenrollMeetup: 'Disenroll',
    publishButton: 'Publish',
    goBackButton: 'Back',
    editButton: 'Edit',
    goMainButton: 'Go Home',

    logoAlt: 'Logo',
    loginAlt: 'Log In',
    meetupPhotoAlt: 'Meetup photo',
    dateAlt: 'Date',
    timeAlt: 'Time',
    locationAlt: 'Location',
    newsPhotoAlt: 'News photo',

    usernameLabel: 'Name',
    passwordLabel: 'Password',
    usernameMinError: 'Name must have at least 2 symbols',
    usernameMaxError: 'Name can\'t have more than 30 symbols',
    usernameMatchError: 'Name must consist of letters, "-" symbol or space',
    usernameRequiredError: 'Enter name',
    passwordMinError: 'Password must have at least 6 symbols',
    passwordMaxError: 'Password can\'t have more than 40 symbols',
    passwordRequiredError: 'Enter password',
    noUserError: 'This user doesn\'t exist',

    topics: 'Topics',
    onModeration: 'On moderation',
    upcoming: 'Upcoming',
    finished: 'Finished',

    name: 'Name',
    supportUsers: '{votesCount, plural, one {# supports} other {# support}}',
    support: 'Support',
    enrolled: 'Enrolled',
    timeAndLocation: 'Time and location',
    author: 'Author',
    speaker: 'Speaker',
    description: 'Description',

    pageNotFound: 'The requested page was not found',

    loading: 'Loading...',

    /* Meetup page */
    topicsCounter: ' {adjective} {cardsAmount, plural, one {topic} other {topics}}',
    meetupsCounter: ' {adjective} {cardsAmount, plural, one {meetup} other {meetups}}',
    suggestedAdj: 'suggested',
    onModerationAdj: 'on moderation',
    upcomingAdj: 'upcoming',
    publishedAdj: 'published',
  },
}