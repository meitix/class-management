import { ClassManagement } from './class-management';

const classManagement = new ClassManagement(!!process.env.PORT);

classManagement.start( process.env.PORT || 3000, 'mongodb://localhost:27017/class-management'); // local cs;
// classManagement.start(3000 , 'mongodb+srv://nodeapp:@123qwe@@cluster0-mselx.mongodb.net/test?retryWrites=true&w=majority');
