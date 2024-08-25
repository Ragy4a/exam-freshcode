import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { sendMessage } from '../../../../store/slices/chatSlice';
import styles from './ChatInput.module.sass';
import CONSTANTS from '../../../../constants';
import FormInput from '../../../FormInput/FormInput';
import Schems from '../../../../utils/validators/validationSchems';

const ChatInput = () => {
  const dispatch = useDispatch();
  const interlocutor = useSelector((state) => state.chatStore.interlocutor);

  const submitHandler = (values, { resetForm }) => {
    dispatch(
      sendMessage({
        messageBody: values.message,
        recipient: interlocutor.id,
        interlocutor,
      })
    );
    resetForm();
  };

  return (
    <div className={styles.inputContainer}>
      <Formik
        onSubmit={submitHandler}
        initialValues={{ message: '' }}
        validationSchema={Schems.MessageSchema}
      >
        <Form className={styles.form}>
          <FormInput
            name="message"
            type="text"
            label="message"
            classes={{
              container: styles.container,
              input: styles.input,
              notValid: styles.notValid,
            }}
          />
          <button type="submit">
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}send.png`}
              alt="send Message"
            />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChatInput;