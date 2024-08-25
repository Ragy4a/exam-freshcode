import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateContest,
  clearContestUpdationStore,
} from '../../store/slices/contestUpdationSlice';
import { changeEditContest } from '../../store/slices/contestByIdSlice';
import ContestForm from '../ContestForm/ContestForm';
import styles from './Brief.module.sass';
import ContestInfo from '../Contest/ContestInfo/ContestInfo';
import Error from '../Error/Error';

const Brief = ({ contestData, role, goChat }) => {
  const dispatch = useDispatch();
  const { isEditContest } = useSelector((state) => state.contestByIdStore);
  const contestUpdationStore = useSelector((state) => state.contestUpdationStore);
  const userId = useSelector((state) => state.userStore.data.id);
  const { error } = contestUpdationStore;

  const setNewContestData = (values) => {
    const data = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== 'file' && values[key]) data.append(key, values[key]);
    });
    if (values.file instanceof File) {
      data.append('file', values.file);
    }
    data.append('contestId', contestData.id);
    dispatch(updateContest(data));
  };

  const getContestObjInfo = () => {
    const {
      focusOfWork,
      industry,
      nameVenture,
      styleName,
      targetCustomer,
      title,
      brandStyle,
      typeOfName,
      typeOfTagline,
      originalFileName,
      contestType,
    } = contestData;
    const data = {
      focusOfWork,
      industry,
      nameVenture,
      styleName,
      targetCustomer,
      title,
      brandStyle,
      typeOfName,
      typeOfTagline,
      originalFileName,
      contestType,
    };
    const defaultData = {};
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        if (key === 'originalFileName') {
          defaultData.file = { name: data[key] };
        } else {
          defaultData[key] = data[key];
        }
      }
    });
    return defaultData;
  };

  if (!isEditContest) {
    return (
      <ContestInfo
        userId={userId}
        contestData={contestData}
        changeEditContest={(val) => dispatch(changeEditContest(val))}
        role={role}
        goChat={goChat}
      />
    );
  }

  return (
    <div className={styles.contestForm}>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={() => dispatch(clearContestUpdationStore())}
        />
      )}
      <ContestForm
        contestType={contestData.contestType}
        defaultData={getContestObjInfo()}
        handleSubmit={setNewContestData}
      />
    </div>
  );
};

export default Brief;