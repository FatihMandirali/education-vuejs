import AdminRepository from '@/repositories/adminRepository';
import AuthenticationRepository from '@/repositories/authenticationRepository';
import BranchRepository from '@/repositories/branchRepository';
import ClassRepository from '@/repositories/classRepository';
import StudentRepository from '@/repositories/studentRepository';
import CoverRepository from '@/repositories/coverRepository';

const repositories = {
    'admins': AdminRepository,
    'authentications': AuthenticationRepository,
    'branchs': BranchRepository,
    'class': ClassRepository,
    'student': StudentRepository,
    'cover': CoverRepository,
}
export default {
    get: name => repositories[name]
};