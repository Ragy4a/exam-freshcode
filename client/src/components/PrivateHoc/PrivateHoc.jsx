import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../../store/slices/userSlice';
import Spinner from '../Spinner/Spinner';

const PrivateHoc = (Component, incomingProps) => {
  function Hoc(props) {
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
      if (!props.data) {
        props.getUser();
      }
    }, []);

    return (
      <>
        {props.isFetching ? (
          <Spinner />
        ) : (
          <Component navigate={navigate} params={params} {...incomingProps} />
        )}
      </>
    );
  }

  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default PrivateHoc;
