/**
 * Set default request query.
 * 
 * @param data The request data
 * @param query The query params to set
 * @returns The updated request data
*/
const setRequestQuery = (data, { q = '', pageIndex = 1, offset = 0, limit = 10, sort_column = '', sort_order = '' } = {}) => {
    data.q           = q
    data.pageIndex   = pageIndex
    data.offset      = offset
    data.limit       = limit
    data.sort_column = sort_column
    data.sort_order  = sort_order
    return data;
}

export { setRequestQuery }
