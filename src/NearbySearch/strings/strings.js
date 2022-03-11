const getSearchStatusText = (status) => {
    switch (status) {
        case 'INVALID_REQUEST':
            return 'This request was invalid.';
        case 'OK':
            return 'The response contains a valid result.';
        case 'OVER_QUERY_LIMIT':
            return 'The webpage has gone over its request quota.';
        case 'REQUEST_DENIED':
            return 'The webpage is not allowed to use the PlacesService.';
        case 'UNKNOWN_ERROR':
            return 'The PlacesService request could not be processed due to a server error. The request may succeed if you try again.';
        case 'ZERO_RESULTS':
            return 'No result was found for this request.';
        default:
            return 'Unknown Status';
    }
};

export { getSearchStatusText };
