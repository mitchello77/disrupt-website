class GlitchSlideshow {
  constructor (target, imgArray) {
    this.images = imgArray
    this.target = document.querySelector(target)

    this.numErrors = 0
    this.maxErrors = 15
    this.animOut = true

    this.margin = 22

    // Add initial image
    this.currentIndex = 0
    this.setImage(this.currentImage)

    this.glitching = false
    this.glitchTime = 1500
    this.waitTime = 5000

    this.glitchFunction = this.startGlitch.bind(this)
    this.doGlitchFunction = this.doGlitch.bind(this)

    this.scheduleChange()
  }

  get numImages () {
    return this.images.length
  }

  get nextIndex () {
    return (this.currentIndex + 1) % this.numImages
  }

  get currentImage () {
    return this.images[this.currentIndex]
  }

  get animStep () {
    return Math.floor(this.glitchTime / (this.maxErrors * 2))
  }

  setImage (data) {
    this.target.style.backgroundImage = 'url("' + data + '")'
  }

  startGlitch () {
    this.glitching = true
    this.animOut = true
    this.doGlitch()
  }

  doGlitch () {
    if (this.animOut) {
      // Check for switch to next image
      if (this.numErrors++ >= this.maxErrors) {
        this.animOut = false
        this.currentIndex = (this.currentIndex + 1) % this.numImages
      }
    } else if (this.numErrors > 0) {
      // Take an error away
      this.numErrors--
    } else {
      this.glitching = false
    }

    if (this.glitching) {
      let corrupt = this.currentImage

      // Perform glitch
      for (let i = 0; i < this.numErrors; i++) {
        const pos = this.margin + Math.round(Math.random() * (corrupt.length - this.margin - 1))

        // Swap two chars around
        corrupt = corrupt.substr(0, pos) + corrupt.charAt(pos + 1) + corrupt.charAt(pos) + corrupt.substr(pos + 2)
      }
      this.setImage(corrupt)

      // Do another glitch
      window.setTimeout(this.doGlitchFunction, this.animStep)
    } else {
      // Schedule next glitch
      this.scheduleChange()

      // Set image
      this.setImage(this.currentImage)
    }
  }

  // Schedule for the image to change
  scheduleChange () {
    window.setTimeout(this.glitchFunction, this.waitTime)
  }
}

function initGlitchSlideshow (imgArray) {
  return new GlitchSlideshow('section.graduate-single .image .circle.large .img-container', imgArray)
}
