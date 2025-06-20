const PaginatePok = (pokemon, pageSize) => {

    const pageCount = Math.ceil(pokemon.length / pageSize);
    return Array.from({ length: pageCount}, (_, index) =>
pokemon.slice(index * pageSize, (index + 1) * pageSize)
);
};
export default PaginatePok;