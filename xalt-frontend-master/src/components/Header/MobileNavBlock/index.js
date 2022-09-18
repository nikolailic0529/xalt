import React, {useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import routes from 'lib/navigation/aside';
import {MenuList} from 'components/shared/Layout';
import {MenuItem} from 'components/shared/Menu';
import {CloseButton, MobileMenu, MobileNavBg} from './styles';

const MobileNavBlock = ({isMobileNavOpen, setIsMobileNavOpen, role}) => {
  const [selected, setSelected] = useState(window.location.pathname);

  const closeMenu = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <div className={isMobileNavOpen ? 'mn-block mn-block-top' : 'mn-block'}>
      <MobileNavBg layerActive={isMobileNavOpen} onClick={closeMenu} />
      <div className="mn-nav">
        <div className="mn-nav-wrapper">
          <CloseButton onClick={closeMenu} />
          <div className="mobile-nav-content">
            <MobileMenu>
              <MenuList>
                {(routes[role] || []).map(({title, icon, href}, key) => (
                  <MenuItem
                    key={key}
                    icon={icon}
                    onClick={() => {
                      setSelected(href);
                      closeMenu();
                    }}
                    href={href}
                    title={title}
                    select={window.location.pathname === href ? 'selected' : ''}
                  />
                ))}
              </MenuList>
            </MobileMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    role: state.profile.role,
  };
};

export default withRouter(connect(mapStateToProps)(MobileNavBlock));
