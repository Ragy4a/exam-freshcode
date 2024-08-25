import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';
import { clearUserStore, getUser } from '../../store/slices/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isFetching } = useSelector((state) => state.userStore);

  useEffect(() => {
    if (!data) {
      dispatch(getUser());
    }
  }, [data, dispatch]);

  const logOut = () => {
    localStorage.clear();
    dispatch(clearUserStore());
    navigate('/login', { replace: true });
  };

  const startContests = () => {
    navigate('/startContest');
  };

  const renderLoginButtons = () => {
    if (data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                data.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${data.avatar}`
              }
              alt="user"
            />
            <span>{`Hi, ${data.displayName}`}</span>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt="menu"
            />
            <ul>
              <li>
                <Link to="/dashboard">
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/account">
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              <li>
                <span onClick={logOut}>Logout</span>
              </li>
            </ul>
          </div>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
            className={styles.emailIcon}
            alt="email"
          />
        </>
      );
    }
    return (
      <>
        <Link to="/login">
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link to="/registration">
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  };

  if (isFetching) {
    return null;
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
        <Link to="/">Read Announcement</Link>
      </div>
      <div className={styles.loginSignnUpHeaders}>
        <div className={styles.numberContainer}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
          <span>(877)&nbsp;355-3585</span>
        </div>
        <div className={styles.userButtonsContainer}>
          {renderLoginButtons()}
        </div>
      </div>
      <div className={styles.navContainer}>
        <Link to='/' >
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
            className={styles.logo}
            alt="blue_logo"
          />
        </Link>
        <div className={styles.leftNav}>
          <div className={styles.nav}>
            <ul>
              <li>
                <span>NAME IDEAS</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <Link to="/"><span>Beauty</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>Consulting</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>E-Commerce</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>Fashion & Clothing</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>Finance</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>Real Estate</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>Tech</span></Link>
                  </li>
                  <li className={styles.last}>
                    <Link to="/"><span>More Categories</span></Link>
                  </li>
                </ul>
              </li>
              <li>
                <span>CONTESTS</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <Link to="/how-it-works"><span>HOW IT WORKS</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>PRICING</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>AGENCY SERVICE</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>ACTIVE CONTESTS</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>WINNERS</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>LEADERBOARD</span></Link>
                  </li>
                  <li className={styles.last}>
                    <Link to="/"><span>BECOME A CREATIVE</span></Link>
                  </li>
                </ul>
              </li>
              <li>
                <span>Our Work</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <Link to="/"><span>NAMES</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>TAGLINES</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>LOGOS</span></Link>
                  </li>
                  <li className={styles.last}>
                    <Link to="/"><span>TESTIMONIALS</span></Link>
                  </li>
                </ul>
              </li>
              <li>
                <span>Names For Sale</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <Link to="/"><span>POPULAR NAMES</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>SHORT NAMES</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>INTRIGUING NAMES</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>NAMES BY CATEGORY</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>VISUAL NAME SEARCH</span></Link>
                  </li>
                  <li className={styles.last}>
                    <Link to="/"><span>SELL YOUR DOMAINS</span></Link>
                  </li>
                </ul>
              </li>
              <li>
                <span>Blog</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <Link to="/"><span>ULTIMATE NAMING GUIDE</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>POETIC DEVICES IN BUSINESS NAMING</span></Link>
                  </li>
                  <li>
                    <Link to="/"><span>CROWDED BAR THEORY</span></Link>
                  </li>
                  <li className={styles.last}>
                    <Link to="/"><span>ALL ARTICLES</span></Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {data && data.role !== CONSTANTS.CREATOR && (
            <div
              className={styles.startContestBtn}
              onClick={startContests}
            >
              START CONTEST
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;