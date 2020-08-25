import React from 'react';

import './ReturnButton.css';

type PropType = {
    onClick: () => void;
};

export const ReturnButton: React.FC<PropType> = ({onClick}) => {
    return (
        <img
            src="/images/back.svg"
            alt="Назад"
            title="Назад"
            onClick={onClick}
            className="return-button"
        />
    );
};

export default ReturnButton;
