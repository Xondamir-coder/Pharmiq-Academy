<template>
	<svg
		v-if="color == 'green'"
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none">
		<g clip-path="url(#clip0_2156_3148)">
			<mask
				id="mask0_2156_3148"
				style="mask-type: luminance"
				maskUnits="userSpaceOnUse"
				x="-1"
				y="0"
				width="22"
				height="20">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M18.3337 17.015C16.2949 14.5262 14.4845 13.1141 12.902 12.7783C11.3199 12.4429 9.81366 12.392 8.38283 12.6262V17.0833L1.66699 9.81038L8.38283 2.91663V7.15288C11.0282 7.17371 13.277 8.12288 15.1295 9.99996C16.9816 11.877 18.0499 14.2154 18.3337 17.015Z"
					fill="white"
					stroke="white"
					stroke-width="4"
					stroke-linejoin="round" />
			</mask>
			<g mask="url(#mask0_2156_3148)">
				<path d="M0 0H20V20H0V0Z" fill="url(#paint0_linear_2156_3148)" />
			</g>
		</g>
		<defs>
			<linearGradient
				id="paint0_linear_2156_3148"
				x1="1.66426e-08"
				y1="-0.769231"
				x2="23.4341"
				y2="4.3841"
				gradientUnits="userSpaceOnUse">
				<stop stop-color="#61C1C0" />
				<stop offset="1" stop-color="#358184" />
			</linearGradient>
			<clipPath id="clip0_2156_3148">
				<rect width="20" height="20" fill="white" />
			</clipPath>
		</defs>
	</svg>
	<svg
		v-else
		xmlns="http://www.w3.org/2000/svg"
		width="21"
		height="20"
		viewBox="0 0 21 20"
		fill="none">
		<g clip-path="url(#clip0_2115_3542)">
			<mask
				id="mask0_2115_3542"
				style="mask-type: luminance"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="21"
				height="20">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M18.8332 17.015C16.7944 14.5263 14.984 13.1142 13.4015 12.7784C11.8194 12.4429 10.3132 12.3921 8.88234 12.6263V17.0834L2.1665 9.81044L8.88234 2.91669V7.15294C11.5278 7.17377 13.7765 8.12294 15.629 10C17.4811 11.8771 18.5494 14.2154 18.8332 17.015Z"
					fill="white"
					stroke="white"
					stroke-width="4"
					stroke-linejoin="round" />
			</mask>
			<g mask="url(#mask0_2115_3542)">
				<path d="M0.5 0H20.5V20H0.5V0Z" fill="white" />
			</g>
		</g>
		<defs>
			<clipPath id="clip0_2115_3542">
				<rect width="20" height="20" fill="white" transform="translate(0.5)" />
			</clipPath>
		</defs>
	</svg>
</template>

<script setup>
const props = defineProps({
	color: String,
});
</script>
