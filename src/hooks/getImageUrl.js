//images
export const getImageUrl = (path, size = 400 ) => {
    return `https://image.tmdb.org/t/p/w${size}${path}`
}