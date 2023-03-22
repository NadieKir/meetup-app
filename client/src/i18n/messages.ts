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
    nextButton: 'Далее',

    /* Alts */
    logoAlt: 'Логотип',
    loginAlt: 'Войти',
    meetupPhotoAlt: 'Изображение митапа',
    dateAlt: 'Дата',
    timeAlt: 'Время',
    locationAlt: 'Место',
    newsPhotoAlt: 'Изображение новости',
    closeAlt: 'Закрыть',
    notificationTypeAlt: 'Иконка типа уведомления',
    uploadedImageAlt: 'Загруженное изображение',
    stepCompletedAlt: 'Шаг завершён',

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
    subjectMinError: 'Тема должна содержать минимум 2 символа',
    subjectMaxError: 'Тема не может содержать более 100 символов',
    subjectRequiredError: 'Введите тему',
    excerptRequiredError: 'Введите описание',

    /* Create Meetup Form */
    speakersLabel: 'Спикеры',
    startLabel: 'Дата и время начала',
    finishLabel: 'Время окончания',
    placeLabel: 'Место',
    speakersRequiredError: 'Митап должен иметь хотя бы одного спикера',
    startMinError: 'Дата начала не может быть в прошлом',
    startRequiredError: 'Введите дату и время начала',
    finishMinError: 'Дата окончания должна идти после даты начала',
    finishRequiredError: 'Введите дату и время окончания',
    placeMaxError: 'Место не может содержать более 50 символов',

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
    restSpeakers: '+ ещё {restSpeakers}',

    /* Notifications */
    noUserErrorHeading: 'Данный пользователь не существует',
    noUserErrorDescription: 'Проверьте корректность введённых логина и пароля',
    topicCreated: 'Тема успешно создана',
    meetupCreated: 'Митап успешно создан',
    newsCreated: 'Новость успешно создана',
    changesSaved: 'Изменения сохранены',
    topicDeleted: 'Тема удалена',
    meetupDeleted: 'Митап удалён',
    newsDeleted: 'Новость удалена',
    topicApproved: 'Тема одобрена',
    topicApprovedDesc: 'Теперь вы можете создать на её основе митап, выбрав необходимую тему во вклвдке "На модерации"',

    /* 404 */
    pageNotFound: 'Запрашиваемая страница на найдена',

    /* Error page */
    somethingIsWrong: 'Что-то пошло не так',

    /* Forbidden page */
    forbidden: 'Доступ запрещён',

    /* Loader */
    loading: 'Загрузка...',

    /* Multiselect */
    noResults: 'Ничего не найдено',

    /* Datetime Picker */
    time: 'Время',

    /* ImageUploader */
    fileSize: 'Размер файла',
    fileTypeRule: 'Допустимые типы файлов:',
    fileSizeRule: 'Размер файла превышает',
    bytes: 'байт',

    /* ImageDropbox */
    dropImageHere: 'Перетащите изображения сюда',
    or: 'или',
    browse: 'загрузите',
    allowedFormates: 'Разрешенные форматы',
    maxFileSize: 'Максимальный размер файла',
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
    nextButton: 'Next',

    /* Alts */
    logoAlt: 'Logo',
    loginAlt: 'Log In',
    meetupPhotoAlt: 'Meetup photo',
    dateAlt: 'Date',
    timeAlt: 'Time',
    locationAlt: 'Location',
    newsPhotoAlt: 'News photo',
    closeAlt: 'Close',
    notificationTypeAlt: 'Notification type alt',
    uploadedImageAlt: 'Uploaded image',
    stepCompletedAlt: 'Step completed',

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
    subjectMinError: 'Subject must have at least 2 symbols',
    subjectMaxError: 'Subject can\'t have more than 100 symbols',
    subjectRequiredError: 'Enter subject',
    excerptRequiredError: 'Enter excerpt',

    /* Create Meetup Form */
    speakersLabel: 'Speakers',
    startLabel: 'Start date and time',
    finishLabel: 'End time',
    placeLabel: 'Place',
    speakersRequiredError: 'Meetup must have at least 1 speaker',
    startMinError: 'Start date must be in future',
    startRequiredError: 'Start date is required',
    finishMinError: 'Finish date should go after start date',
    finishRequiredError: 'Finish date is required',
    placeMaxError: 'Place can\'t have more than 50 symbols',

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
    restSpeakers: '+ {restSpeakers} more',

    /* Notifications */
    noUserErrorHeading: 'This user doesn\'t exist',
    noUserErrorDescription: 'Please check login and password spelling',
    topicCreated: 'Topic is successfully created',
    meetupCreated: 'Meetup is successfully created',
    newsCreated: 'News is successfully created',
    changesSaved: 'Changes saved',
    topicDeleted: 'Topic deleted',
    meetupDeleted: 'Meetup deleted',
    newsDeleted: 'News deleted',
    topicApproved: 'Topic approved',
    topicApprovedDesc: 'You can create a meetup based on this topic by choosing it in "On moderation" tab',

    /* 404 */
    pageNotFound: 'The requested page was not found',

    /* Error page */
    somethingIsWrong: 'Something went wrong',

    /* Forbidden page */
    forbidden: 'Access forbidden',

    /* Loader */
    loading: 'Loading...',

    /* Multiselect */
    noResults: 'No results',

    /* Datetime Picker */
    time: 'Time',

    /* ImageUploader */
    fileSize: 'File size',
    fileTypeRule: 'File type must be',
    fileSizeRule: 'File is larger than',
    bytes: 'bytes',

    /* ImageDropbox */
    dropImageHere: 'Drop image here',
    or: 'or',
    browse: 'browse',
    allowedFormates: 'Allowed formates',
    maxFileSize: 'Max file size',

    /* Meetup page */
    topicsCounter: ' {adjective} {cardsAmount, plural, one {topic} other {topics}}',
    meetupsCounter: ' {adjective} {cardsAmount, plural, one {meetup} other {meetups}}',
    suggestedAdj: 'suggested',
    onModerationAdj: 'on moderation',
    upcomingAdj: 'upcoming',
    publishedAdj: 'published',
  },
}