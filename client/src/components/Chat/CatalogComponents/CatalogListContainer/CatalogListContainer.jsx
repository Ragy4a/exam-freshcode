import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCatalogList,
  removeChatFromCatalog,
} from '../../../../store/slices/chatSlice';
import CatalogList from '../CatalogList/CatalogList';
import DialogList from '../../DialogComponents/DialogList/DialogList';

const CatalogListContainer = () => {
  const dispatch = useDispatch();
  const chatStore = useSelector((state) => state.chatStore);
  const userStore = useSelector((state) => state.userStore);

  useEffect(() => {
    dispatch(getCatalogList());
  }, [dispatch]);

  const removeChatFromCatalog = (event, chatId) => {
    const { _id } = chatStore.currentCatalog;
    dispatch(removeChatFromCatalog({ chatId, catalogId: _id }));
    event.stopPropagation();
  };

  const getDialogsPreview = () => {
    const { messagesPreview, currentCatalog } = chatStore;
    const { chats } = currentCatalog;
    return messagesPreview.filter((message) =>
      chats.includes(message._id)
    );
  };

  const { catalogList, isShowChatsInCatalog } = chatStore;
  const { id } = userStore.data;

  return (
    <>
      {isShowChatsInCatalog ? (
        <DialogList
          userId={id}
          preview={getDialogsPreview()}
          removeChat={removeChatFromCatalog}
        />
      ) : (
        <CatalogList catalogList={catalogList} />
      )}
    </>
  );
};

export default CatalogListContainer;