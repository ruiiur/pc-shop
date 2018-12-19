var l = 42, // 滑块边长
    r = 10, // 滑块半径
    w = 302, // canvas宽度
    h = 87, // canvas高度
    PI = Math.PI
  var L = l + r * 2 // 滑块实际边长

  function getRandomNumberByRange(start, end) {
    return Math.round(Math.random() * (end - start) + start)
  }

  function createCanvas(width, height) {
    var canvas = createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
  }

  
  function createElement(tagName) {
    return document.createElement(tagName)
  }

  function addClass(tag, className) {
    tag.classList.add(className)
  }

  function removeClass(tag, className) {
    tag.classList.remove(className)
  }
  
  function getRandomImg() {
    return 'https://picsum.photos/300/150/?image=' + getRandomNumberByRange(0, 100)
  }

  function draw(ctx, operation, x, y) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + l / 2, y)
    ctx.arc(x + l / 2, y - r + 2, r, 0, 2 * PI)
    ctx.lineTo(x + l / 2, y)
    ctx.lineTo(x + l, y)
    ctx.lineTo(x + l, y + l / 2)
    ctx.arc(x + l + r - 2, y + l / 2, r, 0, 2 * PI)
    ctx.lineTo(x + l, y + l / 2)
    ctx.lineTo(x + l, y + l)
    ctx.lineTo(x, y + l)
    ctx.lineTo(x, y)
    ctx.fillStyle = '#fff'
    ctx[operation]()
    ctx.beginPath()
    ctx.arc(x, y + l / 2, r, 1.5 * PI, 0.5 * PI)
    ctx.globalCompositeOperation = "xor"
    ctx.fill()
  }

  function sum(x, y) {
    return x + y
  }

  function square(x) {
    return x * x
  }
	
	function jigsaw(el,success,fail){
		//初始化方法。
		this.init(el,success,fail);
	}
	
  jigsaw.prototype= {
    init:function(el,success,fail){
    	this.fail=fail
    	this.el = el
    	this.success=success
      this.initDOM()
      this.initImg()
      this.draw()
      this.bindEvents()
    },

    initDOM:function() {
      var canvas = createCanvas(w, h) // 画布
      var block = canvas.cloneNode(true) // 滑块
      var sliderContainer = createElement('div')
      var refreshIcon = createElement('div')
      var sliderMask = createElement('div')
      var slider = createElement('div')
      var sliderIcon = createElement('span')
      var text = createElement('span')

      block.className = 'block'
      sliderContainer.className = 'sliderContainer'
      refreshIcon.className = 'refreshIcon'
      sliderMask.className = 'sliderMask'
      slider.className = 'slider'
      sliderIcon.className = 'sliderIcon'
      text.innerHTML = '向右滑动滑块填充拼图'
      text.className = 'sliderText'
			console.log(this.el)
      var el = this.el
      el.appendChild(canvas)
      el.appendChild(refreshIcon)
      el.appendChild(block)
      slider.appendChild(sliderIcon)
      sliderMask.appendChild(slider)
      sliderContainer.appendChild(sliderMask)
      sliderContainer.appendChild(text)
      el.appendChild(sliderContainer)
			console.log(this)
			this.canvas=canvas;
			this.block=block;
			this.sliderContainer=sliderContainer;
			this.refreshIcon=refreshIcon;
			this.slider=slider;
			this.sliderMask=sliderMask;
			this.sliderIcon=sliderIcon;
			this.text=text;
			this.canvasCtx=canvas.getContext('2d');
			this.blockCtx=block.getContext('2d');
    },

    initImg: function(){
    	var c=this;
    	var img = createElement('img')
	    img.crossOrigin = "Anonymous"
	    img.onload = function(){
	    	c.canvasCtx.drawImage(img, 0, 0, w, h)
        c.blockCtx.drawImage(img, 0, 0, w, h)
        var y = c.y - r * 2 + 2
        var ImageData = c.blockCtx.getImageData(c.x, y, L, L)
        c.block.width = L
        c.blockCtx.putImageData(ImageData, 0, y)
	    }
	    img.onerror = function() {
	      img.src = getRandomImg()
	    }
	    img.src = getRandomImg()
      this.img = img
    },

    draw: function(){
      // 随机创建滑块的位置
      this.x = getRandomNumberByRange(L + 10, w - (L + 10))
      this.y = getRandomNumberByRange(10 + r * 2, h - (L + 10))
      draw(this.canvasCtx, 'fill', this.x, this.y)
      draw(this.blockCtx, 'clip', this.x, this.y)
    },

    clean:function() {
      this.canvasCtx.clearRect(0, 0, w, h)
      this.blockCtx.clearRect(0, 0, w, h)
      this.block.width = w
    },

    bindEvents:function() {
    	var m=this;
      this.el.onselectstart = function(){
      	false
      }  
      this.refreshIcon.onclick = function() {
        m.reset()
      }

      var originX, originY, trail = [], isMouseDown = false;
      this.slider.addEventListener('mousedown', function (e) {
        originX = e.x, originY = e.y
        isMouseDown = true
      })
      document.addEventListener('mousemove',function (e)  {
        if (!isMouseDown) return false
        var moveX = e.x - originX
        var moveY = e.y - originY
//      console.log(this)
        if (moveX < 0 || moveX + 38 >= w) return false
        m.slider.style.left = moveX + 'px'
        var blockLeft = (w - 40 - 20) / (w - 40) * moveX
        m.block.style.left = blockLeft + 'px'

        addClass(m.sliderContainer, 'sliderContainer_active')
        m.sliderMask.style.width = moveX + 'px'
        trail.push(moveY)
      })
      document.addEventListener('mouseup', function(e)  {
        if (!isMouseDown) return false
        isMouseDown = false
        if (e.x == originX) return false
        removeClass(m.sliderContainer, 'sliderContainer_active')
        m.trail = trail
        console.log(m.verify())
        var spliced = m.verify().spliced;
        var TuringTest=m.verify().TuringTest;
        if (spliced) {
          if (TuringTest) {
            addClass(m.sliderContainer, 'sliderContainer_success')
            m.success && m.success()
          } else {
            addClass(m.sliderContainer, 'sliderContainer_fail')
            m.text.innerHTML = '再试一次'
            m.reset()
          }
        } else {
          addClass(m.sliderContainer, 'sliderContainer_fail')
          m.fail && m.fail()
          setTimeout(function()  {
            m.reset()
          }, 1000)
        }
      })
    },

    verify:function() {
      var arr = this.trail // 拖动时y轴的移动距离
      var average = arr.reduce(sum) / arr.length // 平均值
      var deviations = arr.map(function(x){
      	x=x - average
      }  ) // 偏差数组
      var stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length) // 标准差
      var left = parseInt(this.block.style.left)
      return {
        spliced: Math.abs(left - this.x) < 10,
        TuringTest: average !== stddev, // 只是简单的验证拖动轨迹，相等时一般为0，表示可能非人为操作
      }
    },

    reset:function() {
      this.sliderContainer.className = 'sliderContainer'
      this.slider.style.left = 0
      this.block.style.left = 0
      this.sliderMask.style.width = 0
      this.clean()
      this.img.src = getRandomImg()
      this.draw()
    }

  }
  export default jigsaw
  