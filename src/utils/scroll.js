export const smoothScrollTo = (elementId) => {
  const element = document.querySelector(elementId)
  if (element) {
    const scrollMarginTop = getComputedStyle(element).scrollMarginTop
    window.scrollTo({
      top: element.offsetTop - parseInt(scrollMarginTop || 0),
      behavior: 'smooth',
    })
  }
}

export const getActiveSection = () => {
  const sections = document.querySelectorAll('section[id]')
  const scrollY = window.scrollY + 200

  for (let section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
      return sectionId
    }
  }
  return null
}

