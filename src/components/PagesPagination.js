import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Pagination } from "react-bootstrap";

const PagesPagination = observer(() => {
    const { productStore } = useContext(Context);

    const pageCount = Math.ceil(productStore.totalCount / productStore.limit);
    let pages = [];

    // Генерируем массив страниц с учетом одного элемента вперед и назад от текущей
    for (let i = 1; i <= pageCount; i++) {
        if (i === productStore.page || (Math.abs(i - productStore.page) === 1)) {
            pages.push(i);
        }
    }

    const handlePageChange = (page) => {
        productStore.setPage(page);
    };

    return (
        <Pagination className="mt-3">
            {pages.length > 0 ? (
                <>
                    <Pagination.First onClick={() => handlePageChange(1)} />
                    <Pagination.Prev onClick={() => handlePageChange(productStore.page > 1 ? productStore.page - 1 : 1)} />

                    {pages.map((page) =>
                        <Pagination.Item
                            key={page}
                            active={productStore.page === page}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </Pagination.Item>
                    )}

                    <Pagination.Next onClick={() => handlePageChange(productStore.page < pageCount ? productStore.page + 1 : pageCount)} />
                    <Pagination.Last onClick={() => handlePageChange(pageCount)} />
                </>
            ) : (
                <div>Пусто</div>
            )}
        </Pagination>
    );
});

export default PagesPagination;
