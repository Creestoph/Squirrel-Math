<template>
  <div>
    <interactive-tree />
    <router-view />
    <app-menu/>
  </div>
</template>

<script>
  import Menu from './components/NewMenu'
  import InteractiveTree from './components/content/InteractiveTree'

  export default {
    name: 'App',
    components: {
		AppMenu: Menu,
		InteractiveTree
	},
  }
</script>

<style lang="scss">
@import "@/style/global";

/* https://stackoverflow.com/questions/34550467/why-is-there-a-default-margin-on-the-body-element/34550634 */
body {
	margin: 0;
	padding: 0;
}

* {
	box-sizing: content-box;
}
</style>
