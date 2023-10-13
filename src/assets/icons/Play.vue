<template>
	<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
		<g filter="url(#filter0_d_2035_2260)">
			<circle cx="25" cy="25" r="20" fill="url(#paint0_linear_2035_2260)" />
		</g>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M20.2937 16.7646L32.001 24.5695L20.2937 32.3744V16.7646Z"
			fill="white"
		/>
		<defs>
			<filter
				id="filter0_d_2035_2260"
				x="0"
				y="0"
				width="50"
				height="50"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset />
				<feGaussianBlur stdDeviation="2.5" />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 0.207843 0 0 0 0 0.505882 0 0 0 0 0.517647 0 0 0 0.25 0"
				/>
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2035_2260" />
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect1_dropShadow_2035_2260"
					result="shape"
				/>
			</filter>
			<linearGradient
				id="paint0_linear_2035_2260"
				x1="5"
				y1="3.46154"
				x2="51.8681"
				y2="13.7682"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#61C1C0" />
				<stop offset="1" stop-color="#358184" />
			</linearGradient>
		</defs>
	</svg>
</template>

<style scoped lang="scss">
svg {
	cursor: pointer;
	transition: all 0.4s;
	&:hover {
		transform: scale(1.2);
	}
}
</style>
