<template>
	<div class="footer">
		<div class="address-container">
			<div class="address">
				<h5><b>Het Snuifhuis</b></h5>
				<p>C.J. Snuifstraat 1</p>
				<p>7511 ZJ Enschede</p>
			</div>
			<a href="https://www.google.com/maps/place/C.J.+Snuifstraat+1,+7511+ZJ+Enschede/@52.2211094,6.9040159,17z/data=!3m1!4b1!4m5!3m4!1s0x47b8146cf4bb2a79:0xb0cf1e81b39ebb2!8m2!3d52.2211094!4d6.9062046">
				<div class="map">
				</div>
			</a>
		</div>
		<div class="made-by">
			<p>Made by Suzanna Wentzel © 2020. All rights reserved</p>
		</div>
	</div>
</template>

<script>
    export default {
        name: "Footer",
        computed: {
            center() {
                return { lat: -23.4070511, lng: -51.9428867 }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 600px) {
		.address-container{
			position: relative;
		}

		.address {
			top: 50%;
			width: 50%;
			padding-left: 3rem;
			float: left;
			position: absolute;

			-webkit-transform: translateY(-50%);
			-moz-transform: translateY(-50%);
			-ms-transform: translateY(-50%);
			-o-transform: translateY(-50%);
			transform: translateY(-50%);

			& p, h5 {
				text-align: left;
			}
		}

		.map {
			top: 0;
			width: 50%;
			height: 200px;
			left: 50%;
			position: relative;
		}
	}

	@media screen and (min-width: 601px) {
		.address-container {
			height: 250px;
			position: relative;
		}

		.address {
			width: 20%;
			right: 50%;
			top: 50%;
			position: absolute;
			-webkit-transform: translateY(-50%);
			-moz-transform: translateY(-50%);
			-ms-transform: translateY(-50%);
			-o-transform: translateY(-50%);
			transform: translateY(-50%);
			text-align: left;
		}

		.map {
			width: 400px;
			height: 100%;
			left: 50%;
			position: absolute;
		}
	}

	.footer {
		width: 100%;
	}

	.address-container {
		width: 100%;
	}

	.address {
		& p {
			margin-bottom: 0.25rem;
		}
	}
	
	.map {
		background-image: url('../../../public/images/maps.png');
		background-size: cover;
		background-position: center;
		cursor: pointer;
	}

	.made-by {
		background-color: var(--my-yellow);
		height: 4rem;
		width: 100%;
		position: relative;
		bottom: 0;

		& p {
			color: white;
			top: 50%;
			left: 50%;
			position: absolute;
			-webkit-transform: translate(-50%, -50%);
			-moz-transform: translate(-50%, -50%);
			-ms-transform: translate(-50%, -50%);
			-o-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			margin: 0;
		}
	}
</style>
