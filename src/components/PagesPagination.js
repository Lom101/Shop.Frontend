import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Pagination } from "react-bootstrap";

const PagesPagination = observer(() => {
    const { productStore } = useContext(Context);

    const pageCount = Math.ceil(productStore.totalCount / productStore.pageSize);
    let pages = [];

    // Генерируем массив страниц с учетом одного элемента вперед и назад от текущей
    for (let i = 1; i <= pageCount; i++) {
        if (i === productStore.pageNumber || (Math.abs(i - productStore.pageNumber) === 1)) {
            pages.push(i);
        }
    }

    const handlePageChange = (pageNumber) => {
        productStore.setPage(pageNumber);
    };

    return (
        <Pagination className="mt-3">
            {pages.length > 0 ? (
                <>
                    <Pagination.First onClick={() => handlePageChange(1)} />
                    <Pagination.Prev onClick={() => handlePageChange(productStore.pageNumber > 1 ? productStore.pageNumber - 1 : 1)} />

                    {pages.map((pageNumber) =>
                        <Pagination.Item
                            key={pageNumber}
                            active={productStore.pageNumber === pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                        >
                            {pageNumber}
                        </Pagination.Item>
                    )}

                    <Pagination.Next onClick={() => handlePageChange(productStore.pageNumber < pageCount ? productStore.pageNumber + 1 : pageCount)} />
                    <Pagination.Last onClick={() => handlePageChange(pageCount)} />
                </>
            ) : (
                <div>Пусто</div>
            )}
        </Pagination>
    );
});

export default PagesPagination;
