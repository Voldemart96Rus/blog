import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import {
    PAGE_GROUP_LENGTH,
    PAGE_SUBGROUP_LENGTH,
    PAGE_MAX_GROUP_LENGTH,
} from './../../constants';

type PropType = {
    pages: number;
    activePage: number;
    setActivePage: (page: number) => void;
};

const CustomPagination: React.FC<PropType> = ({
    pages,
    activePage,
    setActivePage,
}) => {
    const getPaginationItems = () => {
        const paginationItems = [];
        const takenPageNumbers = [];

        if (1 <= pages && pages <= PAGE_MAX_GROUP_LENGTH) {
            for (let i = 1; i <= pages; i++) {
                paginationItems.push(
                    <Pagination.Item
                        key={i}
                        onClick={() => setActivePage(i)}
                        active={i === activePage}
                    >
                        {i}
                    </Pagination.Item>
                );
            }

            return paginationItems;
        }

        for (
            let i = activePage - PAGE_SUBGROUP_LENGTH;
            i <= activePage + PAGE_SUBGROUP_LENGTH;
            i++
        ) {
            if (1 <= i && i <= pages) {
                paginationItems.push(
                    <Pagination.Item
                        key={i}
                        onClick={() => setActivePage(i)}
                        active={i === activePage}
                    >
                        {i}
                    </Pagination.Item>
                );
                takenPageNumbers.push(i);
            }
        }

        if (paginationItems.length < PAGE_GROUP_LENGTH) {
            const additionalPages = [];
            let isStartAddition = false;
            let start, end;
            if (takenPageNumbers.includes(1)) {
                isStartAddition = true;
                start = takenPageNumbers[takenPageNumbers.length - 1] + 1;
                end =
                    start +
                    Math.min(PAGE_GROUP_LENGTH - paginationItems.length, pages);
            } else {
                start = Math.max(
                    takenPageNumbers[0] -
                        (PAGE_GROUP_LENGTH - paginationItems.length),
                    1
                );
                end = takenPageNumbers[0] - 1;
            }
            for (let i = start; i <= end; i++) {
                additionalPages.push(
                    <Pagination.Item
                        key={i}
                        onClick={() => setActivePage(i)}
                        active={i === activePage}
                    >
                        {i}
                    </Pagination.Item>
                );
                takenPageNumbers.push(i);
            }
            if (isStartAddition) {
                paginationItems.push(...additionalPages);
            } else {
                paginationItems.splice(0, 0, ...additionalPages);
            }
        }

        takenPageNumbers.sort((a, b) => a - b);

        const leftmostPageNumber = takenPageNumbers[0];
        const rightmostPageNumber =
            takenPageNumbers[takenPageNumbers.length - 1];

        if (!takenPageNumbers.includes(1)) {
            paginationItems.unshift(
                <Pagination.Item key={1} onClick={() => setActivePage(1)}>
                    1
                </Pagination.Item>
            );

            if (leftmostPageNumber > 2) {
                paginationItems.splice(
                    1,
                    0,
                    <Pagination.Ellipsis key={pages + 1} />
                );
            }
        }

        if (!takenPageNumbers.includes(pages)) {
            if (pages - rightmostPageNumber > 1) {
                paginationItems.push(<Pagination.Ellipsis key={pages + 2} />);
            }

            paginationItems.push(
                <Pagination.Item
                    key={pages}
                    onClick={() => setActivePage(pages)}
                >
                    {pages}
                </Pagination.Item>
            );
        }

        return paginationItems;
    };

    return (
        <Pagination>
            <Pagination.First onClick={() => setActivePage(1)} />
            <Pagination.Prev
                onClick={() => setActivePage(Math.max(activePage - 1, 1))}
            />
            {getPaginationItems()}
            <Pagination.Next
                onClick={() => setActivePage(Math.min(activePage + 1, pages))}
            />
            <Pagination.Last onClick={() => setActivePage(pages)} />
        </Pagination>
    );
};

export default CustomPagination;
