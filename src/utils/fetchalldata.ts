import { Dispatch } from 'redux';
import studentService from '../services/studentService';
import authService from '../services/authService/authService';
import { setToken } from '../store/slices/authSlice';
import { setStudent } from '../store/slices/studentSlice';
import appealService from '../services/appealService';
import { setAppeal } from '../store/slices/appealSlice';
import announcementService from '../services/announcementService';
import { setAnnouncement } from '../store/slices/announcementSlice';
import lectureService from '../services/lectureService';
import { setLecture } from '../store/slices/lectureSlice';
import { toast } from 'react-toastify';


const fetchAllData = async (dispatch: Dispatch, values:any) => {
  try {

    // Login
    const login = await authService.login(values)
    dispatch(setToken(login?.token))

    // Appeal
    const appeal = await appealService.getAll(login?.token)
    dispatch(setAppeal(appeal));

    // Lecture
    const lecture = await lectureService.getAll(login?.token)
    dispatch(setLecture(lecture))
    console.log(lecture)

    // Announcement
    const announcement = await announcementService.getAll(login?.token)
    dispatch(setAnnouncement(announcement))
    console.log(announcement)
    
    // Student
    const student = await studentService.getByToken(login?.token);
    dispatch(setStudent(student));

  } catch (error) {
    toast.error("Şifre Yada E Posta Yanlış");
    console.error('Veri çekerken hata oluştu:', error);
  }
};

export default fetchAllData;