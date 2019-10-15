<template>
  <div class="modal" id="divide_by_0" ref="divide_by_0">
    <div class="modal_content" style="text-align: center">
      <p style="text-align: center" ref="modal_text">
        Nie wolno dzielić przez 0!
        <br>
      </p>
      <button
        class="modal_close"
        ref="modal_button"
        style="float: center"
        @click="CloseModal()"
      >Rozumiem</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZeroDivisionError",
  data() {
    return {
      modal_display_count: 0
    };
  },
  methods: {
    CloseModal() {
      this.$refs.divide_by_0.style.display = "none";
      this.modal_display_count++;
      if (this.modal_display_count == 1) {
        this.$refs.modal_text.innerHTML =
          "Nie próbuj dzielić przez zero!";
        this.$refs.modal_button.innerHTML = "Przepraszam";
      }
      if (this.modal_display_count == 2) {
        this.$refs.modal_text.innerHTML =
          "Znowu dzielisz przez 0.";
        this.$refs.modal_button.innerHTML = "Już nie będę";
      }
      if (this.modal_display_count == 3) {
        this.$refs.divide_by_0.style.backgroundColor =
          "#000000";
        this.$refs.modal_text.innerHTML =
          "#$#A%64g@##@!!!<br>%%@#%5HGF!<br>-_$@^&amp;##$@%!!!!<br>*$(&amp;#!!AK_==3??";
        this.$refs.modal_button.style.display = "none";
        //window.open('','_self','');
        //window.close();
        //self.close();
      }
    }
  }
};
</script>

<style scoped lang="scss">

.modal
{
    display: none;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.7);
}

.modal_content
{
	background: #EEEEEE;
	top: 40%;
	width: 50%;
	padding: 30px;
	margin: auto;
}
</style>
