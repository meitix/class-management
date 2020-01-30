import { RouteInfo } from './sidebar.metadata';

export const ROUTES: { ability: string; routes: RouteInfo[] }[] = [
  // manage-schools
  {
    ability: 'admin-schools',
    routes: [
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
      }
    ]
  },

  // manage-school
  {
    ability: 'manage-school',
    routes: [
      {
        path: '{schoolPathWithId}',
        title: 'داشبورد',
        icon: 'dashboard',
        class: ''
      },
      {
        path: '{schoolPathWithId}/classes',
        title: 'مدیریت کلاس ها',
        icon: 'school',
        class: ''
      },
      {
        path: '{schoolPathWithId}/student',
        title: 'مدیریت قرآن آموزان',
        icon: 'face',
        class: ''
      },
      {
        path: '{schoolPathWithId}/personnel',
        title: 'مدیریت کارمندان',
        icon: 'card_travel',
        class: ''
      }
    ]
  },

  // financial transactions routes.
  {
    ability: 'financial-transactions',
    routes: []
  },

  // staffs.
  {
    ability: 'manage-personnel',
    routes: [
      {
        path: '{schoolPathWithId}',
        title: 'داشبورد',
        icon: 'dashboard',
        class: ''
      },
      {
        path: '{schoolPathWithId}/personnel',
        title: 'مدیریت کارمندان',
        icon: 'card_travel',
        class: ''
      }
    ]
  },

  // manage-classes.
  {
    ability: 'manage-class',
    routes: [
      {
        path: '{schoolPathWithId}',
        title: 'داشبورد',
        icon: 'dashboard',
        class: ''
      },
      {
        path: '{schoolPathWithId}/classes',
        title: 'مدیریت کلاس ها',
        icon: 'school',
        class: ''
      },
      {
        path: '{schoolPathWithId}/student',
        title: 'مدیریت قرآن آموزان',
        icon: 'face',
        class: ''
      }
    ]
  },

  // periods.
  {
    ability: 'periods',
    routes: [
      {
        path: '{schoolPathWithId}/periods',
        title: 'مدیریت دوره ها',
        icon: 'date_range',
        class: ''
      }
    ]
  },

  // reports.
  {
    ability: 'reports',
    routes: [
      {
        path: '{schoolPathWithId}/reports',
        title: 'گزارشات',
        icon: 'file_copy',
        class: ''
      }
    ]
  },
  // teacher.
  {
    ability: 'manage-class-statistics',
    routes: [
      {
        path: '{schoolPathWithId}',
        title: 'داشبورد',
        icon: 'dashboard',
        class: ''
      },
      {
        path: '{schoolPathWithId}/classes',
        title: 'مدیریت آمار',
        icon: 'file_copy',
        class: ''
      }
    ]
  },
  {
    ability: 'own-students-status',
    routes: [
      {
        path: '{schoolPathWithId}/classes/',
        title: 'مدیریت کلاس ها',
        icon: 'file_copy',
        class: ''
      }
    ]
  }
];
