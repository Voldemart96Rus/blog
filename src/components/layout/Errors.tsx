import React from 'react';
import Alert from 'react-bootstrap/Alert';

import {IError} from '../../types';

interface IProps {
    errors: IError[];
    deleteError: (id: string) => void;
}

const Errors: React.FC<IProps> = ({errors, deleteError}) => {
    if (errors && errors.length > 0)
        return (
            <>
                {errors.map(({id, code, message}) => (
                    <Alert
                        key={id}
                        variant="danger"
                        onClose={() => deleteError(id)}
                        dismissible
                    >
                        <Alert.Heading>{code}</Alert.Heading>
                        <p>{message}</p>
                    </Alert>
                ))}
            </>
        );

    return null;
};

export default Errors;
