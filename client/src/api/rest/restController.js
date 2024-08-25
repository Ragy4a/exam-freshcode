import http from '../interceptor';

// Для аутентификации
export const registerRequest = data => http.post('registration', data);
export const loginRequest = data => http.post('login', data);

// Для пользователей
export const getUser = () => http.get('getUser');
export const updateUser = data => http.post('updateUser', data);

// Для конкурсов
export const updateContest = data => http.post('updateContest', data);
export const dataForContest = data => http.post('dataForContest', data);
export const getCustomersContests = ({ limit, offset, contestStatus }) =>
  http.post('getCustomersContests', { limit, offset }, {
    headers: {
      status: contestStatus,
    },
  });
export const getActiveContests = ({ offset, limit, typeIndex, contestId, industry, awardSort, ownEntries }) =>
  http.post('getAllContests', { offset, limit, typeIndex, contestId, industry, awardSort, ownEntries });
export const getContestById = ({ contestId }) =>
  http.get('getContestById', {
    headers: {
      contestId,
    },
  });

// Для предложений
export const setNewOffer = data => http.post('setNewOffer', data);
export const setOfferStatus = data => http.post('setOfferStatus', data);

// Для файлов
export const downloadContestFile = ({ fileName }) =>
  http.get(`downloadFile/${fileName}`);

// Для платежных операций
export const payMent = ({ formData }) => http.post('pay', formData);
export const cashOut = data => http.post('cashout', data);

// Для чатов
export const getPreviewChat = () => http.post('getPreview');
export const getDialog = data => http.post('getChat', data);
export const newMessage = data => http.post('newMessage', data);
export const changeChatFavorite = data => http.post('favorite', data);
export const changeChatBlock = data => http.post('blackList', data);

// Для каталогов
export const getCatalogList = data => http.post('getCatalogs', data);
export const addChatToCatalog = data => http.post('addNewChatToCatalog', data);
export const createCatalog = data => http.post('createCatalog', data);
export const deleteCatalog = data => http.post('deleteCatalog', data);
export const removeChatFromCatalog = data =>
  http.post('removeChatFromCatalog', data);
export const changeCatalogName = data => http.post('updateNameCatalog', data);

// Для оценок
export const changeMark = data => http.post('changeMark', data);