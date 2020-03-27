import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import store from 'store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons/faToggleOn';
import { faToggleOff } from '@fortawesome/free-solid-svg-icons/faToggleOff';
import Container from 'react-bootstrap/Container';
import classnames from 'classnames/bind';
import DefaultHelmet from '../DefaultHelmet';
import styles from './Page.css';
import ThemeContext from '../../context/themeContext';

const cx = classnames.bind(styles);

export default function Page({
  title,
  description,
  children,
}) {
  const [hasSwitchedToDarkMode, setHasSwitchedToDarkMode] = useState(undefined);

  const switchToDarkMode = useCallback(() => {
    setHasSwitchedToDarkMode(!hasSwitchedToDarkMode);
    store.set('enableDarkMode', !hasSwitchedToDarkMode);
  }, [hasSwitchedToDarkMode]);

  // Set dark mode initially based on whether user prefers it using os preferences or previously turned it on
  useEffect(() => {
    if (hasSwitchedToDarkMode === undefined) {
      let shouldSetDarkModeInitially = false;
      const darkModeSetting = store.get('enableDarkMode');
      if (darkModeSetting === undefined && typeof window !== 'undefined') {
        shouldSetDarkModeInitially = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        shouldSetDarkModeInitially = darkModeSetting;
      }

      setHasSwitchedToDarkMode(shouldSetDarkModeInitially);
      store.set('enableDarkMode', shouldSetDarkModeInitially);
    }
  }, [hasSwitchedToDarkMode]);

  const theme = hasSwitchedToDarkMode ? 'darkTheme' : 'lightTheme';

  return (
    <ThemeContext.Provider value={{ theme }}>
      <Container fluid className={cx('page', theme)}>
        <DefaultHelmet title={title} description={description} />
        <div className={cx('textRight')}>
          Dark Mode
          <FontAwesomeIcon
            icon={hasSwitchedToDarkMode ? faToggleOn : faToggleOff}
            size="2x"
            onClick={switchToDarkMode}
            className={cx('clickable', 'padTop10px')}
          />
        </div>
        <div className={cx('app')}>
          <header className={cx('appHeader')}>
            <img src="/images/react.svg" className={cx('appLogo')} alt="logo" />
            <h2>React GraphQL App</h2>
            <small>A React starter app with GraphQL support.</small>
          </header>
          <br />
          <br />
          <Container className={cx('content')}>
            {children}
          </Container>
        </div>
      </Container>
    </ThemeContext.Provider>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

Page.defaultProps = {
  title: undefined,
  description: undefined,
}
