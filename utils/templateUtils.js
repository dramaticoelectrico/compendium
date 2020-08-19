const getImages = (arr) => {
  const images = []
  for (let image of arr) {
    images.push(`${image.secure_url} ${image.width.toString()}w`)
  }
  return images.toString()
}
module.exports = { getImages }
