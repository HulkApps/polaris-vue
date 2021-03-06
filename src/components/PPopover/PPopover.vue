<template>
  <div ref="container">
    <!-- @slot Filter Activator content -->
    <slot name="activator" :activate="onActivate"></slot>

    <PPopoverOverlay
        :id="realId+'Overlay'"
        :active="active"
        :activatorId="activatorId"
        :preferredPosition="preferredPosition"
        :preferredAlignment="preferredAlignment"
        :fullWidth="fullWidth"
        @close="onClose">
      <template v-slot:overlay="props">
        <div :class="className" :ref="`content-${id}`">
          <div v-if="!props.data.measuring"
               :style="{ left: props.data.tipPosition+'px' }"
               class="Polaris-Popover__Tip">
          </div>
          <div class="Polaris-Popover__FocusTracker"
               @focus="handleFocusFirstItem"
               tabindex="0">
          </div>
          <div class="Polaris-Popover__Wrapper">
            <div class="Polaris-Popover__Content">
              <div class="Polaris-Popover__Pane Polaris-Scrollable Polaris-Scrollable--vertical
                          Polaris-Scrollable--hasBottomShadow Polaris-Scrollable--verticalHasScrolling"
                   data-polaris-scrollable="true">
                <!-- @slot Popover Overlay content -->
                <slot name="content"></slot>
              </div>
            </div>
          </div>
          <div class="Polaris-Popover__FocusTracker"
               @focus="handleFocusLastItem"
               tabindex="0">
          </div>
        </div>
      </template>
    </PPopoverOverlay>
  </div>
</template>


<script lang="ts">
import {Component, Vue, Prop, Ref} from 'vue-property-decorator';
import {classNames} from '@/utilities/css';
import PPopoverOverlay from '@/components/PPopover/components/PPopoverOverlay.vue';

@Component({
  components: {PPopoverOverlay},
})

export default class PPopover extends Vue {

  /**
   * Id for the PPopover.
   */
  @Prop({type: String, default: `PolarisPopover${new Date().getUTCMilliseconds()}`}) public id!: string;

  /**
   * Show or hide the PPopover.
   * @values true | false
   */
  @Prop({type: Boolean, required: true}) public active!: boolean;

  /**
   * Preferred Position.
   * @values below | above | mostSpace
   */
  @Prop({type: String, default: 'below'}) public preferredPosition!: string;

  /**
   * Preferred Alignment
   * @values center | left | right
   */
  @Prop({type: String, default: 'center'}) public preferredAlignment!: string;

  /**
   * The element type to wrap the activator with.
   */
  @Prop({type: String, default: null}) public activatorWrapper!: string;

  /**
   * Prevent auto focus on the activator
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public preventAutofocus!: boolean;

  /**
   * Automatically add wrap content in section.
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public sectioned!: boolean;

  /**
   * Allow PPopover to stretch to the full width of its activator.
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public fullWidth!: boolean;

  /**
   * Enable measure
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public measuring!: boolean;

  /**
   * Enable positioning
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public positioning!: boolean;

  @Ref('container') public readonly container!: HTMLElement;

  public isAppended: boolean = false;

  public get className() {
    return classNames(
        'Polaris-Popover',
        this.fullWidth && 'Polaris-Popover--fullWidth',
        this.measuring && 'Polaris-Popover--measuring',
    );
  }

  public get realId() {
    return 'PolarisPopover' + this.id;
  }

  public get activatorId() {
    return this.realId + 'Activator';
  }

  public mounted() {
    if (this.container.firstElementChild !== null) {
      this.container.firstElementChild.id = this.activatorId;
    }
    const popoverOverlay = document.getElementById(this.realId + 'Overlay') as HTMLElement;
    const rootElemId = this.$root.$el.id;
    if (rootElemId && popoverOverlay) {
      const rootElement = document.getElementById(rootElemId) as HTMLElement;
      rootElement.append(popoverOverlay);
      this.isAppended = true;
    }
    window.addEventListener('click', this.handlePageClick);
    window.addEventListener('touchstart', this.handlePageClick);
    document.addEventListener('keyup', this.handleKeyPress);
  }

  public beforeDestroy() {
    if (this.isAppended) {
      const popoverOverlay = document.getElementById(this.realId + 'Overlay') as HTMLElement;
      if (popoverOverlay) {
        popoverOverlay.remove();
      }
    }
  }

  public destroyed() {
    window.removeEventListener('click', this.handlePageClick);
    window.removeEventListener('touchstart', this.handlePageClick);
    window.removeEventListener('keyup', this.handleKeyPress);
  }

  public findActivator() {
    return document.getElementById(this.activatorId);
  }

  public handleKeyPress(e) {
    if (e.keyCode !== 27) {
      return;
    }
    /**
     * Close filter menu when EscapeKey is pressed
     * @property {Default}
     */
    this.$emit('close', 'EscapeKeypress');
  }

  public handlePageClick(e) {
    const target = e.target;
    const contentNode = this.$refs['content-' + this.id];
    if ((contentNode != null && this.nodeContainsDescendant(contentNode, target)) ||
        this.nodeContainsDescendant(this.findActivator(), target) || !this.active) {
      return;
    }
    /**
     * Close filter menu when page is clicked
     * @property {Event} click
     */
    this.$emit('close', 'Click');
  }

  public nodeContainsDescendant(haystack, needle) {
    if (haystack === needle) {
      return true;
    }
    let parent = needle.parentNode;
    while (parent != null) {
      if (parent === haystack) {
        return true;
      }
      parent = parent.parentNode;
    }
    return false;
  }

  public onActivate() {
    /**
     * Activate method
     */
    this.$emit('activate');
  }

  public handleFocusFirstItem() {
    this.$emit('close', 'FocusOut');
  }

  public handleFocusLastItem() {
    this.$emit('close', 'FocusOut');
  }

  public onClose() {
    this.$emit('close', 'Click');
  }
}
</script>
