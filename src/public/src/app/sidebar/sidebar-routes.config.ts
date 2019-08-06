import { RouteInfo } from './sidebar.metadata';

export const ROUTES: { ability: string; routes: RouteInfo[] }[] = [
  {ability: 'manage-schools' , routes: [
    { path: '', title: 'داشبورد', icon: 'dashboard', class: '' },
    {
      path: 'school',
      title: 'مکتب ها',
      icon: 'format_align_right',
      class: ''
    },
    {
      path: 'school/grades',
      title: 'پایه ها',
      icon: 'format_align_right',
      class: ''
    }]},

    // financial transactions routes.
  {
    ability: 'financial-transactions',
    routes: []
  },

  // staffs.
  {
    ability: 'staffs',
    routes: [
      {
        path: '{schoolPathWithId}/personnel',
        title: 'مدیریت کارمندان',
        icon: 'card_travel',
        class: ''
      }
    ]
  },

  // classes.
  {
    ability: 'classes',
    routes: [
      {
        path: '{schoolPathWithId}/classes',
        title: 'مدیریت کلاس ها',
        icon: 'school',
        class: ''
      }
    ]
  },

  // periods.
  {
    ability: 'periods',
    routes: [{
      path: '{schoolPathWithId}/periods',
      title: 'مدیریت دوره ها',
      icon: 'date_range',
      class: ''
    }]
  },

  // reports.
  {
    ability: 'reports',
    routes: [{
      path: '{schoolPathWithId}/reports',
      title: 'مدیریت دوره ها',
      icon: 'file_copy',
      class: ''
    }]
  },
  // teacher.
  {
    ability: 'student-status',
    routes: [{
      path: '{schoolPathWithId}/classes',
      title: 'مدیریت دوره ها',
      icon: 'file_copy',
      class: ''
    }]
  },
];
