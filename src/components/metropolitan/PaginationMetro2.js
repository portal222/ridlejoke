
const PaginationMetro2 = (title, pageSize) => {

    const pageCount = Math.ceil(title.length / pageSize);
    return Array.from({ length: pageCount}, (_, index) =>
title.slice(index * pageSize, (index + 1) * pageSize)
);
};
export default PaginationMetro2;