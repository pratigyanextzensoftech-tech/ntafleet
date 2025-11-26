export class ConfigDB {
  static data = {
    settings: {
      layout_type: 'ltr',
      sidebar: {
        type: 'horizontal-wrapper',
        iconType: 'stroke-svg',
      },
      sidebar_setting: 'default-sidebar',
    },
    color: {
      primary_color: sessionStorage.getItem('default_color') || '#7366ff',
      secondary_color: sessionStorage.getItem('secondary_color') || '#f73164',
      mix_background_layout: 'light-only',
    },
    router_animation: 'fadeIn',
  };
}
export default ConfigDB;
