<template>
  <!--
    Triggered on click
    @event click
  -->

  <!--
    Triggered on focus
    @event focus
  -->

  <!--
    Triggered on blur
    @event blur
  -->

  <component
          :is="(to ? 'router-link' : (href ? 'a' : 'button'))"
          :to="to"
          :href="href"
    :type="type"
    @click="$emit('click', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    :class="className"
    :aria-controls="ariaProps"
    :aria-haspopup="ariaProps"
    :aria-owns="ariaProps"
    :value="value"
    :aria-label="ariaLabel"
    :disabled="isDisabled || loading"
    :role="loading ? 'alert' : undefined"
    :aria-busy="loading ? true : undefined">
    <span class="Polaris-Button__Content">
      <span v-if="loading" class="Polaris-Button__Spinner">
        <p-spinner size="small" :color="spinnerColor"></p-spinner>
        <span role="status">
          <span class="Polaris-VisuallyHidden">Loading</span>
        </span>
      </span>
      <span v-if="icon" class="Polaris-Button__Icon">
        <PIcon :source="loading ? 'placeholder' : icon"/>
      </span>
      <span v-if="!hasNoChildren" class="Polaris-Button__Text">
        <!-- @slot Button content -->
        <slot/>
      </span>
      <span v-if="disclosure" class="Polaris-Button__Icon">
        <div :class="disclosureIconClassName">
          <PIcon :source="loading ? 'placeholder' : 'CaretDownMinor'" />
        </div>
      </span>
    </span>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

import { PIcon } from '@/components/PIcon';
import { PSpinner } from '@/components/PSpinner';

type Size = 'slim' | 'medium' | 'large';
type TextAlign = 'left' | 'right' | 'center';
type Type = 'submit' | 'reset' | 'button';
type Any = string|string[]|number|number[];

const DEFAULT_SIZE = 'medium';

@Component({
  components: { PIcon, PSpinner },
})
export default class PButton extends Vue {

  /**
   * A destination to link to, rendered in the href attribute of a link
   */
  @Prop({type: String, default: null}) public href!: string;

  /**
   * VueRouter link | link object
   */
  @Prop([String, Object]) public to!: string | object;

  /**
   * Define aria-controls, aria-haspopup, aria-owns
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public ariaProps!: boolean;

  /**
   * Define aria-label
   */
  @Prop({type: String, default: null}) public ariaLabel!: string;

  /**
   * Type of the button
   * @values submit | reset | button
   */
  @Prop({type: String, default: null}) public type!: Type;

  /**
   * Provides extra visual weight and identifies
   * the primary action in a set of buttons
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public primary!: boolean;

  /**
   * Gives the button a subtle alternative to the
   * default button styling, appropriate for certain backdrops
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public outline!: boolean;

  /**
   * Indicates a dangerous or potentially negative action
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public destructive!: boolean;

  /**
   * Disables the button, disallowing merchant interaction
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public disabled!: boolean;

  /**
   * Replaces button text with a spinner while a background action is being performed
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public loading!: boolean;

  /**
   * Renders a button that looks like a link
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public plain!: boolean;

  /**
   * Makes `plain` and `outline` Button colors
   * (text, borders, icons) the same as the current text color.
   *
   * Also adds an underline to `plain` Buttons
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public monochrome!: boolean;

  /**
   * Allows the button to grow to the width of its container
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public fullWidth!: boolean;

  /**
   * Displays the button with a disclosure icon.
   * @values up | down | true | false
   */
  @Prop({type: [Boolean, String], default: false}) public disclosure!: boolean|string;

  /**
   * Changes the size of the button, giving it more or less padding
   * @values slim | medium | large
   */
  @Prop({type: String, default: null}) public size!: Size;

  /**
   * Changes the inner text alignment of the button
   * @values left | right | center
   */
  @Prop({type: String, default: null}) public textAlign!: TextAlign;

  /**
   * Icon to display to the left of the button content
   * @see [Documentation](https://polaris-icons.shopify.com/?icon=AbandonedCartMajor)
   * for available icon list.
   */
  @Prop({type: String, default: null}) public icon!: string;

  /**
   * Button content
   */
  @Prop([String, Array, Number]) public value!: Any;

  public get className() {
    return classNames(
      'Polaris-Button',
      this.primary && 'Polaris-Button--primary',
      this.outline && 'Polaris-Button--outline',
      this.destructive && 'Polaris-Button--destructive',
      this.isDisabled && 'Polaris-Button--disabled',
      this.loading && 'Polaris-Button--loading',
      this.plain && 'Polaris-Button--plain',
      this.monochrome && 'Polaris-Button--monochrome',
      this.fullWidth && 'Polaris-Button--fullWidth',
      this.icon && this.hasNoChildren && 'Polaris-Button--iconOnly',
      this.size && this.size !== DEFAULT_SIZE && `Polaris-Button--${variationName('size', this.size)}`,
      this.textAlign && `Polaris-Button--${variationName('textAlign', this.textAlign)}`,
    );
  }

  public get disclosureIconClassName() {
    return classNames(
            'Polaris-Button__DisclosureIcon',
            this.disclosure === 'up' && 'Polaris-Button__DisclosureIconFacingUp',
            this.loading && 'Polaris-Button__Hidden',
    );
  }

  public get isDisabled() {
    return this.disabled || this.loading;
  }

  public get spinnerColor() {
    return this.primary || this.destructive ? 'white' : 'inkLightest';
  }

  public get hasNoChildren() {
    return (this.$slots.default || []).length === 0;
  }
}
</script>
