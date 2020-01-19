<template>
	<div id="photo-banner">
		<div class="slide first">
		</div>
	</div>
</template>

<script>
    export default {
        name: "PhotoBanner"
    }
</script>

<style lang="scss" scoped>
	#photo-banner {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		padding: 0;
	}

	.slide {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 2rem;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;

		&.first {
			background-image: url('../../../public/images/woonkamerTafel1.jpg');
		}
	}
</style>
