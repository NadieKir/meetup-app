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
    createNews: 'Создать новость',
    createMeetup: 'Создать митап',
    editNews: 'Редактировать новость',
    editMeetup: 'Редактировать митап',
    suggestTopic: 'Предложить тему',

    /* Buttons */
    signInButton: 'Войти',
    signInAsGuestButton: 'Войти как гость',
    logOutButton: 'Выйти',
    createButton: 'Создать',
    createTopicButton: '+ Создать тему',
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
    tryAgainButton: 'Попробовать ещё раз',
    saveButton: 'Сохранить',

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

    /* Create News Form */
    titleLabel: 'Заголовок',
    contentLabel: 'Содержание',
    imageLabel: 'Изображение',
    titleMinError: 'Заголовок должен содержать минимум 3 символа',
    titleMaxError: 'Заголовок не может содержать более 100 символов',
    titleRequiredError: 'Введите заголовок',
    contentRequiredError: 'Введите содержание',

    /* Create Topic Form */
    subjectLabel: 'Тема',
    excerptLabel: 'Описание',
    subjectMinError: 'Тема должна содержать минимум 3 символа',
    subjectMaxError: 'Тема не может содержать более 100 символов',
    subjectRequiredError: 'Введите тему',
    excerptRequiredError: 'Введите описание',

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

    /* Error page */
    somethingIsWrong: 'Что-то пошло не так',

    /* Loader */
    loading: 'Загрузка...',

    /* Multiselect */
    noResults: 'Ничего не найдено',
  },

  [Locale.ENGLISH]: {
    /* Titles */
    meetups: `Meetups`,
    news: 'News',
    login: 'Sign In',
    topicView: 'View Topic',
    meetupView: 'View Meetup',
    newsView: 'View News',
    createNews: 'Create News',
    createMeetup: 'Create Meetup',
    editNews: 'Edit News',
    editMeetup: 'Edit Meetup',
    suggestTopic: 'Suggest Topic',

    /* Buttons */
    signInButton: 'Sign In',
    signInAsGuestButton: 'Sign In As Guest',
    logOutButton: 'Log Out',
    createButton: 'Create',
    createTopicButton: '+ Create topic',
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
    tryAgainButton: 'Try Again',
    saveButton: 'Save',

    /* Alts */
    logoAlt: 'Logo',
    loginAlt: 'Log In',
    meetupPhotoAlt: 'Meetup photo',
    dateAlt: 'Date',
    timeAlt: 'Time',
    locationAlt: 'Location',
    newsPhotoAlt: 'News photo',

    /* Sign In Form */
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

    /* Create News Form */
    titleLabel: 'Title',
    contentLabel: 'Content',
    imageLabel: 'Image',
    titleMinError: 'Title must have at least 3 symbols',
    titleMaxError: 'Title can\'t have more than 100 symbols',
    titleRequiredError: 'Enter title',
    contentRequiredError: 'Enter content',

    /* Create Topic Form */
    subjectLabel: 'Subject',
    excerptLabel: 'Excerpt',
    subjectMinError: 'Subject must have at least 3 symbols',
    subjectMaxError: 'Subject can\'t have more than 100 symbols',
    subjectRequiredError: 'Enter subject',
    excerptRequiredError: 'Enter excerpt',

    /* Tabs */
    topics: 'Topics',
    onModeration: 'On moderation',
    upcoming: 'Upcoming',
    finished: 'Finished',

    /* Meetup */
    name: 'Name',
    supportUsers: '{votesCount, plural, one {# supports} other {# support}}',
    support: 'Support',
    enrolled: 'Enrolled',
    timeAndLocation: 'Time and location',
    author: 'Author',
    speaker: 'Speaker',
    description: 'Description',

    /* 404 */
    pageNotFound: 'The requested page was not found',

    /* Error page */
    somethingIsWrong: 'Something went wrong',

    /* Loader */
    loading: 'Loading...',

    /* Multiselect */
    noResults: 'No results',

    /* Meetup page */
    topicsCounter: ' {adjective} {cardsAmount, plural, one {topic} other {topics}}',
    meetupsCounter: ' {adjective} {cardsAmount, plural, one {meetup} other {meetups}}',
    suggestedAdj: 'suggested',
    onModerationAdj: 'on moderation',
    upcomingAdj: 'upcoming',
    publishedAdj: 'published',
  },
}