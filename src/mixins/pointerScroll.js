export default {
  props: {
    autoscroll: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      dropdownMenu: null,
    }
  },

  watch: {
    typeAheadPointer() {
      if (this.autoscroll) {
        this.maybeAdjustScroll();
      }
    },
  },

  methods: {
    /**
     * Adjust the scroll position of the dropdown list
     * if the current pointer is outside of the
     * overflow bounds.
     * @returns {*}
     */
    maybeAdjustScroll() {
      const optionEl = (this.dropdownMenu && this.dropdownMenu.children[this.typeAheadPointer]) || false;

      if (optionEl) {
        const bounds = this.getDropdownViewport();
        const { top, bottom, height } = optionEl.getBoundingClientRect();

        if (top < bounds.top) {
          return (this.dropdownMenu.scrollTop = optionEl.offsetTop);
        } else if (bottom > bounds.bottom) {
          return (this.dropdownMenu.scrollTop =
            optionEl.offsetTop - (bounds.height - height));
        }
      }
    },

    /**
     * The currently viewable portion of the dropdownMenu.
     * @returns {{top: (string|*|number), bottom: *}}
     */
    getDropdownViewport() {
      return this.dropdownMenu
        ? this.dropdownMenu.getBoundingClientRect()
        : {
            height: 0,
            top: 0,
            bottom: 0
          };
    }
  }
};
