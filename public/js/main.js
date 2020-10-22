/**
 * TODO: name and wire up
 */
;(function () {
  const gallery = Array.from(document.querySelectorAll('.lazy'))

  const settings = {
    root: document.querySelector('.grid'),
  }
  let observer = new IntersectionObserver(buildGallery)

  function buildGallery(entries, observer) {
    entries.forEach((item) => {
      if (item.isIntersecting) {
        let img = document.createElement('img')
        img.src = item.target.dataset.src

        img.addEventListener('load', (e) => {
          item.target.src = e.target.src
          item.target.srcset = item.target.dataset.srcset
          item.target.className = item.target.className + ' active'
        })

        observer.unobserve(item.target)
        img = null
      }
    })
  }
  gallery.forEach((image) => observer.observe(image))
})()
