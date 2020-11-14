<template>
	<div>
		<ul ref="ul">
			<li
				v-for="(item, index) in list"
				:key="index"
			>{{item}}</li>
		</ul>
		<div ref="t">{{text}}</div>
		<button @click="add">add</button>
	</div>

</template>

<script>
export default {
	data: function () {
		return {
			list: [1, 2, 3],
			text: "text",
		};
	},
	methods: {
		add: function () {
			this.list.push(new Date().getTime());
			this.list.push(new Date().getTime());
			this.list.push(new Date().getTime());
			this.$nextTick(() => {
				console.log(this.$refs.ul.childNodes);
				console.log(this.$refs.t.innerHTML);
			});
			this.text = "change";
		},
	},
};
</script>

<style>
</style>