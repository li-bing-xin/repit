//锚点
const anchors = ['home', 'fitness', 'avatar', 'roadmap', 'team', 'join']

let fullpageInstance

//根据条件判断是否应该重定向到对应分辨率的页面
function handleRedirect() {
	const isMobile = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)

	if (isMobile && !location.href.includes('/mobile'))
		location.href = location.origin + '/mobile.html'
}

//计算根节点的字体大小， rem布局方案必须
function computeRootFontsize() {
	const screenW = window.innerWidth
	const isPC = screenW >= 720
	if (isPC) $('html').css('font-size', (screenW / 1920) * 100 + 'px')
}

//初始化vue
function createVue() {
	const App = {
		data() {
			return {
				anchors: anchors,
				hash: 'home', //当前板块的hash，与锚点对应起来
				showMenu: false, //仅用于移动端，控制菜单栏的显隐

				//以下几个变量都用于avatar板块
				avatarSectionScrollTop: 0, // avatar板块的滚动高度，根据该高度实时计算板块中元素的位置
				avatarSectionAnimationSpeed: 350,
				avatarSectionScrollLock: false, //avatar板块限制1秒内只能滚动一屏
				index: 0,
				touchStartY: 0,
			}
		},
		watch: {
			index(n, o) {
				//第二个板块的进入和离开的动画控制
				{
					//0进1
					if (n === 1 && o === 0) {
						$('.avatar .section-1, .avatar .section-2').toggleClass(
							'enter leave'
						)
					}

					//其他进0, 因为用户可能从锚点直接进入该板块
					if (n === 0) {
						setTimeout(() => {
							$('.transform-wrapper > div').each((_, item) => {
								$(item).removeClass('enter').addClass('leave')
							})
							$('.avatar .section-1').addClass('enter')
						})
						setTimeout(() => {
							$('.avatar .section-1').removeClass('leave')
							$('.avatar .section-1').removeClass('opacity-0')
						})
						$('.avatar .section-2 .tip').removeClass('section-2-3')
						$('.avatar .section-4 .tip').removeClass('section-4-5')
						$('.avatar .section-2 .tip, .avatar .section-4 .tip').removeClass(
							'opacity-0'
						)
					}
				}

				//第三个板块的动画控制
				{
					if (n === 2 && o === 1) {
						$('.avatar .section-2, .avatar .section-3').toggleClass(
							'enter leave'
						)
						$('.avatar .section-2 .tip').addClass('section-2-3')
					}

					if (n === 1 && o === 2) {
						$('.avatar .section-2, .avatar .section-3').toggleClass(
							'enter leave'
						)
						$('.avatar .section-2 .tip').removeClass('section-2-3')
					}
				}

				//第四个板块的动画控制
				{
					if (n === 3 && o === 2) {
						$('.avatar .section-3, .avatar .section-4').toggleClass(
							'enter leave'
						)
						$('.avatar .section-1').toggleClass('opacity-0')
						$('.avatar .section-2 .tip').addClass('opacity-0')
					}
					if (o === 3 && n === 2) {
						$('.avatar .section-3, .avatar .section-4').toggleClass(
							'enter leave'
						)
						$('.avatar .section-1').toggleClass('opacity-0')
						$('.avatar .section-2 .tip').removeClass('opacity-0')
						$('.avatar .section-2 .tip').addClass('section-2-3')
					}
				}

				//第五个板块的动画控制
				{
					if (n === 4 && o === 3) {
						$('.avatar .section-4, .avatar .section-5').toggleClass(
							'enter leave'
						)
						$('.avatar .section-4 .tip').addClass('section-4-5')
					}
					if (o === 4 && n === 3) {
						$('.avatar .section-4, .avatar .section-5').toggleClass(
							'enter leave'
						)
						$('.avatar .section-4 .tip').removeClass('section-4-5')
					}
				}

				//第六个板块的动画控制
				{
					if (o === 5 && n === 4) {
						$('.avatar .section-5, .avatar .section-6').toggleClass(
							'enter leave'
						)
						$('.avatar .section-4 .tip').removeClass('opacity-0')
						$('.avatar .section-4 .tip').addClass('section-4-5')
					}

					if (n === 5) {
						$('.avatar .section-4 .tip').addClass('opacity-0')
						$('.avatar .section-2 .tip').addClass('opacity-0')
						setTimeout(() => {
							$('.transform-wrapper > div').each((_, item) => {
								$(item).removeClass('enter').addClass('leave')
							})
							$('.avatar .section-6').addClass('enter')
						})
						setTimeout(() => {
							$('.avatar .section-6').removeClass('leave')
							$('.avatar .section-1').addClass('opacity-0')
						})
					}
				}
			},
		},
		methods: {
			toggleMenu() {
				this.showMenu = !this.showMenu
			},
			onClickAnchor(key) {
				if (this.showMenu) this.toggleMenu()
				if (key === this.hash) return
				$('.' + key).scrollTop(0)
				this.avatarSectionScrollTop = 0
			},
			onAvatarSectionScroll(e) {
				this.handleAvatarSectionScroll(e.deltaY)
			},
			handleAvatarSectionScroll(scrollLen) {
				if (Math.abs(scrollLen) >= 20 && !this.avatarSectionScrollLock) {
					let t = scrollLen > 0 ? this.index + 1 : this.index - 1

					if (t < 0) fullpageInstance.moveSectionUp()
					if (t > 5) fullpageInstance.moveSectionDown()

					this.index = Math.min(5, Math.max(0, t))

					this.avatarSectionScrollLock = true
					setTimeout(() => {
						this.avatarSectionScrollLock = false
					}, 1000)
				}
			},
		},
		mounted() {
			fullpageInstance = new fullpage('#fullpage', {
				anchors: anchors,
				// easingcss3: 'linear',
				// autoScrolling: true,
				// fadingEffect: true,
				fitToSection: false,
				responsiveHeight: 400,
				scrollingSpeed: 600,
				fixedElements: '.nav',
				credits: { enabled: false },
				normalScrollElements: '.normal-scroll',
				onLeave: (origin, destination, direction) => {
					$('.' + destination.anchor).scrollTop(
						direction === 'up' ? 10 ** 5 : 0
					)
					if (destination.anchor === 'avatar') {
						$('.avatar').scrollTop(0)
						this.avatarSectionScrollTop = 0
						this.index = direction === 'up' ? 5 : 0
					}
				},
				beforeLeave: (origin, destination) => {
					const video = $('.fitness video')[0]
					if (destination.anchor === 'fitness' && video.paused)
						setTimeout(() => {
							video.play()
						}, 600)
					else if (origin.anchor === 'fitness' && !video.paused) video.pause()
				},
			})

			window.oncontextmenu = function (e) {
				// e.preventDefault()
			}

			window.addEventListener('hashchange', () => {
				this.hash = location.hash.slice(1)
			})

			window.addEventListener('resize', computeRootFontsize)

			const avatar = document.querySelector('.avatar')

			//当处于avatar板块内时，监听滚动并记录滚动高度
			avatar.addEventListener('scroll', e => {
				this.avatarSectionScrollTop = e.target.scrollTop
			})

			avatar.addEventListener('wheel', this.onAvatarSectionScroll)

			avatar.addEventListener('touchstart', e => {
				this.touchStartY = e.changedTouches[0].pageY
			})

			avatar.addEventListener('touchend', e => {
				this.handleAvatarSectionScroll(
					this.touchStartY - e.changedTouches[0].pageY
				)
			})

			$('.fitness video')[0].addEventListener('loadeddata', function () {
				this.play()
				this.pause()
			})
		},
	}

	Vue.createApp(App).mount('#app')
}

function loadingLottie() {
	setTimeout(() => {
		lottie.loadAnimation({
			container: document.querySelector('#loading .lottie'),
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: './assets/lottie.json',
		})
	})
}

window.addEventListener('DOMContentLoaded', function () {
	handleRedirect()
	loadingLottie()
	computeRootFontsize()
	//初始化锚点
	location.hash = 'home'
	//屏蔽刚进入页面时闪现的滚动条
	document.documentElement.style.cssText += `
		visibility: visible;
		overflow: unset;
		height: unset
	`
	createVue()
})

window.addEventListener('load', function () {
	$('#loading').hide()
})
