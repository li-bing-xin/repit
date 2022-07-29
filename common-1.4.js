//锚点
const anchors = ['home', 'fitness', 'avatar', 'roadmap', 'team', 'join']

//初始化fullpage，实现幻灯片翻页效果
function initFullpage() {
	new fullpage('#fullpage', {
		anchors: anchors,
		responsiveHeight: 400,
		fixedElements: '.nav',
		credits: { enabled: false },
		onLeave: function (origin, destination, direction) {
			$('.' + destination.anchor).scrollTop(direction === 'up' ? 10 ** 5 : 0)
		},
	})
}

//根据条件判断是否应该重定向到对应分辨率的页面
function handleRedirect() {
	const screenW = window.innerWidth
	const screenH = window.innerHeight

	const v = 720

	if (location.href.includes('file')) return

	if (screenW <= v && !location.href.includes('/mobile.html')) {
		location.href = location.origin + '/mobile.html'
	}
	if (screenW > v && location.href.includes('/mobile.html')) {
		location.href = location.origin + '/index.html'
	}
}

//计算根节点的字体大小， rem布局方案必须
function computeRootFontsize() {
	const screenW = window.innerWidth
	const screenH = window.innerHeight
	const isPC = screenW >= 720
	if (isPC) $('html').css('font-size', (screenW / 1920) * 100 + 'px')
}

//初始化vue
function createVue() {
	const app = {
		data() {
			return {
				anchors: anchors,
				hash: '', //当前板块的hash，与锚点对应起来
				showMenu: false, //仅用于移动端，控制菜单栏的显隐
				avatarSectionScrollTop: 0, // avatar板块的滚动高度，根据该高度实时计算板块中元素的位置
				triggerHeight: [0, 500, 400, 600],
				animationRange: 350,
			}
		},
		watch: {
			avatarSectionScrollTop(n, o) {
				//第一个板块的进入和离开的动画控制
				{
					const h = 10
					//0进1
					if (n >= h && o <= h) {
						$('.avatar .section-1').toggleClass('enter leave')
					}

					//其他进0, 因为用户可能从锚点直接进入该板块
					if (o >= h && n <= h) {
						setTimeout(() => {
							$('.transform-wrapper > div').each((_, item) => {
								$(item).removeClass('enter').addClass('leave')
							})
							$('.avatar .section-1').addClass('enter')
						})
						setTimeout(() => {
							$('.avatar .section-1').removeClass('leave')
						})
					}
				}

				//第二个板块的动画控制
				{
					const h = this.animationRange * 1
					//1进2
					if (n >= h && o < h) {
						$('.avatar .section-1').addClass('leave')
						$('.avatar .section-2').toggleClass('enter leave')
					}

					//2进1
					if (o >= h && n < h) {
						$('.avatar .section-2').toggleClass('enter leave')
					}
				}

				//第三个板块的动画控制
				{
					const h = this.animationRange * 2
					if ((n >= h && o < h) || (o >= h && n < h)) {
						$('.avatar .section-2, .avatar .section-3').toggleClass(
							'enter leave'
						)
						$('.avatar .section-1').toggleClass('opacity-0')
					}
				}

				//第四个板块的动画控制
				{
					const h = this.animationRange * 3
					if ((n >= h && o < h) || (o >= h && n < h)) {
						$('.avatar .section-3, .avatar .section-4').toggleClass(
							'enter leave'
						)
					}
				}

				//第五个板块的动画控制
				{
					const h = this.animationRange * 4
					if ((n >= h && o < h) || (o >= h && n < h)) {
						$('.avatar .section-4, .avatar .section-5').toggleClass(
							'enter leave'
						)
					}
				}

				//第六个板块的动画控制
				{
					const h = this.animationRange * 5
					if ((n >= h && o < h) || (o >= h && n < h)) {
						$('.avatar .section-5, .avatar .section-6').toggleClass(
							'enter leave'
						)
					}
				}

				//第七个板块的动画控制
				{
					const h = this.animationRange * 6
					if ((n >= h && o < h) || (o >= h && n < h)) {
						$('.avatar .section-6, .avatar .section-7').toggleClass(
							'enter leave'
						)
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
			},
		},
		mounted() {
			window.addEventListener('hashchange', () => {
				this.hash = location.hash.slice(1)
			})

			window.addEventListener('resize', () => {
				// handleRedirect()
				computeRootFontsize()
			})

			//当处于avatar板块内时，监听滚动并记录滚动高度
			document.querySelector('.avatar').addEventListener('scroll', e => {
				this.avatarSectionScrollTop = e.target.scrollTop
			})
		},
	}

	Vue.createApp(app).mount('#app')
}

window.addEventListener('DOMContentLoaded', function () {
	// handleRedirect()
	computeRootFontsize()
	createVue()
	//初始化锚点
	location.hash = 'home'
	//屏蔽刚进入页面时闪现的滚动条
	document.documentElement.style.cssText += `
		visibility: visible;
		overflow: unset;
		height: unset
	`
	initFullpage()
})
