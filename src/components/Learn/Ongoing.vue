<template>
	<div class="courses__nav" v-if="!isEmpty">
		<div>
			<button
				class="learn__button"
				v-for="mainLabel in mainLabels"
				:key="mainLabel"
				:class="{ 'learn__button--active': mainFilter == mainLabel }"
				@click="filterMain(mainLabel)"
			>
				{{ mainLabel }}
			</button>
		</div>
		<div>
			<button
				class="learn__button"
				v-for="secondaryLabel in secondaryLabels"
				:key="secondaryLabel"
				:class="{ 'learn__button--active': secondaryFilter == secondaryLabel }"
				@click="filterSecondary(secondaryLabel)"
			>
				{{ secondaryLabel }}
			</button>
		</div>
	</div>
	<div class="learn__container" v-if="!isEmpty">
		<CourseCard v-for="course in filteredCourses" :key="course.id" :course="course" />
		<h1 class="courses__empty" v-if="!filteredCourses || !filteredCourses.length > 0">
			Вы изучили эти курсы!
		</h1>
	</div>
	<h1 class="courses__empty" v-else>Вы изучили все курсы!</h1>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useAppStore } from '../../appStore';
import CourseCard from './CourseCard.vue';

const appStore = useAppStore();
const mainLabels = ref(['Курсы', 'Моя Аптека']);
const mainFilter = ref('Курсы');
const secondaryFilter = ref('Все');

const secondaryLabels = computed(() => {
	if (mainFilter.value == 'Курсы')
		return ['Все', 'Нозология', 'Продажи и ассортимент', 'Фармопека'];
	return ['Препараты', 'Корпоративные'];
});
const filterMain = (label) => {
	mainFilter.value = label;
};
const filterSecondary = (label) => {
	secondaryFilter.value = label;
};
const filteredCourses = computed(() => {
	if (mainFilter.value == 'Курсы')
		if (secondaryFilter.value == 'Все')
			return appStore.ongoing.filter(
				(course) =>
					course.category_id == 0 ||
					course.category_id == 1 ||
					course.category_id == 2 ||
					course.category_id == 3
			);
		else
			return appStore.ongoing.filter(
				(course) => JSON.parse(course.category.categoryName).ru == secondaryFilter.value
			);
	else
		return appStore.ongoing.filter(
			(course) => JSON.parse(course.category.categoryName).ru == secondaryFilter.value
		);
});

