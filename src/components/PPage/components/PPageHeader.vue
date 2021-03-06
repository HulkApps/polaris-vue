<template>
  <div :class="headerClassNames">
    <div class="Polaris-Page-Header__Row">
      <div v-if="breadcrumbs.length > 0" class="Polaris-Page-Header__BreadcrumbWrapper">
        <PBreadcrumbs :breadcrumbs="breadcrumbs"/>
      </div>
      <div class="Polaris-Page-Header__TitleWrapper" v-if="hasTitle">
        <PPageHeaderTitle
            :title="title"
            :subtitle="subtitle"
            :titleMetadata="titleMetadata"
            :alt="thumbnailAlt"
            :source="thumbnail">
          <slot name="titleMetadata" slot="titleMetadata"/>
        </PPageHeaderTitle>
      </div>
      <div class="Polaris-Page-Header__RightAlign">
        <div class="Polaris-Page-Header__Actions" v-if="hasActions">
          <PActionMenu :groups="actionGroups" :actions="secondaryActions" v-if="hasActionMenu"
                       :rollup="isNavigationCollapsed.rollup"/>
          <div v-if="Object.keys(primaryAction).length > 0 || $slots.hasOwnProperty('primaryAction')"
               class="Polaris-Page-Header__PrimaryActionWrapper">
            <slot name="primaryAction">
              <PButton
                  v-if="primaryAction"
                  v-bind="primaryAction"
                  :primary="primaryAction.primary === undefined ? true : primaryAction.primary"
                  @click="primaryAction.onAction()">{{ primaryAction.content }}
              </PButton>
            </slot>
          </div>
          <div class="Polaris-Page-Header__PaginationWrapper" v-if="pagination && !isNavigationCollapsed.rollup">
            <nav aria-label="Pagination">
              <PPagination v-bind="pagination" />
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div class="Polaris-Page-Header__Row"
         v-if="$slots.hasOwnProperty('additionalNavigation') || avatar || avatarInitials">
      <div class="Polaris-Page-Header__LeftAlign"></div>
      <div class="Polaris-Page-Header__RightAlign">
        <div class="Polaris-Page-Header__AdditionalNavigationWrapper">
          <div v-if="avatarInitials || avatar">
            <PAvatar :source="avatar" :initials="avatarInitials"/>
          </div>
          <slot name="additionalNavigation"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {classNames} from '@/utilities/css';
import {
  MenuGroupDescriptor,
  MenuActionDescriptor,
  DestructableAction,
  DisableableAction,
  LoadableAction,
  IconableAction,
} from '@/types';
import {PTextStyle} from '@/components/PTextStyle';
import {PBreadcrumbs} from '@/components/PBreadcrumbs';
import {PPagination, PPaginationDescriptor} from '@/components/PPagination';
import {PActionMenu, hasGroupsWithActions} from '@/components/PActionMenu';
import {PButton} from '@/components/PButton';
import {PPageHeaderTitle, PPageHeaderTitleProps} from './components';
import {PPopover} from '@/components/PPopover';
import {PActionList} from '@/components/PActionList';
import {PButtonGroup} from '@/components/PButtonGroup';
import {PAvatar} from '@/components/PAvatar';

interface PrimaryAction
    extends DestructableAction,
        DisableableAction,
        LoadableAction,
        IconableAction {
  primary?: boolean;
}

export interface PPageHeaderProps extends PPageHeaderTitleProps {
  titleHidden?: boolean;
  separator?: boolean;
  primaryAction?: PrimaryAction;
  pagination?: PPaginationDescriptor;
  breadcrumbs?: [];
  secondaryActions?: MenuActionDescriptor[];
  actionGroups?: MenuGroupDescriptor[];
  additionalMetaData?: string;
}

@Component({
  components: {
    PBreadcrumbs,
    PPagination,
    PPageHeaderTitle,
    PActionMenu,
    PTextStyle,
    PButton,
    PPopover,
    PActionList,
    PButtonGroup,
    PAvatar,
  },
})

export default class PPageHeader extends Vue {

  @Prop(String) public title!: string;
  @Prop(String) public subtitle!: string;
  @Prop(String) public thumbnail!: string;
  @Prop(String) public thumbnailAlt!: string;
  @Prop(String) public titleMetadata!: string;
  @Prop(String) public avatar!: string;
  @Prop(String) public avatarInitials!: string;
  @Prop(String) public additionalMetaData!: string;
  @Prop({type: Boolean, default: false}) public titleHidden!: boolean;
  @Prop(Boolean) public separator!: boolean;
  @Prop({type: Object, default: {}}) public primaryAction!: PrimaryAction;
  @Prop(Object) public pagination!: PPaginationDescriptor;
  @Prop({type: Array, default: Array}) public breadcrumbs!: [];
  @Prop({type: Array, default: () => []}) public secondaryActions!: MenuActionDescriptor[];
  @Prop({type: Array, default: () => []}) public actionGroups!: MenuGroupDescriptor[];

  /**
   * To Check that view collapsed or not
   * @values true | false
   */
  public isNavigationCollapsed = {
    rollup: false,
  };

  public bulkActionsShown: boolean = false;

  public get hasNavigation() {

    return this.breadcrumbs.length > 0 || this.$slots.additionalNavigation || this.pagination;
  }

  public get hasActions() {
    return this.hasActionMenu ||
        this.primaryAction ||
        this.pagination ||
        this.$props.hasOwnProperty('primaryAction');
  }

  public get hasActionMenu() {
    return this.secondaryActions.length > 0 || new hasGroupsWithActions(this.actionGroups);
  }

  public get hasTitle() {
    return this.title || this.subtitle || this.titleMetadata || this.thumbnail ||
        this.$slots.hasOwnProperty('titleMetadata');
  }

  public get hasAvatar() {
    return this.avatar || this.avatarInitials;
  }

  public get headerClassNames() {
    return classNames(
        'Polaris-Page-Header',
        this.titleHidden && 'Polaris-Page-Header--titleHidden',
        this.separator && 'Polaris-Page-Header--separator',
        this.hasNavigation && 'Polaris-Page-Header--hasNavigation',
        this.hasActionMenu && 'Polaris-Page-Header--hasActionMenu',
        this.title && 'Polaris-Page-Header--mediumTitle',
        this.isNavigationCollapsed.rollup && 'Polaris-Page-Header--mobileView',
    );
  }

  public created() {
    window.addEventListener('resize', this.useMediaQuery);
    this.useMediaQuery();
  }

  public destroyed() {
    window.removeEventListener('resize', this.useMediaQuery);
  }

  public useMediaQuery() {
    if (window.innerWidth <= 768) {
      this.$set(this.isNavigationCollapsed, 'rollup', true);
    } else {
      this.$set(this.isNavigationCollapsed, 'rollup', false);
    }
  }
}
</script>
