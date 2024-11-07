import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

class App {
	constructor() {
		console.log('App is running')

		gsap.registerPlugin(ScrollTrigger)
		this._initTextReaveal()
		this._initImageReveal()
	}

	_initTextReaveal() {
		const split = new SplitType('.text-reveal', {
			types: 'lines',
			linesClass: 'line-wrapper',
		})

		console.log(split)
		const lines = []

		split.lines.forEach(line => {
			const text = line.textContent
			const lineInner = document.createElement('div')
			lineInner.classList.add('line__inner')
			line.textContent = ''
			line.appendChild(lineInner)
			lineInner.innerHTML = text
			lines.push(lineInner)

			gsap.set(lineInner, { yPercent: 120 })
		})

		const tl = gsap.timeline({
			defaults: {
				duration: 1,
				ease: 'power3.out',
			},
		})

		tl.to(lines, {
			yPercent: 0,
			stagger: 0.2,
		})
	}

	_initImageReveal() {
		const gallery = document.querySelector('.gallery')
		const medias = gallery.querySelectorAll('.media')

		gsap.set(medias, {
			clipPath: 'inset(0 0 100% 0)',
		})

		medias.forEach(media => {
			const img = media.querySelector('img')
			gsap.set(img, {
				scale: 1.2,
			})
		})

		const tl = gsap.timeline({
			defaults: {
				duration: 0.8,
				ease: 'power3.out',
			},
			scrollTrigger: {
				trigger: gallery,
				start: 'top 30%',
			},
		})

		tl.to(medias, {
			clipPath: 'inset(0 0 0% 0)',
			stagger: 0.2,
		})

		medias.forEach(media => {
			const img = media.querySelector('img')
			tl.to(
				img,
				{
					scale: 1,
				},
				'<+0.1',
			)

			const tlParallax = gsap.timeline({
				scrollTrigger: {
					trigger: media,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true,
				},
			})

			tlParallax.to(media.querySelector('.media__inner'), {
				yPercent: 30,
			})
		})
	}
}

new App()
