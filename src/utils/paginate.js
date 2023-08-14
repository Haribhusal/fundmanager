const paginate = (array, limit, pageNumber) => {
    return array.slice((pageNumber - 1) * limit, pageNumber * limit)
}

export default paginate
