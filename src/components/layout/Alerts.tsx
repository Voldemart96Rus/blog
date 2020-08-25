import React from 'react';
import {Link} from 'react-router-dom';
import {IAlert, IStoreState} from '../../types';
import {connect} from 'react-redux';
import Alert from 'react-bootstrap/Alert';

import {removeAlert} from '../../actions/alert';

interface IProps {
    alerts: IAlert[];
    removeAlert: (id: string) => void;
}

const Alerts: React.FC<IProps> = ({alerts}) => {
    if (alerts && alerts.length > 0)
        return (
            <>
                {alerts.map(({id, message, link}) => (
                    <Alert
                        key={id}
                        variant="success"
                        onClose={() => removeAlert(id)}
                        className="d-flex"
                        dismissible
                    >
                        <p className="mr-4 mb-0">{message}</p>
                        <Link to={link}>Посмотреть</Link>
                    </Alert>
                ))}
            </>
        );

    return null;
};

const mapStateToProps = (state: IStoreState) => ({
    alerts: state.alert.alerts,
});

export default connect(mapStateToProps, {removeAlert})(Alerts);