// appStore.ongoing = [
// 	{
// 		id: 146,
// 		category_id: 2,
// 		startDate: '2023-07-25',
// 		endDate: '2023-12-31',
// 		courseMonetized: 0,
// 		coursePrice: null,
// 		courseType: 'ongoing',
// 		numberCustomers: 0,
// 		numberGraduates: 0,
// 		courseTypeByAccess: true,
// 		courseForGroup: null,
// 		access: false,
// 		pin: false,
// 		order: null,
// 		getinfo: {
// 			id: 114,
// 			course_id: 146,
// 			courseTitleName:
// 				'{"ru": "4 правила для сохранения ментального здоровья на работе", "uz": "Ish joyida mental salomatlikni asrashning 4 qoidasi"}',
// 			courseBanner:
// 				'{"ru":"873fece5-8fb8-4c9a-9aff-c26aee583cbb-7MjQsqWyE4OoIKe.jpg","uz":"9315c522-4d4f-4e0d-ae32-8c31fe22b9e1-GSJcbg73CxCGDH8.jpg"}',
// 			courseInfo:
// 				'{"ru": "Внезапные неконтролируемые реакции всё ещё существуют в мире и порой в эти ситуации попадают фармацевты. Мы надеемся, что рекомендации из этого урока помогут вам сохранить ментальное здоровье и решить конфликтные ситуации.", "uz": "Biz yashab turgan olamda kutilmagan, nazorat qilinmaydigan reaksiyalar haliyam mavjud va ba’zan farmatsevtlar ham bunday vaziyatlarga duch keladi. Umid qilamizki, bu darsdagi tavsiyamiz sizga mental salomatlikni saqlash va ziddiyatli vaziyatlarni hal qilishda yordam beradi."}',
// 		},
// 		category: {
// 			id: 2,
// 			categoryIcon:
// 				'{"ru": "2eae2428-526c-42bb-9f52-7116443e1769-PdwQMaGEwQTOW6Z.svg", "uz": "c7b1b50d-f6b0-4066-b19c-4f6ce21632fb-NCMij9saY0gM4Pt.svg"}',
// 			categoryName: '{"ru": "Продажи и ассортимент", "uz": "Sotuvlar va assortiment"}',
// 			access: false,
// 		},
// 		lessons: [
// 			{
// 				id: 76,
// 				course_id: 146,
// 				order: 1,
// 				lessonTitleName:
// 					'{"ru": "4 правила для сохранения ментального здоровья на работе", "uz": "Ish joyida mental salomatlikni asrashning 4 qoidasi"}',
// 				video:
// 					'{"ru": "<iframe src=\\"https://player.vimeo.com/video/838214103?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479\\" frameborder=\\"0\\" allow=\\"autoplay; fullscreen; picture-in-picture\\" allowfullscreen style=\\"position:absolute;top:0;left:0;width:100%;height:100%;\\" title=\\"Крикуны_Ru\\"></iframe>", "uz": "<iframe src=\\"https://player.vimeo.com/video/838214287?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479\\" frameborder=\\"0\\" allow=\\"autoplay; fullscreen; picture-in-picture\\" allowfullscreen style=\\"position:absolute;top:0;left:0;width:100%;height:100%;\\" title=\\"Крикуны_уз\\"></iframe>"}',
// 				videoLength: '{"ru": "250", "uz": "266"}',
// 				videoLocId:
// 					'{"ru": "https://player.vimeo.com/progressive_redirect/playback/838214286/rendition/720p/file.mp4?loc=external&signature=1f0182ed954cbb4f99020623cd531c9573392b145c93c7efd22979d4777d0d3d", "uz": "https://player.vimeo.com/progressive_redirect/playback/838214156/rendition/720p/file.mp4?loc=external&signature=73ce89a40973f7414092fbaebfe8a2d888c7aef5cdf8706866b7064dcc99e2e8"}',
// 				quizes: {
// 					id: 76,
// 					lesson_id: 76,
// 					prizeIQC: 0,
// 					timeLimits: 8,
// 					numberRightAnswersToPass: 6,
// 					type: 'with reward',
// 					prizeLimit: null,
// 					prizeStatus: false,
// 					quizlog: [],
// 				},
// 				lessonlog: null,
// 			},
// 		],
// 		courselog: null,
// 	},
// 	{
// 		id: 63,
// 		category_id: 1,
// 		startDate: '2022-11-24',
// 		endDate: '2022-11-24',
// 		courseMonetized: 0,
// 		coursePrice: null,
// 		courseType: 'upcoming',
// 		numberCustomers: 0,
// 		numberGraduates: 0,
// 		courseTypeByAccess: true,
// 		courseForGroup: null,
// 		access: false,
// 		pin: true,
// 		order: null,
// 		getinfo: {
// 			id: 40,
// 			course_id: 63,
// 			courseTitleName:
// 				'{"ru": "Болезни горла. Как принять решение о помощи покупателю?", "uz": "Tomoq og\'rig\'i.  Xaridorga yordam berishda qanday qaror qabul qilish zarur?"}',
// 			courseBanner:
// 				'{"ru":"87ba44f9-bff7-4f11-b644-d52b1ca7b5e4-fppueTWNv0EJS5s.png","uz":"f30209d3-2cce-4feb-9476-70c9d1e34ffd-IjWGcFDG5YTp6g8.png"}',
// 			courseInfo:
// 				'{"ru": "Рекомендации препаратов в зависимости от симптомов. Примеры дополнительных и комплексных продаж при запросе \\"боль в горле\\".", "uz": "Alomatlarga qarab dori-darmonlarni tavsiya etilishi. «Tomoq og\'rig\'i» so\'rovi bo’yicha kompleks va qoshimcha savdo misollari."}',
// 		},
// 		category: {
// 			id: 1,
// 			categoryIcon:
// 				'{"ru": "590291ff-7c3e-49a0-a43b-d20a4b67a56a-8ErVRSRC2hyfQ57.svg", "uz": "f2d18511-970b-4a0a-b4bb-bc3ed3781522-ute3n4QQs4bjUu7.svg"}',
// 			categoryName: '{"ru": "Нозология", "uz": "Nozologiya"}',
// 			access: false,
// 		},
// 		lessons: [
// 			{
// 				id: 26,
// 				course_id: 63,
// 				order: 1,
// 				lessonTitleName:
// 					'{"ru": "Болезни горла. Как принять решение о помощи покупателю?", "uz": "Tomoq og\'rig\'i.  Xaridorga yordam berishda qanday qaror qabul qilish zarur?"}',
// 				video:
// 					'{"ru": "<iframe src=\\"https://player.vimeo.com/video/774170405?h=898c3df3d4&title=0&byline=0&portrait=0&speed=0&badge=0&autopause=0&player_id=0&app_id=58479/embed\\" allow=\\"autoplay; fullscreen; picture-in-picture\\" allowfullscreen frameborder=\\"0\\" style=\\"position:absolute;top:0;left:0;width:100%;height:100%;\\"></iframe>", "uz": "<iframe src=\\"https://player.vimeo.com/video/774171967?h=dfaaf23f6d&title=0&byline=0&portrait=0&speed=0&badge=0&autopause=0&player_id=0&app_id=58479/embed\\" allow=\\"autoplay; fullscreen; picture-in-picture\\" allowfullscreen frameborder=\\"0\\" style=\\"position:absolute;top:0;left:0;width:100%;height:100%;\\"></iframe>"}',
// 				videoLength: '{"ru": "346", "uz": "343"}',
// 				videoLocId:
// 					'{"ru": "https://player.vimeo.com/progressive_redirect/playback/811997190/rendition/720p/file.mp4?loc=external&signature=5394ce5cb4d13fe4fb3e241066b765a7764be2d3d4dd2caa3ce0679c02969f07", "uz": "https://player.vimeo.com/progressive_redirect/playback/811997100/rendition/720p/file.mp4?loc=external&signature=cb80b80da92f7887851f86cb960077c4fa57c7a43c3cc88a5ceb4c658d61dfa0"}',
// 				quizes: {
// 					id: 25,
// 					lesson_id: 26,
// 					prizeIQC: 5,
// 					timeLimits: 11,
// 					numberRightAnswersToPass: 11,
// 					type: 'with reward',
// 					prizeLimit: null,
// 					prizeStatus: false,
// 					quizlog: [
// 						{
// 							id: 1995,
// 							user_id: 68,
// 							quiz_id: 25,
// 							quizAttempt: 1,
// 							numberOfRightAnswers: 5,
// 							timeLeft: '00:10:38',
// 							addressIP: '82.215.107.65',
// 							platform: null,
// 							device: null,
// 							browser: null,
// 							timeZone: null,
// 							created_at: '2023-02-17T14:28:03.000000Z',
// 							updated_at: '2023-02-17T14:28:03.000000Z',
// 							status: null,
// 							prizeOut: 0,
// 						},
// 					],
// 				},
// 				lessonlog: null,
// 			},
// 		],
// 	},
// 	{
// 		id: 3,
// 		category_id: 3,
// 		startDate: '2022-07-08',
// 		endDate: null,
// 		courseMonetized: 0,
// 		coursePrice: null,
// 		courseType: 'ongoing',
// 		numberCustomers: 0,
// 		numberGraduates: 0,
// 		courseTypeByAccess: true,
// 		courseForGroup: null,
// 		access: false,
// 		pin: false,
// 		order: null,
// 		getinfo: {
// 			id: 3,
// 			course_id: 3,
// 			courseTitleName:
// 				'{"ru": "Фармацевтическая опека и зачем она сотруднику аптеки", "uz": "Farmatsevtik vasiylik nima va u dorixona xodimiga nima uchun kerak"}',
// 			courseBanner:
// 				'{"ru":"20205a15-4f5b-4ef9-8297-f1d005fbc78a-b8Vqszf6oTUMU1F.png","uz":"e841b7ed-dcb1-4b98-b9fa-2b626dca68c8-tAlCmAOkk3CFJMd.png"}',
// 			courseInfo:
// 				'{"ru": "Когда в аптечной практике возникает потребность в фарм.опеке. Подробный алгоритм действий при отпуске безрецептурных препаратов.", "uz": "Dorixona amaliyotida farmatsevtik vasiylikga ehtiyoj qachon paydo bo’ladi. Retseptsiz dori-darmonlarni buyurishda harakatlarning batafsil algoritmi"}',
// 		},
// 		category: {
// 			id: 3,
// 			categoryIcon:
// 				'{"ru": "8d2d9049-4a30-4b3a-93fe-75bee7d08324-wsIoGEzJUOuMAOv.svg", "uz": "a48398c0-c0b1-4b99-bcf4-4cc858bcf829-TNoAAHhByLzwGnc.svg"}',
// 			categoryName: '{"ru": "Фармопека", "uz": "Farmvasiylik"}',
// 			access: false,
// 		},
// 		lessons: [
// 			{
// 				id: 3,
// 				course_id: 3,
// 				order: 1,
// 				lessonTitleName:
// 					'{"ru": "Фармацевтическая опека и зачем она сотруднику аптеки", "uz": "Farmatsevtik vasiylik nima va u dorixona xodimiga nima uchun kerak?"}',
// 				video:
// 					'{"ru": "<iframe src=\\"https://player.vimeo.com/video/733626068?h=d921eb81c2&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479\\" frameborder=\\"0\\" allow=\\"autoplay; fullscreen; picture-in-picture\\" allowfullscreen style=\\"position:absolute;top:0;left:0;width:100%;height:100%;\\" title=\\"1.1_фармопека_рус_4K.mp4\\"></iframe>", "uz": "<iframe src=\\"https://player.vimeo.com/video/733627099?h=eb562d94d2&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479\\" frameborder=\\"0\\" allow=\\"autoplay; fullscreen; picture-in-picture\\" allowfullscreen style=\\"position:absolute;top:0;left:0;width:100%;height:100%;\\" title=\\"1_фармопека_узб_4K.mp4\\"></iframe>"}',
// 				videoLength: '{"ru": "184", "uz": "178"}',
// 				videoLocId:
// 					'{"ru": "https://player.vimeo.com/progressive_redirect/playback/812303284/rendition/720p/file.mp4?loc=external&signature=25f2b54e9989323d92a47d3220ca4f28b79a8d55e8ad6117f2e434d584c6d8e4", "uz": "https://player.vimeo.com/progressive_redirect/playback/812303248/rendition/720p/file.mp4?loc=external&signature=0ce3514f0bf5070ebbad2f4fb5668721bedc09e9ff37cea76a396c0e433813e6"}',
// 				quizes: {
// 					id: 3,
// 					lesson_id: 3,
// 					prizeIQC: 3,
// 					timeLimits: 7,
// 					numberRightAnswersToPass: 8,
// 					type: 'with reward',
// 					prizeLimit: null,
// 					prizeStatus: false,
// 					quizlog: [
// 						{
// 							id: 86,
// 							user_id: 68,
// 							quiz_id: 3,
// 							quizAttempt: 7,
// 							numberOfRightAnswers: 1,
// 							timeLeft: '00:06:48',
// 							addressIP: '82.215.107.65',
// 							platform: null,
// 							device: null,
// 							browser: null,
// 							timeZone: null,
// 							created_at: '2022-07-28T16:21:38.000000Z',
// 							updated_at: '2022-07-31T09:26:44.000000Z',
// 							status: true,
// 							prizeOut: 0,
// 						},
// 					],
// 				},
// 				lessonlog: null,
// 			},
// 		],
// 	},
// ];
const isEmpty = computed(() => {
	if (appStore.ongoing.length > 0) return false;
	return true;
});
</script>

<style lang="scss" scoped>
.courses__nav {
	display: flex;
	flex-direction: column;

	& > * {
		display: flex;
		gap: 2rem;
	}
}
.learn__container {
	height: calc(100vh - 25rem);

	& h1 {
		margin-left: 0;
	}
}
</style>
