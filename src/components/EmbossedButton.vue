<template>
  <button 
    class="embossed-button"
    :class="{
      'primary': color === 'primary',
      'secondary': color === 'secondary',
      'success': color === 'success',
      'warning': color === 'warning',
      'danger': color === 'danger',
      'disabled': disabled
    }"
    :disabled="disabled"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'EmbossedButton',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick(event) {
      if (!this.disabled) {
        this.$emit('click', event);
      }
    }
  }
}
</script>

<style scoped>
.embossed-button {
  position: relative;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  outline: none;
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2),
    0 2px 4px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.embossed-button:not(.disabled):hover {
  transform: translateY(-1px);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.15);
}

.embossed-button:not(.disabled):active {
  transform: translateY(1px);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.1);
}

.embossed-button.primary {
  background: linear-gradient(to bottom, #3d7d4d, #2e5d3e);
  color: white;
  border: 1px solid #254a31;
}

.embossed-button.secondary {
  background: linear-gradient(to bottom, #9d7e73, #8d6e63);
  color: white;
  border: 1px solid #7a5e54;
}

.embossed-button.success {
  background: linear-gradient(to bottom, #4caf50, #2e7d32);
  color: white;
  border: 1px solid #1b5e20;
}

.embossed-button.warning {
  background: linear-gradient(to bottom, #ff9800, #f57c00);
  color: white;
  border: 1px solid #ef6c00;
}

.embossed-button.danger {
  background: linear-gradient(to bottom, #f44336, #d32f2f);
  color: white;
  border: 1px solid #b71c1c;
}

.embossed-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>