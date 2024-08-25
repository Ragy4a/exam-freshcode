import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import SelectInput from '../../../SelectInput/SelectInput';
import { addChatToCatalog } from '../../../../store/slices/chatSlice';
import styles from './AddToCatalog.module.sass';

const AddToCatalog = ({ addChatId }) => {
  const catalogList = useSelector((state) => state.chatStore.catalogList);
  const dispatch = useDispatch();

  const catalogNames = catalogList.map((catalog) => catalog.catalogName);
  const catalogIds = catalogList.map((catalog) => catalog._id);

  const handleSubmit = (values) => {
    dispatch(addChatToCatalog({ chatId: addChatId, catalogId: values.catalogId }));
  };

  return (
    <>
      {catalogNames.length !== 0 ? (
        <Formik onSubmit={handleSubmit} initialValues={{ catalogId: '' }}>
          <Form className={styles.form}>
            <SelectInput
              name="catalogId"
              header="Name of Catalog"
              classes={{
                inputContainer: styles.selectInputContainer,
                inputHeader: styles.selectHeader,
                selectInput: styles.select,
              }}
              optionsArray={catalogNames}
              valueArray={catalogIds}
            />
            <button type="submit">Add</button>
          </Form>
        </Formik>
      ) : (
        <div className={styles.notFound}>
          You have not created any directories.
        </div>
      )}
    </>
  );
};

export default AddToCatalog;