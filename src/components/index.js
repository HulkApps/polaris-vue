import { PBadge } from './PBadge';
import { PBanner } from './PBanner';
import { PButton } from './PButton';
import { PButtonGroup } from './PButtonGroup';
import { PCard, PCardHeader, PCardSection, PCardSubsection } from './PCard';
import { PCheckbox } from './PCheckbox';
import { PDataTable } from './PDataTable';
import { PDisplayText } from './PDisplayText';
import { PFormLayout, PFormLayoutItem, PFormLayoutGroup } from './PFormLayout';
import { PHeading } from './PHeading';
import { PIcon } from './PIcon';
import { PLayout, PLayoutAnnotatedSection, PLayoutSection } from './PLayout';
import { PPage } from './PPage';
import { PSelect } from './PSelect';
import { PSkeletonBodyText } from './PSkeletonBodyText';
import { PSkeletonDisplayText } from './PSkeletonDisplayText';
import { PSkeletonThumbnail } from './PSkeletonThumbnail';
import { PSpinner } from './PSpinner';
import { PStack, PStackItem } from './PStack';
import { PSubheading } from './PSubheading';
import { PTextContainer } from './PTextContainer';
import { PTextField } from './PTextField';
import { PTextStyle } from './PTextStyle';
import { PToggle } from './PToggle';
import { PSettingToggle } from './PSettingToggle';
import { PColorPicker } from './PColorPicker';
import { PTabs } from './PTabs';
import { PRadioButton } from './PRadioButton';
import { PConnected } from './PConnected';
import { PUnstyledLink } from './PUnstyledLink';
import { PLink } from './PLink';
import { PList, PListItem } from './PList';
import { PImage } from './PImage';
import { PThumbnail } from './PThumbnail';
import { PAvatar } from './PAvatar';
import { PModal } from './PModal';
import { PInlineError } from './PInlineError';
import { PPagination } from './PPagination';
import { PCaption } from './PCaption';
import { PProgressBar } from './PProgressBar';
import { PResourceList, PResourceListItem } from './PResourceList';
import { PActionList } from './PActionList';
import { PPopover } from './PPopover';
import { PTag } from './PTag';
import { PFilter, PFilterItem } from './PFilter';
import { POptionList } from './POptionList';
import { PBreadcrumbs } from './PBreadcrumbs';
import { PActionMenu } from './PActionMenu';
import { PPageActions } from './PPageActions';
import { PMultiSelect } from './PMultiSelect';
import { PDatePicker } from './PDatePicker';
import { PMediaCard } from './PMediaCard';
import { PChart } from './PChart';
import { PEmptyState } from './PEmptyState';
import { PFooterHelp } from './PFooterHelp';
import PToast from './PToast/index';

import '@/scss/main.scss';

const Components = {
  PBadge,
  PBanner,
  PButton,
  PButtonGroup,
  PCard, PCardHeader, PCardSubsection, PCardSection,
  PCheckbox,
  PDataTable,
  PDisplayText,
  PFormLayout, PFormLayoutItem, PFormLayoutGroup,
  PHeading,
  PIcon,
  PLayout, PLayoutAnnotatedSection, PLayoutSection,
  PPage,
  PSelect,
  PSkeletonBodyText,
  PSkeletonDisplayText,
  PSkeletonThumbnail,
  PSpinner,
  PStack, PStackItem,
  PSubheading,
  PTextContainer,
  PTextField,
  PTextStyle,
  PToggle,
  PSettingToggle,
  PColorPicker,
  PTabs,
  PRadioButton,
  PConnected,
  PUnstyledLink,
  PLink,
  PList, PListItem,
  PImage,
  PThumbnail,
  PAvatar,
  PModal,
  PInlineError,
  PPagination,
  PCaption,
  PProgressBar,
  PResourceList, PResourceListItem,
  PActionList,
  PPopover,
  PTag,
  PFilter, PFilterItem,
  POptionList,
  PBreadcrumbs,
  PActionMenu,
  PPageActions,
  PMultiSelect,
  PDatePicker,
  PMediaCard,
  PChart,
  PEmptyState,
  PFooterHelp,
};

const PolarisVue = {
  install(Vue, options = {}) {
    for (let componentKey in Components) {
      Vue.component(componentKey, Components[componentKey]);
    }

    Vue.use(PToast);
  },
};

export default PolarisVue;
