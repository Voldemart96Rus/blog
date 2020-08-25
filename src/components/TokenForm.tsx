import React, {useState} from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {IStoreState} from '../types';
import {TOKEN_REGEX} from '../constants';
import {setToken} from '../actions/auth';

interface PropType {
    token: string | null;
    setToken: (token: string) => void;
}

const TokenForm: React.FC<PropType> = ({token, setToken}) => {
    const [tokenValue, setTokenValue] = useState('');

    const isTokenValid = (token: string): boolean => TOKEN_REGEX.test(token);

    const onTokenChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTokenValue(e.currentTarget.value);

    const onTokenSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setToken(tokenValue);
        setTokenValue('');
    };

    return token ? (
        <div>
            <span className="mr-4">Токен применен</span>
            <Button onClick={() => setToken('')} variant="outline-success">
                Отменить
            </Button>
        </div>
    ) : (
        <Form inline onSubmit={onTokenSubmit}>
            <Form.Control
                type="text"
                placeholder="Токен"
                className="mr-sm-3"
                value={tokenValue}
                onChange={onTokenChange}
            />
            <Button
                type="submit"
                variant="outline-success"
                disabled={!isTokenValid(tokenValue)}
            >
                Применить
            </Button>
        </Form>
    );
};

const mapStateToProps = (state: IStoreState) => ({
    token: state.auth.token,
});

export default connect(mapStateToProps, {setToken})(TokenForm);
