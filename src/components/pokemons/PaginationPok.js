const PaginatePok = (pokemon, pageSize) => {

    console.log("iz paginationPok konzola", pokemon)

    const pageCount = Math.ceil(pokemon.length / pageSize);
    return Array.from({ length: pageCount}, (_, index) =>
pokemon.slice(index * pageSize, (index + 1) * pageSize)
);
};
export default PaginatePok;