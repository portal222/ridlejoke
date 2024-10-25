
const PaginationMetro = (metro, pageSize) => {

    const pageCount = Math.ceil(metro.length / pageSize);
    return Array.from({ length: pageCount}, (_, index) =>
metro.slice(index * pageSize, (index + 1) * pageSize)
);
};
export default PaginationMetro;