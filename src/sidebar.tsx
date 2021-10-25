import * as React from 'react';

const classNames = require('./sidebar.css');

interface Props {
    isVisible: boolean;
};

const divStyle = (props: Props): React.CSSProperties => ({
    width: (props.isVisible) ? '250px' : '0px'
});

export const SidebarComponent : React.StatelessComponent<Props> = (props) =>
    <div id="mySidenav" className={classNames.sidenav} style={divStyle(props)}>
        {props.children}
    </div>
  