const PaginateBook = (bookAuthor, pageSize) => {

    const pageCount = Math.ceil(bookAuthor.length / pageSize);
    return Array.from({ length: pageCount }, (_, index) =>
        bookAuthor.slice(index * pageSize, (index + 1) * pageSize)
    );
};
export default PaginateBook;