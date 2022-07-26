const anchors = ['home', 'fitness', 'avatar', 'roadmap', 'team', 'join']

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

function handleRedirect() {
	const screenW = window.innerWidth
	// const screenH = window.innerHeight

	const v = 720

	if (screenW <= v && !location.href.includes('/mobile.html')) {
		location.href = 'file:///D:/Projects/dn2life/mobile.html'
	}
	if (screenW > v && location.href.includes('/mobile.html')) {
		location.href = 'file:///D:/Projects/dn2life/index.html'
	}

	//location.pathname !== '/mobile.html'; window.location.href = location.origin + '/mobile.html'
}

function computeRootFontsize() {
	const screenW = window.innerWidth
	const screenH = window.innerHeight
	//计算根节点的字体大小， rem布局方案必须
	const isPC = screenW >= 720
	if (isPC) {
		document.querySelector('html').style.fontSize = `${
			(screenW / 1920) * 100
		}px`
	}
}

function createVue() {
	const app = {
		data() {
			return {
				message: 'Hello Vue!!',
				anchors: anchors,
				hash: '',
				showMenu: false,
			}
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
				handleRedirect()
				computeRootFontsize()
			})
		},
	}

	Vue.createApp(app).mount('#app')
}

window.addEventListener('DOMContentLoaded', function () {
	handleRedirect()
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
