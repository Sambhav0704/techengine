import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  collection, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';

// User Profile Management
export const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      profileData: profileData
    });
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Projects Management
export const addProject = async (userId: string, project: any) => {
  try {
    const projectId = Date.now().toString();
    await setDoc(doc(db, 'users', userId, 'projects', projectId), {
      ...project,
      id: projectId,
      createdAt: new Date()
    });
    return projectId;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

export const updateProject = async (userId: string, projectId: string, project: any) => {
  try {
    await updateDoc(doc(db, 'users', userId, 'projects', projectId), {
      ...project,
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (userId: string, projectId: string) => {
  try {
    await deleteDoc(doc(db, 'users', userId, 'projects', projectId));
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export const getUserProjects = async (userId: string) => {
  try {
    const projectsQuery = query(
      collection(db, 'users', userId, 'projects'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(projectsQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting projects:', error);
    throw error;
  }
};

// Skills Management
export const addSkill = async (userId: string, skill: any) => {
  try {
    const skillId = Date.now().toString();
    await setDoc(doc(db, 'users', userId, 'skills', skillId), {
      ...skill,
      id: skillId,
      createdAt: new Date()
    });
    return skillId;
  } catch (error) {
    console.error('Error adding skill:', error);
    throw error;
  }
};

export const updateSkill = async (userId: string, skillId: string, skill: any) => {
  try {
    await updateDoc(doc(db, 'users', userId, 'skills', skillId), {
      ...skill,
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error('Error updating skill:', error);
    throw error;
  }
};

export const deleteSkill = async (userId: string, skillId: string) => {
  try {
    await deleteDoc(doc(db, 'users', userId, 'skills', skillId));
    return true;
  } catch (error) {
    console.error('Error deleting skill:', error);
    throw error;
  }
};

export const getUserSkills = async (userId: string) => {
  try {
    const skillsQuery = query(
      collection(db, 'users', userId, 'skills'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(skillsQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting skills:', error);
    throw error;
  }
};

// Notifications Management
export const addNotification = async (userId: string, notification: any) => {
  try {
    const notificationId = Date.now().toString();
    await setDoc(doc(db, 'users', userId, 'notifications', notificationId), {
      ...notification,
      id: notificationId,
      createdAt: new Date(),
      read: false
    });
    return notificationId;
  } catch (error) {
    console.error('Error adding notification:', error);
    throw error;
  }
};

export const getUserNotifications = async (userId: string) => {
  try {
    const notificationsQuery = query(
      collection(db, 'users', userId, 'notifications'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(notificationsQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (userId: string, notificationId: string) => {
  try {
    await updateDoc(doc(db, 'users', userId, 'notifications', notificationId), {
      read: true,
      readAt: new Date()
    });
    return true;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// File Upload
export const uploadProfilePicture = async (userId: string, file: File) => {
  try {
    const storageRef = ref(storage, `profile-pictures/${userId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

// HR Dashboard - Students Management
export const getAllStudents = async () => {
  try {
    const usersQuery = query(
      collection(db, 'users'),
      where('userType', '==', 'student')
    );
    const querySnapshot = await getDocs(usersQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting students:', error);
    throw error;
  }
};

export const updateStudentAssessment = async (studentId: string, assessmentData: any) => {
  try {
    await updateDoc(doc(db, 'users', studentId), {
      assessmentData: assessmentData,
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error('Error updating student assessment:', error);
    throw error;
  }
}; 