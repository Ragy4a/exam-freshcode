import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../store/slices/userSlice';
import Spinner from '../Spinner/Spinner';

const OnlyNotAuthorizedUserHoc = (Component) => {
  function HocForLoginSignUp(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.checkAuth(navigate);
    }, []);

    if (props.isFetching) {
      return <Spinner />;
    }
    if (!props.data) {
      return <Component navigate={navigate} />;
    }
    return null;
  }

  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    checkAuth: (navigate) => dispatch(getUser(navigate)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(HocForLoginSignUp);
};

export default OnlyNotAuthorizedUserHoc;
