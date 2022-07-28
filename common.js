//锚点
const anchors = ['home', 'fitness', 'avatar', 'roadmap', 'team', 'join']

//初始化fullpage，实现幻灯片翻页效果
function initFullpage() {
	new fullpage('#fullpage', {
		anchors: anchors,
		responsiveHeight: 400,
		fixedElements: '.nav',
		onLeave: function (origin, destination, direction, trigger) {
			if (direction === 'down') {
				document.querySelector('.' + destination.anchor).scrollTop = 0
			}
			if (direction === 'up') {
				document.querySelector('.' + destination.anchor).scrollTop = 10 ** 5
			}
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
	if (isPC) {
		document.querySelector('html').style.fontSize = `${
			(screenW / 1920) * 100
		}px`
	}
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
				animationRange: 200,
			}
		},
		watch: {
			avatarSectionScrollTop(n, o) {
				//第一个板块的进入和离开的动画控制
				{
					const h = 30
					//0进1
					if (n >= h && o < h) {
						document.querySelector('.avatar .section-1').classList.add('leave')
						document
							.querySelector('.avatar .section-1')
							.classList.remove('enter')
					}

					//1进0
					if (o >= h && n < h) {
						document
							.querySelector('.avatar .section-1')
							.classList.remove('leave')
						document.querySelector('.avatar .section-1').classList.add('enter')
					}
				}

				//第二个板块的动画控制
				{
					const h = this.animationRange * 1
					//1进2
					if (n >= h && o < h) {
						document.querySelector('.avatar .section-1').classList.add('leave')
						document
							.querySelector('.avatar .section-2')
							.classList.remove('leave')
						document.querySelector('.avatar .section-2').classList.add('enter')
					}

					//2进1
					if (o >= h && n < h) {
						document.querySelector('.avatar .section-2').classList.add('leave')
						document
							.querySelector('.avatar .section-2')
							.classList.remove('enter')
					}
				}

				//第三个板块的动画控制
				{
					const h = this.animationRange * 2
					//2进3
					if (n >= h && o < h) {
						document.querySelector('.avatar .section-2').classList.add('leave')
						document
							.querySelector('.avatar .section-2')
							.classList.remove('enter')
						document
							.querySelector('.avatar .section-3')
							.classList.remove('leave')
						document.querySelector('.avatar .section-3').classList.add('enter')
						document
							.querySelector('.avatar .section-1')
							.classList.add('opacity-0')
					}

					//3进2
					if (o >= h && n < h) {
						document
							.querySelector('.avatar .section-2')
							.classList.remove('leave')
						document.querySelector('.avatar .section-2').classList.add('enter')
						document
							.querySelector('.avatar .section-3')
							.classList.remove('enter')
						document.querySelector('.avatar .section-3').classList.add('leave')
						document
							.querySelector('.avatar .section-1')
							.classList.remove('opacity-0')
					}
				}

				//第四个板块的动画控制
				{
					const h = this.animationRange * 3
					//3进4
					if (n >= h && o < h) {
						document.querySelector('.avatar .section-3').classList.add('leave')
						document
							.querySelector('.avatar .section-3')
							.classList.remove('enter')
						document
							.querySelector('.avatar .section-4')
							.classList.remove('leave')
						document.querySelector('.avatar .section-4').classList.add('enter')
					}

					//4进3
					if (o >= h && n < h) {
						document
							.querySelector('.avatar .section-3')
							.classList.remove('leave')
						document.querySelector('.avatar .section-3').classList.add('enter')
						document
							.querySelector('.avatar .section-4')
							.classList.remove('enter')
						document.querySelector('.avatar .section-4').classList.add('leave')
					}
				}

				//第五个板块的动画控制
				{
					const h = this.animationRange * 4
					//4进5
					if (n >= h && o < h) {
						document.querySelector('.avatar .section-4').classList.add('leave')
						document
							.querySelector('.avatar .section-4')
							.classList.remove('enter')
						document
							.querySelector('.avatar .section-5')
							.classList.remove('leave')
						document.querySelector('.avatar .section-5').classList.add('enter')
					}

					//5进4
					if (o >= h && n < h) {
						document
							.querySelector('.avatar .section-4')
							.classList.remove('leave')
						document.querySelector('.avatar .section-4').classList.add('enter')
						document
							.querySelector('.avatar .section-5')
							.classList.remove('enter')
						document.querySelector('.avatar .section-5').classList.add('leave')
					}
				}

				//第六个板块的动画控制
				{
					const h = this.animationRange * 5
					//5进6
					if (n >= h && o < h) {
						document.querySelector('.avatar .section-5').classList.add('leave')
						document
							.querySelector('.avatar .section-5')
							.classList.remove('enter')
						document
							.querySelector('.avatar .section-6')
							.classList.remove('leave')
						document.querySelector('.avatar .section-6').classList.add('enter')
					}

					//6进5
					if (o >= h && n < h) {
						document
							.querySelector('.avatar .section-5')
							.classList.remove('leave')
						document.querySelector('.avatar .section-5').classList.add('enter')
						document
							.querySelector('.avatar .section-6')
							.classList.remove('enter')
						document.querySelector('.avatar .section-6').classList.add('leave')
					}
				}

				//第七个板块的动画控制
				{
					const h = this.animationRange * 6
					//6进7
					if (n >= h && o < h) {
						document.querySelector('.avatar .section-6').classList.add('leave')
						document
							.querySelector('.avatar .section-6')
							.classList.remove('enter')
						document
							.querySelector('.avatar .section-7')
							.classList.remove('leave')
						document.querySelector('.avatar .section-7').classList.add('enter')
					}

					//7进6
					if (o >= h && n < h) {
						document
							.querySelector('.avatar .section-6')
							.classList.remove('leave')
						document.querySelector('.avatar .section-6').classList.add('enter')
						document
							.querySelector('.avatar .section-7')
							.classList.remove('enter')
						document.querySelector('.avatar .section-7').classList.add('leave')
					}
				}
			},
		},
		methods: {
			toggleMenu() {
				this.showMenu = !this.showMenu
			},
			onClickAnchor(key) {
				document.querySelector('.' + key).scrollTop = 0
				if (this.showMenu) this.toggleMenu()
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
	document.querySelector('.fp-watermark').style.display = 'none' //屏蔽fullpagejs的License文字提示
})
