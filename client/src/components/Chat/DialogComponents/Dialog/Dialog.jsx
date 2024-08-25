import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import className from 'classnames';
import {
  getDialogMessages,
  clearMessageList,
} from '../../../../store/slices/chatSlice';
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import styles from './Dialog.module.sass';
import ChatInput from '../../ChatComponents/ChatInput/ChatInput';

const Dialog = () => {
  const dispatch = useDispatch();
  const messagesEnd = useRef(null);

  const interlocutor = useSelector((state) => state.chatStore.interlocutor);
  const messages = useSelector((state) => state.chatStore.messages);
  const userId = useSelector((state) => state.userStore.data.id);
  const chatData = useSelector((state) => state.chatStore.chatData);

  useEffect(() => {
    if (interlocutor.id) {
      dispatch(getDialogMessages({ interlocutorId: interlocutor.id }));
      scrollToBottom();
    }

    return () => {
      dispatch(clearMessageList());
    };
  }, [interlocutor.id, dispatch]);

  useEffect(() => {
    if (messagesEnd.current) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  };

  const renderMainDialog = () => {
    const messagesArray = [];
    let currentTime = moment();

    messages.forEach((message, i) => {
      if (!currentTime.isSame(message.createdAt, 'date')) {
        messagesArray.push(
          <div key={message.createdAt} className={styles.date}>
            {moment(message.createdAt).format('MMMM DD, YYYY')}
          </div>
        );
        currentTime = moment(message.createdAt);
      }

      messagesArray.push(
        <div
          key={i}
          className={className(
            userId === message.sender ? styles.ownMessage : styles.message
          )}
        >
          <span>{message.body}</span>
          <span className={styles.messageTime}>
            {moment(message.createdAt).format('HH:mm')}
          </span>
        </div>
      );
    });

    return <div className={styles.messageList}>{messagesArray}</div>;
  };

  const blockMessage = () => {
    const { blackList, participants } = chatData;
    const userIndex = participants.indexOf(userId);
    let message;
    if (chatData && blackList[userIndex]) {
      message = 'You block him';
    } else if (chatData && blackList.includes(true)) {
      message = 'He block you';
    }
    return <span className={styles.messageBlock}>{message}</span>;
  };

  return (
    <>
      <ChatHeader userId={userId} />
      {renderMainDialog()}
      <div ref={messagesEnd} />
      {chatData && chatData.blackList.includes(true) ? (
        blockMessage()
      ) : (
        <ChatInput />
      )}
    </>
  );
};

export default Dialog;